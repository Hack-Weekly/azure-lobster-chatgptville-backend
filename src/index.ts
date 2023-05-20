import { EndedGame, GameUpdate } from "./game/domain.js"
import { v4 as uuidv4 } from "uuid"
import _fastify from "fastify"
import { Game } from "./game/game.js"

const fastify = _fastify({ logger: true })

//gameId:Game
const games: Record<string, Game> = {}
const endedGames: Record<string, EndedGame> = {}

//starts a new game
fastify.post("/start-game", async (request, reply) => {
    let gameId = uuidv4()
    games[gameId] = await Game.create()
    return { gameId }
})

//ends a game if it exists
fastify.post("/end-game", async (request, reply) => {
    const { gameId } = request.body as { gameId: string }

    const game = games[gameId]
    if (game) {
        endedGames[gameId] = game.end()
    }

    delete games[gameId]
    const endedGame = endedGames[gameId]
    if (!endedGame) {
        reply.status(404).send(`Game ${gameId} not found`)
    }

    return { endedGame }
})

//updates the game
fastify.post("/update-game", async (request, reply) => {
    const gameId = request.headers["game-id"] as string

    const { update } = request.body as { update: GameUpdate }

    const game = games[gameId]

    if (!game) {
        reply.status(404).send("Game not found")
        return
    }

    const results = game.update(update)
    return { results }
})

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

await start()
