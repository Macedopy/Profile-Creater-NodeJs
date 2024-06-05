import { UserModel } from "../../DTOs/userModel";

const data: UserModel[] = 
[
    {id: 1, 
    name: "Bruno Macedo", 
    age: 18,
    nationality: "Brasileiro",
    statistics: 
    {qi: 80,
    strength: 100,
    agility: 100}},


    {id: 2, 
    name: "Isabelle Hortolan", 
    age: 18, 
    nationality: "Brasileiro", 
    statistics: 
    {qi: 100,
    strength: 100,
    agility: 100}}
];

export const findAllUsers = async(): Promise<UserModel[]> =>
{
    return data;
}

export const findUserById = async (id: number): Promise<UserModel | undefined> =>
{
    return data.find((user) => user.id === id);
};

export const createUser = async(user: UserModel) => 
    {
        data.push(user);
    }

export const deleteUser = async(id: Number) =>
{
    const indexId = data.findIndex( x => x.id === id);
    
    if (indexId != -1)
        {
            data.splice(indexId, 1)
        }

}

export const updateUser = async(id: Number, userModel: UserModel)=>
    {
        const indexId = data.findIndex( x => x.id === id);
        
        if (indexId!= -1)
            {
                data[indexId] = userModel;
            }
        return data[indexId];
    }