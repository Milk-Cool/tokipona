import { expect, test } from "vitest";
import { nextSentence, Noun, Sentence, Time, Verb } from "../src/index";
import { joinNoun, joinTime, joinVerb } from "../src/utils";

const testValidity = (sent: Sentence, val: boolean, valExpected: [boolean, boolean, boolean, boolean?]) => {
    expect(val).toBeTruthy();
    if(valExpected[0]) expect(sent.object).toBeDefined();
    if(valExpected[1]) expect(sent.verb).toBeDefined();
    if(valExpected[2]) expect(sent.subject).toBeDefined();
    if(valExpected[3]) expect(sent.time).toBeDefined();
};

test("correctly parses simple sentences (only object-verb-subject)", () => {
    const test1 = "mi pona!";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, false, false]);
    expect(joinNoun(res1.object as Noun)).toBe("mi pona");

    const test2 = "sina moku";
    const [res2, _rem2, val2] = nextSentence(test2);
    testValidity(res2, val2, [true, false, false]);
    expect(joinNoun(res2.object as Noun)).toBe("sina moku");

    const test3 = "ona moku";
    const [res3, _rem3, val3] = nextSentence(test3);
    testValidity(res3, val3, [true, false, false]);
    expect(joinNoun(res3.object as Noun)).toBe("ona moku");

    const test4 = "ona li moku";
    const [res4, _rem4, val4] = nextSentence(test4);
    testValidity(res4, val4, [true, true, false]);
    expect(joinNoun(res4.object as Noun)).toBe("ona");
    expect(joinVerb(res4.verb as Verb)).toBe("moku");

    const test5 = "ona li moku e kili";
    const [res5, _rem5, val5] = nextSentence(test5);
    testValidity(res5, val5, [true, true, true]);
    expect(joinNoun(res5.object as Noun)).toBe("ona");
    expect(joinVerb(res5.verb as Verb)).toBe("moku");
    expect(joinNoun(res5.subject as Noun)).toBe("kili");

    const test6 = "pipi ni li moku e kili";
    const [res6, _rem6, val6] = nextSentence(test6);
    testValidity(res6, val6, [true, true, true]);
    expect(joinNoun(res6.object as Noun)).toBe("pipi ni");
    expect(joinVerb(res6.verb as Verb)).toBe("moku");
    expect(joinNoun(res6.subject as Noun)).toBe("kili");

    const test7 = "tomo pi telo nasa li lon ma tomo";
    const [res7, _rem7, val7] = nextSentence(test7);
    testValidity(res7, val7, [true, true, true]);
    expect(joinNoun(res7.object as Noun)).toBe("tomo pi telo nasa");
    expect(joinVerb(res7.verb as Verb)).toBe("lon");
    expect(joinNoun(res7.subject as Noun)).toBe("ma tomo");

    const test8 = "mi jan lawa pi tomo tawa kon";
    const [res8, _rem8, val8] = nextSentence(test8);
    testValidity(res8, val8, [true, false, false]);
    expect(joinNoun(res8.object as Noun)).toBe("mi jan lawa pi tomo tawa kon");

    const test9 = "mi toki e toki pona";
    const [res9, _rem9, val9] = nextSentence(test9);
    testValidity(res9, val9, [true, true, true]);
    expect(joinNoun(res9.object as Noun)).toBe("mi");
    expect(joinVerb(res9.verb as Verb)).toBe("toki");
    expect(joinNoun(res9.subject as Noun)).toBe("toki pona");

    const test10 = "mi toki ala e toki pona";
    const [res10, _rem10, val10] = nextSentence(test10);
    testValidity(res10, val10, [true, true, true]);
    expect(joinNoun(res10.object as Noun)).toBe("mi");
    expect(joinVerb(res10.verb as Verb)).toBe("toki ala");
    expect(joinNoun(res10.subject as Noun)).toBe("toki pona");
});

test("correctly parses sentences with preverbs", () => {
    const test1 = "mi open pali e tomo";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true]);
    expect(joinNoun(res1.object as Noun)).toBe("mi");
    expect(joinVerb(res1.verb as Verb)).toBe("open pali");
    expect(joinNoun(res1.subject as Noun)).toBe("tomo");

    const test2 = "sina kama jo e lipu sona";
    const [res2, _rem2, val2] = nextSentence(test2);
    testValidity(res2, val2, [true, true, true]);
    expect(joinNoun(res2.object as Noun)).toBe("sina");
    expect(joinVerb(res2.verb as Verb)).toBe("kama jo");
    expect(joinNoun(res2.subject as Noun)).toBe("lipu sona");

    const test3 = "ona li ken toki e toki pona";
    const [res3, _rem3, val3] = nextSentence(test3);
    testValidity(res3, val3, [true, true, true]);
    expect(joinNoun(res3.object as Noun)).toBe("ona");
    expect(joinVerb(res3.verb as Verb)).toBe("ken toki");
    expect(joinNoun(res3.subject as Noun)).toBe("toki pona");
});

test("correctly parses sentences with tenpo", () => {
    const test1 = "tenpo ni la, mi open pali e tomo";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true, true]);
    expect(joinNoun(res1.object as Noun)).toBe("mi");
    expect(joinVerb(res1.verb as Verb)).toBe("open pali");
    expect(joinNoun(res1.subject as Noun)).toBe("tomo");
    expect(joinTime(res1.time as Time)).toBe("ni");

    // also checking taso here because i'm too lazy to create a separate test for this
    const test2 = "taso, tenpo kama lili la, sina kama jo e lipu sona";
    const [res2, _rem2, val2] = nextSentence(test2);
    testValidity(res2, val2, [true, true, true, true]);
    expect(joinNoun(res2.object as Noun)).toBe("sina");
    expect(joinVerb(res2.verb as Verb)).toBe("kama jo");
    expect(joinNoun(res2.subject as Noun)).toBe("lipu sona");
    expect(joinTime(res2.time as Time)).toBe("kama lili");
    expect(res2.taso).toBeTruthy();
});