/**
 * Copyright (C) 2024 Graz University of Technology.
 * 
 * invenio-e2e is free software; you can redistribute it and/or
 * modify it under the terms of the ISC License; see LICENSE file for more
 * details.
 */

import { createI18nExpect } from '@inveniosoftware/invenio-e2e';
import { expect } from '@playwright/test';
import { test } from '../fixtures/services';

test.describe('TU Graz I18n Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://repository.tugraz.at/');
  });

  test('services functionality works', async ({ services, serviceConfig }) => {

    expect(serviceConfig.name).toBe('TU Graz Repository');
    expect(services.i18n.languages).toEqual(['en', 'de']);
    expect(services.i18n.defaultLanguage).toBe('en');
    
    expect(services.i18n.t('page.title', 'en')).toBe('Home');
    expect(services.i18n.t('page.title', 'de')).toBe('Startseite');
    expect(services.i18n.t('welcome', 'en')).toBe('Welcome');
    expect(services.i18n.t('welcome', 'de')).toBe('Willkommen');
  });

  test('toHaveI18nText functionality', async ({ page, services }) => {
    const i18nExpect = createI18nExpect(services);
    
    // mock content to test toHaveI18nText
    await page.setContent(`
      <div>
        <h1 id="welcome">Welcome</h1>
        <p id="search">Search</p>
        <span id="browse">Browse</span>
      </div>
    `);

    await i18nExpect(page.locator('#welcome')).toHaveI18nText('Welcome', 'messages');
    await i18nExpect(page.locator('#search')).toHaveI18nText('Search', 'messages');
    await i18nExpect(page.locator('#browse')).toHaveI18nText('Browse', 'messages');
    
    console.log('Basic toHaveI18nText works!');
  });

  test('toHaveI18nText with German locale', async ({ page, services }) => {
    const i18nExpect = createI18nExpect(services);
    
    await page.setContent(`
      <div>
        <h1 id="welcome">Willkommen</h1>
        <p id="search">Suchen</p>
        <span id="browse">Durchsuchen</span>
      </div>
    `);

    await i18nExpect(page.locator('#welcome')).toHaveI18nText('Welcome', 'messages', { locale: 'de' });
    await i18nExpect(page.locator('#search')).toHaveI18nText('Search', 'messages', { locale: 'de' });
    await i18nExpect(page.locator('#browse')).toHaveI18nText('Browse', 'messages', { locale: 'de' });
    
    console.log('German locale toHaveI18nText works!');
  });

  test('language switching demo', async ({ serviceHomePage }) => {
    const repoInfo = serviceHomePage.getRepositoryInfo();
    expect(repoInfo.name).toBe('TU Graz Repository');
    expect(repoInfo.supportedLanguages).toEqual(['en', 'de']);
    
    try {
      await serviceHomePage.toggleLocale('de');
      console.log('Language switching attempted');
    } catch (error) {
      console.log('Language switching not available');
    }
    
    await serviceHomePage.validatePageLoaded();
  });

  test('translation error handling', async ({ services }) => {
    const missingKey = services.i18n.t('nonexistent.key');
    expect(missingKey).toBe('[nonexistent.key]');
    
    console.log('Translation services working!');
  });
}); 