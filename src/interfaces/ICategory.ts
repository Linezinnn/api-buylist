import { FastifyRequest } from "fastify"
import { ICreateCategoryRequestDTO } from "../usecases/Category/create/ICreateCategoryDTO"
import { IControllerReturn } from "./IGlobalInterfaces"

interface ICategoryController {
    create(request: FastifyRequest): Promise<IControllerReturn>
    findAll(): Promise<IControllerReturn>
    deleteById(request: FastifyRequest): Promise<IControllerReturn>
}

interface ICreateCategoryUseCase {
    execute(data: ICreateCategoryRequestDTO): Promise<Category>
}

interface IFindAllCategoriesUseCase {
    execute(): Promise<Category[]>
}

interface IDeleteCategoryByIdUseCase {
    execute(id: string): void
}


type Category = {
    name: string
    color: string
    id: string
    createdAt: Date
}

export { 
    ICategoryController, 
    ICreateCategoryUseCase,
    IFindAllCategoriesUseCase,
    IDeleteCategoryByIdUseCase,
    Category,
}