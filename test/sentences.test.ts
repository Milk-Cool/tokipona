import { expect, test } from "vitest";
import { nextSentence, Noun, Sentence, Verb } from "../src/index";
import { joinNoun, joinVerb } from "../src/utils";

test("correctly parses simple sentences (only object-verb-subject)", () => {
    const testValidity = (sent: Sentence, val: boolean, valExpected: [boolean, boolean, boolean]) => {
        expect(val).toBeTruthy();
        if(valExpected[0]) expect(sent.object).toBeDefined();
        if(valExpected[1]) expect(sent.verb).toBeDefined();
        if(valExpected[2]) expect(sent.subject).toBeDefined();
    };

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
});