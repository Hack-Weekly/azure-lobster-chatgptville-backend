//commons
export type WorldPosition = {
    x: number
    y: number
}

export type WorldArea = {
    x1: number
    y1: number
    x2: number
    y2: number
}

//world
export type World = {
    //player submitted text that is used at the beginning of our short story
    preamble: string
    //player submitted text that is used to instruct chatgpt on how to guide the story, but not used in the short story text
    objective: string
}
export type Npc = {
    name: string
    bio: string
    location: string
}
export type GameLocation = {
    name: string
    description: string
    position: WorldPosition
}

//updates
export type GameUpdate = {
    worldUpdate: WorldUpdate
    npcUpdates: NpcUpdate[]
}
export type WorldUpdate = {}
export type NpcUpdate = {
    npcName: string
}

export type GameUpdateResult = {
    worldUpdateResult?: WorldUpdateResult
    npcUpdateResults?: NpcUpdateResult[]
    storyTokenCount: number
    storySoFar: string
}
export type NpcUpdateResult = {
    npcName: string
}
export type WorldUpdateResult = {}

//chat
export type Chat = {
    npcName: string
    messageHistory: ChatMessage[]
}
export type ChatMessage = {
    name: string
    message: string
}

export enum ChatResultType {
    CONTINUE = "CONTINUE",
    FOLLOW_AND_CONTINUE = "FOLLOW_AND_CONTINUE", //walk to a differnt landmark and take the player and then continue chatting
    WALK = "WALK", //end chat and walk to a different location
    DO_NOTHING = "DO_NOTHING", //end chat and do nothing
}

export type ContinueChatResult = {
    type: ChatResultType.CONTINUE
}
export type FollowAndContinueChatResult = {
    type: ChatResultType.FOLLOW_AND_CONTINUE
    landmark: string
}
export type WalkChatResult = {
    type: ChatResultType.WALK
    landmark: string
}
export type DoNothingChatResult = {
    type: ChatResultType.DO_NOTHING
}
export type ChatAction = ContinueChatResult | FollowAndContinueChatResult | DoNothingChatResult

//end
export type EndedGame = {
    endedAt: Date
    shortStory: string
}
