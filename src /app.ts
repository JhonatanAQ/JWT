import fastify from "fastify";
import cors from "@fastify/cors";
import { UserControllers } from "./user/user.controllers";

export const app = fastify({ logger: false });
app.register(cors, {
    origin: [],
    credentials: true,
});
app.get('/', (req, res) => {
    res.send({
    message: "🌱 Bem-vindo(a) ao Estudo do JWT!",
    description: "Uma API dedicada a aprender JWT 🔑",
  });
})
app.register(UserControllers);