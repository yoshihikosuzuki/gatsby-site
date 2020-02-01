// @flow strict
import getContactHref from './get-contact-href';

test('getContactHref', () => {
  expect(getContactHref('twitter', '#')).toBe('https://www.twitter.com/#');
  expect(getContactHref('github', '#')).toBe('https://github.com/#');
  expect(getContactHref('qiita', '#')).toBe('https://qiita.com/#');
  expect(getContactHref('booklog', '#')).toBe('https://booklog.jp/users/#');
});
