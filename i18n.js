const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['id'],
  localePath: 'public/static/locales'
});

// const NextI18Next = require('next-i18next/dist/commonjs').default;

// module.exports = new NextI18Next({
//   defaultLanguage: 'en',
//   otherLanguages: ['id'],
//   strictMode: false
// });