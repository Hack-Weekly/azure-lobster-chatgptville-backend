import { GameLocation, NPCDescription as NPCProfile } from "./domain.js"

export const defaultWorldDesc = `
`

export const defaultNpcProfiles: NPCProfile[] = [
	{
		name: "Rye",
		bio: ``,
	},
	{
		name: "Soaps",
		bio: ``,
	},
	{
		name: "Kickball",
		bio: ``,
	},
	{
		name: "Dqw",
		bio: ``,
	},
	{
		name: "Residentwitch",
		bio: ``,
	},
	{
		name: "Motaphe",
		bio: ``,
	},
]

export const defaultLocations: GameLocation[] = [
	{
		name: "The House",
		desc: "A house with a kitchen and beds.",
	},
	{
		name: "The Fishing Bridge",
		desc: "A bridge for fishing.",
	},
	{
		name: "The Small Farm",
		desc: "A farm with for growing specialty ingredients such as herbs, tomatoes, and berries.",
	},
	{
		name: "The Big Farm",
		desc: "A big farm for growing staple foods like grain, rice, and wheat.",
	},
	{
		name: "The Rock",
		desc: "A big rock.",
	},
	{
		name: "The Lakehouse",
		desc: "A lakehouse for recreational activities.",
	},
]
