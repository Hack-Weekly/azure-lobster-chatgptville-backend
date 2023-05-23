import { EndedGame } from "./game/domain.js"
import _fastify from "fastify"
import { Game } from "./game/game.js"
import * as dotenv from "dotenv"

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
	const { worldDescription } = request.body as { worldDescription: string }

	if (!worldDescription) {
		reply.status(422)
		return "need worldDescription"
	}

	let gameId = "feaf7740-b310-4d48-86e1-d352f96fab82" // uuidv4()
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

	const results = await game.startChat(npcName)
	return { results }
})

fastify.post("/continue-chat", async (request, reply) => {
	const gameId = request.headers["game-id"] as string

	const { message } = request.body as { message: string }

	const game = games[gameId]

	if (!game) {
		reply.status(404)
		return `game not found with id ${gameId}`
	}

	const results = await game.continueChat(message)
	return { results }
})

fastify.get("/gpt-reply", async (request, reply) => {
	const gameId = request.headers["game-id"] as string

	const game = games[gameId]

	if (!game) {
		reply.status(404)
		return `game not found with id ${gameId}`
	}

	const gptReply = game.gptReply
	if (!gptReply) {
		reply.status(409)
		return `no gptReply found for game with id ${gameId}`
	}

	game.gptReply = undefined

	return gptReply.buffer
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
