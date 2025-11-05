
export interface UserLogin {
    email: string;
    password: string;
}
export interface UserSignup {
    name: string;
    email: string;
    password: string;
}
export interface UserProfile {
    id: string;
    name: string;
    email: string; 
}
export interface UserUpdate {
    id: string;
    name?: string;
    password?: string; 
}
export interface UserFindByEmailOrName {
    id: string;
    name: string;
    email: string;
    password: string; 
}
export interface UserRepository {
    create(user: UserSignup): Promise<UserProfile>;
    findByEmail(email: string): Promise<UserFindByEmailOrName | null>;
    findByName(name: string): Promise<UserFindByEmailOrName | null>;
    update(user: UserUpdate): Promise<UserProfile>;
    delete(id:string):Promise<any>;
}