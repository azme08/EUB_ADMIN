import { expect, test } from '@playwright/test';



import { checkAndClearSearchBar, closeFilterPanel, fillFilterInput, login, resetFilter, TEST_TIME, toggleColumnAndActions, updateClearanceStatus, USER_FIELD } from '../utils';





test.describe('Clubs layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify Clubs Dashboard Functionality', async ({ page }) => {
        // Click "CCC"
        const ccc = page.getByText('CCC', { exact: true }).first();
        await expect(ccc).toBeVisible({ timeout: TEST_TIME['5min'] });
        await ccc.click();
        // Click "Clubs"
        const clubs = page.getByText('Clubs', { exact: true }).first();
        await expect(clubs).toBeVisible({ timeout: TEST_TIME['5min'] });
        await clubs.click();
        const pageHeader = page.getByRole('heading', { name: 'CCC / Clubs' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the search bar
        await checkAndClearSearchBar(pageHeader, USER_FIELD.USER_SEARCH_BAR, 'Test');
        // Collapsible button
        await page.locator('button:has(svg.lucide-funnel)').click();
        // Click on filter button after submission
        const filterButton = page.getByRole('button', {
            name: 'Filters All Columns',
        });
        await expect(filterButton).toBeVisible({ timeout: TEST_TIME['10min'] });
        await filterButton.click();
        // Filter panel
        const filterPanel = page.locator('[role="dialog"]');
        await expect(filterPanel).toBeVisible();
        //  Name Input
        await fillFilterInput(filterPanel, 'Test Name', 0);
        // Short name Input
        await fillFilterInput(filterPanel, 'Test Short Name', 1);
        // Description Input
        await fillFilterInput(filterPanel, 'Test Description', 2);
        // About us Input
        await fillFilterInput(filterPanel, 'Test About Us', 3);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 4);
        // Created by at Input
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
    test('should verify Clubs Table Dashboard Functionality', async ({ page }) => {
        // Click "CCC"
        const ccc = page.getByText('CCC', { exact: true }).first();
        await expect(ccc).toBeVisible({ timeout: TEST_TIME['5min'] });
        await ccc.click();
        // Click "Clubs"
        const clubs = page.getByText('Clubs', { exact: true }).first();
        await expect(clubs).toBeVisible({ timeout: TEST_TIME['5min'] });
        await clubs.click();
        const pageHeader = page.getByRole('heading', { name: 'CCC / Clubs' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        
    });
});
