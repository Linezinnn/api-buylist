import { ExceptionError } from "../../../errors/IErrorException";
import { Category, ICreateCategoryUseCase } from "../../../interfaces/ICategory";
import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { CategoryRepositoryPrisma } from "../../../repositories/CategoryRepository";
import { ICreateCategoryRequestDTO } from "./ICreateCategoryDTO";

class CreateCategoryUseCase implements ICreateCategoryUseCase{
    private categoryRepository: ICategoryRepository

    constructor(categoryRepository: ICategoryRepository = new CategoryRepositoryPrisma()){
        this.categoryRepository = categoryRepository
    }

    async execute(data: ICreateCategoryRequestDTO): Promise<Category> {

        const verifyIfCategoryExists = await this.categoryRepository.findByName(data.name)
        
        if(verifyIfCategoryExists){
            throw new ExceptionError("This category already exists", 400)
        }

        const result: Category = await this.categoryRepository.create(data)
        return result

    }
}

export { CreateCategoryUseCase }