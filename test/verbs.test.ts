import { expect, test } from "vitest";
import { nextVerb, Verb } from "../src/index";
import { joinVerb } from "../src/utils";

test("correctly parses verbs from text", () => {
    const tests: Record<string, string> = {
        "toki e toki pona": "toki",
        "nasa": "nasa",
        "nasa ala": "nasa ala",
        "pana e telo": "pana",
        "pana mute e olin": "pana mute"
    }
    for(const k in tests) {
        const v = tests[k];
        const [verb, _rest, valid] = nextVerb(k);
        expect(valid).toBeTruthy();
        expect(joinVerb(verb)).toBe(v);
    }
});

test("correctly parses question verbs (x ala x)", () => {
    const tests: Record<string, string> = {
        "toki ala toki e toki pona": "toki ala toki",
        "nasa ala nasa": "nasa ala nasa"
    }
    for(const k in tests) {
        const v = tests[k];
        const [verb, _rest, valid] = nextVerb(k);
        expect(valid).toBeTruthy();
        expect(joinVerb(verb)).toBe(v);
    }
});

test("correctly parses verbs with sentence separators", () => {
    const tests: Record<string, [boolean, string]> = {
        "toki. lili": [true, "toki"],
        "toki lili": [true, "toki lili"],
        "toki lili e toki pona": [false, "toki lili"],
    }
    for(const k in tests) {
        const v = tests[k];
        const [verb, _rest, valid, last] = nextVerb(k);
        expect(valid).toBeTruthy();
        expect(joinVerb(verb)).toBe(v[1]);
        expect(last).toBe(v[0]);
    }
});

test("correctly parses verbs with o", () => {
    const tests: Record<string, string> = {
        "o toki": "o toki",
        "o sitelen e sitelen!": "o sitelen"
    }
    for(const k in tests) {
        const v = tests[k];
        const [verb, _rest, valid] = nextVerb(k);
        expect(valid).toBeTruthy();
        expect(joinVerb(verb)).toBe(v);
        expect(typeof verb).toBe("object");
        expect((verb as Verb & object).o).toBeTruthy();
    }
});

test("correctly parses verbs with a", () => {
    const tests: Record<string, string> = {
        "toki a": "toki a",
        "o sitelen a!": "o sitelen a"
    }
    for(const k in tests) {
        const v = tests[k];
        const [verb, _rest, valid] = nextVerb(k);
        expect(valid).toBeTruthy();
        expect(joinVerb(verb)).toBe(v);
        expect(typeof verb).toBe("object");
        expect((verb as Verb & object).a).toBeTruthy();
    }
});