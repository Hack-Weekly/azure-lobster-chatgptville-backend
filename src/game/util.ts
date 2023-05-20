import { encode } from "gpt-3-encoder"

function tokenCount(s: string) {
    return encode(s).length
}

//Score the "realism" of player input.
export async function scoreRealism(s: string) {
    return 0.5
}
