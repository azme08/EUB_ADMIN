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

test.describe('Notices layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify Notices Dashboard Functionality', async ({ page }) => {
        // Click "Journal"
        const journal = page.getByText('Journal', { exact: true }).first();
        await expect(journal).toBeVisible({ timeout: TEST_TIME['5min'] });
        await journal.click();
        // Click "Notices"
        const notices = page.getByText('Notices', { exact: true }).first();
        await expect(notices).toBeVisible({ timeout: TEST_TIME['5min'] });
        await notices.click();
        // Check page header Journal/Notices
        const pageHeader = page.getByRole('heading', { name: 'Journal / Notices' });
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
        // Offer Input
        await fillFilterInput(filterPanel, 'True', 0);
        // ID Input
        await fillFilterInput(filterPanel, '1', 1);
        // Description Input
        await fillFilterInput(filterPanel, 'Test Description', 2);
        // File Input
        await fillFilterInput(filterPanel, 'Test File', 3);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 4);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin', 5);
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
    test('should verify update Notice Functionality', async ({ page }) => {
        // Click "Journal"
        const journal = page.getByText('Journal', { exact: true }).first();
        await expect(journal).toBeVisible({ timeout: TEST_TIME['5min'] });
        await journal.click();
        // Click "Notices"
        const notices = page.getByText('Notices', { exact: true }).first();
        await expect(notices).toBeVisible({ timeout: TEST_TIME['5min'] });
        await notices.click();
        // Check page header Journal/Notices
        const pageHeader = page.getByRole('heading', { name: 'Journal / Notices' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Sort Table by Column
        await sortTableByColumn(
            page,
            table,
            'ID', // Column name to sort by
            'Ascending', // or 'Descending'
            TEST_TIME['2min']
        );
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['2min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Update Doc Upload', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Description Input
        await fillInputByLabel(page, /description/i, 'Test Description');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // PDF Upload
        const pdfInput = page.locator('input[type="file"]').first();
        await pdfInput.setInputFiles('./tests/fixtures/test.pdf');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add Notice Functionality', async ({ page }) => {
        // Click "Journal"
        const journal = page.getByText('Journal', { exact: true }).first();
        await expect(journal).toBeVisible({ timeout: TEST_TIME['5min'] });
        await journal.click();
        // Click "Notices"
        const notices = page.getByText('Notices', { exact: true }).first();
        await expect(notices).toBeVisible({ timeout: TEST_TIME['5min'] });
        await notices.click();
        // Check page header Journal/Notices
        const pageHeader = page.getByRole('heading', { name: 'Journal / Notices' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Description Input
        await fillInputByLabel(page, /description/i, 'Test Description');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // PDF Upload
        const pdfInput = page.locator('input[type="file"]').first();
        await pdfInput.setInputFiles('./tests/fixtures/test.pdf');
        // Click on Save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
