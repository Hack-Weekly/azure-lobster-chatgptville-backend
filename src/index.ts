import { endGame, Game, GameUpdate, updateGame } from "./game/game.js"
import { v4 as uuidv4 } from "uuid"
import _fastify from "fastify"

const fastify = _fastify({ logger: true })

/**
 * sessionId : Game
 */
const games: Record<string, Game> = {}

// Require the framework and instantiate it

// Declare a route
fastify.get("/", async (request, reply) => {
    return { hello: "world" }
})

//starts a new game
fastify.post("/start-game", async (request, reply) => {
    let gameId = uuidv4()
    reply.send({ gameId })
})

//ends a game if it exists
fastify.post("/end-game", async (request, reply) => {
    const { gameId } = request.body as any

    const game = games[gameId]
    if (game) {
        endGame(game)
    }

    delete games[gameId]
})

//updates the world
fastify.post("/update-game", async (request, reply) => {
    const gameId = request.headers["game-id"] as string

    const { update } = request.body as { update: GameUpdate }

    const game = games[gameId]

    if (!game) {
        reply.status(404).send("Game not found")
        return
    }

    const updateEvents = updateGame(game, update)

    throw new Error("Not implemented") //todo return the response to update the world on the client
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start().then((r) => console.log("Server started!"))
