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
    
    const captureOptions = {
      minWordLength: 3,  // skip very short words
      wordPattern: /^[a-zA-ZÀ-ÿäöüÄÖÜß]/, // include German characters
    };
    
    await homePage.expectTranslation("en", "de", captureOptions);
  });

  test('Combined approach: use both methods for testing', async ({ homePage, i18nService }) => {
    await homePage.openPage();
    
    console.log('\n=== TRANSLATION TESTING ===');
    
    await homePage.expectElementTranslations(
      "de",
      "invenio-app-rdm-messages"
    );
    
    console.log('\n--- Finding translation gaps ---');
    await homePage.expectTranslation("en", "de");
    
    console.log('\n--- Verifying language switching ---');
    await i18nService.switchLocale('en');
    await homePage.expectLogoVisible();
    
    await i18nService.switchLocale('de');
    await homePage.expectLogoVisible();
    
    console.log('All translation testing approaches completed');
  });

}); 