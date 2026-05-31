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

test.describe('Authors layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify Authors Dashboard Functionality', async ({ page }) => {
        // Navigate to Authors page
        await clickMenuAndOption(page, 'Journal', 'Authors');
        // Check page header Journal/Authors
        const pageHeader = page.getByRole('heading', { name: 'Journal/Authors' });
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
        await fillFilterInput(filterPanel, 'Lamia Ferdous', 0);
        // Email Input
        await fillFilterInput(filterPanel, 'F2T5o@example.com', 1);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 2);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin', 3);
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
    test('should verify Update Author Functionality', async ({ page }) => {
        // Navigate to Authors page
        await clickMenuAndOption(page, 'Journal', 'Authors');
        // Check page header Journal/Authors
        const pageHeader = page.getByRole('heading', { name: 'Journal/Authors' });
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
        //const updateTitle = page.getByText('Update Author', { exact: true });
        //await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Name Input
        await fillInputByLabel(page, /name/i, 'Grada Shield');
        // Email Input
        await fillInputByLabel(page, /email/i, 'F2T5o@example.com');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify create Author Functionality', async ({ page }) => {
        // Navigate to Authors page
        await clickMenuAndOption(page, 'Journal', 'Authors');
        // Check page header Journal/Authors
        const pageHeader = page.getByRole('heading', { name: 'Journal/Authors' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Author page to load
        // const addTitle = page.getByText('Add Author', { exact: true });
        //await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Name Input
        await fillInputByLabel(page, /name/i, 'Habib Ullah');
        // Email Input
        await fillInputByLabel(page, /email/i, 'habibo@example.com');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
