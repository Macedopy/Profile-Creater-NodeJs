import { UserModel } from "../../DTOs/userModel";
import { databaseConnection } from "../Configurations/connectionDB";

export const findAllUsers = async(): Promise<UserModel[]> =>
{
        try
        {
            const client = await databaseConnection();
            const fetchUsers = await client.query('SELECT * FROM person ORDER BY id ASC');
            const user = fetchUsers.rows;
            client.end;
            return user;
        } catch
        {
            throw console.error("Error fetching users")
        }
}


export const findUserById = async (id: Number): Promise<UserModel | undefined> =>
{
            try
            {
                const client = await databaseConnection();
                const fetchUsers = await client.query('SELECT * FROM person WHERE id = $1', [id]);
                const user: UserModel = fetchUsers.rows[0];
                await client.end;
                return user;
            }catch (error)
            {
                console.error("Error fetching user by id ", error);
                throw error;
            }
};

export const createUser = async(userModel: UserModel) => 
    {
        try
        {
            const client = await databaseConnection();
            const query = `
                INSERT INTO person
                (id, name, age, nationality, qi, strength, agility)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    
            const values = [
                userModel.id,
                userModel.name,
                userModel.age,
                userModel.nationality,
                userModel.statistics.qi,
                userModel.statistics.strength,
                userModel.statistics.agility,
            ];
    
            await client.query(query, values);
            await client.end();
            return client;
        } catch(error)
        {
            throw console.error("Cannot create the user ", userModel, error)
        }
    }

export const deleteUser = async(id: Number) =>
{
    try
    {
        const client = await databaseConnection();
        const findUser = await findUserById(id);

        if(findUser)
            {
                await client.query('DELETE FROM person WHERE id = $1', [id]).then(() => 
                    {
                        return true;
                    });
                await client.end;
            }
    } catch(error)
    {
        console.error("User not found ", error);
        throw error;
    }

}

export const updateUser = async(id: number, userModel: UserModel, patchData: Partial<UserModel>)=>
    {
        try {
            const client = await databaseConnection();
            const existingUser = await findUserById(id);
            if (existingUser)
                {
                    existingUser.name = userModel.name;
                    existingUser.age = userModel.age;
                    existingUser.nationality = userModel.nationality;
                    existingUser.statistics.qi = userModel.statistics.qi;
                    existingUser.statistics.strength = userModel.statistics.strength;
                    existingUser.statistics.agility = userModel.statistics.agility;
                }
    
                const updatedUser: UserModel = {
                    ...existingUser!,
                    ...patchData,
                    statistics: {
                        ...existingUser!.statistics,
                        ...patchData.statistics // Ensure you handle nested properties like statistics
                    }
                };
        
                // Prepare update query
                const updateQuery =
                    `UPDATE person SET
                    name = $1,
                    age = $2,
                    nationality = $3,
                    qi = $4,
                    strength = $5,
                    agility = $6
                    WHERE id = $7`;
        
                const { name, age, nationality, statistics } = updatedUser;
                const { qi, strength, agility } = statistics || {};
        
                // Execute update query
                await client.query(updateQuery, [name, age, nationality, qi, strength, agility, id]);

            await client.end();
            return client;
        } catch (error) {
            console.error("User not can be updated ", error);
            throw error;
        }
    }