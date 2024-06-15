export const validateResources = {
  ru: {
    translation: {
      validate: {
        required: 'Это обязательное поле',
        passwordLength:
          'Пароль слишком короткий - он должен содержать не менее 8 символов',
        emailIncorrect: 'Некорректный E-mail',
        date: 'Занчение должно быть датой',
      },
    },
  },
  en: {
    translation: {
      validate: {
        required: `It's required field`,
        passwordLength: 'Password is too short - should be 8 chars minimum',
        emailIncorrect: 'Incorrect E-mail',
        date: 'The value must be a date',
      },
    },
  },
}
