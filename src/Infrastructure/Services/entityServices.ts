import { created, noContent, ok } from "../../utils/http-helper";
import * as repositorie from "../../Infrastructure/Repositories/entityRepository";
import { UserModel } from "../../DTOs/userModel";
import { response } from "express";

const validator = async (data: any) => 
    {
        let response = null;
        if (data)
            {
                response = await ok(data);
            } else 
            {
                response = await noContent();
            }
        return response;
    }

export const getUserService = async () => 
    {
        const data = await repositorie.findAllUsers();
        return validator(data);
    }

export const getUserByIdService = async (id: number) => 
    {
        const data = await repositorie.findUserById(id);
        return validator(data);
    };

export const createUserService = async (user: UserModel) =>
    {
        let response = null;
        if (Object.keys(user).length != 0)
            {
                await repositorie.createUser(user);
                response = created();
            }else
            {
                return noContent();
            }
        return response;
    }

export const deleteUserService = async (id: Number) => 
    {
        let response = null;
        if (id)
            {
                await repositorie.deleteUser(id);
                response =  ok({message: "User Deleted"});
            }else
            {
                return noContent();
            }
        return response;
    }
    
export const updateUserService = async (id: Number, userModel: UserModel) => 
    {
        const data = await repositorie.updateUser(id, userModel);
        const response = await ok(data);
        return response;
    }