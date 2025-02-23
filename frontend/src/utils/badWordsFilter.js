import filter from 'leo-profanity';
import settings from '../settings/settings.js';

export default function badWordsFilter(string) {
  const langs = settings.getBadWordLanguages();
  langs.forEach((lang) => {
    filter.loadDictionary(lang);
    // eslint-disable-next-line no-param-reassign
    string = filter.clean(string);
  });
  return string;
}
