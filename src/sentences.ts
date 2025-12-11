import { Noun, Sentence, Verb } from "./types";
import { nextWord } from "./words";
import { isNounTerminator, isSpecialPronoun, isVerbTerminator } from "./utils";
import { nextNoun } from "./parts/noun";
import { nextVerb } from "./parts/verb";

type SentenceParseState = "subject" | "verb" | "object";

/**
 * Parses the next sentence into a Sentence object and the remaining text.
 * @param text Input text
 * @returns [sentence, remaining text, is valid]
 */
export function nextSentence(text: string): [Sentence, string, boolean] {
    const originalText = text, ret: Sentence = {};
    let noun: Noun, verb: Verb, word: string, valid: boolean, state: SentenceParseState = "object", tmpText: string;
    while(true) {
        if(state === "object") {
            [noun, text, valid] = nextNoun(text);
            if(noun === "") return [ret, text, true];
            if(!valid) return [{}, originalText, false];
            ret.object = noun;
            state = "verb";

            while(true) {
                [word, tmpText, valid] = nextWord(text);
                if(word === "") return [ret, text, true];
                if(!valid) return [{}, originalText, false];
                if(!isNounTerminator(word)) break;
                text = tmpText;
            }
        } else if(state === "verb") {
            [verb, text, valid] = nextVerb(text);
            if(verb === "") return [ret, text, true];
            if(!valid) return [{}, originalText, false];
            ret.verb = verb;
            state = "subject";

            while(true) {
                [word, tmpText, valid] = nextWord(text);
                if(word === "") return [ret, text, true];
                if(!valid) return [{}, originalText, false];
                if(!isVerbTerminator(word)) break;
                text = tmpText;
            }
        } else if(state === "subject") {
            [noun, text, valid] = nextNoun(text);
            if(noun === "") return [ret, text, true];
            if(!valid) return [{}, originalText, false];
            ret.subject = noun;
            return [ret, text, true];
        }
    }
}