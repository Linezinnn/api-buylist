import { FastifyRequest } from "fastify"
import { IControllerReturn } from "./IGlobalInterfaces"
import { ICreateProductRequestDTO } from "../usecases/Product/create/ICreateProductRequestDTO"

interface IProductController {
    create(request: FastifyRequest): Promise<IControllerReturn>
    findAll(): Promise<IControllerReturn>
    deleteById(request: FastifyRequest): Promise<IControllerReturn>
    updateById(request: FastifyRequest): Promise<IControllerReturn>
}

interface ICreateProductUseCase {
    execute(data: ICreateProductRequestDTO): Promise<Product>
}

interface IFindAllProductsUseCase {
    execute(): Promise<Product[]>
}

interface IDeleteProductByIdUseCase {
    execute(id: string): Promise<object>
}

interface IUpdateProductByIdUseCase {
    execute(id: string, data: UpdateProduct): Promise<object>
}

type UpdateProduct = {
    name?: string
    amount?: number
    categoryName?: string
    check?: boolean
}

type Product = {
    name: string
    amount: number
    categoryName: string
    check?: boolean
    id: string
    createdAt: Date
}

type ProductId = {
    id: string
}

type ProductWithCategory = {
    name: string
    amount: number
    categoryName: string
    check?: boolean
    id: string
    createdAt: Date

    category: {
        name: string
        color: string
        id: string
        createdAt: Date
    }
}

export { 
    IProductController,
    ICreateProductUseCase,
    IFindAllProductsUseCase,
    IDeleteProductByIdUseCase,
    Product,
    ProductWithCategory,
    UpdateProduct,
    IUpdateProductByIdUseCase,
    ProductId
 }