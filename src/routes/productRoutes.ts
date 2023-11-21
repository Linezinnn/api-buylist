import { FastifyInstance } from "fastify";
import { IControllerReturn } from "../interfaces/IGlobalInterfaces";
import { IProductController } from "../interfaces/IProduct";
import { ProductController } from "../usecases/Product/ProductController";

async function productRoutes(fastify: FastifyInstance, prefix: String){
    const productController: IProductController = new ProductController()

    fastify.get(`/${prefix}`, async (request, reply) => {

        const result: IControllerReturn = await
        productController.findAll()

        reply
        .status(result.status)
        .send(result?.data)

    })

    fastify.post(`/${prefix}`, async (request, reply) => {
        
        const result: IControllerReturn = await 
        productController.create(request)

        reply
        .status(result.status)
        .send(result?.data)

    })

    fastify.put(`/${prefix}/:id`, async (request, reply) => {
       
        const result: IControllerReturn = await 
        productController.updateById(request)

        reply
        .status(result.status)
        .send(result?.data)

    })

    fastify.delete(`/${prefix}/:id`, async (request, reply) => {

        const result: IControllerReturn = await 
        productController.deleteById(request)

        reply
        .status(result.status)
        .send(result?.data)

    })
}

export { productRoutes }