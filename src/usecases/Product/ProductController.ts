import { FastifyRequest } from "fastify";
import { ICreateProductUseCase, IDeleteProductByIdUseCase, IFindAllProductsUseCase, IProductController, IUpdateProductByIdUseCase, ProductId } from "../../interfaces/IProduct";
import { ICreateProductRequestDTO } from "./create/ICreateProductRequestDTO";
import { ExceptionError } from "../../errors/IErrorException";
import { IControllerReturn } from "../../interfaces/IGlobalInterfaces";
import { CreateProductUseCase } from "./create/CreateProductUseCase";
import { FindAllProductsUseCase } from "./getAll/FindAllProcutsUseCase";
import { DeleteProductByIdUseCase } from "./delete/DeleteProductByIdUseCase";
import { UpdateProductByIdUseCase } from "./update/updateProductUseCase";

class ProductController implements IProductController {
    private createProductUseCase: ICreateProductUseCase
    private findAllProductsUseCase: IFindAllProductsUseCase
    private deleteProductByIdUseCase: IDeleteProductByIdUseCase
    private updateProductByIdUseCase: IUpdateProductByIdUseCase

    constructor(
        createProductUseCase: ICreateProductUseCase = new CreateProductUseCase(),
        findAllProductsUseCase: IFindAllProductsUseCase = new FindAllProductsUseCase(),
        deleteProductByIdUseCase: IDeleteProductByIdUseCase = new DeleteProductByIdUseCase(),
        updateProductByIdUseCase: IUpdateProductByIdUseCase = new UpdateProductByIdUseCase()
        ){
        this.createProductUseCase = createProductUseCase
        this.findAllProductsUseCase = findAllProductsUseCase
        this.deleteProductByIdUseCase = deleteProductByIdUseCase
        this.updateProductByIdUseCase = updateProductByIdUseCase
    }

    async create(request: FastifyRequest): Promise<IControllerReturn>{
        try {
            const { name, amount, categoryName } = request.body as ICreateProductRequestDTO
            
            if(!name || !amount || !categoryName){
                throw new ExceptionError("The request did not provide the data correctly", 400)
            }

            const result = await this.createProductUseCase.execute({
                name,
                amount,
                categoryName
            })

            return {
                status: 201,
                data: {
                    result
                }
            }
        } catch (error: any) {
            return {
                status: error.getStatus?.() || 500,
                data: {
                    error: error.getMessage?.() || error?.message || "Unxpected error",
                }
            }
        }
    }

    async findAll(): Promise<IControllerReturn> {
        try {
            const result = await this.findAllProductsUseCase.execute()

            return {
                status: 201,
                data: {
                    result
                }
            }
        } catch (error: any) {
            return {
                status: error.getStatus?.() || 500,
                data: {
                    error: error.getMessage?.() || error?.message || "Unxpected error",
                }
            }
        }
    }

    async deleteById(request: FastifyRequest): Promise<IControllerReturn>{
        try {
            const { id } = request.params as ProductId

            if(!id){
                throw new ExceptionError("The request did not provide the data correctly", 400)
            }

            const result = await this.deleteProductByIdUseCase.execute(id)

            return {
                status: 200,
                data: {
                    result
                }
            }
        } catch (error: any) {
            return {
                status: error.getStatus?.() || 500,
                data: {
                    error: error.getMessage?.() || error?.message || "Unxpected error",
                }
            }
        }
    }

    async updateById(request: FastifyRequest): Promise<IControllerReturn>{
        try {
            const { id } = request.params as ProductId
            const data = request.body
    
            if(!data || !id){
                throw new ExceptionError("The request did not provide the data correctly", 400)
            }
    
            const result = await this.updateProductByIdUseCase.execute(id, data)

            return {
                status: 200,
                data: {
                    result
                }
            }
        } catch (error: any) {
            return {
                status: error.getStatus?.() || 500,
                data: {
                    error: error.getMessage?.() || error?.message || "Unxpected error",
                }
            }
        }
    }
}

export { ProductController }