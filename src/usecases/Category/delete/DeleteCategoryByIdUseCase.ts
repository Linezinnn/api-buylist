import { ExceptionError } from "../../../errors/IErrorException";
import { IDeleteCategoryByIdUseCase } from "../../../interfaces/ICategory";
import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { CategoryRepositoryPrisma } from "../../../repositories/CategoryRepository";

class DeleteCategoryByIdUseCase implements IDeleteCategoryByIdUseCase {
   private categoryRepository: ICategoryRepository

   constructor(categoryRepository: ICategoryRepository = new CategoryRepositoryPrisma()){
      this.categoryRepository = categoryRepository
   }
   
   async execute(id: string): Promise<object> {
      const verifyIfCategoryExists = await this.categoryRepository.findById(id)
      if(!verifyIfCategoryExists){
         throw new ExceptionError("The category not exists", 400)
      }

      const result = await this.categoryRepository.deleteById(id)

      return result
   }

}

export { DeleteCategoryByIdUseCase }