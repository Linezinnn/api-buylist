import { prisma } from "../database/prisma-client";
import { Product, ProductWithCategory, UpdateProduct } from "../interfaces/IProduct";
import { IProductRepository } from "../interfaces/IProductRepository";
import { ICreateProductRequestDTO } from "../usecases/Product/create/ICreateProductRequestDTO";

class ProductRepositoryPrisma implements IProductRepository {
    async create(data: ICreateProductRequestDTO): Promise<Product>{

        const result = await prisma.product.create({
            data: {
                name: data.name,
                amount: data.amount,
                categoryName: data.categoryName
            }
        })

        return result
    }

    async findAll(): Promise<ProductWithCategory[]> {
        
        const result = await prisma.product.findMany({
            include: {
                category: true
            }
        })

        return result

    }

    async deleteById(id: string): Promise<object> {
        await prisma.product.delete({
            where: {
                id: id
            }
        })

        return {sucess: `Product with ID: (${id}) was deleted`}
    }

    async findById(id: string): Promise<Product | null>{
        const result = await prisma.product.findFirst({
            where: {
                id
            }
        })

        return result
    }

    async updateById(id: string, data: UpdateProduct): Promise<Product> {
        const result = await prisma.product.update({
            where: {
                id
            },
            data
        })

        return result
    }
}

export { ProductRepositoryPrisma }