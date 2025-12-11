export type Noun = string | { noun: string, modifiers?: string[], ala?: boolean, pi?: Noun };
export type Verb = string | { verb: string, modifiers?: string[] };

export type Sentence = {
    object?: Noun,
    verb?: Verb,
    subject?: Noun
};