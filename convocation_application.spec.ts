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
    selectDialogDropdown,
    selectDropdown,
    sortTableByColumn,
    TEST_TIME,
    toggleColumnAndActions,
    URLS,
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
    test('should verify Application Dashboard Functionality', async ({ page }) => {
        // Click Convocation
        const convocation = page.getByText('Convocation', { exact: true }).first();
        await expect(convocation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await convocation.click();
        // Click Application
        const application = page.getByText('Applications', { exact: true });
        await expect(application).toBeVisible({ timeout: TEST_TIME['5min'] });
        await application.click();
        // Check the loaded page header
        const applicationTitle = page.getByText('Convocation / Applications', { exact: true });
        await expect(applicationTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Check the search bar
        await checkAndClearSearchBar(applicationTitle, USER_FIELD.USER_SEARCH_BAR, 'Test');
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
        // Image Input
        await fillFilterInput(filterPanel, 'photo.png', 1);
        // Contact Input
        await fillFilterInput(filterPanel, '01882-467943', 2);
        // Department Input
        await fillFilterInput(filterPanel, 'Civil Engineering (CE) - Undergraduate', 3);
        // Remarks Input
        await fillFilterInput(filterPanel, 'Test Remarks', 4);
        // Created By Input
        await fillFilterInput(filterPanel, 'admin', 5);
        // Close the filter panel
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
    test('should verify Application Create Functionality', async ({ page }) => {
        // Click Convocation
        const convocation = page.getByText('Convocation', { exact: true }).first();
        await expect(convocation).toBeVisible({ timeout: TEST_TIME['5min'] });
        await convocation.click();
        // Click Application
        const application = page.getByText('Applications', { exact: true });
        await expect(application).toBeVisible({ timeout: TEST_TIME['5min'] });
        await application.click();
        // Check the loaded page header
        const applicationTitle = page.getByText('Convocation / Applications', { exact: true });
        await expect(applicationTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Click New Button
        await clickNewButton(page, TEST_TIME['10min']);
        // Check the loaded page header
        const applicationFormTitle = page.getByText('Personal Info', {
            exact: true,
        });
        await expect(applicationFormTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // File upload
        // Wait for the input to exist (even if hidden)
        const imageInput = page.locator('input[type="file"]').nth(0);
        await imageInput.waitFor({ state: 'attached', timeout: TEST_TIME['10min'] });
        await imageInput.setInputFiles('tests/fixtures/testpic.png');
        // Convocation Type
        await selectDropdown(page, '27 - 27th Annual Convocation Ceremony (2026)', '[role="combobox"]:nth(0)');
        // Fill the Student ID (BSC)
        await fillInputByLabel(page, 'Student ID (BSC)', '5678');
        // Click Validate button inside the Student ID input group
        const validateButton = page.getByRole('button', { name: 'Validate' }).first();
        await expect(validateButton).toBeVisible();
        await expect(validateButton).toBeEnabled();
        await validateButton.click();

        // Enrollment Status dropdown
        await selectDropdown(page, 'Credit Transferred', '[role="combobox"]:nth(1)');
        // Fill the Name
        await fillInputByLabel(page, /^Name$/, 'John Doe');
        await fillInputByLabel(page, /father's name/i, 'Richard Roe');
        // Fill Mother's Name
        await fillInputByLabel(page, /mother's name/i, 'Jane Doe');
        // Fill Date of Birth
        await page.locator('[role="gridcell"]').filter({ hasText: '23' }).first().click();
        // Fill email
        await fillInputByLabel(page, /email/i, 'a@b.com');
        // Fill Height
        await fillInputByLabel(page, /height/i, '180');
        // Number of guests dropdown
        await selectDropdown(page, '1', '[role="combobox"]:nth(2)');
        // Fill Phone Number
        await expect(page.getByLabel('Phone Number', { exact: true })).toBeVisible();
        await page.getByLabel('Phone Number', { exact: true }).fill('01882-467943');
        await expect(page.getByLabel('Phone Number', { exact: true })).toHaveValue('01882-467943');
        // Phone Number (Guardian)
        await fillInputByLabel(page, /phone number \(guardian\)/i, '01884-375958');
        // Fill NID Number
        await fillInputByLabel(page, /nid number/i, '1234567890');
        // Fill Birth Certificate Number
        await fillInputByLabel(page, /birth certificate/i, '1234567890');
        // Upload NID
        const pdfInput2 = page.locator('input[type="file"]').nth(1);
        await pdfInput2.waitFor({ state: 'attached', timeout: 60000 });
        await pdfInput2.setInputFiles('tests/fixtures/test.pdf');
        // Upload Birth Certificate
        const pdfInput3 = page.locator('input[type="file"]').nth(2);
        await pdfInput3.waitFor({ state: 'attached', timeout: 60000 });
        await pdfInput3.setInputFiles('tests/fixtures/test.pdf');
        // Check the loaded page header
        const academicInfoTitle = page.getByText('Academic Info', {
            exact: true,
        });
        await expect(academicInfoTitle).toBeVisible({ timeout: TEST_TIME['10min'] });
        // Deparrtment dropdown
        await selectDropdown(page, 'Civil Engineering (CE) - Undergraduate', '[role="combobox"]:nth(3)');
        // Admission Semester dropdown
        await selectDropdown(page, 'Fall', '[role="combobox"]:nth(4)');
        await selectDropdown(page, '2018', '[role="combobox"]:nth(5)');
        // Completion Semester dropdown
        await selectDropdown(page, 'Fall', '[role="combobox"]:nth(6)');
        await selectDropdown(page, '2022', '[role="combobox"]:nth(7)');
        // Fill CGPA
        await fillInputByLabel(page, /cgpa/i, '3.75');
        // SSC/Equivalent Exam
        // Passing Yar dropdown
        await selectDropdown(page, '2014', '[role="combobox"]:nth(8)');
        // Passing Board dropdown
        await selectDropdown(page, 'DHAKA', '[role="combobox"]:nth(9)');
        // Roll Number  input
        await page.locator('#ssc_roll_no').fill('123456');
        // Registration Number input
        await page.locator('#ssc_registration_no').fill('123456');
        // GPA input
        await page.locator('#ssc_gpa').fill('5.00');
        // Certificate file upload
        // Certificate file upload
        const pdfInput4 = page.locator('input[type="file"]').nth(3);
        await pdfInput4.waitFor({ state: 'attached', timeout: TEST_TIME['10min'] });
        await pdfInput4.setInputFiles('tests/fixtures/test.pdf');
        // HSC / Diploma
        await page.getByRole('tab', { name: 'HSC' }).click();
        // Passing Year dropdown
        await selectDropdown(page, '2016', '[role="combobox"]:nth(10)');
        // Passing Board dropdown
        await selectDropdown(page, 'DHAKA', '[role="combobox"]:nth(11)');
        // Roll Number  input
        await page.locator('#hsc_roll_no').fill('123456');
        // Registration Number input
        await page.locator('#hsc_registration_no').fill('123456');
        const gpaInput = page.locator('#hsc_gpa');
        // HSC GPA input
        await gpaInput.waitFor({ state: 'visible', timeout: TEST_TIME['10min'] });
        await gpaInput.scrollIntoViewIfNeeded();
        await gpaInput.fill('5.00');
        // Certificate file upload
        const pdfInput5 = page.locator('input[type="file"]').nth(4);
        await pdfInput5.waitFor({ state: 'attached', timeout: TEST_TIME['10min'] });
        await pdfInput5.setInputFiles('tests/fixtures/test.pdf');
        // Masters Students ID
        await fillInputByLabel(page, 'Masters Student ID', '5678');
        // Click Validate button inside the Masters Student ID input group
        const validateButton2 = page.getByRole('button', { name: 'Validate' }).nth(1);
        await expect(validateButton2).toBeVisible();
        await expect(validateButton2).toBeEnabled();
        await validateButton2.click();
        // Next save button
        await clickSaveOrSubmitButton(page, TEST_TIME['10min']);
    });
});
