# Transliterating

For transliterating, you can use `tokipona.convert()`.

Valid writing systems are `"latin"`, `"sitelen-pona/emoji"` and `"sitelen-pona/ucsur"`.

Example:

```ts
tokipona.convert(`text`, "from", "to");
// Example
tokipona.convert(`mi pona!`, "latin", "sitelen-pona/ucsur");
```