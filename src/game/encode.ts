import { openai } from "./game.js"
import { chatgptvilleWorld } from "./defaults.js"

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

enum AppendLength {
    A_SENTENCE = "a sentence",
    A_FEW_SENTENCES = "a few sentences",
    A_PARAGRAPH = "a paragraph",
}

//delete later
let prompt = encodeStory(6, chatgptvilleWorld.preamble, AppendLength.A_PARAGRAPH)
prompt += `
The player had a conversation as follows:

CONVERSATION_START
    Player: hi how r u?
    Sophie: I am doing well.  How are you?
    Player: can you go pick some herbs for ryan's fish?
    Sophie: Sure.  I'll see you at the party.
    CONVERSATION_END
    
    Please append ${AppendLength.A_PARAGRAPH} to the story so far.  Don't finish the story.  Just add a paragraph about what happened in the conversation above.  
    
    STORY_SO_FAR_START
    ${chatgptvilleWorld.preamble}\n\n
    Aaron was busy tending to his potato fields when he received a message from his friend, the player. The player had asked him to farm some potatoes for their party that night. Aaron was happy to oblige as he had been growing potatoes for over a decade and was quite good at it. He quickly responded to the player's request and promised to meet them at the party later that evening. As he continued to work in the fields, he couldn't help but feel excited about the upcoming party.
\n
Meanwhile, Ryan was out by the river when he received a message from the player. The player had asked him to catch a fish for the party that night. Ryan was happy to help out and quickly agreed to the task. He had always been a skilled fisherman and knew just where to go to catch the best fish. As he made his way back to town, he couldn't help but feel a sense of satisfaction knowing that he was contributing to the success of the party.
\n
`
console.log("==============PROMPT===================\n" + prompt)

let r = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.3,
})

console.log("\n=================RESPONSE=================\n" + r.data.choices[0].message.content)
