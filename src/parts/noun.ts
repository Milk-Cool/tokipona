import { Noun } from "../types";
import { nextWord } from "../words";
import { isNounTerminator, isSpecialPronoun, isVerbTerminator, finalizeNoun, isVerbModifier, isPreverb, MAX_ITER, TimeoutError } from "../utils";

/**
 * Gets the next noun in text. May also be used to get the next pronoun.
 * @param text Text to get the noun/pronoun from
 * @returns [noun/pronoun, remaining text, is valid, is last in sentence]
 */
export function nextNoun(text: string): [Noun, string, boolean, boolean] {
    const originalText = text;
    let ret: Noun = { noun: "" }, word: string, valid: boolean, tmpText: string, isAlax: boolean = false, iter = 0, isLast: boolean = false;
    while(true) {
        if(isLast) return [finalizeNoun(ret), text, true, true];
        if(++iter > MAX_ITER) throw new TimeoutError("Max iterations reached while parsing a noun");
        [word, tmpText, valid, isLast] = nextWord(text);
        if(word === "" || word === "la") return [finalizeNoun(ret), text, true, word === ""];
        if(!valid) return ["", originalText, false, false];

        if(word === "o") {
            ret.o = true;
            text = tmpText;
            return [finalizeNoun(ret), text, true, isLast];
        }

        if(word === "pi") {
            if(ret.noun === "") return ["", originalText, false, false];
            text = tmpText;
            const [pi, piRem, piValid, isLastLocal] = nextNoun(text);
            if(!piValid) return ["", originalText, false, false];
            ret.pi = pi;
            return [finalizeNoun(ret), piRem, true, isLastLocal];
        }

        if(isSpecialPronoun(ret.noun) && isVerbTerminator(word)) {
            const oidx = ret.modifiers ? ret.modifiers.findIndex(x => isPreverb(x)) : -1;
            const idx = ret.modifiers && oidx !== -1 ? oidx : 0;
            if(ret.alax) { text = "ala " + ret.alax.join(" ") + " " + text; delete ret.alax; }
            if(ret.ala) { text = "ala " + text; delete ret.ala; }
            while(ret.modifiers && ret.modifiers.length > idx && (isVerbModifier(ret.modifiers.at(-1)) || oidx !== -1))
                text = ret.modifiers.splice(-1, 1)[0] + " " + text;
            if(ret.modifiers && ret.modifiers.length > idx) text = ret.modifiers.splice(-1, 1)[0] + " " + text; // do not touch the noun itself as there would be no noun
            return [finalizeNoun(ret), text, true, false];
        }
        if(isNounTerminator(word)) return [finalizeNoun(ret), text, true, false];
        
        text = tmpText;

        if(!isAlax && ret.noun === "") {
            ret.noun = word;
            continue;
        }
        if(word === "ala") {
            [word, tmpText, valid] = nextWord(text);
            if(word === "" || isNounTerminator(word) || word === "ala")
                ret.ala = !ret.ala;
            else {
                // x ala x
                ret.alax = [];
                isAlax = true;
            }
        } else {
            if(isAlax && Array.isArray(ret.alax)) {
                ret.alax.push(word);
            } else {
                if(!ret.modifiers) ret.modifiers = [];
                ret.modifiers.push(word);
            }
        }
    }
}