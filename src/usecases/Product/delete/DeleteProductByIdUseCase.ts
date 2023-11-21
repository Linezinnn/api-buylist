import { ExceptionError } from "../../../errors/IErrorException";
import { IDeleteProductByIdUseCase } from "../../../interfaces/IProduct";
import { IProductRepository } from "../../../interfaces/IProductRepository";
import { ProductRepositoryPrisma } from "../../../repositories/ProductRepository";

class DeleteProductByIdUseCase implements IDeleteProductByIdUseCase {
    private productRepository: IProductRepository

    constructor(productRepository: IProductRepository = new ProductRepositoryPrisma()){
        this.productRepository = productRepository
    }

    async execute(id: string): Promise<object> {
        const verifyIfProductExistsById = await this.productRepository.findById(id)
        if(!verifyIfProductExistsById){
            throw new ExceptionError("The product not exists", 400)
        }

        const result = await this.productRepository.deleteById(id)

        return result
    }
}

export { DeleteProductByIdUseCase }