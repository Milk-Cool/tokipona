# tokipona
A JS library for parsing, translating and constructing toki pona.

## Quirks
- Sentences without "li" (for example, "mi pona") only return the object when parsed (which is "mi pona"). That is because it would be much more difficult to parse them as a subject and an object ("i am good") so it's easier to parse them as just the object ("good me"). However, sentences like "mi toki e toki pona" will be parsed as "mi" / "toki" / "toki pona"
- Sentences with "li" but without a clear subject (i. e. "ona li ike") only return the object and the verb when parsed.
- After parsing a sentence like "[object] o [verb]", only the object will have the "o" property set.

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
- [x] Parsing connected sentences (sentence la, sentence)
- [x] Parsing unofficial words (jan Pepe, ma Mesiko)
- [x] pi
- [x] Parsing x ala x questions
- [x] taso
- [x] tenpo
- [x] o
- [x] o for verbs
- [ ] anu, li x li x [...]
- [ ] potentially more sentences with la in them
- [ ] Interjections
- [ ] tan
- [ ] latin toki pona <-> sitelen pona (Under-ConScript Unicode Registry, UCSUR)
- [ ] Maybe more?