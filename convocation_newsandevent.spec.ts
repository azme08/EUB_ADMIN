import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    clickActionButtonFromFirstRow,
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

test.describe('News & Events layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify News & Events Dashboard Functionality', async ({ page }) => {
        // Click "Convocation"
        const convocation = page.getByText('Convocation', { exact: true }).first();
        await expect(convocation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await convocation.click();
        // Click "News & Events"
        const notices = page.getByText('News & Events', { exact: true }).nth(2);
        await expect(notices).toBeVisible({ timeout: TEST_TIME['5min'] });
        await notices.click(); // Check page header Convocation / News & Events
        const pageHeader = page.getByRole('heading', { name: 'Convocation / News & Events' });
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
        //  Global Input
        await fillFilterInput(filterPanel, 'false', 0);
        // Title Input
        await fillFilterInput(filterPanel, 'Test Title', 1);
        // Sub Title Input
        await fillFilterInput(filterPanel, 'Test Sub Title', 2);
        // Club Input
        await fillFilterInput(filterPanel, 'Test Club', 3);
        // Description Input
        await fillFilterInput(filterPanel, 'Test Description', 4);
        // Content Input
        await fillFilterInput(filterPanel, 'Test Content', 5);
        // Cover Image Input
        await fillFilterInput(filterPanel, 'Test Cover Image', 6);
        // Published Date Input
        await fillFilterInput(filterPanel, '2024-01-01', 7);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 8);
        //created by input
        await fillFilterInput(filterPanel, 'Admin', 9);
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
    test('should verify Update News & Events Functionality', async ({ page }) => {
        // Click "Convocation"
        const convocation = page.getByText('Convocation', { exact: true }).first();
        await expect(convocation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await convocation.click();
        // Click "News & Events"
        const notices = page.getByText('News & Events', { exact: true }).nth(2);
        await expect(notices).toBeVisible({ timeout: TEST_TIME['5min'] });
        await notices.click(); // Check page header Convocation / News & Events
        const pageHeader = page.getByRole('heading', { name: 'Convocation / News & Events' });
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
        // Check if the update form is visible
        const updateTitle = page.getByText('Information', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        await page.getByLabel('Global').click();
        // Covocation Dropdown
        await selectDropdown(page, '123456789 - Test Convocation (2026)', '[role="combobox"]:nth(0)');
        // Title input
        await fillInputByLabel(page, /^Title$/i, 'Test Title');

        // Sub Title input
        await fillInputByLabel(page, /^Subtitle$/i, 'Test Sub Title');
        // Published Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Cover Image Upload
        const imageInput = page.locator('input[type="file"]').nth(0);
        await imageInput.waitFor({ state: 'attached', timeout: 60000 });

        await imageInput.setInputFiles('tests/fixtures/testpic.png');
        // Remarks input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Summary input
        const summaryEditor = page.locator('div:has-text("Summary")').locator('div[contenteditable="true"]').first();
        await summaryEditor.fill('Your summary text here');
        // Content input
        const contentEditor = page.locator('div:has-text("Content")').locator('div[contenteditable="true"]').nth(1);
        await contentEditor.fill('Your content text here');
        // Click new button
        await clickNewButton(page, TEST_TIME['2min']);
        // File Upload
        const imageInput2 = page.locator('input[type="file"]').nth(2);
        await imageInput2.waitFor({ state: 'attached', timeout: 60000 });

        await imageInput2.setInputFiles('tests/fixtures/testpic.png');

        // Click save button
        //await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify add News & Events Functionality', async ({ page }) => {
        // Click "Convocation"
        const convocation = page.getByText('Convocation', { exact: true }).first();
        await expect(convocation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await convocation.click();
        // Click "News & Events"
        const notices = page.getByText('News & Events', { exact: true }).nth(2);
        await expect(notices).toBeVisible({ timeout: TEST_TIME['5min'] });
        await notices.click();
        // Check page header Convocation / News & Events
        const pageHeader = page.getByRole('heading', { name: 'Convocation / News & Events' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['2min'] });
        // Check the "New" button
        await clickNewButton(page, TEST_TIME['2min']);
        // Wait for Add News & Events page to load
        const addTitle = page.getByText('Information', { exact: true });
        await expect(addTitle).toBeVisible({ timeout: TEST_TIME['2min'] });
        await page.getByLabel('Global').click();
        // Covocation Dropdown
        await selectDropdown(page, '123456789 - Test Convocation (2026)', '[role="combobox"]:nth(0)');
        // Title input
        await fillInputByLabel(page, /^Title$/i, 'Test Title');

        // Sub Title input
        await fillInputByLabel(page, /^Subtitle$/i, 'Test Sub Title');
        // Published Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Cover Image Upload
        const imageInput = page.locator('input[type="file"]').nth(0);
        await imageInput.waitFor({ state: 'attached', timeout: 60000 });

        await imageInput.setInputFiles('tests/fixtures/testpic.png');
        // Remarks input
        await fillInputByLabel(page, /remarks/i, 'Test Remarks');
        // Summary input
        const summaryEditor = page.locator('div:has-text("Summary")').locator('div[contenteditable="true"]').first();
        await summaryEditor.fill('Your summary text here');
        // Content input
        const contentEditor = page.locator('div:has-text("Content")').locator('div[contenteditable="true"]').nth(1);
        await contentEditor.fill('Your content text here');
        // Click new button
        await clickNewButton(page, TEST_TIME['2min']);
        // File Upload
        const imageInput2 = page.locator('input[type="file"]').nth(1);
        await imageInput2.waitFor({ state: 'attached', timeout: 60000 });

        await imageInput2.setInputFiles('tests/fixtures/testpic.png');

        // Click save button
        await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
});
