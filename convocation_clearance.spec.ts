import { expect, test } from '@playwright/test';

import {
    checkAndClearSearchBar,
    closeFilterPanel,
    fillFilterInput,
    login,
    resetFilter,
    TEST_TIME,
    toggleColumnAndActions,
    updateClearanceStatus,
    USER_FIELD,
} from '../utils';

test.describe('Clearance layout test cases', () => {
    test.beforeEach(async ({ page }) => {
        await login({
            page,
            email: 'admin@eub.com',
            password: '1234',
        });
    });
    test('should verify Clearance Dashboard Functionality', async ({ page }) => {
        // Click "Convocation"
        const convocation = page.getByText('Convocation', { exact: true }).first();
        await expect(convocation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await convocation.click();
        // Click "Clearance"
        const clearance = page.getByText('Clearance', { exact: true }).first();
        await expect(clearance).toBeVisible({ timeout: TEST_TIME['5min'] });
        await clearance.click();
        const pageHeader = page.getByRole('heading', { name: 'Convocation / Clearance' });
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
        //  Name Input
        await fillFilterInput(filterPanel, 'Test Name', 0);
        // Phone Input
        await fillFilterInput(filterPanel, '1234567890', 1);
        // Department Input
        await fillFilterInput(filterPanel, 'Testing', 2);
        // BSC STD Input
        await fillFilterInput(filterPanel, 'BSC STD', 3);
        // MSC STD Input
        await fillFilterInput(filterPanel, 'MSC STD', 4);
        // Degree Completion Input
        await fillFilterInput(filterPanel, 'BSC', 5);
        // Purpose Input
        await fillFilterInput(filterPanel, 'Testing Purpose', 6);
        // Clearance Input
        await fillFilterInput(filterPanel, 'Cleared', 7);
        // Remark Input
        await fillFilterInput(filterPanel, 'Test Remark', 8);
        // Created By Input
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
    test('should verify Clearance table Dashboard Functionality', async ({ page }) => {
        // Click "Convocation"
        const convocation = page.getByText('Convocation', { exact: true }).first();
        await expect(convocation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await convocation.click();
        // Click "Clearance"
        const clearance = page.getByText('Clearance', { exact: true }).first();
        await expect(clearance).toBeVisible({ timeout: TEST_TIME['5min'] });
        await clearance.click();
        const pageHeader = page.getByRole('heading', { name: 'Convocation / Clearance' });
        await expect(pageHeader).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Sort by Department Name
        const sortingDropdown = page.locator('[role="combobox"]').nth(0);
        await sortingDropdown.click();
        // Select an option
        const sortOption = page.getByRole('option', {
            name: 'Computer Science and Engineering (CSE) - Undergraduate',
            exact: true,
        });
        await sortOption.waitFor({ state: 'visible', timeout: TEST_TIME['5min'] });
        await sortOption.click();
        // Check Clearance Status
        // Admission Clearance
        await updateClearanceStatus(page, 0, 'Pending');
        // Accounts Clearance
        await updateClearanceStatus(page, 1, 'Approved');
        // Library Clearance
        await updateClearanceStatus(page, 2, 'Rejected');
        // Department Clearance
        await updateClearanceStatus(page, 3, 'Cleared');
        // Exam Cluster 1 Clearance
        await updateClearanceStatus(page, 4, 'Pending');
        // Exam Cluster 2 Clearance
        await updateClearanceStatus(page, 5, 'Approved');
    });
});
