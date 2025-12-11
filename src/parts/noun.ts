import { Noun } from "../types";
import { nextWord } from "../words";
import { isNounTerminator, isSpecialPronoun, isVerbTerminator, minimizeNoun, isVerbModifier } from "../utils";

/**
 * Gets the next noun in text. May also be used to get the next pronoun.
 * @param text Text to get the noun/pronoun from
 * @returns [noun/pronoun, remaining text, is valid]
 */
export function nextNoun(text: string): [Noun, string, boolean] {
    const originalText = text;
    let ret: Noun = { noun: "" }, word: string, valid: boolean, newText: string;
    while(true) {
        [word, newText, valid] = nextWord(text);
        if(word === "") return [minimizeNoun(ret), text, true];
        if(!valid) return ["", originalText, false];

        if(word === "pi") {
            if(ret.noun === "") return ["", originalText, false];
            text = newText;
            const [pi, piRem, piValid] = nextNoun(text);
            if(!piValid) return ["", originalText, false];
            ret.pi = pi;
            return [minimizeNoun(ret), piRem, true];
        }

        if(isNounTerminator(word)) return [minimizeNoun(ret), text, true];
        if(isSpecialPronoun(ret.noun) && isVerbTerminator(word)) {
            while(ret.modifiers && ret.modifiers.length > 0 && isVerbModifier(ret.modifiers.at(-1)))
                ret.modifiers.splice(-1, 1);
            if(ret.modifiers && ret.modifiers.length > 0) ret.modifiers.splice(-1, 1); // do not touch the noun itself as there would be no noun
            return [minimizeNoun(ret), text, true];
        }
        
        text = newText;

        if(ret.noun === "") {
            ret.noun = word;
            continue;
        }
        if(!ret.modifiers) ret.modifiers = [];
        ret.modifiers.push(word);
    }
}