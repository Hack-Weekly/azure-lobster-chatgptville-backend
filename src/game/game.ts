import { WorldPosition } from "../commons.js"

export class Game {
    updatedAt: Date
    npcs: Npc[]
    worldState: World
    chat?: Chat

    constructor(updatedAt: Date, npcs: Npc[], worldState: World) {
        this.updatedAt = updatedAt
        this.npcs = npcs
        this.worldState = worldState
    }

    static create(): Game {
        const npcs = createNpcs()
        const worldState = createWorldState()
        return new Game(new Date(), npcs, worldState)
    }

    update(update: GameUpdate): GameUpdateResult[] {
        this.updatedAt = new Date()

        throw new Error("Not implemented") //todo
    }

    startChat(game: Game, npcId: string) {
        throw new Error("Not implemented") //todo
    }

    continueChat(playerMessage: String) {}

    endChat(): ChatResult {
        throw new Error("Not implemented") //todo
        this.chat = undefined
    }

    end(): EndedGame {
        throw new Error("Not implemented") //todo
    }
}

function createWorldState(): World {
    throw new Error("Not implemented") //todo
}

function createNpcs(): Npc[] {
    return [createNpc(), createNpc()]
}

function createNpc(): Npc {
    throw new Error("Not implemented") //todo
}

//world
export type World = {
    preamble: string
}
export type Npc = {
    name: string
    bio: string
    landmark: string
}
export type Landmark = {
    name: string
    description: string
    position: WorldPosition
}

//updates
export type GameUpdate = {
    worldUpdate: WorldUpdate
    npcUpdates: NpcUpdate[]
}
export type WorldUpdate = {}
export type NpcUpdate = {}

//update results
export type NpcUpdateResult = {}
export type WorldUpdateResult = {}
export type GameUpdateResult = {}

//chat
export type Chat = {
    npcName: string
    messageHistory: ChatMessage[]
}
type ChatMessage = {
    message: string
}

export enum ChatResultType {
    CONTINUE = "CONTINUE",
    FOLLOW_AND_CONTINUE = "FOLLOW_AND_CONTINUE", //walk to a differnt landmark and take the player and then continue chatting
    WALK = "WALK", //walk to a different landmark
    DO_NOTHING = "DO_NOTHING",
}

export type ContinueChatResult = {
    type: ChatResultType.CONTINUE
}
export type FollowAndContinueChatResult = {
    type: ChatResultType.FOLLOW_AND_CONTINUE
    landmark: string
}
export type WalkChatResult = {
    type: ChatResultType.WALK
    landmark: string
}
export type DoNothingChatResult = {
    type: ChatResultType.DO_NOTHING
}
export type ChatResult = ContinueChatResult | FollowAndContinueChatResult | DoNothingChatResult

//end
export type EndedGame = {
    endedAt: Date
    shortStory: string
}
