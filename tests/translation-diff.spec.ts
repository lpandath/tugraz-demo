import { test } from '../fixtures';

test.describe('TU Graz Repository translation testing', () => {
  
  test('Key-based testing: Verify specific UI elements have translations', async ({ homePage }) => {
    await homePage.openPage();
    
    await homePage.expectElementTranslations(
      "de",
      "invenio-app-rdm-messages"
    );
  });

  test('Diff-based testing: Find untranslated content using mentor\'s approach', async ({ homePage }) => {
    await homePage.openPage();
    
    // test with words mode to see the difference
    const wordsOptions = {
      minWordLength: 3,
      wordPattern: /^[a-zA-ZÀ-ÿäöüÄÖÜß]/,
      captureMode: 'words' as const
    };
    
    await homePage.expectTranslation("en", "de", wordsOptions);
    
    // Test with chunks mode (default)  
    await homePage.expectTranslation("en", "de");
  });

  test('Combined approach: use both methods for testing', async ({ homePage, i18nService }) => {
    await homePage.openPage();
    
    await homePage.expectElementTranslations(
      "de",
      "invenio-app-rdm-messages"
    );
    
    await homePage.expectTranslation("en", "de");
    
    await i18nService.switchLocale('en');
    await homePage.expectLogoVisible();
    
    await i18nService.switchLocale('de');
    await homePage.expectLogoVisible();
  });

}); 