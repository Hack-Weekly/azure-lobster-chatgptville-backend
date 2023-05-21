import { GameLocation, Npc, World } from "./domain.js"

export const azureLobsterWorld: World = {
    preamble:
        "Once upon a time there were six friends who went to live in the countryside. This is the story of one day in HarvestVille...",
    objective: "the friends should work together to throw a party at the lakehouse later that night",
}

//💙
export const azureLobsterNpcs: Npc[] = [
    {
        name: "Rye",
        bio: ``,
        location: "The House",
    },
    {
        name: "Soaps",
        bio: ``,
        location: "The Fishing Bridge",
    },
    {
        name: "Kickball",
        bio: ``,
        location: "The Farm",
    },
    {
        name: "Dqw",
        bio: ``,
        location: "The Rock",
    },
    {
        name: "Residentwitch",
        bio: ``,
        location: "The Big Farm",
    },
    {
        name: "Motaphe",
        bio: ``,
        location: "The Lakehouse",
    },
]

export const azureLobsterLocations: GameLocation[] = [
    {
        name: "The House",
        description: "A house where the friends live and cook food.",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        name: "The Fishing Bridge",
        description: "A bridge for fishing.",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        name: "The Small Farm",
        description: "A farm with a variety of different special ingredients such as herbs, tomatoes, and berries.",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        name: "The Big Farm",
        description: "A big farm for growing staple foods like grain, rice, and wheat.",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        name: "The Rock",
        description: "A rock",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        name: "The Lakehouse",
        description:
            "A lakehouse where the friends plan on throwing a party later that night.  Needs to be cleaned up and decorated.",
        position: {
            x: 0,
            y: 0,
        },
    },
]
