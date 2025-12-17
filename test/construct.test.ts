import { expect, test } from "vitest";
import { joinSentences } from "../src";

test("correctly joins sentences", () => {
    expect(joinSentences(
        {
            time: { modifiers: ["pini", "lili"] },
            subject: {
                noun: "mi",
                modifiers: ["pilin", "ike"]
            },
            la: {
                time: { modifiers: ["ni"] },
                subject: {
                    noun: "mi",
                    modifiers: ["pilin", "pona"]
                }
            }
        },
        {
            subject: {
                noun: "mi",
                modifiers: ["pona"]
            }
        }
    )).toBe("tenpo pini lili la, mi pilin ike la, tenpo ni la, mi pilin pona. mi pona.");

    expect(joinSentences(
        {
            subject: {
                noun: "soweli"
            },
            actions: [
                {
                    verb: {
                        verb: "kalama",
                        modifiers: ["ni"]
                    }
                }
            ],
            hasColon: true
        },
        {
            interjection: "mu"
        }
    )).toBe("soweli li kalama ni: mu.");
});