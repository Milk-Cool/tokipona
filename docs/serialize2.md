# Serializing sentences

See the typedef for a sentence in [Parsing sentences](parse3.md).

```ts
const text = tokipona.joinSentences(...sentences);
```

Punctuation is handled, too! You can use the `hasColon` property here.