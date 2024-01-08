import { ICreateCategoryRequestDTO } from "../usecases/Category/create/ICreateCategoryDTO";
import { Category } from "./ICategory";

interface ICategoryRepository {
    create(data: ICreateCategoryRequestDTO): Promise<Category>
    findById(id: string): Promise<Category | null>
    findAll(): Promise<Category[]>
    deleteById(id: string): Promise<object>
}

export { ICategoryRepository }