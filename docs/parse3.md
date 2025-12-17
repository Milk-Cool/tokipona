# Parsing sentences

A sentence's typedef looks like this:

```ts
type Time = { modifiers?: string[] }; // Ex. { modifiers: ['kama', 'lili'] }
type Action = {
    verb?: Verb, // The verb of the action
    object?: Noun // The object (target) of the action
};
type Sentence = {
    subject?: Noun, // The subject of the sentence; the person, animal or object performing the actions
    actions?: Action[], // The actions, separated by 'li'
    time?: Time, // The time specified in the sentence
    taso?: boolean, // Whether the sentence starts with taso
    la?: Sentence, // If the sentence ends with la, contains the next sentence
    tan?: Sentence, // If the sentence ends with tan, contains the sentence after tan
    interjection?: Interjection, // If the sentence is an interjection, contains the interjection (a string; ex. 'a a a' or 'mu')
    hasColon?: boolean // Whether the sentence ends with a colon; NOT set when parsing (potential TODO)
};
```

Example of using `nextSentence()`:

```ts
let text = "tenpo ni la, jan lili li wile e kili li wile e suwi", sentence, isValid;
[sentence, text, isValid] = tokipona.nextSentence();
console.log(sentence);
/*
{
  time: { modifiers: [ 'ni' ] },
  subject: { noun: 'jan', modifiers: [ 'lili' ] },
  actions: [
    { verb: 'wile', subject: 'kili' },
    { verb: { verb: 'wile', modifiers: [ 'suli' ] }, subject: 'suwi' }
  ]
}
*/
```

Here:

- `sentence = ret[0]` is the returned sentence;
- `text = ret[1]` is the remaining text;
- `isValid = ret[2]` is whether the sentence is valid.