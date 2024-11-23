export const INPUT_TYPE = {
  name: [
    {
      pattern: /^[A-ZА-Я][a-zа-яA-ZА-Я]*$/,
      message: 'Только латиница или кириллица, первая буква должна быть заглавной.',
    },
    {
      pattern: /^[^\d\s]+$/,
      message: 'Без пробелов и без цифр',
    },
    {
      pattern: /^[\w-_]+$/,
      message: 'Нельзя использовать спецсимволы',
    },
  ],
  login: [
    {
      pattern: /^.{3,20}$/,
      message: 'От 3 до 20 символов',
    },
    {
      pattern: /(?=.*[a-zA-Z])[a-zA-Z0-9_-]+/,
      message: 'Только латиница, может содержать цифры, но не состоять из них',
    },
    {
      pattern: /^[^\s]*$/,
      message: 'Без пробелов и спецсимволов',
    },
  ],
  email: [
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Введите корректный e-mail',
    },
  ],
  password: [
    {
      pattern: /^(?=.{8,40}$)/,
      message: 'Длина пароля не менее 8 и не более 40 символов',
    },
    {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]*$/,
      message: 'Обязательно хотя бы одна заглавная буква и цифра',
    },
  ],
  phone: [
    {
      pattern: /^\+?\d{10,15}$/,
      message: 'Введите коретный телефон',
    },
  ],
  message: [
    {
      pattern: /^(?!\s*$).+/,
      message: 'Нельзя отправить пустое сообщение',
    },
  ],
};

export const validation = (name: keyof typeof INPUT_TYPE, value: string) => {
  for (const currentPattern of INPUT_TYPE[name]) {
    const result = new RegExp(currentPattern.pattern).test(value);
    if (!result) {
      console.log(result);
      return currentPattern.message;
    }
    return '';
  }
};

export const checkValidityForm = (errors: Record<string, string> = {}) => {
  return !Object.values(errors).filter((item) => item).length;
};
