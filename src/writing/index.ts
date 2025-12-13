import { WritingSystemType } from "../types";
import { WritingSystem } from "./common";
import { SitelenPonaEmoji } from "./sitelenemoji";
import { SitelenPonaUCSUR } from "./sitelenpona";

export * from "./common";
export * from "./sitelenpona";
export * from "./sitelenemoji";

const getWritingSystem = (system: WritingSystemType) => system === "sitelen-pona/emoji"
    ? SitelenPonaEmoji
    : system === "sitelen-pona/ucsur"
    ? SitelenPonaUCSUR
    : WritingSystem;

export function convert(text: string, from: WritingSystemType, to: WritingSystemType) {
    if(from === to) return text;
    else if(from === "latin") {
        return getWritingSystem(to).to(text);
    } else if(to === "latin") {
        return getWritingSystem(from).from(text);
    } else {
        return getWritingSystem(to).to(getWritingSystem(from).from(text));
    }
}