import { ICreateCategoryRequestDTO } from "../usecases/Category/create/ICreateCategoryDTO";
import { Category } from "./ICategory";

interface ICategoryRepository {
    create(data: ICreateCategoryRequestDTO): Promise<Category>
    findByName(name: string): Promise<Category | null>
    findAll(): Promise<Category[]>
}

export { ICategoryRepository }