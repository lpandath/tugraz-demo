import { test as invenio_test, registerPage, updateLocators } from '@inveniosoftware/invenio-e2e';

import { ExtendedHomePage } from '../pages/extendedHomePage';
import { locators } from '../locators';

const tugrazExcludes = [
  '.frontpage-search-results',
  '.recent-submissions',
  '.featured-content',
  '#recent-uploads-section',
  '.thesis-listing',
  '.publication-listing',
  '.research-output',
  '.institutional-content',
  '.about-section',
  '.news-section',
];

export const test = invenio_test.extend({
  // Replace the locators within invenio-e2e with customized ones
  locators: updateLocators(locators),

  // Specific excludes for translation
  excludes: tugrazExcludes,

  // translatableSelectors are inherited from invenio-e2e
  // only override if tugraz needs different selectors

  // Replace the homepage with the extended one that does better validation on
  // our page
  ...registerPage("homePage", ExtendedHomePage),
});
