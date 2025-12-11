import { nextSyllable } from "./syllables";

export const words = [
    "a", "akesi", "ala", "alasa", "ale", "ali", "anpa",
    "ante", "anu", "awen", "e", "en", "epiku", "esun",
    "ijo", "ike", "ilo", "insa", "jaki", "jan",
    "jasima", "jelo", "jo", "kala", "kalama", "kama",
    "kasi", "ken", "kepeken", "kijetesantakalu",
    "kili", "kin", "kipisi", "kiwen", "ko", "kokosila",
    "kon", "ku", "kule", "kulupu", "kute", "la",
    "lanpan", "lape", "laso", "lawa", "leko", "len",
    "lete", "li", "lili", "linja", "lipu", "loje",
    "lon", "luka", "lukin", "lupa", "ma", "mama",
    "mani", "meli", "meso", "mi", "mije", "misikeke",
    "moku", "moli", "monsi", "monsuta", "mu", "mun",
    "musi", "mute", "namako", "nanpa", "nasa",
    "nasin", "nena", "ni", "nimi", "noka", "o", "oko",
    "olin", "ona", "open", "pakala", "pali", "palisa",
    "pan", "pana", "pi", "pilin", "pimeja", "pini",
    "pipi", "poka", "poki", "pona", "pu", "sama",
    "seli", "selo", "seme", "sewi", "sijelo", "sike",
    "sin", "sina", "sinpin", "sitelen", "soko", "sona",
    "soweli", "suli", "suno", "supa", "suwi", "tan",
    "taso", "tawa", "telo", "tenpo", "toki", "tomo",
    "tonsi", "tu", "unpa", "uta", "utala", "walo",
    "wan", "waso", "wawa", "weka", "wile"
];

export function isValidWord(word: string) {
    return words.includes(word);
}

/**
 * Gets the next toki pona word from the given text.
 * @param text The text to get the next word from
 * @returns [word, remaining text, is word valid]
 */
export function nextWord(text: string): [string, string, boolean] {
    let textTmp = text.replace(/^[^ptkmnslwjaeiou]*/i, ""), textPeek = "", valid = true, sep = false, syl = "", word = "";
    while(true) {
        [syl, textTmp, valid, sep] = nextSyllable(textTmp);
        if(syl === "" || sep) return [word, text.replace(word, ""), isValidWord(word)];
        if(!valid) return ["", text, false];
        word += syl;
    }
}