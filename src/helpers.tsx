import Controlled from './pages/Controlled';
import MainPage from './pages/MainPage';
import Uncontrolled from './pages/Uncontrolled';
import * as yup from 'yup';
import { IFormData } from './types';

export const paths = [
  {
    path: '/ReactRS/',
    element: <MainPage />,
    id: 'mainpage',
    description: 'Home',
  },
  {
    path: '/ReactRS/uncontrol',
    element: <Uncontrolled />,
    id: 'uncotrol',
    description: 'Uncontrolled form',
  },
  {
    path: '/ReactRS/control',
    element: <Controlled />,
    id: 'control',
    description: 'Controlled form',
  },
];

export const inputs = [
  { type: 'text', label: 'name', labelValue: 'Your name', id: 1 },
  { type: 'number', label: 'age', labelValue: 'How old are you?', id: 2 },
  { type: 'email', label: 'email', labelValue: 'Email', id: 3 },
  { type: 'password', label: 'password', labelValue: 'Password', id: 4 },
  {
    type: 'password',
    label: 'confrimPassword',
    labelValue: 'Confirm your password',
    id: 5,
  },
  { type: 'select', label: 'gender', labelValue: 'Gender', id: 6 },
  {
    type: 'checkbox',
    label: 'acceptTerms',
    labelValue: 'Accept Terms and Conditions agreement',
    id: 7,
  },
  {
    type: 'datalist',
    label: 'country',
    labelValue: 'Choose the country',
    id: 8,
  },
];
export async function convertTo64(file: Blob) {
  try {
    const reader = new FileReader();
    const result = await new Promise<string | ArrayBuffer | null>(
      (resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      }
    );

    return result;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

export function countries() {
  return [
    'Афганистан',
    'Албания',
    'Антарктика',
    'Алжир',
    'Американское Самоа',
    'Андора',
    'Ангола',
    'Антигуа и Барбуда',
    'Азербайджан',
    'Аргентина',
    'Австралия',
    'Австрия',
    'Багамские Острова',
    'Бахрейн',
    'Бангладеш',
    'Армения',
    'Барбадос',
    'Бельгия',
    'Бермудские Острова',
    'Бутан',
    'Боливия',
    'Босния и Герцеговина',
    'Ботсвана',
    'Остров Буве',
    'Бразилия',
    'Белиз',
    'Британская территория в Индийском океане',
    'Соломоновы Острова',
    'Британские Виргинские острова',
    'Бруней',
    'Болгария',
    'Мьянма',
    'Бурунди',
    'Белоруссия',
    'Камбоджа',
    'Камерун',
    'Канада',
    'Кабо-Верде',
    'Каймановы острова',
    'Центральноафриканская Республика',
    'Шри-Ланка',
    'Чад',
    'Чили',
    'Китайская Народная Республика',
    'Остров Рождества',
    'Кокосовые острова',
    'Колумбия',
    'Коморы',
    'Майотта',
    'Республика Конго',
    'Демократическая Республика Конго',
    'Острова Кука',
    'Коста-Рика',
    'Хорватия',
    'Куба',
    'Кипр',
    'Чехия',
    'Бенин',
    'Дания',
    'Доминика',
    'Доминиканская Республика',
    'Эквадор',
    'Сальвадор',
    'Экваториальная Гвинея',
    'Эфиопия',
    'Эритрея',
    'Эстония',
    'Фарерские острова',
    'Фолклендские острова',
    'Южная Георгия и Южные Сандвичевы острова',
    'Фиджи',
    'Финляндия',
    'Аландские острова',
    'Франция',
    'Французская Гвиана',
    'Французская Полинезия',
    'Французские Южные и Антарктические территории',
    'Джибути',
    'Габон',
    'Грузия',
    'Гамбия',
    'Палестина',
    'Германия',
    'Гана',
    'Гибралтар',
    'Кирибати',
    'Греция',
    'Гренландия',
    'Гренада',
    'Гваделупа',
    'Гуам',
    'Гватемала',
    'Гвинея',
    'Гайана',
    'Республика Гаити',
    'Остров Херд и острова Макдональд',
    'Ватикан',
    'Гондурас',
    'Гонконг',
    'Венгрия',
    'Исландия',
    'Индия',
    'Индонезия',
    'Иран',
    'Ирак',
    'Ирландия',
    'Израиль',
    'Италия',
    'Кот-д’Ивуар',
    'Ямайка',
    'Япония',
    'Казахстан',
    'Иордания',
    'Кения',
    'КНДР',
    'Республика Корея',
    'Кувейт',
    'Киргизия',
    'Лаос',
    'Ливан',
    'Лесото',
    'Латвия',
    'Либерия',
    'Ливия',
    'Лихтенштейн',
    'Литва',
    'Люксембург',
    'Макао',
    'Мадагаскар',
    'Малави',
    'Малайзия',
    'Мальдивы',
    'Мали',
    'Мальта',
    'Мартиника',
    'Мавритания',
    'Маврикий',
    'Мексика',
    'Монако',
    'Монголия',
    'Молдавия',
    'Черногория',
    'Монтсеррат',
    'Марокко',
    'Мозамбик',
    'Оман',
    'Намибия',
    'Науру',
    'Непал',
    'Нидерланды',
    'Кюрасао',
    'Аруба',
    'Синт-Мартен',
    'Бонэйр, Синт-Эстатиус и Саба',
    'Новая Каледония',
    'Вануату',
    'Новая Зеландия',
    'Никарагуа',
    'Нигер',
    'Нигерия',
    'Ниуэ',
    'Норфолк',
    'Норвегия',
    'Северные Марианские острова',
    'Внешние малые острова США',
    'Микронезия',
    'Маршалловы Острова',
    'Палау',
    'Пакистан',
    'Панама',
    'Папуа — Новая Гвинея',
    'Парагвай',
    'Перу',
    'Филиппины',
    'Острова Питкэрн',
    'Польша',
    'Португалия',
    'Гвинея-Бисау',
    'Восточный Тимор',
    'Пуэрто-Рико',
    'Катар',
    'Реюньон',
    'Румыния',
    'Россия',
    'Руанда',
    'Сен-Бартелеми',
    'Острова Святой Елены, Вознесения и Тристан-да-Кунья',
    'Сент-Китс и Невис',
    'Ангилья',
    'Сент-Люсия',
    'Сен-Мартен (Франция)',
    'Сен-Пьер и Микелон',
    'Сент-Винсент и Гренадины',
    'Сан-Марино',
    'Сан-Томе и Принсипи',
    'Саудовская Аравия',
    'Сенегал',
    'Сербия',
    'Сейшельские Острова',
    'Сьерра-Леоне',
    'Сингапур',
    'Словакия',
    'Словения',
    'Сомали',
    'Южно-Африканская Республика',
    'Зимбабве',
    'Испания',
    'Южный Судан',
    'Судан',
    'Западная Сахара',
    'Суринам',
    'Шпицберген и Ян-Майен',
    'Свазиленд',
    'Швеция',
    'Швейцария',
    'Сирия',
    'Таджикистан',
    'Таиланд',
    'Того',
    'Токелау',
    'Тонга',
    'Тринидад и Тобаго',
    'Объединённые Арабские Эмираты',
    'Тунис',
    'Турция',
    'Туркмения',
    'Теркс и Кайкос',
    'Тувалу',
    'Уганда',
    'Украина',
    'Республика Македония',
    'Египет',
    'Великобритания',
    'Гернси',
    'Джерси',
    'Остров Мэн',
    'Танзания',
    'Соединённые Штаты Америки',
    'Виргинские Острова',
    'Буркина-Фасо',
    'Уругвай',
    'Узбекистан',
    'Венесуэла',
    'Уоллис и Футуна',
    'Самоа',
    'Йемен',
    'Замбия',
  ];
}

export async function collectChanges(
  formFromStore: IFormData | null,
  currentForm: { [x: string]: FormDataEntryValue }
) {
  const changes = [];
  for (const prop in currentForm) {
    if (prop !== 'avatar' && currentForm[prop as keyof IFormData] !== '') {
      if (formFromStore && formFromStore[prop as keyof IFormData]) {
        if (
          currentForm[prop as keyof IFormData] !==
          formFromStore[prop as keyof IFormData]           
        ) {
          changes.push({
            title: prop,
            value: currentForm[prop as keyof IFormData],
          });
        }
      } else {
        changes.push({
          title: prop,
          value: currentForm[prop as keyof IFormData],
        });
      }
    }
  }
  return changes;
}
export const formSchema = yup.object().shape({
  name: yup
    .string()
    .test(
      'First letters check',
      'Name must be started with Capitalize letter',
      (value) => {
        const noValid = value
          ?.split(' ')
          .find((word) => !/[A-ZА-Я]/.test(word.charAt(0)));
        if (noValid) {
          return false;
        }
        return true;
      }
    ),
  age: yup
    .number()
    .positive()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    }),
  email: yup.string().email(),
  password: yup
    .string()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  confrimPassword: yup.string().when('password', (password) => {
    if (password[0]) {
      return yup
        .string()
        .required()
        .oneOf([yup.ref('password')], 'Passwords must match');
    } else {
      return yup.string().notRequired();
    }
  }),
  gender: yup.string(),
  acceptTerms: yup.string(),
  "avatar": yup.mixed<File | FileList>().test('fileFormat', 'Only png and jpeg files are allowed', (value?: File | FileList) => {
      if (value) {
        const supportedFormats = ['png', 'jpeg', 'jpg'];
        let fileExtension: string | undefined = '';
        if(value instanceof FileList) {
          if(value.length === 0) return true;
          fileExtension = value[0].name?.split('.').pop()?.toLowerCase()
        } else {
          if(value.name === '') return true;
          fileExtension = value.name?.split('.').pop()?.toLowerCase();
        }
        return supportedFormats.includes(fileExtension || '');
      }
      return true;
    })
    .test('fileSize', 'File size must be less than 3MB', (value?: File | FileList) => {
      if(value instanceof FileList) {
        if(value.length === 0) return true;
        return value[0].size <= 3145728
      } else {
        if((value as File).name === '') return true;
        return (value as File).size <= 3145728
      }
    }),
  datalist: yup.string(),
});
