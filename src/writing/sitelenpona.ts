import { MAX_ITER, TimeoutError } from "../utils";
import { nextWord } from "../words";
import { lettersMap, WritingSystem, WritingSystemConversionError } from "./common";

// 0xf1900 - 0xf1988
const mainBlock = `
    a akesi ala alasa ale anpa ante anu awen e en esun ijo ike ilo insa
    jaki jan jelo jo kala kalama kama kasi ken kepeken kili kiwen ko kon kule kulupu
    kute la lape laso lawa len lete li lili linja lipu loje lon luka lukin lupa
    ma mama mani meli mi mije moku moli monsi mu mun musi mute nanpa nasa nasin
    nena ni nimi noka o olin ona open pakala pali palisa pan pana pi pilin pimeja
    pini pipi poka poki pona pu sama seli selo seme sewi sijelo sike sin sina sinpin
    sitelen sona soweli suli suno supa suwi tan taso tawa telo tenpo toki tomo tu unpa
    uta utala walo wan waso wawa weka wile namako kin oko kipisi leko monsuta tonsi jasima
    kijetesantakalu soko meso epiku kokosila lanpan n misikeke ku
`.split(/\s+/g).filter(x => x);

const punctuation = {
    left: String.fromCodePoint(0xf1990),
    right: String.fromCodePoint(0xf1991),
    dot: String.fromCodePoint(0xf199c),
    colon: String.fromCodePoint(0xf199d)
};

export class SitelenPonaUCSUR extends WritingSystem {
    static to(latin: string): string {
        // todo: ale = ali
        let out = "", word: string, valid: boolean, isLast: boolean = false, isUnofficial: boolean, hasColon: boolean;
        while(true) {
            [word, latin, valid, isLast, isUnofficial, hasColon] = nextWord(latin);
            if(word === "") break;
            if(!valid) throw new WritingSystemConversionError("Invalid word!");
            if(word === "ali") word = "ale";
            if(isUnofficial) {
                out += punctuation.left;
                for(const l of word.toLowerCase().split(""))
                    out += String.fromCodePoint(0xf1900 + mainBlock.findIndex(x => x === lettersMap[l]));
                out += punctuation.right;
            } else out += String.fromCodePoint(0xf1900 + mainBlock.findIndex(x => x === word));
            if(isLast) {
                if(hasColon) out += punctuation.colon;
                else out += punctuation.dot;
            }
        }
        return out;
    }
    static from(ucsur: string): string {
        let isQuote: boolean = false, out = [], iter = 0;
        for(const c of Array.from(ucsur)) {
            if(++iter > MAX_ITER) throw new TimeoutError("Max iterations reached while parsing sitelen pona");
            if(c === punctuation.dot) {
                out.push(".");
                continue;
            } else if(c === punctuation.colon) {
                out.push(":");
                continue;
            }
            if(c === punctuation.left) {
                isQuote = true;
                out.push("");
                continue;
            } else if(c === punctuation.right) {
                isQuote = false;
                continue;
            }
            if(isQuote) out[out.length - 1] += (out.at(-1) === "" ? mainBlock[c.codePointAt(0) - 0xf1900][0].toUpperCase() : mainBlock[c.codePointAt(0) - 0xf1900][0]);
            else out.push(mainBlock[c.codePointAt(0) - 0xf1900]);
        }
        return out.join(" ").replace(/\s(?=\.|:)/g, "");
    }
}