import { CodeTemplate } from './constant';
import jxmlLoader from './index';

test('Should export string equals CodeTemplate', () => {
  expect(jxmlLoader()).toBe(CodeTemplate());
});

test('Should export string equals CodeTemplate with children', () => {
  expect(jxmlLoader('test')).toBe(CodeTemplate('test'));
});
