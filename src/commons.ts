import { encode } from "gpt-3-encoder"

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

function tokenCount(s: string): number {
    return encode(s).length
}
