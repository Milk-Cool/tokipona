import { expect, test } from "vitest";
import { convert, SitelenPonaEmoji, SitelenPonaUCSUR } from "../src/index";

test("the conversion from latin to sitelen emoji works", () => {
    expect(SitelenPonaEmoji.to("mi toki pona e toki pona!")).toBe("👈🗣️👍⏩🗣️👍➖");
    expect(SitelenPonaEmoji.to("noka mi li pakala")).toBe("🦵👈▶️💥➖");

    expect(SitelenPonaEmoji.to("mi jan Lili")).toBe("👈👤🔣🔼⚙️🔼⚙️🔣➖");
});
test("the conversion from sitelen emoji to latin works", () => {
    expect(SitelenPonaEmoji.from("👈🗣️👍⏩🗣️👍➖")).toBe("mi toki pona e toki pona.");
    expect(SitelenPonaEmoji.from("🦵👈▶️💥")).toBe("noka mi li pakala");

    expect(SitelenPonaEmoji.from("👈👤🔣🔼⚙️🔼⚙️🔣")).toBe("mi jan Lili");
});
test("the conversion from latin to sitelen pona (UCSUR) works", () => {
    expect(SitelenPonaUCSUR.to("mi toki pona e toki pona!")).toBe("\u{f1934}\u{f196c}\u{f1954}\u{f1909}\u{f196c}\u{f1954}\u{f199c}");
    expect(SitelenPonaUCSUR.to("noka mi li pakala")).toBe("\u{f1943}\u{f1934}\u{f1927}\u{f1948}\u{f199c}");

    expect(SitelenPonaUCSUR.to("mi jan Lili")).toBe("\u{f1934}\u{f1911}\u{f1990}\u{f1921}\u{f190e}\u{f1921}\u{f190e}\u{f1991}\u{f199c}");
});
test("the conversion from sitelen pona (UCSUR) to latin works", () => {
    expect(SitelenPonaUCSUR.from("\u{f1934}\u{f196c}\u{f1954}\u{f1909}\u{f196c}\u{f1954}\u{f199c}")).toBe("mi toki pona e toki pona.");
    expect(SitelenPonaUCSUR.from("\u{f1943}\u{f1934}\u{f1927}\u{f1948}\u{f199c}")).toBe("noka mi li pakala.");

    expect(SitelenPonaUCSUR.from("\u{f1934}\u{f1911}\u{f1990}\u{f1921}\u{f190e}\u{f1921}\u{f190e}\u{f1991}\u{f199c}")).toBe("mi jan Lili.");
});

test("convert() works", () => {
    expect(convert("mi toki pona.", "latin", "latin")).toBe("mi toki pona.");
    expect(convert("mi toki pona.", "latin", "sitelen-pona/ucsur")).toBe("\u{f1934}\u{f196c}\u{f1954}\u{f199c}");
    expect(convert("\u{f1934}\u{f196c}\u{f1954}\u{f199c}", "sitelen-pona/ucsur", "latin")).toBe("mi toki pona.");
    expect(convert("\u{f1934}\u{f196c}\u{f1954}\u{f199c}", "sitelen-pona/ucsur", "sitelen-pona/emoji")).toBe("👈🗣️👍➖");
});