import { FastifyInstance } from "fastify";
import { CategoryController } from "../usecases/Category/CategoryController";
import { ICategoryController } from "../interfaces/ICategory";
import { IControllerReturn } from "../interfaces/IGlobalInterfaces";

async function categoryRoutes(fastify: FastifyInstance, prefix: String){
    const categoryController: ICategoryController = new CategoryController()

    fastify.get(`/${prefix}`, async (request, reply) => {

        const result: IControllerReturn = await 
        categoryController.findAll()

        reply
        .status(result.status)
        .send(result?.data)

    })

    fastify.post(`/${prefix}`, async (request, reply) => {

        const result: IControllerReturn = await 
        categoryController.create(request)

        reply
        .status(result.status)
        .send(result?.data)

    })
}

export { categoryRoutes }