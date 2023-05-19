import { Position } from "../commons.js"

export class Game {
    updatedAt: Date
    npcs: Npc[]
    worldState: WorldState
    chat?: Chat

    constructor(updatedAt: Date, npcs: Npc[], worldState: WorldState) {
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
    }

    end(): EndedGame {
        throw new Error("Not implemented") //todo
    }
}

export type EndedGame = {
    endedAt: Date
}

export type GameUpdate = {
    worldUpdate: WorldUpdate
    npcUpdates: NpcUpdate[]
}

export type WorldUpdate = {}
export type NpcUpdate = {}

export type GameUpdateResult = {}

export enum ChatResultType {
    CONTINUE = "CONTINUE",
    FOLLOW = "FOLLOW",
    DO_NOTHING = "DO_NOTHING",
}

export type ContinueChatResult = {
    type: ChatResultType.CONTINUE
}
export type FollowNpcChatResult = {
    type: ChatResultType.FOLLOW
    position: Position
}
export type DoNothingChatResult = {
    type: ChatResultType.DO_NOTHING
}

export type ChatResult = ContinueChatResult | FollowNpcChatResult | DoNothingChatResult

type WorldState = {
    preamble: string
    chat?: Chat
}

function createWorldState(): WorldState {
    throw new Error("Not implemented") //todo
}

type Npc = {
    name: string
    bio: string
    position: Position
}

type ChatMessage = {
    message: string
}

export type Chat = {
    npcName: string
    messageHistory: ChatMessage[]
}

function createNpcs(): Npc[] {
    return [createNpc(), createNpc()]
}

function createNpc(): Npc {
    throw new Error("Not implemented") //todo
}
