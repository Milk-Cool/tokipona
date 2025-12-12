import { Noun, Sentence, Verb } from "./types";
import { nextWord } from "./words";
import { isNounTerminator, isSimpleVerb, isVerbModifier, isVerbTerminator, MAX_ITER, TimeoutError } from "./utils";
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
    let noun: Noun, verb: Verb, word: string, valid: boolean, state: SentenceParseState = "object", tmpText: string, iter = 0;

    [word, tmpText, valid] = nextWord(text);
    if(word === "taso") {
        // but
        text = tmpText;
        ret.taso = true;
    }

    [word, tmpText, valid] = nextWord(text);
    if(word === "tenpo") {
        // times
        text = tmpText;
        ret.time = { modifiers: [] };
        while(true) {
            if(++iter > MAX_ITER) throw new TimeoutError("Max iterations reached while parsing a sentence");
            [word, text, valid] = nextWord(text);
            if(word === "la") break;
            ret.time.modifiers.push(word);
        }
    }

    while(true) {
        if(++iter > MAX_ITER) throw new TimeoutError("Max iterations reached while parsing a sentence");
        if(state === "object") {
            [noun, text, valid] = nextNoun(text);
            if(noun === "") return [ret, text, true];
            if(!valid) return [{}, originalText, false];
            ret.object = noun;
            state = "verb";

            while(true) {
                if(++iter > MAX_ITER) throw new TimeoutError("Max iterations reached while parsing a sentence");
                [word, tmpText, valid] = nextWord(text);
                if(word === "") return [ret, text, true];
                if(!valid) return [{}, originalText, false];
                if(!isNounTerminator(word)) break;
                text = tmpText;
            }
        } else if(state === "verb") {
            // checking for simple nouns
            [word, tmpText, valid] = nextWord(text);
            if(word === "") return [ret, text, true];
            if(!valid) return [{}, originalText, false];
            if(isSimpleVerb(word)) {
                text = tmpText;
                ret.verb = { verb: word };
                while(true) {
                    if(++iter > MAX_ITER) throw new TimeoutError("Max iterations reached while parsing a sentence");
                    [word, tmpText, valid] = nextWord(text);
                    if(word === "") return [ret, text, true];
                    if(!valid) return [{}, originalText, false];
                    if(!isVerbModifier(word)) break;
                    if(!ret.verb.modifiers) ret.verb.modifiers = [];
                    ret.verb.modifiers.push(word);
                    text = tmpText;
                }
            } else {
                [verb, text, valid] = nextVerb(text);
                if(verb === "") return [ret, text, true];
                if(!valid) return [{}, originalText, false];
                ret.verb = verb;

                while(true) {
                    if(++iter > MAX_ITER) throw new TimeoutError("Max iterations reached while parsing a sentence");
                    [word, tmpText, valid] = nextWord(text);
                    if(word === "") return [ret, text, true];
                    if(!valid) return [{}, originalText, false];
                    if(!isVerbTerminator(word)) break;
                    text = tmpText;
                }
            }
            state = "subject";
        } else if(state === "subject") {
            [noun, text, valid] = nextNoun(text);
            if(noun === "") return [ret, text, true];
            if(!valid) return [{}, originalText, false];
            ret.subject = noun;
            return [ret, text, true];
        }
    }
}