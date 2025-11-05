
import fastify from "fastify";
import cors from "@fastify/cors";
import { UserControllers } from "./user/user.controllers";
import { AccountingRecordControllers } from "./accountingRecord/accountingRecord.controllers";

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

app.listen({
    host:'0.0.0.0',
    port:process.env.PORT?Number(process.env.PORT): 3333,

}).then( ()=>{
    console.log(`Server is Running`)
}) 