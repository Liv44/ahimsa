import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from '@/translations/fr.json';

const resources = {
  fr: {
    translation: fr,
  },
};

i18n.use(initReactI18next).init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'fr',
  resources,
});

export default i18n;
