import { ExceptionError } from "../../../errors/IErrorException";
import { IUpdateProductByIdUseCase, UpdateProduct } from "../../../interfaces/IProduct";
import { IProductRepository } from "../../../interfaces/IProductRepository";
import { ProductRepositoryPrisma } from "../../../repositories/ProductRepository";

class UpdateProductByIdUseCase implements IUpdateProductByIdUseCase {
    private productRepository: IProductRepository

    constructor(productRepository: IProductRepository = new ProductRepositoryPrisma()){
        this.productRepository = productRepository
    }

    async execute(id: string, data: UpdateProduct): Promise<object> {
        const verifyIfProductExistsById = await this.productRepository.findById(id)
        if(!verifyIfProductExistsById){
            throw new ExceptionError("The product not exists", 400)
        }

        const result = await this.productRepository.updateById(id, data)

        return result
    }
}

export { UpdateProductByIdUseCase }