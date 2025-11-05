import { FastifyInstance } from "fastify";
import { UserLogin, UserSignup } from "./user.entities";
import { UserServices} from "./user.services";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userServices = new UserServices()

export async function UserControllers(app: FastifyInstance) {
    app.post('/users/signup', async (request, reply) => {
        const { name, email, password } = request.body as UserSignup;
        const user = await userServices.createUser({ name, email, password });
        if (!user) {
            reply.status(400).send({ message: 'User could not be created' });
            return;
        }
        reply.status(201).send(user);
    });
    app.post('/users/login', async (request, reply) => {
        const { email, password } = request.body as UserLogin;
        const user = await userServices.loginUser({ email, password });
        if (!user) {
            reply.status(401).send({ message: 'Invalid email or password' });
            return;
        }
        reply.status(200).send(user);
    });
    app.get('/users/profile',{preHandler:isAuthenticated}, async (request, reply) => {
        const email = request.user.email;
        
        if (!email) {
            reply.status(401).send({ message: 'Token invalid or expired' });
            return;
        }
        const userProfile = await userServices.searchUser(email as string);

        if (userProfile) {
            reply.status(200).send(userProfile);
        } else {
            reply.status(401).send({ message: 'User not found' });
        }
    });
}