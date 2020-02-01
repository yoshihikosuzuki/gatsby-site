// @flow strict
import { ICONS } from '../constants';

const getIcon = (name: string) => {
  let icon;

  switch (name) {
    case 'twitter':
      icon = ICONS.TWITTER;
      break;
    case 'github':
      icon = ICONS.GITHUB;
      break;
    case 'qiita':
      icon = ICONS.QIITA;
      break;
    case 'booklog':
      icon = ICONS.BOOKLOG;
      break;
    default:
      icon = {};
      break;
  }

  return icon;
};

export default getIcon;
