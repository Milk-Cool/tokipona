export function isValidSyllable(syl: string) {
    return !!syl.match(/^([ptkmnslwj]?[aeiou]|[PTKMNSLWJ][aeiou]|[AEIOU])(n(?=([^aeiou]|$)))?$/)
        && !["ti", "tin", "wo", "won", "wu", "wun", "ji", "jin"].includes(syl); // invalid according to Wikipedia
}

export function isUnofficial(sylOrWord: string) {
    return sylOrWord.length >= 1 && sylOrWord[0].toUpperCase() === sylOrWord[0] && "PTKMNSLWJAEIOU".split("").includes(sylOrWord[0].toUpperCase());
}

/**
 * Gets the next syllable of the given text.
 * All invalid characters are ignored.
 * @param text Text to get the next syllable from
 * @returns [syllable, text, isValidSyllable, hasSeparator, hasStop, hasColon]
 */
export function nextSyllable(text: string): [string, string, boolean, boolean, boolean, boolean] {
    let syl = text.match(/^[^ptkmnslwjaeiouPTKMNSLWJAEIOU]*([ptkmnslwj]?[aeiou]|[PTKMNSLWJ][aeiou]|[AEIOU])(n(?=([^aeiou]|$)))?/)?.[0]; // all invalid chars are ignored
    if(!syl) return ["", text, false, false, false, false];
    text = text.replace(syl, ""); // only the first occurence
    const hasSeparator = " !&();:'\",.?-".split("").map(x => syl.includes(x)).includes(true);
    const hasStop = "!;:.?".split("").map(x => syl.includes(x)).includes(true);
    const hasColon = syl.includes(":");
    syl = syl.replace(/^[^ptkmnslwjaeiou]*/i, "");
    return [syl, text, isValidSyllable(syl), hasSeparator, hasStop, hasColon];
}