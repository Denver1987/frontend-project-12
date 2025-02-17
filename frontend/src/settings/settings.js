export default {
  channels: {
    defaultChannelId: '1',
  },
  badWords: {
    languages: ['ru', 'en'],
  },
  getDefaultChannelId() {
    return this.channels.defaultChannelId;
  },
  getBadWordLanguages() {
    return this.badWords.languages;
  },
}
