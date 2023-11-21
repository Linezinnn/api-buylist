import { ExceptionError } from "../../../errors/IErrorException";
import { Category, IFindAllCategoriesUseCase } from "../../../interfaces/ICategory";
import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { CategoryRepositoryPrisma } from "../../../repositories/CategoryRepository";

class FindAllCategoriesUseCase implements IFindAllCategoriesUseCase{
    private categoryRepository: ICategoryRepository

    constructor(categoryRepository: ICategoryRepository = new CategoryRepositoryPrisma()){
        this.categoryRepository = categoryRepository
    }

    async execute(): Promise<Category[]> {
        const result = await this.categoryRepository.findAll()

        if(result.length === 0){
            throw new ExceptionError("There are no categories created", 404)
        }

        return result
    }
}

export { FindAllCategoriesUseCase }