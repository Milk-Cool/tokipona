import { expect, test } from "vitest";
import { isValidSyllable, nextSyllable } from "../src/syllables";

test("correctly identifies valid syllables", () => {
    // valid syllables
    expect(isValidSyllable("to")).toBeTruthy();
    expect(isValidSyllable("ki")).toBeTruthy();
    expect(isValidSyllable("po")).toBeTruthy();
    expect(isValidSyllable("na")).toBeTruthy();
    expect(isValidSyllable("jan")).toBeTruthy();
    
    // invalid syllables consisting of [opt consonant][vowel][opt n]
    expect(isValidSyllable("tin")).toBeFalsy();
    expect(isValidSyllable("wu")).toBeFalsy();
    
    // other invalid syllables
    expect(isValidSyllable("yi")).toBeFalsy();
    expect(isValidSyllable("xi")).toBeFalsy();
    expect(isValidSyllable("!!")).toBeFalsy();
});

test("correctly parses syllables from text", () => {
    let text = "mi toki e toki pona!", syl = "", valid = true, sep = false;
    
    const checkOne = (expected: string, expectSeparator: boolean) => {
        [syl, text, valid, sep] = nextSyllable(text);
        expect(syl).toBe(expected);
        expect(valid).toBeTruthy();
        expect(sep).toBe(expectSeparator);
    }

    checkOne("mi", false);
    checkOne("to", true);
    checkOne("ki", false);
    checkOne("e", true);
    checkOne("to", true);
    checkOne("ki", false);
    checkOne("po", true);
    checkOne("na", false);

    [syl, text, valid, sep] = nextSyllable(text);
    expect(syl).toBe("");
    expect(valid).toBeFalsy();
    expect(sep).toBeFalsy();
});