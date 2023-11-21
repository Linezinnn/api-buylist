import { 
    ICategoryController, 
    ICreateCategoryUseCase, 
    IFindAllCategoriesUseCase
} from "../../interfaces/ICategory";
import { FastifyRequest } from "fastify";
import { ICreateCategoryRequestDTO } from "./create/ICreateCategoryDTO";
import { CreateCategoryUseCase } from "./create/CreateCategoryUseCase";
import { FindAllCategoriesUseCase } from "./getAll/FindAllCategoriesUseCase";
import { ExceptionError } from "../../errors/IErrorException";
import { IControllerReturn } from "../../interfaces/IGlobalInterfaces";

class CategoryController implements ICategoryController {
    private createCategoryUseCase: ICreateCategoryUseCase
    private findAllCategoriesUseCase: IFindAllCategoriesUseCase
    
    constructor(
        createCategoryUseCase: ICreateCategoryUseCase = new CreateCategoryUseCase(),
        findAllCategoriesUseCase: IFindAllCategoriesUseCase = new FindAllCategoriesUseCase()
        ){
        this.createCategoryUseCase = createCategoryUseCase
        this.findAllCategoriesUseCase = findAllCategoriesUseCase
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
}



export { CategoryController }