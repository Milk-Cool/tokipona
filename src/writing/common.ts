export class WritingSystem {
    static to(latin: string): string {
        return latin;
    }
    static from(nonlatin: string): string {
        return nonlatin;
    }
}
export class WritingSystemConversionError extends Error {};

// Used in sitelen pona
export const lettersMap = {
    "a": "a",
    "e": "e",
    "i": "ilo",
    "j": "jo",
    "k": "ko",
    "l": "la",
    "m": "mi",
    "n": "ni",
    "o": "o",
    "p": "pi",
    "s": "sin",
    "t": "tu",
    "u": "uta",
    "w": "wan"
};