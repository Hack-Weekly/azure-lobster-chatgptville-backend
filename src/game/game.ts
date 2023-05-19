/**
 *
 */
import { Position } from "../commons.js"

export class Game {
    lastUpdated: Date
    npcs: Npc[]
    worldState: WorldState

    constructor(lastUpdated: Date, npcs: Npc[], worldState: WorldState) {
        this.lastUpdated = lastUpdated
        this.npcs = npcs
        this.worldState = worldState
    }

    static create(): Game {
        throw new Error("Not implemented") //todo
    }

    update(update: GameUpdate): GameUpdateResult[] {
        this.lastUpdated = new Date()

        throw new Error("Not implemented") //todo
    }

    startChat(game: Game, npcId: string) {
        throw new Error("Not implemented") //todo
    }

    continueChat(playerMessage: String) {}

    endChat(game: Game) {
        throw new Error("Not implemented") //todo
    }

    end(): EndedGame {
        throw new Error("Not implemented") //todo
    }
}

export type EndedGame = {
    lastUpdated: Date
}

export type GameUpdate = {
    worldUpdate: WorldUpdate
    npcUpdates: NpcUpdate[]
}

export type WorldUpdate = {}
export type NpcUpdate = {}
export type GameUpdateResult = {}

type WorldState = {
    preface: string
    currentChat: Chat
}

type Npc = {
    name: string
    bio: string
    position: Position
}

type ChatMessage = {
    message: string
}

type Chat = {
    npcName: string
    messageHistory: ChatMessage[]
}

function createNpcs(): Npc[] {
    return [newNpc(), newNpc()]
}

function newNpc(): Npc {
    throw new Error("Not implemented") //todo
}
