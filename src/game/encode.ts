import { openai } from "./game.js"
import { azureLobsterWorld } from "./defaults.js"

enum AppendLength {
    A_SENTENCE = "a sentence",
    A_FEW_SENTENCES = "a few sentences",
    A_PARAGRAPH = "a paragraph",
}

// function encodeLandmark(location: GameLocation) {
//     return `The ${location.name} is ${location.description}`
// }
//
// function encodeNpcState(npc: Npc) {
//     return `NPC: ${npc.name} is `
// }

//need to add the npc/location bio/descriptions
function encodeStory(npcCount: number, storySoFar: string, appendLength: AppendLength) {
    return `You are being used in a video game to simulate the behavior of ${npcCount} NPCs.  There is one player that will interact with NPCs controlled by you through text based chat.
    After each interaction, you will be asked to append to a short story that will describe the events of the game so far.  When the game is over, the short story sent to the reader.  
    The short story should be written as a normal short story.  
    
    `
}

//=========TEMP STUFF BELOW=========
let prompt = encodeStory(6, azureLobsterWorld.preamble, AppendLength.A_PARAGRAPH)
prompt += `
The player had a conversation as follows:

CONVERSATION_START
    Player: hi how r u?
    Wyatt: I am doing well.  How are you?
    Player: can you go to the house and cook Ryan's fish with Sophie's herbs?
    Wyatt: Sure.  I'll see you at the party.
CONVERSATION_END
    
    Please append ${AppendLength.A_PARAGRAPH} to the story so far.  Don't finish the story.  Just add a paragraph about what happened in the conversation above.  
    
STORY_SO_FAR_START
    ${azureLobsterWorld.preamble}\n\n
    Aaron was busy tending to his potato fields when he received a message from his friend, the player. The player had asked him to farm some potatoes for their party that night. Aaron was happy to oblige as he had been growing potatoes for over a decade and was quite good at it. He quickly responded to the player's request and promised to meet them at the party later that evening. As he continued to work in the fields, he couldn't help but feel excited about the upcoming party.
\n
Meanwhile, Ryan was out by the river when he received a message from the player. The player had asked him to catch a fish for the party that night. Ryan was happy to help out and quickly agreed to the task. He had always been a skilled fisherman and knew just where to go to catch the best fish. As he made his way back to town, he couldn't help but feel a sense of satisfaction knowing that he was contributing to the success of the party.
\n
Sophie was taking a break from her job at the village market when she received a message from the player. They asked if she could pick some herbs for the fish that Ryan was going to catch. Sophie was always happy to help out her friends and decided to take a detour on her way to the party to gather the necessary herbs. As she walked through the fields, she enjoyed the fresh air and the warmth of the sun on her skin. She couldn't wait to get to the party and catch up with everyone.
\n
`
console.log("==============PROMPT===================\n" + prompt)

// let res = await openai.createChatCompletion(
//     {
//         model: "gpt-3.5-turbo",
//         messages: [
//             {
//                 role: "user",
//                 content: prompt,
//             },
//         ],
//         temperature: 0.3,
//         stream: true,
//     },
//     { responseType: "stream" }
// )
//
// console.log("\n=================RESPONSE=================\n")
// res.data.on("data", (data) => {
//     const lines = data
//         .toString()
//         .split("\n")
//         .filter((line) => line.trim() !== "")
//     for (const line of lines) {
//         const message = line.replace(/^data: /, "")
//         if (message === "[DONE]") {
//             return // Stream finished
//         }
//         try {
//             const parsed = JSON.parse(message)
//             console.log(parsed.choices[0].text)
//         } catch (error) {
//             console.error("Could not JSON parse stream message", message, error)
//         }
//     }
// })

const res = await openai.createChatCompletion(
    {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        stream: true,
    },
    { responseType: "stream" }
)

// @ts-ignore
res.data.on("data", (data) => {
    const dataString = data
        .toString()
        .split("\n")
        .filter((line) => line.trim() !== "")
    for (const line of dataString) {
        const message = line.replace(/^data: /, "")
        // console.log(message)
        if (message === "[DONE]") {
            return // Stream finished
        }
        const choices = JSON.parse(message).choices
        // console.log(choices)
        const delta = choices[0].delta
        // console.log(delta)
        const content = delta.content
        // console.log(content)
        if (!content) {
            // console.log("no content")
            const role = delta.role
            if (!role) {
                // console.log("no role")
                const finish_reason = choices[0].finish_reason
                if (!finish_reason) {
                    throw new Error("no content, role, or finish_reason for line: " + line)
                }
            }

            continue
        }

        process.stdout.write(content.toString())
    }
})
