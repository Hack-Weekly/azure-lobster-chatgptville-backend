import { ChatCompletionRequestMessage } from "openai"

export type WorldPosition = {
	x: number
	y: number
}

export type WorldArea = {
	x1: number
	y1: number
	x2: number
	y2: number
}

export type NPCDescription = {
	name: string
	bio: string
}

export type NPC = NPCDescription & {
	location: string
	journal?: string
}

export type GameLocation = {
	name: string
	desc: string
}

export type Chat = {
	npcName: string
	messages: ChatCompletionRequestMessage[]
}

export enum NPCChoice {
	CONTINUE_CHAT = "CONTINUE_CHAT",
	SAY_GOODBYE_AND_GO_TO_ = "SAY_GOODBYE_AND_GO_TO_",
	SAY_GOODBYE = "SAY_GOODBYE",
}

export const NPC_CHOICES: NPCChoice[] = [
	NPCChoice.CONTINUE_CHAT,
	NPCChoice.SAY_GOODBYE,
	NPCChoice.SAY_GOODBYE_AND_GO_TO_,
]

export type EndedGame = {
	endedAt: Date
	shortStory: string
}

export type BufferedGptReply = {
	buffer: NodeJS.ReadableStream
	replySoFar: string
}
