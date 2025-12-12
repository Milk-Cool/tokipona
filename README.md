# tokipona
A JS library for parsing, translating and constructing toki pona.

## Quirks
- Sentences without "li" (for example, "mi pona") only return the object when parsed (which is "mi pona"). That is because it would be much more difficult to parse them as a subject and an object ("i am good") so it's easier to parse them as just the object ("good me"). However, sentences like "mi toki e toki pona" will be parsed as "mi" / "toki" / "toki pona"
- Sentences with "li" but without a clear subject (i. e. "ona li ike") only return the object and the verb when parsed.

# THIS IS IN BETA. USE AT YOUR OWN RISK.

## TODOs:

- [x] Parsing syllables
- [x] Parsing separators
- [x] Parsing words
- [x] Parsing words with adjectives
- [x] Parsing pronouns
- [x] Parsing sentences
- [x] Parsing ala's
- [x] Parsing preverbs
- [x] Parsing multiple sentences
- [ ] Parsing connected sentences
- [ ] Parsing unofficial words (jan Pepe, ma Mesiko)
- [x] pi
- [x] Parsing x ala x questions
- [x] taso
- [x] tenpo
- [ ] o
- [ ] potentially more sentences with la in them
- [ ] Interjections
- [ ] [adj] tawa [noun]
- [ ] Maybe more?