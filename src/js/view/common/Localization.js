import LocalizedStrings from 'react-localization';

const localization = new LocalizedStrings({
  en: {
    navBar: {
      courses: 'courses',
      ctcourses: 'CT Preparation',
      about: 'about',
      howtofind: 'howtofind',
      contact: 'contact',
    },
    courses: {
      title: 'courses',
    },
    ctcourses: {
      title: 'CT Preparation',
    },
    about: {
      title: 'about',
    },
    howToFind: {
      title: 'how to find',
    },
    contactMe: {
      title: 'contact me',
      name: 'name',
      email: 'email',
      phone: 'phone number',
      message: 'message',
      hintName: 'please enter your name.',
      hintEmail: 'please enter your email.',
      hintPhone: 'please enter your phone number.',
      hintMessage: 'please enter a message.',
      send: 'send',
    },
    footer: {
      aroundTheWeb: 'around the web',
    },
    buttons: {
      closeBtn: 'Close',
    },

  },
  by: {
    navBar: {
      courses: 'курсы',
      ctcourses: 'падрыхтоўка да ЦТ',
      about: 'пра нас',
      howtofind: 'як дабрацца',
      contact: 'кантакты',
    },
    courses: {
      title: 'курсы',
    },
    ctcourses: {
      title: 'падрыхтоўка да ЦТ',
    },
    about: {
      title: 'пра нас',
    },
    howToFind: {
      title: 'як дабрацца',
    },
    contactMe: {
      title: 'зваротная сувязь',
      name: 'імя',
      email: 'паштовая скрыня (email)',
      phone: 'тэлефонны нумар',
      message: 'паведамленне',
      hintName: 'калі ласка ўвядзіце ваша імя.',
      hintEmail: 'калі ласка ўвядзіце вашу скрыню.',
      hintPhone: 'калі ласка ўвядзіце вашe нумар.',
      hintMessage: 'калі ласка ўвядзіце паведамленне.',
      send: 'адправіць',
    },
    footer: {
      aroundTheWeb: 'мы ў сац. сетках',
    },
    buttons: {
      closeBtn: 'Закрыць',
    },
  },
});

localization.setLanguage('by');

export default localization;
