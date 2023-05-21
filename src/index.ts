import { EndedGame } from "./game/domain.js"
import { v4 as uuidv4 } from "uuid"
import _fastify from "fastify"
import { Game, openai } from "./game/game.js"
import * as stream from "stream"

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
        endedGames[gameId] = await game.end()
    }

    delete games[gameId]
    const endedGame = endedGames[gameId]
    if (!endedGame) {
        reply.status(404).send(`Game ${gameId} not found`)
    }

    return { endedGame }
})

//starts a new chat
fastify.post("/start-chat", async (request, reply) => {
    const gameId = request.headers["game-id"] as string

    const { npcName } = request.body as { npcName: string }

    const game = games[gameId]

    if (!game) {
        reply.status(404).send("Game not found")
        return
    }

    const results = await game.startChat(npcName)
    return { results }
})

fastify.post("/continue-chat", async (request, reply) => {
    const gameId = request.headers["game-id"] as string

    const { message } = request.body as { message: string }

    const game = games[gameId]

    if (!game) {
        reply.status(404).send("Game not found")
        return
    }

    const results = await game.continueChat(message)
    return { results }
})

//=========TEMP CODE DELETE LATER================
let buffer: any

fastify.get("/gpt-reply", async (request, reply) => {
    // const gameId = request.headers["game-id"] as string
    // const game = games[gameId]
    //
    // if (!game) {
    //     reply.status(404).send("Game not found")
    //     return
    // }
    //
    // const stream = game.gptReply
    // if (!stream) {
    //     reply.status(404).send("Stream not found")
    //     return
    // }

    const resq = await openai.createChatCompletion(
        {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "write me a story about a princess and a dragon",
                },
            ],
            stream: true,
        },
        { responseType: "stream" }
    )

    buffer = new stream.Readable()
    buffer._read = () => {}

    // @ts-ignore
    res.data.on("data", (data) => {
        const dataString = data
            .toString()
            .split("\n")
            .filter((line) => line.trim() !== "")

        for (const line of dataString) {
            const message = line.replace(/^data: /, "")
            // console.log(message)
            if (message === "[DONE]") {
                buffer.push(null) // Stream finished
                return // Stream finished
            }
            const choices = JSON.parse(message).choices
            // console.log(choices)
            const delta = choices[0].delta
            // console.log(delta)
            const content = delta.content
            // console.log(content)
            if (!content) {
                // console.log("no content")
                const role = delta.role
                if (!role) {
                    // console.log("no role")
                    const finish_reason = choices[0].finish_reason
                    if (!finish_reason) {
                        throw new Error("no content, role, or finish_reason for line: " + line)
                    }
                }

                continue
            }

            process.stdout.write(content.toString())
            buffer.push(content.toString())
        }
    })
})

fastify.get("/gpt-reply2", async (request, reply) => {
    reply.header("Transfer-Encoding", "chunked")
    return buffer
})

//=========END TEMP CODE DELETE LATER================

async function start() {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

await start()
