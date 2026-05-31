import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
    clickMenuAndOption,
    clickNewButton,
    clickSaveOrSubmitButton,
    closeFilterPanel,
    fillFilterInput,
    fillInputByLabel,
    login,
    resetFilter,
    selectDropdown,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Articles layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify Article Dashboard Functionality', async ({ page }) => {
        // Navigate to Articles page
        await clickMenuAndOption(page, 'Journal', 'Articles');
        // Check page header Journal/Articles
        const pageHeader = page.getByRole('heading', { name: 'Journal/Articles' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'B2B-1');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['2min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        //  Index Input
        await fillFilterInput(filterPanel, '1', 0);
        // Title Input
        await fillFilterInput(filterPanel, 'Test Title', 1);
        // Volume Input
        await fillFilterInput(filterPanel, '10', 2);
        // Volume No Input
        await fillFilterInput(filterPanel, '1', 3);
        // Authors Input
        await fillFilterInput(filterPanel, 'John Doe', 4);
        // Keywords Input
        await fillFilterInput(filterPanel, 'Testing', 5);
        // File Input
        await fillFilterInput(filterPanel, 'Test File', 6);
        // Abstract Input
        await fillFilterInput(filterPanel, 'Test Abstract', 7);
        // References Input
        await fillFilterInput(filterPanel, 'Test References', 8);
        // Conclusion Input
        await fillFilterInput(filterPanel, 'Test Conclusion', 9);
        // Date Input
        await fillFilterInput(filterPanel, '2024-01-01', 10);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 11);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin', 12);
        //close filter panel
        await closeFilterPanel(filterPanel);
        // Reset Filter button
        await resetFilter(filterButton, USER_FIELD.FILTER_BUTTON);
        // Toggle Column and Actions
        await toggleColumnAndActions({
            page,
            filterButton,
            toggleSearchSelector: USER_FIELD.TOGGLE_SEARCH,
            togglePanelSelector: USER_FIELD.TOGGLE_PANEL,
            toggleFieldSelector: USER_FIELD.TOGGLE_FIELD_NAME,
            downloadButtonSelector: USER_FIELD.PDF_BUTTON,
            refreshButtonSelector: USER_FIELD.REFRESH_BUTTON,
        });
    });
    test('should verify update Article Details Functionality', async ({ page }) => {
        // Navigate to Articles page
        await clickMenuAndOption(page, 'Journal', 'Articles');
        // Check page header Journal/Articles
        const pageHeader = page.getByRole('heading', { name: 'Journal/Articles' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'Index', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update Articles page to load
        const updateTitle = page.getByText('Edit Article', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Index Input
        const indexInput = page.locator('#index'); 
        await expect(indexInput).toBeVisible({ timeout: 120000 });
        await indexInput.fill('2');
        // Volume dropdown
        await selectDropdown(page, 'Test', '[role="combobox"]:nth(0)');
        // Fill Title Input
        await fillInputByLabel(
            page,
            /title/i,
            'Assessing Groundwater Pricing and Consumption Behavior in the North-Western Bangladesh: Proposing Sustainable and Equitable Models for Irrigation Management'
        );
        // Published Date input
        //await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // fill Abstract Input
        const abstractEditor = page.locator('div:has-text("Abstract")').locator('div[contenteditable="true"]').first();
        await abstractEditor.fill('Your abstract text here');
        // Fill Conclusion Input
        const conclusionEditor = page
            .locator('div:has-text("Conclusion")')
            .locator('div[contenteditable="true"]')
            .nth(1);
        await conclusionEditor.fill('Your conclusion text here');
        // Fill References Input
        const referenceEditor = page.locator('div:has-text("Reference")').locator('div[contenteditable="true"]').nth(2);
        await referenceEditor.fill('Your reference text here');
        // Article PDF Upload
        const pdfInput = page.locator('input[type="file"]').first();
        await pdfInput.setInputFiles('./tests/fixtures/test.pdf');
        // Fill DOI Input
        await fillInputByLabel(page, /doi/i, '10.1234/example.doi');
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);

        // File upload
        // Wait for the input to exist (even if hidden)
        const imageInput = page.locator('input[type="file"]').nth(5);
        await imageInput.waitFor({ state: 'attached', timeout: 60000 });

        await imageInput.setInputFiles('tests/fixtures/testpic.png');
        // Click on Save button
        //await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify create Article Functionality', async ({ page }) => {
        // Navigate to Articles page
        await clickMenuAndOption(page, 'Journal', 'Articles');
        // Check page header Journal/Articles
        const pageHeader = page.getByRole('heading', { name: 'Journal/Articles' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for add new Articles page to load
        const createTitle = page.getByText('Add New Article', { exact: true });
        await expect(createTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Index Input
        const indexInput = page.locator('#index'); // direct by id
        await expect(indexInput).toBeVisible({ timeout: 120000 });
        await indexInput.fill('2');
        // Volume dropdown
        await selectDropdown(page, 'Test', '[role="combobox"]:nth(0)');
        // Fill Title Input
        await fillInputByLabel(
            page,
            /title/i,
            'Assessing Groundwater Pricing and Consumption Behavior in the North-Western Bangladesh: Proposing Sustainable and Equitable Models for Irrigation Management'
        );
        // Check Authors dropdown
        await selectDropdown(page, 'Author 2', '[role="group"]:nth(1)');
        // Check Keywords dropdown
        await selectDropdown(page, 'Keyword 2', '[role="group"]:nth(2)');
        // Published Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // fill Abstract Input
        const abstractEditor = page.locator('div:has-text("Abstract")').locator('div[contenteditable="true"]').first();
        await abstractEditor.fill('Your abstract text here');
        // Fill Conclusion Input
        const conclusionEditor = page
            .locator('div:has-text("Conclusion")')
            .locator('div[contenteditable="true"]')
            .nth(1);
        await conclusionEditor.fill('Your conclusion text here');
        // Fill References Input
        const referenceEditor = page.locator('div:has-text("Reference")').locator('div[contenteditable="true"]').nth(2);
        await referenceEditor.fill('Your reference text here');
        // Article PDF Upload
        const pdfInput = page.locator('input[type="file"]').first();
        await pdfInput.setInputFiles('./tests/fixtures/test.pdf');
        // Fill DOI Input
        await fillInputByLabel(page, /doi/i, '10.1234/example.doi');
        // new button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for the input to exist (even if hidden)
        const imageInput = page.locator('input[type="file"]').nth(1);
        await imageInput.waitFor({ state: 'attached', timeout: 60000 });

        await imageInput.setInputFiles('tests/fixtures/testpic.png');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
