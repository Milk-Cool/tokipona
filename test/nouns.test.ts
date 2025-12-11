import { expect, test } from "vitest";
import { nextNoun } from "../src/index";
import { joinNoun } from "../src/utils";

test("correctly parses nouns from text", () => {
    const tests: Record<string, string> = {
        "mi toki e toki pona": "mi",
        "mi mute toki lili e toki pona": "mi mute",
        "mi nasa mute": "mi nasa mute",
        "sina pona": "sina pona",
        "sina mute pona": "sina mute pona",
        "toki": "toki",
        "toki pona": "toki pona",
        "toki pona li pona": "toki pona",
        "ona mute li pona": "ona mute"
    }
    for(const k in tests) {
        const v = tests[k];
        const [noun, _rest, valid] = nextNoun(k);
        expect(valid).toBeTruthy();
        expect(joinNoun(noun)).toBe(v);
    }
});