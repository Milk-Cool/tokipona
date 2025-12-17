import { Noun, Sentence, Verb } from "./types";
import { nextWord } from "./words";
import { isNounTerminator, isSimpleVerb, isVerbModifier, isVerbTerminator, MAX_ITER, TimeoutError } from "./utils";
import { nextNoun } from "./parts/noun";
import { nextVerb } from "./parts/verb";

type SentenceParseState = "subject" | "verb" | "object" | "done";

/**
 * Parses the next sentence into a Sentence object and the remaining text.
 * @param text Input text
 * @returns [sentence, remaining text, is valid]
 */
export function nextSentence(text: string): [Sentence, string, boolean] {
    const originalText = text, ret: Sentence = {}, err = new TimeoutError("Max iterations reached while parsing a sentence");
    let noun: Noun, verb: Verb, word: string, valid: boolean, state: SentenceParseState = "object", tmpText: string, iter = 0, isLast: boolean = false;

    [word, tmpText, valid] = nextWord(text);
    if(word === "a" || word === "mu") {
        ret.interjection = word === "a"
            ? "a a a"
            : word === "mu"
            ? "mu"
            : "mu"; // fallback, never used
        text = tmpText;
        return [ret, text, true];
    }
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
            if(++iter > MAX_ITER) throw err;
            [word, text, valid] = nextWord(text);
            if(word === "la") break;
            ret.time.modifiers.push(word);
        }
    }

    const checkTan = () => {
        [word, tmpText, valid] = nextWord(text);
        if(!valid) return [{}, originalText, false];
        if(word === "tan") {
            text = tmpText;
            [ret.tan, text, valid] = nextSentence(text);
            if(!valid) return [{}, originalText, false];
            return [ret, text, true];
        }
    }

    while(true) {
        if(isLast) return [ret, text, true];
        if(++iter > MAX_ITER) throw err;

        [word, tmpText, valid, isLast] = nextWord(text);
        if(word === "") return [ret, text, true];
        if(!valid) return [{}, originalText, false];
        if(word === "la") {
            text = tmpText;
            [ret.la, text, valid] = nextSentence(text);
            if(!valid) return [{}, originalText, false];
            return [ret, text, true];
        }

        if(state !== "object" && word === "li") {
            text = tmpText;
            ret.actions.push({});
            state = "verb";
        }

        if(state === "object") {
            [noun, text, valid, isLast] = nextNoun(text);
            if(noun === "") return [ret, text, true];
            if(!valid) return [{}, originalText, false];
            ret.object = noun;
            state = "verb";

            while(true) {
                if(++iter > MAX_ITER) throw err;
                [word, tmpText, valid] = nextWord(text);
                if(word === "") return [ret, text, true];
                if(!valid) return [{}, originalText, false];
                if(!isNounTerminator(word)) break;
                text = tmpText;
            }
            
            checkTan();
        } else if(state === "verb") {
            if(!ret.actions)
                ret.actions = [{}];
            // checking for simple verbs
            if(isSimpleVerb(word)) {
                text = tmpText;
                ret.actions.at(-1).verb = { verb: word };
                while(true) {
                    if(++iter > MAX_ITER) throw err;
                    [word, tmpText, valid] = nextWord(text);
                    if(word === "") return [ret, text, true];
                    if(!valid) return [{}, originalText, false];
                    if(!isVerbModifier(word)) break;
                    if(!(ret.actions.at(-1).verb as Verb & object).modifiers)
                        (ret.actions.at(-1).verb as Verb & object).modifiers = [];
                    (ret.actions.at(-1).verb as Verb & object).modifiers.push(word);
                    text = tmpText;
                }
            } else {
                [verb, text, valid] = nextVerb(text);
                if(verb === "") return [ret, text, true];
                if(!valid) return [{}, originalText, false];
                ret.actions.at(-1).verb = verb;
            }

            while(true) {
                if(++iter > MAX_ITER) throw err;
                [word, tmpText, valid] = nextWord(text);
                if(word === "") return [ret, text, true];
                if(!valid) return [{}, originalText, false];
                if(!isVerbTerminator(word)) break;
                text = tmpText;
            }

            checkTan();
            state = "subject";
        } else if(state === "subject") {
            [noun, text, valid, isLast] = nextNoun(text, true);
            if(noun === "") return [ret, text, true];
            if(!valid) return [{}, originalText, false];
            ret.actions.at(-1).subject = noun;
            state = "done";

            while(true) {
                if(++iter > MAX_ITER) throw err;
                [word, tmpText, valid] = nextWord(text);
                if(word === "") return [ret, text, true];
                if(!valid) return [{}, originalText, false];
                if(!isNounTerminator(word) || word === "li") break; // we CAN use li after the subject, that means multiple actions
                text = tmpText;
            }

            checkTan();
        } else if(state === "done") {
            return [ret, text, true];
        }
    }
}