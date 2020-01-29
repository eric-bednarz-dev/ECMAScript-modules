import { promise, scope, suite } from '../test.js';
import { json } from './request.js';

const test = suite(import.meta);

scope(test, json)

  ('get GitHub API overview',
    json('https://api.github.com')
      .then(({ authorizations_url }) => [
        authorizations_url,
        'https://api.github.com/authorizations',
      ])
      .catch(error => {
        console.error(error);

        return false;
      }))

  ;

export default promise(test);