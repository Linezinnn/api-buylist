import { 
    ICategoryController, 
    ICreateCategoryUseCase, 
    IDeleteCategoryByIdUseCase, 
    IFindAllCategoriesUseCase
} from "../../interfaces/ICategory";
import { FastifyRequest } from "fastify";
import { ICreateCategoryRequestDTO } from "./create/ICreateCategoryDTO";
import { CreateCategoryUseCase } from "./create/CreateCategoryUseCase";
import { FindAllCategoriesUseCase } from "./getAll/FindAllCategoriesUseCase";
import { ExceptionError } from "../../errors/IErrorException";
import { IControllerReturn } from "../../interfaces/IGlobalInterfaces";
import { DeleteCategoryByIdUseCase } from "./delete/DeleteCategoryByIdUseCase";
import { IDeleteCategoryDTO } from "./delete/IDeleteCategoryDTO";

class CategoryController implements ICategoryController {
    private createCategoryUseCase: ICreateCategoryUseCase
    private findAllCategoriesUseCase: IFindAllCategoriesUseCase
    private deleteCategoryByIdUseCase: IDeleteCategoryByIdUseCase
    
    constructor(
        createCategoryUseCase: ICreateCategoryUseCase = new CreateCategoryUseCase(),
        findAllCategoriesUseCase: IFindAllCategoriesUseCase = new FindAllCategoriesUseCase(),
        deleteCategoryByIdUseCase: IDeleteCategoryByIdUseCase = new DeleteCategoryByIdUseCase()
    ){
        this.createCategoryUseCase = createCategoryUseCase
        this.findAllCategoriesUseCase = findAllCategoriesUseCase
        this.deleteCategoryByIdUseCase = deleteCategoryByIdUseCase
    }

    async create(request: FastifyRequest): Promise<IControllerReturn> {
        try {
            const { name, color } = request.body as ICreateCategoryRequestDTO
            
            if(!name || !color){
                throw new ExceptionError("The request did not provide the data correctly", 400)
            }

            const result = await this.createCategoryUseCase.execute({
                name,
                color
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
                    error: error.getMessage?.() || "Unxpected error",
                }
            }
        }
    }

    async findAll(): Promise<IControllerReturn>{
        try {
            const result = await this.findAllCategoriesUseCase.execute()

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
                    error: error.getMessage?.() || "Unxpected error"
                }
            }
        }
    }

    async deleteById(request: FastifyRequest): Promise<IControllerReturn>{
        try {
            const { id } = request.params as IDeleteCategoryDTO

            if(!id){
                throw new ExceptionError("The request did not provide the data correctly", 400)
            }

            const result = await this.deleteCategoryByIdUseCase.execute(id)

            return {
                status: 200,
                data: {
                    result
                },
            }
        } catch (error: any) {
            return {
                status: error.getStatus?.() || 500,
                data: {
                    error: error.getMessage?.() || error?.message || "Unxpected error"
                }
            }
        }
    }
}



export { CategoryController }