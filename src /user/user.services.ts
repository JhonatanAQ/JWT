
import { UserLogin, UserSignup, UserProfile,UserRepository } from "./user.entities";  
import { UserRepositoryDb } from "./user.repository";
import { isValidEmail, isValidPassword } from "../utils/isValidLogin";
import { ApiError } from "../error";
import bcrypt from "bcrypt";
import { signUser } from "../middlewares/isAuthenticated";


class UserServices {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepositoryDb();
    }
    async createUser(data: UserSignup): Promise<{token:string}> {
        if(!data.name || !data.email || !data.password)throw new ApiError(400,'Name, email and password are required');
        if(!isValidEmail(data.email))throw new ApiError(422,'Invalid email format');
        if(!isValidPassword(data.password))throw new ApiError(422,'Invalid password format');

        const userEmail = await this.userRepository.findByEmail(data.email);
        if (userEmail?.email === data.email) throw new ApiError(409, 'User already exists ');

        const userName = await this.userRepository.findByName(data.name);
        if (userName?.name === data.name) throw new ApiError(409, 'User already exists ');
        
        const password = await bcrypt.hash(data.password, 10);
        data.password = password;

        const userCreated = await this.userRepository.create(data);

        const token = signUser(userCreated.email);

        return {token};
    }
    async loginUser(data: UserLogin): Promise<{token:string}> {
        if(!data.email || !data.password) throw new ApiError(400,'Email and password are required');
        if(!isValidEmail(data.email)) throw new ApiError(422,'Invalid email format');
        if(!isValidPassword(data.password)) throw new ApiError(400,'Invalid password format');

        const userPassword = await this.userRepository.findByEmail(data.email);
        if(!userPassword) throw new ApiError(404,'User User not found');

        const verifyPassword = await bcrypt.compare(data.password, userPassword.password);
        if(!verifyPassword) throw new ApiError(401,'Incorrect password');

        const token = signUser(userPassword.email);
        return {token};
    }
    async searchUser(email: string): Promise<UserProfile> {

        if (!email) throw new ApiError(400, 'Email is required');
        if (!isValidEmail(email)) throw new ApiError(422, 'Invalid email format');

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new ApiError(404, 'User not found');

        const data = {
            id: user.id as string,
            name: user.name as string,
            email: user.email as string,
        };
        return data;    
    }
    async updateUserProfile(id: string, name?: string, password?: string): Promise<UserProfile> {
        if (!id) throw new ApiError(400, 'User ID is required');
        if (password && !isValidPassword(password)) throw new ApiError(400, 'Invalid password format');

        const updatedUser = await this.userRepository.update({ id, name, password });
        if (!updatedUser) throw new ApiError(500,"Error updating user");
        return updatedUser;
    }
    async deleteUser(email:string):Promise<{deleted:boolean}>{
        if(!email) throw new ApiError(400,'Email are required');
        const user = await this.userRepository.findByEmail(email)
        if(!user) throw new ApiError(404,'User not found');
        try {
            await this.userRepository.delete(user.id)
            return {deleted:true}
        } catch (error) {
            return {deleted:true}
        }

    }
}
export { UserServices };