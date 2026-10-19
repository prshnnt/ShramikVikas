export const personalSections = ['education', 'interests', 'skills', 'career', 'geography'];
export const latestCompletionYear = new Date().getFullYear() + 10;
import { personalEn } from '../../app/i18n/locales/personal';
export function preferenceLabel(t, kind, id) { const key = `personal.${kind}.${id}`; return key in personalEn ? t(key) : id; }
