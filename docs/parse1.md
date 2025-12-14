# Parsing syllables and words

## Syllables
In toki pona, there are 90 - 8 = 82 valid syllables. This library can automatically parse syllables from text, ignoring all the invalid letters and detecting invalid syllables, as well as detecting syllables that start an unofficial word (starting with a capital letter).

```ts
let syllable, isValid, hasSeparator, hasStop, hasColon, text = "sitelen";
[syllable, text, isValid, hasSeparator, hasStop, hasColon] = tokipona.nextSyllable(text); // syllable = 'si', text = 'telen'

[syllable, text] = tokipona.nextSyllable(text); // syllable = 'te', text = 'len'
[syllable, text] = tokipona.nextSyllable(text); // syllable = 'len', text = ''
```

Here:
- `syllable = ret[0]` is the next syllable in the text;
- `text = ret[1]` is the remaning text without the syllable;
- `isValid = ret[2]` is whether the syllable is on the list of valid syllables;
- `hasSeparator = ret[3]` is whether there is a separator after the returned syllable (such as a space, a dot or a comma);
- `hasStop = ret[4]` is whether the separator is a full stop (one of `!;:.?`);
- `hasColon = ret[5]` is whether the separator is a colon.

## Words
In toki pona, not every word is valid, either. `nextWord` returns the `isValid` flag if the word is on the list or if the word is unofficial.

```ts
let text = "mi toki e toki pona! jan Wata toki ala e toki pona.", word, isValid, isLast, isUnofficial, hasColon;
[word, text, isValid, isLast, isUnofficial, hasColon] = tokipona.nextWord(text); // word = 'mi', text = 'toki e...'

[word, text, isValid, isLast, isUnofficial, hasColon] = tokipona.nextWord(text); // word = 'toki', text = 'e toki...'
[word, text, isValid, isLast, isUnofficial, hasColon] = tokipona.nextWord(text); // word = 'e'
```

Here:
- `word = ret[0]` is the word itself;
- `text = ret[1]` is the remaining text after the word;
- `isValid = ret[2]` is whether the word is valid;
- `isLast = ret[3]` is whether the word the last in its sentence;
- `isUnofficial = ret[4]` is whether it's an unofficial word;
- `hasColon = ret[5]` is whether the word has a colon after it.