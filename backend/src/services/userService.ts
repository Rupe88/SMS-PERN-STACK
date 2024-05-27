import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const getUserById = async (id: number) => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ id });
};

export const getAllUsers = async () => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find();
};

export const updateUser = async (id: number, updateData: Partial<User>) => {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.update(id, updateData);
    return await userRepository.findOneBy({ id });
};

export const deleteUser = async (id: number) => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.delete(id);
};
