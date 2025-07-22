/**
 * Copyright (C) 2024 Graz University of Technology.
 * 
 * invenio-e2e is free software; you can redistribute it and/or
 * modify it under the terms of the ISC License; see LICENSE file for more
 * details.
 */

import { expect, test } from '../fixtures/services';

test.describe('TU Graz Services Pattern Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://repository.tugraz.at/');
  });

  test('should demonstrate basic services functionality', async ({ services, serviceConfig }) => {
    expect(serviceConfig.name).toBe('TU Graz Repository');
    expect(services.i18n.languages).toEqual(['en', 'de']);
    expect(services.i18n.defaultLanguage).toBe('en');
    
    const homeTitle = services.i18n.t('page.title', 'en');
    expect(homeTitle).toBe('Home');
    
    const germanTitle = services.i18n.t('page.title', 'de');
    expect(germanTitle).toBe('Startseite');
  });

  test('should demonstrate language switching capability', async ({ services, page }) => {
    const supportedLanguages = services.i18n.languages;
    expect(supportedLanguages).toEqual(['en', 'de']);
    
    // Language switching now handled by basePage.toggleLocale()
    for (const language of supportedLanguages) {
      console.log(`Testing language: ${language}`);
    }
  });

  test('should demonstrate service composition', async ({ services }) => {
    const searchPlaceholder = services.i18n.t('search.placeholder', 'en');
    expect(searchPlaceholder).toBe('Search...');

    const germanPlaceholder = services.i18n.t('search.placeholder', 'de');
    expect(germanPlaceholder).toBe('Suchen...');
    
    const unknownKey = services.i18n.t('nonexistent.key');
    expect(unknownKey).toBe('[nonexistent.key]');
  });

  test('should demonstrate repository navigation', async ({ services, page }) => {
    await services.repository.goto(page);
    
    expect(services.repository.name).toBe('TU Graz Repository');
    expect(services.repository.url).toBe('https://repository.tugraz.at/');
  });
}); 