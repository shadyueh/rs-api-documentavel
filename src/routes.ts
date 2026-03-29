import z from "zod"
import { FastifyTypedInstance } from "./types";
import { randomUUID } from "node:crypto";

interface User {
    id: string
    name: string
    email: string
}

const users: User[] = []

export async function routes(app: FastifyTypedInstance) {
    app.get('/users', {
        schema: {
            tags: ['users'],
            description: 'List users',
            response: {
                200: z.array(
                    z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string()
                    }))
            }
        }
    }, () => { return users })

    app.post('/users', {
        schema: {
            tags: ['users'],
            description: 'Creates a new User',
            body: z.object({
                name: z.string(),
                email: z.string().email()
            }),
            response: {
                201: z.object({
                    id: z.string().uuid(),
                    name: z.string(),
                    email: z.string().email()
                }).describe('User created successfully')
            }
        }
    }, async (request, reply) => {
        const { name, email } = request.body
        const newUser: User = {
            id: randomUUID(),
            name,
            email
        }
        users.push(newUser)
        return reply
            .status(201)
            .header('Location', `/users/${newUser.id}`)
            .send(newUser)
    })
}