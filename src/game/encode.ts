import { GameLocation, NPC } from "./domain.js"
import { Game } from "./game.js"
import * as gpt3Encoder from "gpt-3-encoder"

enum AppendLength {
	ONE_SENTENCE = "one sentence",
	A_FEW_SENTENCES = "a few sentences",
	A_PARAGRAPH = "a paragraph",
}

function encodeNpc(npc: NPC) {
	return `Name: ${npc.name}
Bio: ${npc.bio}
Current Location: ${npc.location}`
}

function encodeLocation(location: GameLocation) {
	return `Name: ${location.name}
Description: ${location.desc}`
}

function encodeOtherNpcs(game: Game, withoutNpc: string) {
	let npcs = game.npcs
	if (withoutNpc) {
		npcs = npcs.filter((npc) => npc.name == withoutNpc)
	}
	return npcs.map(encodeNpc).join("\n\n")
}

function encodeLocations(game: Game) {
	return game.locations.map(encodeLocation).join("\n\n")
}

function encodeEvents(game: Game) {
	return game.events.join("\n\n")
}

export async function encodeChatSystemMessage(game: Game, npcName: string) {
	return `You are acting as an NPC named "${npcName}" in a text based game.

World Description: ${game.worldDesc}
Other NPCs:
	${encodeOtherNpcs(game, npcName).replace("\n", "\n\t")}
Game Locations:
	${encodeLocations(game).replace("\n", "\n\t")}
Events So Far:
	-${encodeEvents(game).replace("\n", "\n\t-")}

You are acting as:
${encodeNpc(game.npcs[npcName])}

The player approaches you...`
}

export function tokenCount(s: string) {
	return gpt3Encoder.encode(s).length
}
