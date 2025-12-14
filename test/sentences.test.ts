import { expect, test } from "vitest";
import { Action, nextSentence, Noun, Sentence, Time, Verb } from "../src/index";
import { joinNoun, joinTime, joinVerb } from "../src/utils";

const testValidity = (sent: Sentence, val: boolean, valExpected: [boolean, boolean, boolean, boolean?, boolean?, boolean?]) => {
    expect(val).toBeTruthy();
    if(valExpected[0]) expect(sent.object).toBeDefined();
    if(valExpected[1] || valExpected[2]) expect(sent.actions).toBeDefined();
    if(valExpected[1]) expect((sent.actions as Action[])[0].verb).toBeDefined();
    if(valExpected[2]) expect((sent.actions as Action[])[0].subject).toBeDefined();
    if(valExpected[3]) expect(sent.time).toBeDefined();
    if(valExpected[4]) expect(sent.la).toBeDefined();
    if(valExpected[5]) expect(sent.tan).toBeDefined();
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
    expect(joinVerb((res4.actions as Action[])[0].verb as Verb)).toBe("moku");

    const test5 = "ona li moku e kili";
    const [res5, _rem5, val5] = nextSentence(test5);
    testValidity(res5, val5, [true, true, true]);
    expect(joinNoun(res5.object as Noun)).toBe("ona");
    expect(joinVerb((res5.actions as Action[])[0].verb as Verb)).toBe("moku");
    expect(joinNoun((res5.actions as Action[])[0].subject as Noun)).toBe("kili");

    const test6 = "pipi ni li moku e kili";
    const [res6, _rem6, val6] = nextSentence(test6);
    testValidity(res6, val6, [true, true, true]);
    expect(joinNoun(res6.object as Noun)).toBe("pipi ni");
    expect(joinVerb((res6.actions as Action[])[0].verb as Verb)).toBe("moku");
    expect(joinNoun((res6.actions as Action[])[0].subject as Noun)).toBe("kili");

    const test7 = "tomo pi telo nasa li lon ma tomo";
    const [res7, _rem7, val7] = nextSentence(test7);
    testValidity(res7, val7, [true, true, true]);
    expect(joinNoun(res7.object as Noun)).toBe("tomo pi telo nasa");
    expect(joinVerb((res7.actions as Action[])[0].verb as Verb)).toBe("lon");
    expect(joinNoun((res7.actions as Action[])[0].subject as Noun)).toBe("ma tomo");

    const test8 = "mi jan lawa pi tomo tawa kon";
    const [res8, _rem8, val8] = nextSentence(test8);
    testValidity(res8, val8, [true, false, false]);
    expect(joinNoun(res8.object as Noun)).toBe("mi jan lawa pi tomo tawa kon");

    const test9 = "mi toki e toki pona";
    const [res9, _rem9, val9] = nextSentence(test9);
    testValidity(res9, val9, [true, true, true]);
    expect(joinNoun(res9.object as Noun)).toBe("mi");
    expect(joinVerb((res9.actions as Action[])[0].verb as Verb)).toBe("toki");
    expect(joinNoun((res9.actions as Action[])[0].subject as Noun)).toBe("toki pona");

    const test10 = "mi toki ala e toki pona";
    const [res10, _rem10, val10] = nextSentence(test10);
    testValidity(res10, val10, [true, true, true]);
    expect(joinNoun(res10.object as Noun)).toBe("mi");
    expect(joinVerb((res10.actions as Action[])[0].verb as Verb)).toBe("toki ala");
    expect(joinNoun((res10.actions as Action[])[0].subject as Noun)).toBe("toki pona");
});

test("correctly parses sentences with preverbs", () => {
    const test1 = "mi open pali e tomo";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true]);
    expect(joinNoun(res1.object as Noun)).toBe("mi");
    expect(joinVerb((res1.actions as Action[])[0].verb as Verb)).toBe("open pali");
    expect(joinNoun((res1.actions as Action[])[0].subject as Noun)).toBe("tomo");

    const test2 = "sina kama jo e lipu sona";
    const [res2, _rem2, val2] = nextSentence(test2);
    testValidity(res2, val2, [true, true, true]);
    expect(joinNoun(res2.object as Noun)).toBe("sina");
    expect(joinVerb((res2.actions as Action[])[0].verb as Verb)).toBe("kama jo");
    expect(joinNoun((res2.actions as Action[])[0].subject as Noun)).toBe("lipu sona");

    const test3 = "ona li ken toki e toki pona";
    const [res3, _rem3, val3] = nextSentence(test3);
    testValidity(res3, val3, [true, true, true]);
    expect(joinNoun(res3.object as Noun)).toBe("ona");
    expect(joinVerb((res3.actions as Action[])[0].verb as Verb)).toBe("ken toki");
    expect(joinNoun((res3.actions as Action[])[0].subject as Noun)).toBe("toki pona");
});

test("correctly parses sentences with tenpo", () => {
    const test1 = "tenpo ni la, mi open pali e tomo";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true, true]);
    expect(joinNoun(res1.object as Noun)).toBe("mi");
    expect(joinVerb((res1.actions as Action[])[0].verb as Verb)).toBe("open pali");
    expect(joinNoun((res1.actions as Action[])[0].subject as Noun)).toBe("tomo");
    expect(joinTime(res1.time as Time)).toBe("ni");

    // also checking taso here because i'm too lazy to create a separate test for this
    const test2 = "taso, tenpo kama lili la, sina kama jo e lipu sona";
    const [res2, _rem2, val2] = nextSentence(test2);
    testValidity(res2, val2, [true, true, true, true]);
    expect(joinNoun(res2.object as Noun)).toBe("sina");
    expect(joinVerb((res2.actions as Action[])[0].verb as Verb)).toBe("kama jo");
    expect(joinNoun((res2.actions as Action[])[0].subject as Noun)).toBe("lipu sona");
    expect(joinTime(res2.time as Time)).toBe("kama lili");
    expect(res2.taso).toBeTruthy();
});

test("correctly parses simple questions", () => {
    const test1 = "tenpo ni la, sina moku ala moku e kili?";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true, true]);
    expect(joinNoun(res1.object as Noun)).toBe("sina");
    expect(joinVerb((res1.actions as Action[])[0].verb as Verb)).toBe("moku ala moku");
    expect(joinNoun((res1.actions as Action[])[0].subject as Noun)).toBe("kili");
    expect(joinTime(res1.time as Time)).toBe("ni");

    const test2 = "sina pona ala pona?";
    const [res2, _rem2, val2] = nextSentence(test2);
    testValidity(res2, val2, [true, false, false]);
    expect(joinNoun(res2.object as Noun)).toBe("sina pona ala pona");
});

test("correctly parses complex sentences", () => {
    const test1 = "tenpo kama suli la, sina moku ala moku e kili?";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true, true]);
    expect(joinNoun(res1.object as Noun)).toBe("sina");
    expect(joinVerb((res1.actions as Action[])[0].verb as Verb)).toBe("moku ala moku");
    expect(joinNoun((res1.actions as Action[])[0].subject as Noun)).toBe("kili");
    expect(joinTime(res1.time as Time)).toBe("kama suli");
});

test("correctly parses multiple sentences", () => {
    let test1 = "jan seme li pakala e ona? jan lili li pakala e ona. jan lili li ike!", res1: Sentence, val1: boolean;
    [res1, test1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true]);
    expect(joinNoun(res1.object as Noun)).toBe("jan seme");
    expect(joinVerb((res1.actions as Action[])[0].verb as Verb)).toBe("pakala");
    expect(joinNoun((res1.actions as Action[])[0].subject as Noun)).toBe("ona");
    [res1, test1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true]);
    expect(joinNoun(res1.object as Noun)).toBe("jan lili");
    expect(joinVerb((res1.actions as Action[])[0].verb as Verb)).toBe("pakala");
    expect(joinNoun((res1.actions as Action[])[0].subject as Noun)).toBe("ona");
    [res1, test1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, false]);
    expect(joinNoun(res1.object as Noun)).toBe("jan lili");
    expect(joinVerb((res1.actions as Action[])[0].verb as Verb)).toBe("ike");
});

test("correctly parses complex sentences (sentence la sentence)", () => {
    const test1 = "tenpo ni la, mi moku e kili la, mi pilin pona la, mi pilin ike ala";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true, true, true]);
    testValidity(res1.la as Sentence, val1, [true, false, false, false, true]);
    testValidity((res1.la as Sentence).la as Sentence, val1, [true, false, false]);
    expect(joinNoun(res1.object as Noun)).toBe("mi");
    expect(joinVerb((res1.actions as Action[])[0].verb as Verb)).toBe("moku");
    expect(joinNoun((res1.actions as Action[])[0].subject as Noun)).toBe("kili");
    expect(joinTime(res1.time as Time)).toBe("ni");
    expect(joinNoun((res1.la as Sentence).object as Noun)).toBe("mi pilin pona");
    expect(joinNoun(((res1.la as Sentence).la as Sentence).object as Noun)).toBe("mi pilin ike ala");

    const test2 = "jan lili li pona la, jan lili li wile moku e moku";
    const [res2, _rem2, val2] = nextSentence(test2);
    testValidity(res2, val2, [true, true, false, false, true]);
    testValidity(res2.la as Sentence, val2, [true, true, true]);
    expect(joinNoun(res2.object as Noun)).toBe("jan lili");
    expect(joinVerb((res2.actions as Action[])[0].verb as Verb)).toBe("pona");
    expect(joinNoun((res2.la as Sentence).object as Noun)).toBe("jan lili");
    expect(joinVerb(((res2.la as Sentence).actions as Action[])[0].verb as Verb)).toBe("wile moku");
    expect(joinNoun(((res2.la as Sentence).actions as Action[])[0].subject as Noun)).toBe("moku");
});

test("correctly parses sentences with multiple subjects separated with anu and en", () => {
    const test1 = "mi toki e toki pona en toki Inli";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true]);
    expect(joinNoun(res1.object as Noun)).toBe("mi");
    expect(joinVerb((res1.actions as Action[])[0].verb as Verb)).toBe("toki");
    expect(joinNoun((res1.actions as Action[])[0].subject as Noun)).toBe("toki pona en toki Inli");

    const test2 = "jan lili li wile e kili anu e suwi";
    const [res2, _rem2, val2] = nextSentence(test2);
    testValidity(res2, val2, [true, true, true]);
    expect(joinNoun(res2.object as Noun)).toBe("jan lili");
    expect(joinVerb((res2.actions as Action[])[0].verb as Verb)).toBe("wile");
    expect(joinNoun((res2.actions as Action[])[0].subject as Noun)).toBe("kili anu suwi");
});

test("correctly parses sentences with multiple actions separated with li", () => {
    const test1 = "mi toki e toki pona li olin e jan olin mi";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, true, true]);
    expect(joinNoun(res1.object as Noun)).toBe("mi");
    expect(joinVerb((res1.actions as Action[])[0].verb as Verb)).toBe("toki");
    expect(joinNoun((res1.actions as Action[])[0].subject as Noun)).toBe("toki pona");
    expect(joinVerb((res1.actions as Action[])[1].verb as Verb)).toBe("olin");
    expect(joinNoun((res1.actions as Action[])[1].subject as Noun)).toBe("jan olin mi");

    const test2 = "jan lili li wile e kili li wile e suwi";
    const [res2, _rem2, val2] = nextSentence(test2);
    testValidity(res2, val2, [true, true, true]);
    expect(joinNoun(res2.object as Noun)).toBe("jan lili");
    expect(joinVerb((res2.actions as Action[])[0].verb as Verb)).toBe("wile");
    expect(joinNoun((res2.actions as Action[])[0].subject as Noun)).toBe("kili");
    expect(joinVerb((res2.actions as Action[])[1].verb as Verb)).toBe("wile");
    expect(joinNoun((res2.actions as Action[])[1].subject as Noun)).toBe("suwi");
});

test("correctly parses sentences with tan", () => {
    const test1 = "sina pilin ike tan seme?";
    const [res1, _rem1, val1] = nextSentence(test1);
    testValidity(res1, val1, [true, false, false, false, false, true]);
    expect(joinNoun(res1.object as Noun)).toBe("sina pilin ike");
    expect(joinNoun((res1.tan as Sentence).object as Noun)).toBe("seme");

    const test2 = "jan lili li wile e kili tan jan lili li wile moku";
    const [res2, _rem2, val2] = nextSentence(test2);
    testValidity(res2, val2, [true, true, true, false, false, true]);
    testValidity(res2.tan as Sentence, val2, [true, true, false]);
    expect(joinNoun(res2.object as Noun)).toBe("jan lili");
    expect(joinVerb((res2.actions as Action[])[0].verb as Verb)).toBe("wile");
    expect(joinNoun((res2.actions as Action[])[0].subject as Noun)).toBe("kili");
    expect(joinVerb(((res2.tan as Sentence).actions as Action[])[0].verb as Verb)).toBe("wile moku");
});

test("correctly parses standalone interjections", () => {
    const test1 = "a a a!";
    const [res1, _rem1, val1] = nextSentence(test1);
    expect(val1).toBeTruthy();
    expect(res1.interjection).toBe("a a a");

    const test2 = "mu!";
    const [res2, _rem2, val2] = nextSentence(test2);
    expect(val2).toBeTruthy();
    expect(res2.interjection).toBe("mu");
});