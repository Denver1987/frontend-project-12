import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      required: 'Это обязательное поле',
      yourNick: 'Ваш ник',
      password: 'Пароль',
      enter: 'Войти',
      create: 'Создать',
      cancel: 'Отмена',
      messages_one: '{{count}} сообщениe',
      messages_zero: '{{count}} сообщений',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
      newMessage: 'Новое сообщение',
      noacc: 'Нет аккаунта?',
      logWrong: 'Неверные имя пользователя или пароль',
      registration: 'Регистрация',
      passconf: 'Подтвердите пароль',
      register: 'Зарегистрироваться',
      username: 'Имя пользователя',
      '3-20symb': 'От 3 до 20 символов',
      min6symb: 'Не менее 6 символов',
      passnotconf: 'Пароли должны совпадать',
      send: 'Отправить',
      channels: 'Каналы',
      channelname: 'Имя канала',
      removingChannel: 'Удаление канала',
      renamingChannel: 'Переименование канала',
      channelControl: 'Управление каналом',
      rename: 'Переименовать',
      remove: 'Удалить',
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',
      newChannelName: 'Новое название канала',
      channelexist: 'Такой канал уже существует',
      createChannel: 'Создание нового канала',
      channelName: 'Имя канала',
      sure: 'Уверены?',
      exit: 'Выйти',
      userexist: 'Такой пользователь уже существует',
      networkError: 'Ошибка соединения',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
