import { Verb } from "../types";
import { nextWord } from "../words";
import { isVerbTerminator, finalizeVerb, MAX_ITER, TimeoutError } from "../utils";

/**
 * Gets the next verb in text.
 * @param text Text to get the verb from
 * @returns [verb, remaining text, is valid]
 */
export function nextVerb(text: string): [Verb, string, boolean] {
    const originalText = text;
    let ret: Verb = { verb: "" }, word: string, valid: boolean, tmpText: string, isAlax: boolean = false, iter = 0;
    while(true) {
        if(++iter > MAX_ITER) throw new TimeoutError("Max iterations reached while parsing a verb");
        [word, tmpText, valid] = nextWord(text);
        if(word === "") return [finalizeVerb(ret), text, true];
        if(!valid) return ["", originalText, false];

        if(isVerbTerminator(word)) return [finalizeVerb(ret), text, true];
        
        text = tmpText;

        if(!isAlax && ret.verb === "") {
            ret.verb = word;
            continue;
        }
        if(word === "ala") {
            [word, tmpText, valid] = nextWord(text);
            if(word === "" || isVerbTerminator(word) || word === "ala")
                ret.ala = !ret.ala;
            else {
                // x ala x
                ret.alax = [];
                isAlax = true;
            }
        }
        else {
            if(isAlax && Array.isArray(ret.alax)) {
                ret.alax.push(word);
            } else {
                if(!ret.modifiers) ret.modifiers = [];
                ret.modifiers.push(word);
            }
        }
    }
}