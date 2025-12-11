import { expect, test } from "vitest";
import { isValidWord, nextWord } from "../src/words";

test("correctly identifies valid words", () => {
    // valid words
    expect(isValidWord("toki")).toBeTruthy();
    expect(isValidWord("pona")).toBeTruthy();
    expect(isValidWord("ni")).toBeTruthy();
    
    // invalid words consisting of valid syllables
    expect(isValidWord("alana")).toBeFalsy();
    expect(isValidWord("kumi")).toBeFalsy();
    
    // other invalid words
    expect(isValidWord("hagfdahksj")).toBeFalsy();
    expect(isValidWord("9")).toBeFalsy();
    expect(isValidWord("!!")).toBeFalsy();
});

test("correctly parses words from text", () => {
    let text = "mi toki e toki pona! sina toki ala e toki pona.", word = "", valid = true;

    const checkOne = (expected: string) => {
        [word, text, valid] = nextWord(text);
        expect(word).toBe(expected);
        expect(valid).toBeTruthy();
    }

    checkOne("mi");
    checkOne("toki");
    checkOne("e");
    checkOne("toki");
    checkOne("pona");

    checkOne("sina");
    checkOne("toki");
    checkOne("ala");
    checkOne("e");
    checkOne("toki");
    checkOne("pona");
    
    [word, text, valid] = nextWord(text);
    expect(word).toBe("");
    expect(valid).toBeFalsy();
});