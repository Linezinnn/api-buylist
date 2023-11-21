import { ExceptionError } from "../../../errors/IErrorException";
import { IFindAllProductsUseCase, ProductWithCategory } from "../../../interfaces/IProduct";
import { IProductRepository } from "../../../interfaces/IProductRepository";
import { ProductRepositoryPrisma } from "../../../repositories/ProductRepository";

class FindAllProductsUseCase implements IFindAllProductsUseCase {
    private productRepository: IProductRepository

    constructor(productRepository: IProductRepository = new ProductRepositoryPrisma()){
        this.productRepository = productRepository
    }
    
    async execute(): Promise<ProductWithCategory[]> {
        const result = await this.productRepository.findAll()

        if(result.length === 0){
            throw new ExceptionError("There are no products created", 404)
        }

        return result
    }
}

export { FindAllProductsUseCase }