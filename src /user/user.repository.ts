
import { prisma } from "../dataBase/prisma.client";
import { ApiError } from "../error";
import { UserSignup, UserProfile, UserUpdate, UserRepository, UserFindByEmailOrName } from "./user.entities";

export class UserRepositoryDb implements UserRepository {


    async create(user: UserSignup): Promise<UserProfile> {
        
        try{
            const userCreatedData =  await prisma.user.create({
                data: user,
            });
            return userCreatedData;
        }catch(error){
            throw new ApiError(500,"Error creating user");
        }
    }
    async findByEmail(email: string): Promise<UserFindByEmailOrName | null> {
        try{
            const userFindByEmailData = await prisma.user.findUnique({
                select: { id: true, name: true, email: true, password: true },
                where: {email}
            });
            return userFindByEmailData;
        }catch(error){
            throw new ApiError(400,"Error finding user by email");
        }
    }
    async findByName(name: string): Promise<UserFindByEmailOrName | null> {
        try{
            const userFindByEmailData = await prisma.user.findUnique({
                select: { id: true, name: true, email: true, password: true },
                where: {name}
            });
            return userFindByEmailData;
        }catch(error){
            throw new ApiError(400,"Error finding user by email");
        }
    }
    async findById(id: string): Promise< UserProfile | null> {
        try{
            const userFindByIdData = await prisma.user.findUnique({
                select: { id: true, name: true, email: true },
                where: {id}
            });
            return userFindByIdData;
        }catch(error){
            throw new ApiError(400,"Error finding user by ID");
        }

    }
    async update(user: UserUpdate): Promise<UserProfile> {
        try{
            const userUpdatedData = await prisma.user.update({
                where: { id: user.id },
                data: user,
            });
            return userUpdatedData;
        }catch(error){
            throw new ApiError(500,"Error updating user");
        }
    }
    async delete(id:string){
        try {
            await prisma.user.delete({where:{id}})
        } catch (error) {
            throw new ApiError(500,"Error");
        }

    }
}