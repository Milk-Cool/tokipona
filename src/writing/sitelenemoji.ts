// UPDATE THIS: sitelen emoji list taken from https://sites.google.com/view/sitelenemoji

import { isUnofficial } from "../syllables";
import { MAX_ITER, TimeoutError } from "../utils";
import { nextWord } from "../words";
import { lettersMap, WritingSystem, WritingSystemConversionError } from "./common";

// probably needs updating once in a while
const emoji = {
    "a": "❗",
    "akesi": "🦎",
    "ala": "❌",
    "alasa": "🏹",
    "ale": "♾️",
    "ali": "♾️",
    "anpa": "⬇️",
    "ante": "🔀",
    "anu": "☯️",
    "apeja": "😢",
    "awen": "⚓",
    "e": "⏩",
    "en": "➕",
    "esun": "🛒",
    "ijo": "🐚",
    "ike": "👎",
    "ilo": "⚙️",
    "insa": "⏺️",
    "jaki": "💩",
    "jan": "👤",
    "jelo": "💛",
    "jo": "👜",
    "kala": "🐟",
    "kalama": "🔈",
    "kama": "🚶",
    "kasi": "🌴",
    "ken": "💪",
    "kepeken": "🔧",
    "kijetesantakalu": "🦝",
    "kili": "🍎",
    "kin": "❕",
    "kipisi": "✂️",
    "kiwen": "💎",
    "ko": "🍦",
    "kon": "💨",
    "kule": "🌈",
    "kulupu": "👥",
    "kute": "👂",
    "la": "🔼",
    "lape": "😴",
    "laso": "🔵",
    "lawa": "😶",
    "leko": "🧱",
    "len": "👕",
    "lete": "❄️",
    "li": "▶️",
    "lili": "🐭",
    "linja": "〰️",
    "linluwi": "🌐",
    "lipu": "📄",
    "loje": "🔴",
    "lon": "📍",
    "luka": "✋",
    "lukin": "👀",
    "lupa": "🕳️",
    "ma": "🏝️",
    "majuna": "👵",
    "mama": "👪",
    "mani": "💰",
    "meli": "👧",
    "mi": "👈",
    "mije": "👨",
    "moku": "🍽️",
    "moli": "💀",
    "monsi": "⬅️",
    "monsuta": "👹",
    "mu": "😹",
    "mulapisu": "🍕",
    "mun": "🌙",
    "musi": "😃",
    "mute": "👐",
    "namako": "🧂",
    "nanpa": "#️⃣",
    "nasa": "🌀",
    "nasin": "🛣️",
    "nena": "🗻",
    "ni": "👇",
    "nimi": "💬",
    "noka": "🦵",
    "o": "👋",
    "oko": "👁️",
    "olin": "💕",
    "ona": "👆",
    "open": "🔓",
    "pakala": "💥",
    "pake": "🚧",
    "pali": "✊",
    "palisa": "📏",
    "pan": "🍞",
    "pana": "📤",
    "pi": "⏹️",
    "pilin": "❤️",
    "pimeja": "⚫",
    "pini": "🏁",
    "pipi": "🐞",
    "poka": "↔️",
    "poki": "📦",
    "pona": "👍",
    "powe": "🧞",
    "pu": "📖",
    "sama": "⚖️",
    "seli": "🔥",
    "selo": "🔲",
    "seme": "❓",
    "sewi": "⬆️",
    "sijelo": "🏋️",
    "sike": "⭕",
    "sin": "🎁",
    "sina": "👉",
    "sinpin": "➡️",
    "sitelen": "🖼️",
    "sona": "🧠",
    "soweli": "🐒",
    "suli": "🐘",
    "suno": "☀️",
    "supa": "🛏️",
    "suwi": "🍭",
    "tan": "↩️",
    "taso": "🤔",
    "tawa": "↪️",
    "telo": "💧",
    "tenpo": "⏰",
    "toki": "🗣️",
    "tomo": "🏠",
    "tonsi": "♐",
    "tu": "✌️",
    "unpa": "🍆",
    "uta": "👄",
    "utala": "⚔️",
    "walo": "⚪",
    "wan": "☝️",
    "waso": "🦅",
    "wawa": "⚡",
    "weka": "🛫",
    "wile": "💭",
    "epiku": "😎",
    "ete": "🔃",
    "ewe": "🌋",
    "itomi": "😈",
    "jami": "🤤",
    "kamalawala": "💣",
    "kan": "🔗",
    "kapesi": "🟤",
    "kuntu": "🤣",
    "lanpan": "📥",
    "likujo": "🧺",
    "lokon": "🧿",
    "melome": "👩‍❤️‍👩",
    "mijomi": "👨‍❤️‍👨",
    "misikeke": "💊",
    "oke": "👌",
    "okepuma": "🦖",
    "omen": "🙄",
    "pa": "🤨",
    "pasila": "🧘",
    "pata": "👯‍♀️",
    "peta": "🟢",
    "peto": "😭",
    "pipo": "😒",
    "po": "🍀",
    "polinpin": "🎳",
    "pomotolo": "📈",
    "samu": "✍️",
    "sikomo": "🤩",
    "soko": "🍄",
    "soto": "🤛",
    "su": "❔",
    "te": "🤜",
    "tuli": "☘️",
    "waleja": "ℹ️",
    "wawajete": "🤡",
    "we": "🔒",
    "wi": "🙋"
};
const MAX_EMOJI_LENGTH_UTF = 8;
const quoteEmoji = "🔣";
const dotEmoji = "➖";
const colonEmoji = "➗";

export class SitelenPonaEmoji extends WritingSystem {
    static to(latin: string): string {
        let out = "", word: string, valid: boolean, isLast: boolean = false, isUnofficial: boolean, hasColon: boolean;
        while(true) {
            [word, latin, valid, isLast, isUnofficial, hasColon] = nextWord(latin);
            if(word === "") break;
            if(!valid) throw new WritingSystemConversionError("Invalid word!");
            if(isUnofficial) {
                out += quoteEmoji;
                for(const l of word.toLowerCase().split(""))
                    out += emoji[lettersMap[l]];
                out += quoteEmoji;
            } else out += emoji[word];
            if(isLast) {
                if(hasColon) out += colonEmoji;
                else out += dotEmoji;
            }
        }
        return out;
    }
    static from(emojiStr: string): string {
        let isQuote: boolean = false, out = [], iter = 0;
        for(let i = 0; i < emojiStr.length;) {
            if(++iter > MAX_ITER) throw new TimeoutError("Max iterations reached while parsing sitelen emoji");
            if(emojiStr.slice(i, i + dotEmoji.length) === dotEmoji) {
                out.push(".");
                i += dotEmoji.length;
                continue;
            } else if(emojiStr.slice(i, i + colonEmoji.length) === colonEmoji) {
                out.push(":");
                i += colonEmoji.length;
                continue;
            }
            if(emojiStr.slice(i, i + quoteEmoji.length) === quoteEmoji) {
                isQuote = !isQuote;
                if(isQuote) out.push("");
                i += quoteEmoji.length;
                continue;
            }
            let j = MAX_EMOJI_LENGTH_UTF;
            for(; j > 0; j--) {
                const enc = emojiStr.slice(i, i + j);
                const ent = Object.entries(emoji).find(y => y[1] === enc);
                if(ent) {
                    if(isQuote) out[out.length - 1] += (out.at(-1) === "" ? ent[0][0].toUpperCase() : ent[0][0]);
                    else out.push(ent[0]);
                    break;
                }
            }
            i += j;
        }
        return out.join(" ").replace(/\s(?=\.|:)/g, "");
    }
}