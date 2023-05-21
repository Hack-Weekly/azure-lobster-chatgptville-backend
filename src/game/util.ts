import { encode } from "gpt-3-encoder"

export function tokenCount(s: string) {
    return encode(s).length
}

//Score the "realism" of player input.
export async function scoreRealism(s: string) {
    return 0.5
}

export async function summarize(s: string) {}
