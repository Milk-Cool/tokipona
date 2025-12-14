import { Noun, Sentence, Time, Verb } from "./types";

/**
 * Returns true when the pronoun does not need a "li" after it in sentences, false otherwise.
 */
export function isSpecialPronoun(word: string) {
    return word === "mi" || word === "sina";
}

export function isNounConnector(word: string) {
    return word === "en" || word === "anu";
}
export function isVerbConnector(word: string) {
    return word === "li";
}
export function isNounTerminator(word: string) {
    return word === "li" || word === "e";
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
        "ante", "lili", "meso", "open", "sama",
        "suli", "taso", "tawa"
    ].includes(word);
}
export function isPreverb(word: string) {
    return [
        "alasa", "awen", "kama", "ken", "lukin",
        "open", "pini", "sona", "wile"
    ].includes(word);
}

export function finalizeNoun(noun: Noun) {
    if(typeof noun === "object" && noun.alax) {
        let idx = [noun.noun].concat(noun.modifiers ?? []).indexOf(noun.alax[0]);
        while(idx < Math.min(noun.alax.length, (noun.modifiers ?? []).length + 1) && [noun.noun].concat(noun.modifiers ?? [])[idx] === noun.alax[idx])
            idx++;
        for(let i = idx; i < noun.alax.length; i++) {
            if(!noun.modifiers) noun.modifiers = [];
            noun.modifiers.push(noun.alax[i]);
        }
        noun.alax = noun.alax.slice(0, idx);
    }
    if(typeof noun === "object"
        && (!noun.modifiers || noun.modifiers.length === 0)
        && !noun.ala && (!noun.alax || noun.alax.length === 0)
        && !noun.pi
        && !noun.o && !noun.a
        && !noun.en && !noun.anu) return noun.noun;
    return noun;
}
export function finalizeVerb(verb: Verb) {
    if(typeof verb === "object" && verb.alax) {
        let idx = [verb.verb].concat(verb.modifiers ?? []).indexOf(verb.alax[0]);
        while(idx < Math.min(verb.alax.length, (verb.modifiers ?? []).length + 1) && [verb.verb].concat(verb.modifiers ?? [])[idx] === verb.alax[idx])
            idx++;
        for(let i = idx; i < verb.alax.length; i++) {
            if(!verb.modifiers) verb.modifiers = [];
            verb.modifiers.push(verb.alax[i]);
        }
        verb.alax = verb.alax.slice(0, idx);
    }
    if(typeof verb === "object"
        && (!verb.modifiers || verb.modifiers.length === 0)
        && !verb.ala
        && (!verb.alax || verb.alax.length === 0)
        && !verb.o && !verb.a) return verb.verb;
    return verb;
}

export function joinNoun(noun: Noun) {
    return typeof noun === "string"
    ? noun
    : [noun.noun].concat(noun.modifiers ?? []).join(" ") + (noun.ala ? " ala" : "")
    + (noun.alax ? " ala " + noun.alax.join(" ") : "") + (noun.pi ? " pi " + joinNoun(noun.pi) : "")
    + (noun.anu ? " anu " + joinNoun(noun.anu) : "") + (noun.en ? " en " + joinNoun(noun.en) : "") + (noun.a ? " a" : "") + (noun.o ? " o" : "");
}
export function joinVerb(verb: Verb) {
    return typeof verb === "string"
    ? verb
    : (verb.o ? "o " : "") + [verb.verb].concat(verb.modifiers ?? []).join(" ") + (verb.ala ? " ala" : "")
    + (verb.alax ? " ala " + verb.alax.join(" ") : "") + (verb.a ? " a" : "");
}
export function joinTime(time: Time) {
    return time.modifiers ? time.modifiers.join(" ") : "";
}

export function joinSentences(...sentences: Sentence[]) {
    return sentences.map(sentence => {
        if(sentence.interjection) return sentence.interjection + ".";
        let out = "";
        if(sentence.taso) out += "taso ";
        if(sentence.time) out += `tenpo${sentence.time.modifiers ? " " + sentence.time.modifiers.join(" ") : ""} la, `;
        if(sentence.object) out += joinNoun(sentence.object);
        if(sentence.actions) sentence.actions.forEach(action => {
            if(action.verb) out += " " + (
                (typeof sentence.object === "string" && isSpecialPronoun(sentence.object))
                || (typeof sentence.object === "object" && isSpecialPronoun(sentence.object.noun))
                ? ""
                : "li "
            ) + joinVerb(action.verb);
            if(action.subject) out += " e " + joinNoun(action.subject);
        });
        if(sentence.tan) out += " tan " + joinSentences(sentence.tan).replace(/(\.|:)$/, "");
        if(sentence.la) out += " la, " + joinSentences(sentence.la).replace(/(\.|:)$/, "");
        out += sentence.hasColon ? ":" : ".";
        return out;
    }).join(" ");
}

export const MAX_ITER = 10000;
export class TimeoutError extends Error {};