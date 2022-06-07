/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {numberOfLettersAndEllipsis} from '../src/utils/helpers';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

test('String should be max amount of letters', () => {
  const str = numberOfLettersAndEllipsis(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam doloremque laudantium, necessitatibus impedit, vitae recusandae qui cumque dolorem alias eius, ratione accusantium possimus iste eos molestias rem exercitationem eaque. Maxime.',
    50,
  );
  expect(str.length).toEqual(50);
  const str2 = numberOfLettersAndEllipsis('Lorem ipsum dolor sit amet ', 50);
  expect(str2.length).toBeLessThanOrEqual(50);
  const str3 = numberOfLettersAndEllipsis('', 50);
  expect(str3.length).toBeLessThanOrEqual(50);
});
