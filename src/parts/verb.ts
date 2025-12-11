import { Verb } from "../types";
import { nextWord } from "../words";
import { isVerbTerminator, minimizeVerb } from "../utils";

/**
 * Gets the next verb in text.
 * @param text Text to get the verb from
 * @returns [verb, remaining text, is valid]
 */
export function nextVerb(text: string): [Verb, string, boolean] {
    const originalText = text;
    let ret: Verb = { verb: "" }, word: string, valid: boolean, newText: string;
    while(true) {
        [word, newText, valid] = nextWord(text);
        if(word === "") return [minimizeVerb(ret), text, true];
        if(!valid) return ["", originalText, false];

        if(isVerbTerminator(word)) return [minimizeVerb(ret), text, true];
        
        text = newText;

        if(ret.verb === "") {
            ret.verb = word;
            continue;
        }
        if(!ret.modifiers) ret.modifiers = [];
        ret.modifiers.push(word);
    }
}