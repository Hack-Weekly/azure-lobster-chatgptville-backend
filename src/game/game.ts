import * as dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import { Chat, ChatAction, EndedGame, GameUpdate, Npc, World } from "./domain.js"
import { azureLobsterNpcs } from "./defaults.js"
import ReadableStream = NodeJS.ReadableStream

dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set")
}

console.log("key: " + process.env.OPENAI_API_KEY)
export const openai = new OpenAIApi(configuration)

export class Game {
    npcs: Npc[]
    world: World
    chat?: Chat
    storySoFar: string
    gptReply?: ReadableStream

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

    async startChat(npcId: string): Promise<ChatAction> {
        if (this.chat) throw new Error("already have a chat with npc: " + this.chat.npcName)

        throw new Error("Not implemented") //todo
    }

    async continueChat(playerMessage: String): Promise<ChatAction> {
        throw new Error("Not implemented") //todo
    }

    async endChat(): Promise<ChatAction> {
        throw new Error("Not implemented") //todo
    }

    async end(): Promise<EndedGame> {
        throw new Error("Not implemented") //todo
    }
}

function createWorldState(): World {
    throw new Error("Not implemented") //todo
}

function createNpcs(): Npc[] {
    return azureLobsterNpcs
}

function createNpc(): Npc {
    throw new Error("Not implemented") //todo
}
