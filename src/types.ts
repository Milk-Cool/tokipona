export type Time = { modifiers?: string[] };
export type Noun = string | { noun: string, modifiers?: string[], ala?: boolean, pi?: Noun, alax?: string[] };
export type Verb = string | { verb: string, modifiers?: string[], ala?: boolean, alax?: string[] };

export type Sentence = {
    object?: Noun,
    verb?: Verb,
    subject?: Noun,
    time?: Time,
    taso?: boolean,
    la?: Sentence,
};