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
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Volume layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify Volume Dashboard Functionality', async ({ page }) => {
        // Navigate to Volumes page
        await clickMenuAndOption(page, 'Journal', 'Volume');
        // Check page header Journal/Volume
        const pageHeader = page.getByRole('heading', { name: 'Journal/Volume' });
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
        //  Name Input
        await fillFilterInput(filterPanel, 'Volume no 02, Issue No.12,April 2023', 0);
        // Index Input
        await fillFilterInput(filterPanel, '1', 1);
        // Volume number Input
        await fillFilterInput(filterPanel, '2', 2);
        // Issue No
        await fillFilterInput(filterPanel, '12', 3);
        // Publication Date
        await fillFilterInput(filterPanel, 'April 2023', 4);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 5);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin', 6);
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
    test('should verify Update Volume Functionality', async ({ page }) => {
        // Navigate to Volumes page
        await clickMenuAndOption(page, 'Journal', 'Volume');
        // Check page header Journal/Volume
        const pageHeader = page.getByRole('heading', { name: 'Journal/Volume' });
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
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Volume', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Index Input
        const indexInput = page.locator('#index');
        await expect(indexInput).toBeVisible({ timeout: 120000 });
        await indexInput.fill('2');
        // Name Input
        await fillInputByLabel(page, /name/i, 'Volume no 02, Issue No.12,April 2023');
        // Publication Date Input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Volume number Input
        await fillInputByLabel(page, /volume number/i, '2');
        // Issue No Input
        await fillInputByLabel(page, /issue no/i, '12');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add Volume Functionality', async ({ page }) => {
        // Navigate to Volumes page
        await clickMenuAndOption(page, 'Journal', 'Volume');
        // Check page header Journal/Volume
        const pageHeader = page.getByRole('heading', { name: 'Journal/Volume' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Volume page to load
        const addTitle = page.getByText('Add Volume', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Index Input
        const indexInput = page.locator('#index');
        await expect(indexInput).toBeVisible({ timeout: 120000 });
        await indexInput.fill('2');
        // Name Input
        await fillInputByLabel(page, /name/i, 'Volume no 03, Issue No.2,April 2027');
        // Publication Date Input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Volume number Input
        await fillInputByLabel(page, /volume number/i, '3');
        // Issue No Input
        await fillInputByLabel(page, /issue no/i, '2');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
