/**
 * Copyright (C) 2024 Graz University of Technology.
 * 
 * invenio-e2e is free software; you can redistribute it and/or
 * modify it under the terms of the ISC License; see LICENSE file for more
 * details.
 */

import { HomePage, type Services, type Locators } from '@inveniosoftware/invenio-e2e';

import { Page } from '@playwright/test';

export class ServiceHomePage<L extends Locators = Locators> extends HomePage<L> {
  constructor({ page, locators, availablePages, services }: {
    page: Page,
    locators: L,
    availablePages: { [key: string]: object },
    services: Services
  }) {
    super({ page, locators, availablePages });
    this.services = services;
  }

  protected services: Services;

  async switchLanguage(language: string) {
    // BasePage.toggleLocale for actual UI interaction
    await this.toggleLocale(language);
  }

  async getLocalizedTitle(): Promise<string> {
    const title = await this.page.title();
    if (this.services?.i18n) {
      return this.services.i18n.t('page.title');
    }
    return title;
  }

  getRepositoryInfo() {
    return {
      name: this.services.repository.name,
      url: this.services.repository.url,
      supportedLanguages: this.services.i18n.languages,
      currentLanguage: this.services.i18n.defaultLanguage
    };
  }

  async goToRepository() {
    await this.services.repository.goto(this.page);
    await this.validatePageLoaded();
  }

  async navigateToSearch() {
    return await this.submitSearch();
  }
} 