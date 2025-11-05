
import request from "supertest";
import { app } from "../app";
import { UserServices } from "./user.services";

let api: any;
let token: string


const name = "Dev"
const email = "jhonatan.dev@gmail.com"
const password ="Dev@2dev"

beforeAll(async () => {
  api = await app.listen({ port: 0 }); 
});

afterAll(async () => {
  const userServices = new UserServices()
  await userServices.deleteUser(email)
  await app.close();
});


describe("POST: /users/signup" , () => {
  it("should create a user", async () => {
    const response = await request(api)
      .post("/users/signup")
      .send({ 
        name: name, 
        email:email, 
        password:password
      });
    expect(response.status).toBe(201);
  });
  it("should throw an error if the name already exists", async () => {
    const response = await request(api)
      .post("/users/signup")
      .send({ 
        name: name, 
        email:email, 
        password:password
      });
    expect(response.status).toBe(409);
  });
  it("should throw an error if the email already exists", async () => {
    const response = await request(api)
      .post("/users/signup")
      .send({ 
        name: "Dev01", 
        email:email, 
        password:password
      });
    expect(response.status).toBe(409);
  });
  it("should throw an error if the password is invalid.", async () => {
    const response = await request(api)
      .post("/users/signup")
      .send({ 
        name: "Dev02", 
        email:"Dev02@mail.com", 
        password:"dev"
      });
    expect(response.status).toBe(422);
  });
})
describe("POST: /users/login"  , () => {
  it("should login a user", async () => {
    const response = await request(api)
      .post("/users/login")
      .send({
        email:email, 
        password:password
      });
    token = response.body.token
    expect(response.status).toBe(200);
  });
  it("should throw an error if the email is not found", async () => {
    const response = await request(api)
      .post("/users/login")
      .send({ 
        email:"emailIsNotFound@mail.com", 
        password:password
      });
    expect(response.status).toBe(404);
  });
  it("should generate an error if the password is incorrect.", async () => {
    const response = await request(api)
      .post("/users/login")
      .send({ 
        email:email, 
        password:"Dev@2deev"
      });
    expect(response.status).toBe(401);
  });
})
describe("GET:  /users/profile", () => {
  it("should Search a user", async () => {
    const response = await request(api)
      .get("/users/profile")
      .set('Authorization',`Bearer ${token}`)
    expect(response.status).toBe(200);
  });
})