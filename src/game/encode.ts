import { GameLocation, NPC, NPC_CHOICES, NPCChoice } from "./domain.js"
import { Game } from "./game.js"
import * as gpt3Encoder from "gpt-3-encoder"
import * as changeCase from "change-case"

function encodeNpc(npc: NPC) {
	return `Name: ${npc.name}
Bio: ${npc.bio}
Location: ${npc.location}`
}

function encodeLocation(location: GameLocation) {
	return `Name: ${location.name}
Description: ${location.desc}`
}

function encodeOtherNpcs(game: Game, withoutNpc: string) {
	let npcs = game.npcs
	if (withoutNpc) {
		npcs = npcs.filter((npc) => npc.name !== withoutNpc)
	}
	return npcs.map(encodeNpc).join("\n\n")
}

function encodeLocations(game: Game) {
	return game.locations.map(encodeLocation).join("\n\n")
}

function encodeEvents(game: Game) {
	return game.events.join("\n")
}

export function encodeChatStartSystemMessage(game: Game, npcName: string) {
	//prettier-ignore
	return fmt(`I want you to act as an NPC in a game.
World Description: ${game.worldDesc}
Other Characters:
	${encodeOtherNpcs(game, npcName).replace("\n", "\n\t")}
Locations:
	${encodeLocations(game).replace("\n", "\n\t")}
Events So Far:
	-${encodeEvents(game).replace("\n", "\n\t-")}

${npcName}:
${encodeNpc(game.getNpc(npcName))}

Conversation started with ${npcName}.

With a few sentences, start a conversation.

EXAMPLE START
${npcName}:
Hi, my name is ${npcName}.
EXAMPLE END


${npcName}:
`)
}

export function encodeChoices(locations: string[], currLocation: string) {
	console.log("locations: " + locations)
	let out: string[] = []
	NPC_CHOICES.forEach((choice) => {
		if (choice.endsWith("_")) {
			locations
				.filter((it) => it !== currLocation)
				.map((it) => changeCase.constantCase(it))
				.forEach((it) => out.push(choice + it))
		} else {
			out.push(choice)
		}
	})

	return out
}

export function encodeChatReplySystemMessage(game: Game, npcName: string, choices: string[]) {
	return fmt(
		`Based on the conversation so far, what action should ${npcName} take? [${choices.join(",")}]

The first line should be exactly one of the above choices.  Then, based on your choice, continue/end the conversation with a few sentences.

EXAMPLE_1_START
Bob:
${NPCChoice.CONTINUE_CHAT}
I'm doing great, thanks for asking!
EXAMPLE_1_END

EXAMPLE_2_START
Bob:
${NPCChoice.SAY_GOODBYE_AND_GO_TO_}PARK
Alice is at the park. I'll go there. See you later!
EXAMPLE_2_END

EXAMPLE_3_START
Bob:
${NPCChoice.SAY_GOODBYE}
See you later!
EXAMPLE_3_END

${npcName}:
`
	)
}

export function encodeChatMessageForChoice(game: Game, npcName: string, choice: string) {
	return fmt(``)
}

function fmt(s: string) {
	let out = s.replace("\n\t\n", "\n\n")
	if (out.includes("[object Object]")) {
		throw new Error("prompt contains [object Object] " + out)
	}

	console.log(out)
	return out
}

export function tokenCount(s: string) {
	return gpt3Encoder.encode(s).length
}
