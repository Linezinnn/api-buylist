import { ExceptionError } from "../../../errors/IErrorException";
import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { ICreateProductUseCase, Product } from "../../../interfaces/IProduct";
import { IProductRepository } from "../../../interfaces/IProductRepository";
import { CategoryRepositoryPrisma } from "../../../repositories/CategoryRepository";
import { ProductRepositoryPrisma } from "../../../repositories/ProductRepository";
import { ICreateProductRequestDTO } from "./ICreateProductRequestDTO";

class CreateProductUseCase implements ICreateProductUseCase {
    private productRepository: IProductRepository
    private categoryRepository: ICategoryRepository

    constructor(
        productRepository: IProductRepository = new ProductRepositoryPrisma(),
        categoryRepository: ICategoryRepository = new CategoryRepositoryPrisma()
    ){
        this.productRepository = productRepository
        this.categoryRepository = categoryRepository
    }

    async execute(data: ICreateProductRequestDTO): Promise<Product> {
        const verifyIfCategoryExists = await this.categoryRepository.findByName(data.categoryName)

        if(!verifyIfCategoryExists){
            throw new ExceptionError("Category is not exists", 400)
        }

        const result = await this.productRepository.create(data)

        return result
    }
}

export { CreateProductUseCase }