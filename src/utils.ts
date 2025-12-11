import { Noun, Verb } from "./types";

/**
 * Returns true when the pronoun does not need a "li" after it in sentences, false otherwise.
 */
export function isSpecialPronoun(word: string) {
    return word === "mi" || word === "sina";
}

export function isNounTerminator(word: string) {
    return word === "li";
}
export function isVerbTerminator(word: string) {
    return word === "e";
}

// TODO: consult the wiser people and check if this is correct
export function isSimpleVerb(word: string) {
    return [
        "anpa", "lon", "ante", "jo", "pilin", "kepeken"
    ].includes(word);
}
// same here
export function isVerbModifier(word: string) {
    return [
        "ala", "ante", "lili", "meso", "open", "sama",
        "suli", "taso", "tawa"
    ].includes(word);
}

export function minimizeNoun(noun: Noun) {
    if(typeof noun === "object" && noun.modifiers?.length === 0) return noun.noun;
    return noun;
}
export function minimizeVerb(verb: Verb) {
    if(typeof verb === "object" && verb.modifiers?.length === 0) return verb.verb;
    return verb;
}

export function joinNoun(noun: Noun) {
    return typeof noun === "string"
    ? noun
    : [noun.noun].concat(noun.modifiers ?? []).join(" ") + (noun.ala ? " ala" : "") + (noun.pi ? " pi " + joinNoun(noun.pi) : "");
}
export function joinVerb(verb: Verb) {
    return typeof verb === "string"
    ? verb
    : [verb.verb].concat(verb.modifiers ?? []).join(" ") + (verb.ala ? " ala" : "");
}