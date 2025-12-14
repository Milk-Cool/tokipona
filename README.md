# THIS IS IN BETA. USE AT YOUR OWN RISK.

# tokipona.js
A JS library for parsing, translating and constructing toki pona.

## Demo

```ts
import * as tokipona from "tokipona";

console.log(tokipona.nextNoun("jan lili pona")[0]);
// { noun: 'jan', modifiers: [ 'lili', 'pona' ] }

console.log(tokipona.nextSentence("jan lili li wile moku e suwi")[0]);
/*
{
  object: { noun: 'jan', modifiers: [ 'lili' ] },
  actions: [
    { verb: { verb: 'wile', modifiers: [ 'moku' ] }, subject: 'suwi' }
  ]
}
*/

console.log(tokipona.nextSentence("tenpo ni la, ona li pilin ike")[0]);
/*
{
  time: { modifiers: [ 'ni' ] },
  object: 'ona',
  actions: [ { verb: { verb: 'pilin' }, subject: 'ike' } ]
}
*/
```

See [the docs](docs/index.md) for further usage instructions.

## Quirks
- Sentences without "li" (for example, "mi pona") only return the object when parsed (which is "mi pona"). That is because it would be much more difficult to parse them as a subject and an object ("i am good") so it's easier to parse them as just the object ("good me"). However, sentences like "mi toki e toki pona" will be parsed as "mi" / "toki" / "toki pona"
- Sentences with "li" but without a clear subject (i. e. "ona li ike") only return the object and the verb when parsed.
- After parsing a sentence like "[object] o [verb]", only the object will have the "o" property set.

## Features:

- [x] Parsing syllables
- [x] Parsing separators
- [x] Parsing nouns and pronouns
- [x] Parsing sentences
- [x] Parsing connected sentences (sentence la, sentence)
- [x] Parsing unofficial words (jan Pepe, ma Mesiko)
- [x] pi
- [x] x ala x questions
- [x] taso
- [x] tenpo
- [x] o
- [x] anu, en
- [x] li x li x [...]
- [x] Interjections
- [x] tan
- [x] Transliteration (latin toki pona <-> sitelen pona (Under-ConScript Unicode Registry, UCSUR) <-> sitelen emoji)
- [x] Constructing text from objects
- [ ] And more!

## For the devs
As the language evolves, it may be needed to update the following variables and functions:
- `emoji` in `writing/sitelenemoji.ts`
- `words` in `words.ts`
- `isSpecialPronoun`, `isNounConnector`, `isSimpleVerb` and other functions starting with `is` in `utils.ts`