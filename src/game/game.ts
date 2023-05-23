import * as dotenv from "dotenv"
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"
import { BufferedGptReply, Chat, EndedGame, GameLocation, NPC, NPCDescription } from "./domain.js"
import { promptChatStream } from "./request.js"
import { encodeChatSystemMessage as encodeNpcChatInitialSystemMessage } from "./encode.js"
import { defaultLocations, defaultNpcProfiles, defaultWorldDesc } from "./defaults.js"

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
	startedAt: Date = new Date()
	worldDesc: string
	locations: GameLocation[]
	npcs: NPC[]
	events: string[]
	chat?: Chat
	gptReply?: BufferedGptReply

	constructor(worldDesc: string) {
		this.worldDesc = worldDesc
	}

	static create() {
		const game = new Game(defaultWorldDesc)
		game.locations = defaultLocations
		game.initNpcs(defaultNpcProfiles)
		return game
	}

	initNpcs(npcProfiles: NPCDescription[]) {
		this.npcs = npcProfiles.map((desc, i) => {
			return desc && ({ location: this.locations[i].name } as NPC)
		})
	}

	async startChat(npcName: string) {
		const npc = this.getNpc(npcName)
		if (!npc) throw new Error("no npc found with name: " + npcName)

		const prompt = await encodeNpcChatInitialSystemMessage(this, npc.name)

		const chat = { npcName: npc.name, messages: [{ role: "system", content: prompt } as ChatCompletionRequestMessage] }
		this.chat = chat
		this.gptReply = await promptChatStream(chat.messages, (s) => chat.messages.push({ role: "assistant", content: s }))
	}

	async continueChat(playerMessage: string) {
		const chat = this.chat
		if (!chat) throw new Error("no current chat")

		chat.messages.push({ role: "user", content: playerMessage })
		this.gptReply = await promptChatStream(chat.messages, (s) => chat.messages.push({ role: "assistant", content: s }))
	}

	async endChat() {
		throw new Error("Not implemented") //todo
	}

	async end(): Promise<EndedGame> {
		throw new Error("Not implemented") //todo
	}

	getNpc(npcName: string) {
		const npc = this.npcs.find((npc) => npc.name === npcName)
		if (!npc) throw new Error("no npc found with name: " + npcName)
		return npc
	}
}
