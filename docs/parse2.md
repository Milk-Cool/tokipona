# Parsing nouns and verbs

## Nouns

A noun's typedef looks like this:

```ts
type Noun = string | {
    noun: string, // The noun itself; if this is the only set property, a string may be returned by nextNoun instead (ex. 'mi')
    modifiers?: string[], // Noun modifiers (ex. ['pona', 'suli'])
    ala?: boolean, // Whether the word has an ala negating the word
    pi?: Noun, // The noun after this one separated by a pi
    alax?: string[], // Words after ala, if present (ex. 'toki ala toki' -> noun = 'toki', alax = 'toki')
    o?: boolean, // Whether there's an 'o' after the noun
    anu?: Noun, // Same as with .pi, but separated by 'anu'
    en?: Noun, // Same as with .pi, but separated by 'en'
    a?: boolean // Whether there's an 'a' after the noun
};
```

Example of using `nextNoun()` (may also be used for parsing a pronoun):

```ts
let text = "jan lawa pi tomo tawa kon", noun: tokipona.Noun, isValid, isLast;
[noun, text, isValid, isLast] = tokipona.nextNoun(text, false); // pass true to parse `anu` and `en`
console.log(noun);
/*
{
  noun: 'jan',
  modifiers: [ 'lawa' ],
  pi: { noun: 'tomo', modifiers: [ 'tawa', 'kon' ] }
}
*/
```

Of course, you can parse multiple nouns by overwriting `text` in code and using it in the next call to `nextNoun()`.

## Verbs

A verb's typedef looks a lot simpler, like this:

```ts
type Verb = string | {
    verb: string, // The verb itself (ex. 'pali')
    modifiers?: string[], // The modifiers (ex. ['lili'])
    ala?: boolean, // Same as in Noun.ala
    alax?: string[], // Same as in Noun.alax
    o?: boolean, // Same as in Noun.o, but in toki pona o precedes the verbs
    a?: boolean // Same as in Noun.a
};
```

Example of using `nextVerb()` (may also be used for parsing a pronoun):

```ts
let text = "nasa ala nasa", verb: tokipona.Verb, isValid, isLast;
[verb, text, isValid, isLast] = tokipona.nextNoun(text);
console.log(noun);
/*
{
  noun: 'nasa',
  alax: [ 'nasa' ]
}
*/
```

## Explanation of returned items

- `noun/verb = ret[0]` is the parsed noun/verb;
- `text = ret[1]` is the remaining text (may be modified a little bit while parsing nouns, but that does not affect the parsing);
- `isValid = ret[2]` is whether the returned noun or verb is valid;
- `isLast = ret[3]` is whether the returned noun or verb is the last one in the respective sentence.