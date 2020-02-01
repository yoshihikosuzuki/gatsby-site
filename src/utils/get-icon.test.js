// @flow strict
import getIcon from './get-icon';
import { ICONS } from '../constants';

test('getIcon', () => {
  expect(getIcon('twitter')).toBe(ICONS.TWITTER);
  expect(getIcon('github')).toBe(ICONS.GITHUB);
  expect(getIcon('qiita')).toBe(ICONS.QIITA);
  expect(getIcon('booklog')).toBe(ICONS.BOOKLOG);
});