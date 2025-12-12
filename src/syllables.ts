export function isValidSyllable(syl: string) {
    return !!syl.match(/^[ptkmnslwj]?[aeiou](n(?=([^aeiou]|$)))?$/i)
        && !["ti", "tin", "wo", "won", "wu", "wun", "ji", "jin"].includes(syl); // invalid according to Wikipedia
}

/**
 * Gets the next syllable of the given text.
 * All invalid characters are ignored.
 * @param text Text to get the next syllable from
 * @returns [syllable, text, isValidSyllable, hasSeparator, hasStop]
 */
export function nextSyllable(text: string): [string, string, boolean, boolean, boolean] {
    let syl = text.match(/^[^ptkmnslwjaeiou]*[ptkmnslwj]?[aeiou](n(?=([^aeiou]|$)))?/i)?.[0]; // all invalid chars are ignored
    if(!syl) return ["", text, false, false, false];
    text = text.replace(syl, ""); // only the first occurence
    const hasSeparator = " !&();:'\",.?-".split("").map(x => syl.includes(x)).includes(true);
    const hasStop = "!;:,.?".split("").map(x => syl.includes(x)).includes(true);
    syl = syl.replace(/^[^ptkmnslwjaeiou]*/i, "");
    return [syl, text, isValidSyllable(syl), hasSeparator, hasStop];
}