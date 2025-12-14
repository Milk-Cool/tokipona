export type Time = { modifiers?: string[] };
export type Noun = string | { noun: string, modifiers?: string[], ala?: boolean, pi?: Noun, alax?: string[], o?: boolean, anu?: Noun, en?: Noun };
export type Verb = string | { verb: string, modifiers?: string[], ala?: boolean, alax?: string[], o?: boolean };

export type Action = {
    verb?: Verb,
    subject?: Noun
};
export type Sentence = {
    object?: Noun,
    actions?: Action[],
    time?: Time,
    taso?: boolean,
    la?: Sentence,
};

export type WritingSystemType = "latin" | "sitelen-pona/ucsur" | "sitelen-pona/emoji";