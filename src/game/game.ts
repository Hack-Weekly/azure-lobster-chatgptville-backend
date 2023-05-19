/**
 *
 */
export type Game = {
    lastUpdated: Date
    npcs: Record<string, Npc>
    worldState: WorldState
}

export type GameUpdate = {}
export type TimeUpdate = {}
export type WorldUpdate = {}
export type NpcUpdate = {}

export type GameEvent = {}

type WorldState = {
    preface: string
    currentNpcChat: CurrentNpcChat
}

type Npc = {
    name: string
    bio: string
    position: Position
}

type ChatMessage = {
    message: string
}

type CurrentNpcChat = {
    npcId: string
    messageHistory: ChatMessage[]
}

type Position = {
    x: number
    y: number
}

export function newGame(): Game {
    throw new Error("Not implemented") //todo
}

function createNpcs(): Npc[] {
    return [newNpc(), newNpc()]
}

function newNpc(): Npc {
    throw new Error("Not implemented") //todo
}

export function updateGame(game: Game, update: WorldUpdate): GameEvent[] {
    game.lastUpdated = new Date()

    throw new Error("Not implemented") //todo
}

export function startChat(game: Game, npcId: string) {
    throw new Error("Not implemented") //todo
}

export function endChat(game: Game) {
    throw new Error("Not implemented") //todo
}

export function continueChat(game: Game, playerMessage: String) {}

export function endGame(game: Game) {
    throw new Error("Not implemented") //todo
}
