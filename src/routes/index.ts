import { FastifyInstance } from "fastify";
import { categoryRoutes } from "./categoryRoutes";
import { productRoutes } from "./productRoutes";

export async function routesIndex(fastify: FastifyInstance){
    await categoryRoutes(fastify, 'category')
    await productRoutes(fastify, 'product')
}