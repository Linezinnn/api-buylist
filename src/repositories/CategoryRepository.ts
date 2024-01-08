import { prisma } from "../database/prisma-client";
import { Category } from "../interfaces/ICategory";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";
import { ICreateCategoryRequestDTO } from "../usecases/Category/create/ICreateCategoryDTO";

class CategoryRepositoryPrisma implements ICategoryRepository{
    async create(data: ICreateCategoryRequestDTO): Promise<Category> { 
        
        const result = await prisma.category.create({
            data: {
                name: data.name,
                color: data.color
            }
        })

        return result
    }

    async findById(id: string): Promise<Category | null> {
        const result = await prisma.category.findFirst({
            where: {
                id: id
            }
        })

        return result
    }
     
    async findAll(): Promise<Category[]>{
        const result = await prisma.category.findMany()

        return result
    }

    async deleteById(id: string) {
        const result = await prisma.category.delete({
            where: {
                id,
            }
        })

        return result
    }
    
}

export { CategoryRepositoryPrisma }