// Tipagem para req.user
declare module "fastify" {
  interface FastifyRequest {
    user: {
      email: string;
    };
  }
}
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET_KEY;

export async function isAuthenticated(
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {

  if (!secret) {
    reply.code(500).send({ message: "Server error" });
    return done();
  }

  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  if (!token) {
    reply.code(401).send({ message: "Token not provided" });
    return done();
  }

  try {
    const payload = jwt.verify(token, secret);
    (req as any).user = payload;
    return done();
  } catch (err) {
    reply.code(401).send({ message: "Token invalid or expired" });
    return done();
  }
}

export function signUser(email: string): string {
  if (!secret) {
    throw Error("Erro no servidor");
  }
  const token = jwt.sign({ email }, secret, { expiresIn: "1d" });
  if (!token) {
    throw Error("Usuario não autorizado");
  }
  return token;
}