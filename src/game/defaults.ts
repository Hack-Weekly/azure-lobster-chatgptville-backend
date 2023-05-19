import { Landmark, Npc, World } from "./game.js"

export const chatgptvilleWorld: World = {
    preamble: `Once upon a time there were six friends who went to live on a ranch in the countryside. They all worked together to get the day's work done.  This is the story of one day in Chatgptville.  `,
}

//💙
export const teamAzureLobster: Npc[] = [
    {
        name: "Rye",
        bio: `Background: My name is Rye and I am currently a QA Engineer. Freshly graduated from college last year, excited to get started on this!
Languages/Skills: Python, Vanilla Javascript, HTML/CSS
Frameworks: N/A
Desired Role: Backend engineer, could also serve as a project manager since I have background in Agile
Timezone: Eastern Standard Time (EST) 
`,
        landmark: "The House",
    },
    {
        name: "Soaps",
        bio: `Background: My name is Soaps and I am currently a student studying cs
Languages/Skills: Javascript, Python, C/C++, HTML/CSS
Frameworks: React, Vue
Desired Role: Front-End
Timezone: in Hong Kong rn but flying back to NA soon. sleep schedule is still in NA time LOL`,
        landmark: "The Bridge",
    },
    {
        name: "Kickball",
        bio: `Background: My name is Kickball and I’m an incoming freshman studying CS
Languages/Skills: JS/TS, Python
Frameworks: React, Next
Desired Role: Frontend
Timezone: CST`,
        landmark: "The Farm",
    },
    {
        name: "Dqw",
        bio: `Hey everyone!  Thanks for joining.  I'm Dqw.  I'm graduating in Dec.   I've mainly worked on reverse engineering games, but I'm looking to get better at web technologies.  Timezone:pst, but I'm jetlagged ATM`,
        landmark: "The Rock",
    },
    {
        name: "Residentwitch",
        bio: `Background: Hi! My name is Residentwitch. I am currently a CS sophomore.
Languages/Skills: C, Python, HTML/CSS, JS, Java, Dart (beginner), Figma (beginner)
Frameworks: React
Desired Role: Frontend, could also work on UI
Timezone: IST (Indian Standard Time)`,
        landmark: "The Big Farm",
    },
    {
        name: "Motaphe",
        bio: `Background: My name is Motaphe and I am a rising sophomore majoring in CS.
Languages/Skills: Python
Frameworks: React (beginner)
Desired Role: Backend, Prompt Engineer, Frontend(since I have started learning React)
Timezone: Eastern Standard Time (EST) `,
        landmark: "The Lanehouse",
    },
]

export const landmarks: Landmark[] = [
    {
        name: "The House",
        description: "A house",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        name: "The Bridge",
        description: "A bridge",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        name: "The Farm",
        description: "A farm",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        name: "The Big Farm",
        description: "A big farm",
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
        name: "The Lanehouse",
        description: "A lanehouse",
        position: {
            x: 0,
            y: 0,
        },
    },
]
