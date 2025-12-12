import { expect, test } from "vitest";
import { nextVerb } from "../src/index";
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