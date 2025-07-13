import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import feelings_and_needs from '@/translations/feelings-and-needs.json';
import fr from '@/translations/fr.json';

const resources = {
  fr: {
    translation: fr,
    feelings_and_needs,
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
