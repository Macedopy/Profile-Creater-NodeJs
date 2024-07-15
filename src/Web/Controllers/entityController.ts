import {Request, Response} from "express";
import { createUserService, deleteUserService, getUserByIdService, getUserService, updateUserService } from "../../Infrastructure/Services/entityServices";
import { noContent } from "../../utils/http-helper";
import { UserModel } from "../../DTOs/userModel";


export const getUser = async (req: Request ,res: Response) => 
    {
        const httpResponse = await getUserService();

        res.status(httpResponse.statusCode).json(httpResponse.body);
    }

export const getUserById = async (req: Request, res: Response) => 
    {
        const id = parseInt(req.params.id);
        const httpResponse = await getUserByIdService(id);

        res.status(httpResponse.statusCode).json(httpResponse.body) || res.status(404);
    }

export const postUser = async(req: Request, res: Response) =>
{
    const value = req.body;
    const httpResponse = await createUserService(value);
    if(httpResponse){
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }else
    {
        const response = noContent()

        res.status((await response).statusCode).json((await response).body)
    }
}

export const deleteUser = async (req: Request, res: Response) => 
    {
        const id = parseInt(req.params.id);
        const httpResponse = await deleteUserService(id);

        return res.status(httpResponse.statusCode).json(httpResponse.body)
    }

export const updateUser = async (req: Request, res: Response) => 
    {
        const id = parseInt(req.params.id);
        const body : UserModel = req.body;
        const httpResponse = await updateUserService(id, body);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }