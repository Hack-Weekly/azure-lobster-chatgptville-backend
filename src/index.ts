import { EndedGame } from "./game/domain.js"
import _fastify from "fastify"
import { Game } from "./game/game.js"
import * as dotenv from "dotenv"
import { v4 as uuidv4 } from "uuid"

dotenv.config()

const fastify = _fastify({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
})

let port = process.env.PORT as any
console.log("env.port: ", port)
if (!port) {
	port = 3000
}

//gameId:Game
const games: Record<string, Game> = {}
const endedGames: Record<string, EndedGame> = {}

//starts a new game
fastify.post("/start-game", async (request, reply) => {
	let gameId = uuidv4()
	games[gameId] = Game.create()
	return { gameId }
})

//ends a game if it exists
fastify.post("/end-game", async (request, reply) => {
	const { gameId } = request.body as { gameId: string }

	const game = games[gameId]
	if (game) {
		endedGames[gameId] = await game.end()
	}

	delete games[gameId]
	const endedGame = endedGames[gameId]
	if (!endedGame) {
		reply.status(404)
		return `game ${gameId} already ended`
	}

	return { endedGame }
})

//starts a new chat
fastify.post("/start-chat", async (request, reply) => {
	const gameId = request.headers["game-id"] as string

	const { npcName } = request.body as { npcName: string }
	if (!npcName) {
		reply.status(422)
		return "need npcName"
	}

	const game = games[gameId]

	if (!game) {
		reply.status(404)
		return `game not found with id ${gameId}`
	}

	return await game.startChat(npcName)
})

fastify.post("/continue-chat", async (request, reply) => {
	const gameId = request.headers["game-id"] as string

	const { message } = request.body as { message: string }

	const game = games[gameId]

	if (!game) {
		reply.status(404)
		return `game not found with id ${gameId}`
	}

	return await game.continueChat(message)
})

async function start() {
	try {
		await fastify.listen({ port })
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

await start()
