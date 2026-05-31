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

test.describe('Downloads layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify Download Dashboard Functionality', async ({ page }) => {
        // Navigate to Downloads page
        await clickMenuAndOption(page, 'Journal', 'Downloads');
        // Check page header Journal/Downloads
        const pageHeader = page.getByRole('heading', { name: 'Journal / Downloads' });
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
        //  Title  Input
        await fillFilterInput(filterPanel, 'Test Title', 0);
        // Type Input
        await fillFilterInput(filterPanel, 'copyright', 1);
        // File Input
        await fillFilterInput(filterPanel, 'Test File', 2);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 3);
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
    test('should verify update Download Functionality', async ({ page }) => {
        // Navigate to Downloads page
        await clickMenuAndOption(page, 'Journal', 'Downloads');
        // Check page header Journal/Downloads
        const pageHeader = page.getByRole('heading', { name: 'Journal / Downloads' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'Title', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Wait for Update Articles page to load
        const updateTitle = page.getByText('Update Download', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Type Dropdown
        await selectDropdown(page, 'CALL FOR PAPER', '[role="combobox"]:nth(1)');
        // Title Input
        await fillInputByLabel(page, /title/i, 'Test Title');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // File upload
        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles('./tests/fixtures/test.pdf');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify create Download Functionality', async ({ page }) => {
        // Navigate to Downloads page
        await clickMenuAndOption(page, 'Journal', 'Downloads');
        // Check page header Journal/Downloads
        const pageHeader = page.getByRole('heading', { name: 'Journal / Downloads' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Type Dropdown
        await selectDropdown(page, 'CALL FOR PAPER', '[role="combobox"]:nth(1)');
        // Title Input
        await fillInputByLabel(page, /title/i, 'Test Title');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // File upload
        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles('./tests/fixtures/test.pdf');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
