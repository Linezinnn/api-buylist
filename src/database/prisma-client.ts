import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient

const connection = async () => {
    try {
        await prisma.$connect()
        console.log("Database connected")
    } catch (error) {
        console.log("Database error")
    }
}

connection()