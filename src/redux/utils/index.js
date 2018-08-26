import _ from 'lodash';
import names from '../../constants/names';

const randomNames = _.shuffle(names);

export const updateMessageObjects = posts =>
  posts.map(post => ({ ...post, name: randomNames[post.userId] }));
export const updateMessageObject = message => ({
  ...message,
  name: randomNames[message.userId],
});
