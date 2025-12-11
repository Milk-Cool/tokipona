# tokipona
A JS library for parsing, translating and constructing toki pona.

## Quirks
- Sentences without "li" (for example, "mi pona") only return the object when parsed (which is "mi pona"). That is because it would be much more difficult to parse them as a subject and an object ("i am good") so it's easier to parse them as just the object ("good me").

# THIS IS IN BETA. USE AT YOUR OWN RISK.

## TODOs:

- [x] Parsing syllables
- [x] Parsing separators
- [x] Parsing words
- [x] Parsing words with adjectives
- [x] Parsing pronouns
- [x] Parsing sentences
- [x] Parsing ala's
- [ ] Parsing connected sentences
- [ ] Parsing unofficial words (jan Pepe, ma México)
- [x] pi
- [ ] Maybe more?