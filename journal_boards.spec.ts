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

test.describe('Boards layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify Boards Dashboard Functionality', async ({ page }) => {
        // Navigate to Boards page
        await clickMenuAndOption(page, 'Journal', 'Boards');
        // Check page header Journal/Boards
        const pageHeader = page.getByRole('heading', { name: 'Journal/Boards' });
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
        // Name Input
        await fillFilterInput(filterPanel, 'Muhammad Junayadul Munir', 1);
        // Designation Input
        await fillFilterInput(
            filterPanel,
            'Associate Professor and Chairman, Department of Business Administration (EUB)',
            2
        );
        // Contact Input
        await fillFilterInput(filterPanel, '01815-123456', 3);
        // Type Input
        await fillFilterInput(filterPanel, 'associate-editors', 4);
        // Description Input
        await fillFilterInput(filterPanel, 'Test Description', 5);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 6);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin', 7);
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
    test('should verify update Boards details Functionality', async ({ page }) => {
        // Navigate to Boards page
        await clickMenuAndOption(page, 'Journal', 'Boards');
        // Check page header Journal/Boards
        const pageHeader = page.getByRole('heading', { name: 'Journal/Boards' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'Type', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update Board page to load
        const updateTitle = page.getByText('Update Board', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Index Input
        const indexInput = page.locator('#index');
        await expect(indexInput).toBeVisible({ timeout: 120000 });
        await indexInput.fill('2');
        // Teacher dropdown
        await selectDropdown(page, 'Anisuzzaman - anis@eub.edu.bd', '[role="combobox"]:nth(1)');
        // Type dropdown
        await selectDropdown(page, 'EDITORS', '[role="combobox"]:nth(2)');
        // Email Input
        await fillInputByLabel(page, /email/i, 'test@example.com');
        // Designation Input
        await fillInputByLabel(page, /designation/i, 'Test Designation');
        // Description Input
        await fillInputByLabel(page, /description/i, 'Test Description');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify create Board Functionality', async ({ page }) => {
        // Navigate to Boards page
        await clickMenuAndOption(page, 'Journal', 'Boards');
        // Check page header Journal/Boards
        const pageHeader = page.getByRole('heading', { name: 'Journal/Boards' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add Board page to load
        const addTitle = page.getByText('Add Board', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Index Input
        const indexInput = page.locator('#index');
        await expect(indexInput).toBeVisible({ timeout: 120000 });
        await indexInput.fill('2');
        // Teacher dropdown
        await selectDropdown(page, 'Anisuzzaman - anis@eub.edu.bd', '[role="combobox"]:nth(1)');
        // Type dropdown
        await selectDropdown(page, 'EDITOR CHIEF', '[role="combobox"]:nth(2)');
        // Email Input
        await fillInputByLabel(page, /email/i, 'test@example.com');
        // Designation Input
        await fillInputByLabel(page, /designation/i, 'Test Designation');
        // Description Input
        await fillInputByLabel(page, /description/i, 'Test Description');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
