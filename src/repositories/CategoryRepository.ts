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

    async findByName(name: string): Promise<Category | null> {
        const result = await prisma.category.findUnique({
            where: {
                name
            }
        })

        return result
    }
     
    async findAll(): Promise<Category[]>{
        const result = await prisma.category.findMany()

        return result
    }

    
}

export { CategoryRepositoryPrisma }