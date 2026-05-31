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
    TEST_TIME,
    toggleColumnAndActions,
    USER_FIELD,
} from '../utils';

test.describe('Application layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify Info Dashboard Functionality', async ({ page }) => {
        // Click "Convocation"
        const convocation = page.getByText('Convocation', { exact: true }).first();
        await expect(convocation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await convocation.click();
        // Click "Info"
        const info = page.getByText('Info', { exact: true }).nth(0);
        await expect(info).toBeVisible({ timeout: TEST_TIME['5min'] });
        await info.click(); // Check page header Convocation / Info
        const pageHeader = page.getByRole('heading', { name: 'Convocation / Info' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Test');
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        //  Title Input
        await fillFilterInput(filterPanel, 'Test Title', 0);
        // Description Input
        await fillFilterInput(filterPanel, 'Test Description', 1);
        // Cheif Speaker Input
        await fillFilterInput(filterPanel, 'Test Cheif Speaker', 2);
        // Special Guest Input
        await fillFilterInput(filterPanel, 'Test Special Guest', 3);
        // Covocation Year Input
        await fillFilterInput(filterPanel, '2023', 4);
        // Date and time Input
        await fillFilterInput(filterPanel, '2023-12-31T23:59', 5);
        // Venue Input
        await fillFilterInput(filterPanel, 'Test Venue', 6);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 7);
        // Created By Input
        await fillFilterInput(filterPanel, 'Admin', 8);
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
    test('should verify Update Info Functionality', async ({ page }) => {
        // Click "Convocation"
        const convocation = page.getByText('Convocation', { exact: true }).first();
        await expect(convocation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await convocation.click();
        // Click "Info"
        const info = page.getByText('Info', { exact: true }).nth(0);
        await expect(info).toBeVisible({ timeout: TEST_TIME['5min'] });
        await info.click();
        // Check page header Convocation / Info
        const pageHeader = page.getByRole('heading', { name: 'Convocation / Info' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        const table = page.locator('table');
        await expect(table).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check Action button Functionality
        const tableheader = page.locator('table');
        await expect(tableheader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click Edit button (first button)
        await clickActionButtonFromFirstRow(table, 0, TEST_TIME['10min']);
        // Check if the update form is visible
        const updateTitle = page.getByText('Information', { exact: true });
        await expect(updateTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Title Input
        await page.locator('#title').fill('Updated Test Title');
        // Description Input
        await fillInputByLabel(page, /description/i, 'Updated Test Description');
        // Number input
        await fillInputByLabel(page, /number/i, '5');
        // Chief Speaker Input
        await fillInputByLabel(page, /chief speaker/i, 'Updated Test Chief Speaker');
        // Special Guest Input
        await fillInputByLabel(page, /special guest/i, 'Updated Test Special Guest');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Updated Test Remarks');
        // Convocation dropdown
        await selectDropdown(page, '2026', '[role="combobox"]');
        // Published Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();

        // Start Date input
        const picker = page.locator('[role="dialog"]');

        await expect(picker).toBeVisible();

        await picker.getByText('11', { exact: true }).click();
        await picker.getByText('25', { exact: true }).click();
        await picker.getByText('AM', { exact: true }).click();
        await page.mouse.click(0, 0);
        // End Time Input
        const endTimePicker = page.locator('[role="dialog"]');
        await expect(endTimePicker).toBeVisible();
        await endTimePicker.getByText('11', { exact: true }).click();
        await endTimePicker.getByText('55', { exact: true }).click();
        await endTimePicker.getByText('PM', { exact: true }).click();
        await page.mouse.click(0, 0);

        // Venue Input
        await fillInputByLabel(page, /^Venue$/i, 'Updated Test Venue');
        // Venue Map Link Input
        await fillInputByLabel(page, /^Venue Map Link$/i, 'https://www.google.com/maps');
        // Click New Button
        await expect(page.getByRole('button', { name: 'New' }).first()).toBeVisible();
        await page.getByRole('button', { name: 'New' }).first().click();
        // File Upload
        const imageInput = page.locator('input[type="file"]').nth(1);
        await imageInput.waitFor({ state: 'attached', timeout: 60000 });
        await imageInput.setInputFiles('tests/fixtures/testpic.png');
        // Click new button
        await expect(page.getByRole('button', { name: 'New' }).nth(1)).toBeVisible();
        await page.getByRole('button', { name: 'New' }).nth(1).click();
        // File Upload
        const imageInput2 = page.locator('input[type="file"]').nth(3);
        await imageInput2.waitFor({ state: 'attached', timeout: 60000 });
        await imageInput2.setInputFiles('tests/fixtures/test.pdf');
        // Click save button
        //await clickSaveOrSubmitButton(page, TEST_TIME['2min']);
    });
    test('should verify create Info Functionality', async ({ page }) => {
        // Click "Convocation"
        const convocation = page.getByText('Convocation', { exact: true }).first();
        await expect(convocation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await convocation.click();
        // Click "Info"
        const info = page.getByText('Info', { exact: true }).nth(0);
        await expect(info).toBeVisible({ timeout: TEST_TIME['5min'] });
        await info.click();
        // Check page header Convocation / Info
        const pageHeader = page.getByRole('heading', { name: 'Convocation / Info' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // new button
        await clickNewButton(page, TEST_TIME['10min']);
        // Wait for add new Info page to load
        const createTitle = page.getByText('Information', { exact: true });
        await expect(createTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Title Input
        await page.locator('#title').fill('Updated Test Title');
        // Description Input
        await fillInputByLabel(page, /description/i, 'Updated Test Description');
        // Number input
        await fillInputByLabel(page, /number/i, '5');
        // Chief Speaker Input
        await fillInputByLabel(page, /chief speaker/i, 'Updated Test Chief Speaker');
        // Special Guest Input
        await fillInputByLabel(page, /special guest/i, 'Updated Test Special Guest');
        // Remarks Input
        await fillInputByLabel(page, /remarks/i, 'Updated Test Remarks');
        // Convocation dropdown
        await selectDropdown(page, '2026', '[role="combobox"]');
        // Published Date input
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();

        // Start Date input
        const picker = page.locator('[role="dialog"]');

        await expect(picker).toBeVisible();

        await picker.getByText('11', { exact: true }).click();
        await picker.getByText('25', { exact: true }).click();
        await picker.getByText('AM', { exact: true }).click();
        await page.mouse.click(0, 0);
        // End Time Input
        const endTimePicker = page.locator('[role="dialog"]');
        await expect(endTimePicker).toBeVisible();
        await endTimePicker.getByText('11', { exact: true }).click();
        await endTimePicker.getByText('55', { exact: true }).click();
        await endTimePicker.getByText('PM', { exact: true }).click();
        await page.mouse.click(0, 0);

        // Venue Input
        await fillInputByLabel(page, /^Venue$/i, 'Updated Test Venue');
        // Venue Map Link Input
        await fillInputByLabel(page, /^Venue Map Link$/i, 'https://www.google.com/maps');
        // Click New Button
        await expect(page.getByRole('button', { name: 'New' }).first()).toBeVisible();
        await page.getByRole('button', { name: 'New' }).first().click();
        // Title Input
        await page.getByLabel('Title').nth(1).fill('My Test Title');
        // File Upload
        const imageInput = page.locator('input[type="file"]').nth(0);
        await imageInput.waitFor({ state: 'attached', timeout: 60000 });
        await imageInput.setInputFiles('tests/fixtures/testpic.png');
        // Click new button
        await expect(page.getByRole('button', { name: 'New' }).nth(1)).toBeVisible();
        await page.getByRole('button', { name: 'New' }).nth(1).click();
        // Image Title Input
        await page.getByLabel('Title').nth(2).fill('My Test Title');
        // File Upload
        const imageInput2 = page.locator('input[type="file"]').nth(1);
        await imageInput2.waitFor({ state: 'attached', timeout: 60000 });
        await imageInput2.setInputFiles('tests/fixtures/test.pdf');
        // Click save button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
