
import { ICreateProductRequestDTO } from "../usecases/Product/create/ICreateProductRequestDTO";
import { Product, ProductId, ProductWithCategory, UpdateProduct } from "./IProduct";

interface IProductRepository {
    create(data: ICreateProductRequestDTO): Promise<Product>
    findAll(): Promise<ProductWithCategory[]>
    deleteById(id: string): Promise<object>
    findById(id: string): Promise<Product | null>
    updateById(id: string, data: UpdateProduct): Promise<Product>
}

export { IProductRepository }