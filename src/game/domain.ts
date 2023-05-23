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

export type GameEventType = "CHAT" | "PLAYER_MOVED" | "NPC_MOVED" | "PLAYER_FOLLOWED_NPC"
export const gameEventTypes: GameEventType[] = ["CHAT", "PLAYER_MOVED", "NPC_MOVED", "PLAYER_FOLLOWED_NPC"]
export type GameEvent = {
	type: GameEventType
	message: string
}

export type Chat = {
	npcName: string
	messages: ChatCompletionRequestMessage[]
}

export type ChatResultType =
	| "CONTINUE"
	| "FOLLOW_AND_CONTINUE" //walk to a differnt location and take the player and then continue chatting
	| "WALK" //end chat and walk to a different location
	| "DO_NOTHING" //end chat and do nothing
export const chatResultTypes: ChatResultType[] = ["CONTINUE", "FOLLOW_AND_CONTINUE", "WALK", "DO_NOTHING"]

export type ContinueChatResult = {
	type: "CONTINUE"
}

export type FollowAndContinueChatResult = {
	type: "FOLLOW_AND_CONTINUE"
	location: string
}

export type WalkChatResult = {
	type: "WALK"
	location: string
}

export type DoNothingChatResult = {
	type: "DO_NOTHING"
}

export type ChatResult = ContinueChatResult | FollowAndContinueChatResult | WalkChatResult | DoNothingChatResult

export type EndedGame = {
	endedAt: Date
	shortStory: string
}

export type BufferedGptReply = {
	buffer: NodeJS.ReadableStream
	replySoFar: string
}
