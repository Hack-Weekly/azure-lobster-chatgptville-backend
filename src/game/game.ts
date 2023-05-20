import * as dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import { Chat, EndedGame, GameUpdate, Npc, World } from "./domain.js"

dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set")
}

console.log("key" + process.env.OPENAI_API_KEY)
export const openai = new OpenAIApi(configuration)

export class Game {
    npcs: Npc[]
    world: World
    chat?: Chat
    storySoFar: string

    constructor(npcs: Npc[], world: World) {
        this.npcs = npcs
        this.world = world
        this.storySoFar = world.preamble + "\n\n"
    }

    static async create() {
        const npcs = createNpcs()
        const worldState = createWorldState()
        return new Game(npcs, worldState)
    }

    async update(update: GameUpdate) {
        throw new Error("Not implemented") //todo
    }

    async startChat(game: Game, npcId: string) {
        throw new Error("Not implemented") //todo
    }

    async continueChat(playerMessage: String) {}

    async endChat() {}

    end(): EndedGame {
        throw new Error("Not implemented") //todo
    }
}

function createWorldState(): World {
    throw new Error("Not implemented") //todo
}

function createNpcs() {
    return [createNpc(), createNpc()]
}

function createNpc(): Npc {
    throw new Error("Not implemented") //todo
}
