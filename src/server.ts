import fastify, { FastifyInstance } from "fastify";

import './database/prisma-client.ts'
import { routesIndex } from "./routes/routes.js";
import { fastifyCors } from "@fastify/cors";

const server: FastifyInstance = fastify({ logger: true })
const port: number = 8080

server.register(routesIndex)
server.register(fastifyCors, {
    origin: 'http://localhost:5173'
})

server.listen({
    port
}, () => {
    console.log(`The application is running in URL: http://localhost:${port}`)
})
