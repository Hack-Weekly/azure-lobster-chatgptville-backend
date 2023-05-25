import { GameLocation, NPCDescription } from "./domain.js"

export const defaultWorldDesc = ``

export const defaultNpcDescs: NPCDescription[] = [
	{
		name: "Rye",
		bio: `A friendly cook.`,
	},
	{
		name: "Soaps",
		bio: `A magic cat`,
	},
	{
		name: "Kickball",
		bio: `A funny turtle with the nickname "Kickball"`,
	},
	{
		name: "Residentwitch",
		bio: `Not much is known about her.  VERY MYSTERIOUS`,
	},
	{
		name: "Motaphe",
		bio: `Tall and likes orange juice.`,
	},
]

export const defaultLocations: GameLocation[] = [
	{
		name: "house",
		desc: "A house with a kitchen and beds.",
	},
	{
		name: "fishing bridge",
		desc: "A bridge for fishing.",
	},
	{
		name: "small farm",
		desc: "A farm with for growing specialty ingredients such as herbs, tomatoes, and berries.",
	},
	{
		name: "big farm",
		desc: "A big farm for growing staple foods like grain, rice, and wheat.",
	},
	{
		name: "lakehouse",
		desc: "A lakehouse for recreational activities.",
	},
]
