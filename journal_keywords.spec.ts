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

test.describe('Keywords layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify Keywords Dashboard Functionality', async ({ page }) => {
        // Navigate to Keywords page
        await clickMenuAndOption(page, 'Journal', 'Keywords');
        // Check page header Journal/Keywords
        const pageHeader = page.getByRole('heading', { name: 'Journal/Keywords' });
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
        await fillFilterInput(filterPanel, 'Resource equity', 0);
        // remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 1);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin', 2);
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
    test('should verify update Keyword Functionality', async ({ page }) => {
        // Navigate to Keywords page
        await clickMenuAndOption(page, 'Journal', 'Keywords');
        // Check page header Journal/Keywords
        const pageHeader = page.getByRole('heading', { name: 'Journal/Keywords' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'Name', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Keyword', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Name Input
        await fillInputByLabel(page, /name/i, 'Antonish');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify create Keyword Functionality', async ({ page }) => {
        // Navigate to Keywords page
        await clickMenuAndOption(page, 'Journal', 'Keywords');
        // Check page header Journal/Keywords
        const pageHeader = page.getByRole('heading', { name: 'Journal/Keywords' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Keyword page to load
        const addTitle = page.getByText('Add Keyword', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Name Input
        await fillInputByLabel(page, /name/i, 'Ambition');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
