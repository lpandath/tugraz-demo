import { Locators as BaseLocators } from '@inveniosoftware/invenio-e2e';

// in this file, extend or overwrite the default locators for your UI

export const locators = {
    header: {
        logoLink: "#repo-logo a",
    },
    homePage: {
        searchField: 'input.prompt[aria-label="Search records..."]',
        searchButton: 'button.search[aria-label="Search"]',
        contactLink: 'a#feedback-form',
    },
    searchPage: {
        searchResultList: 'section[aria-label="Search results"]',
    }
}
export type Locators = BaseLocators & typeof locators;