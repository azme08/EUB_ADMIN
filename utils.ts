import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

import type { TGetElement, TgetNewButtonWhenFilterButtonHave, TLocatorDefault, TRole } from './types';

export const URLS = {
    BASE: 'http://localhost:3000',
    AFTER_LOGIN: 'http://localhost:3000/profile/',
};
export const TEST_CASE = {
    LOGIN: {
        name: 'TSL Admin Login',
    },
};
export const TEST_TIME = {
    '1sec': 1000,
    '3sec': 3000,
    '5sec': 5000,
    '10sec': 10000,
    '15sec': 15000,
    '20sec': 20000,
    '30sec': 30000,
    '1min': 60000,
    '2min': 120000,
    '3min': 180000,
    '4min': 240000,
    '5min': 300000,
    '10min': 600000,
};
export async function userlogin(page: Page, email: string, password: string) {
    const emailInput = page.locator(USER_FIELD.EMAIL);
    const passwordInput = page.locator(USER_FIELD.PASSWORD);
    const loginButton = page.locator(USER_FIELD.LOGIN_BUTTON);

    await waitForVisible([emailInput, passwordInput, loginButton]);

    await emailInput.fill(email);
    await passwordInput.fill(password);

    await Promise.all([page.waitForURL(URLS.AFTER_LOGIN), loginButton.click()]);

    await expect(page).toHaveURL(URLS.AFTER_LOGIN);
}
export const USER_FIELD = {
    EMAIL: 'input[name="email"], input[placeholder*="Email"], input[id="email"]',
    PASSWORD: 'input[name="password"], input[placeholder*="Password"], input[type="password"], input[id="password"]',
    LOGIN_BUTTON: 'button:has-text("Login")',
    USER_SEARCH_BAR: 'xpath=following::input[@type="search" or @placeholder="Search here..."][1]',
    SEARCH_BUTTON: 'xpath=following::button[1]',
    DROPDOWN_1: 'xpath=following::*[@tabindex="0"][1]',
    DEPT_DROPDOWN: 'xpath=following::*[@tabindex="0"][1]',
    DESIGNATION_DROPDOWN: 'xpath=following::*[@tabindex="0"][1]',
    DROPDOWN_4: 'xpath=following::*[@tabindex="0"][1]',
    DROPDOWN_5: 'xpath=following::*[@tabindex="0"][1]',
    REMARKS_INPUT: 'textarea[name="remarks"]:visible',

    USER_MAIL: 'input[name="email"]:visible',
    USER_NAME: 'input[name="name"]:visible',
    USER_EXT: 'input[name="ext"]:visible',
    USER_PHONE: 'input[name="phone"]:visible',

    BUYER_NAME: 'input[name="name"]:visible',
    BUYER_ADDRESS: 'textarea[name="address"]:visible',

    PL_BUYER_DROPDOWN: '[role="combobox"]',
    SELECT_PL_TYPE: 'CMT',
    SELECT_BUYER_NAME: 'ABC',
    SELECT_BUYER_TYPE: 'Carton Wise Size',

    SELECT_SUPPLIER_NAME: 'Test Supplier',

    USERMAIL_INPUT: 'azme@eub.edu.bd',
    USER_PASSWORD_INPUT: 'Test@12345',

    TEST_PASSWORD: 'AZ123',

    TOGGLE_SEARCH: 'xpath=following::button[2]',
    FILTER_BUTTON: 'xpath=following::button[2]',
    PDF_BUTTON: 'xpath=following::button[1]',
    REFRESH_BUTTON: 'xpath=following::button[1]',
    TOGGLE_PANEL: '[role="menu"], [role="dialog"]',
    TOGGLE_FIELD_NAME: 'text=/remarks/i',
    USER_FIELD_SORTING: 'text=Customer',
    FIND_COLUMN_HEADER: '[role="menu"], [role="dialog"]',
    TABLE_HEADER: 'Status',
    STATUS_UPDATE: 'Ascending',
    BUYER_TABLE_HEADER: 'Name',
    BUYER_SORTING: 'Descending',

    PL_HEADER: 'xpath=ancestor::tr/th',
    PL_CELL_FINDER: 'input:not([type="hidden"])',
    PL_COPY_BUTTON: 'button, [role="button"], svg',
    PL_ACTIONS_DELETE: '[aria-label="Delete"], [title="Delete"], svg:has-text("Delete")',
    PL_DELETE_BUTTON: 'button, svg, [role="button"]',

    PL_ARTICLE_NO: 'xpath=//*[normalize-space(text())="Article No"]/following::input[1]',
    PL_UNITPRICE:
        'xpath=//th[normalize-space(text())="Unit Price (USD)"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Unit Price (USD)"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',
    PL_CMT_HEADER:
        'xpath=//th[normalize-space(text())="CMT"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="CMT"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_B2B__MATERIAL:
        'xpath=//th[normalize-space(text())="B2B Material Per Prs"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="B2B Material Per Prs"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_EQP_PERPRS:
        'xpath=//th[normalize-space(text())="EQP Per Prs"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="EQP Per Prs"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_KINFE_VALUE:
        'xpath=//th[normalize-space(text())="Knife Value"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Knife Value"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_CHEMICAL_VALUE:
        'xpath=//th[normalize-space(text())="Chemical Lamination Value"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Chemical Lamination Value"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_CARTON_VALUE:
        'xpath=//th[normalize-space(text())="Carton Value"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Carton Value"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_FOAM_VALUE:
        'xpath=//th[normalize-space(text())="Foam Value"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Foam Value"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_INK_VALUE:
        'xpath=//th[normalize-space(text())="Ink Value"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Ink Value"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_COMMERCIAL_VALUE:
        'xpath=//th[normalize-space(text())="Commercial Value"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Commercial Value"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_TMCC:
        'xpath=//th[normalize-space(text())="Trail Materials & Courier Cost"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Trail Materials & Courier Cost"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_FILTER_TISSUE_VALUE:
        'xpath=//th[normalize-space(text())="Filler Tissue Value"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Filler Tissue Value"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_POLYTHENE_VALUE:
        'xpath=//th[normalize-space(text())="Polythene Value"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Polythene Value"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_MISCELLANEOUS_VALUE:
        'xpath=//th[normalize-space(text())="Miscellaneous Value"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Miscellaneous Value"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',

    PL_INCENTIVE_PERCENTAGE:
        'xpath=//th[normalize-space(text())="Incentive Percentage"]/ancestor::table//tr[1]/td[count(//th[normalize-space(text())="Incentive Percentage"]/preceding-sibling::th)+1]//input[@type="text" or @type="number"]',
};

export const isExist = async ({ page, selector }: { page: Page; selector: string }) => {
    const element = page.locator(selector);
    if ((await element.count()) > 0) {
        await expect(element).toBeVisible();
    }
};

export const waitForVisible = async (locator: Locator[]) => {
    for (const loc of locator) {
        await loc.waitFor({ state: 'visible' });
    }
};

export const pageLocat = async ({ page, selector, exact = false }: TgetNewButtonWhenFilterButtonHave) => {
    // Pick the first matching element to avoid strict-mode violation
    const element = page.getByText(selector, { exact }).first();

    // Wait until visible
    await expect(element).toBeVisible({ timeout: TEST_TIME['10sec'] });

    return element;
};

export const locat = async ({ locator, selector }: TLocatorDefault) => {
    const element = locator.locator(selector);
    await expect(element).toBeVisible({ timeout: TEST_TIME['10sec'] });
    return element;
};

type FillPasswordOptions = {
    page: Page;
    password: string;
    timeout?: number;
};

export const fillAndVerifyPassword = async ({ page, password, timeout = TEST_TIME['10min'] }: FillPasswordOptions) => {
    // Password input
    const passwordInput = page.getByLabel('Password', { exact: true });
    await expect(passwordInput).toBeVisible({ timeout });
    await passwordInput.fill(password);

    // Repeat Password input
    const repeatPasswordInput = page.getByLabel('Repeat Password', { exact: true });
    await expect(repeatPasswordInput).toBeVisible({ timeout });
    await repeatPasswordInput.fill(password);

    // Verify both passwords match
    const passwordValue = await passwordInput.inputValue();
    const repeatPasswordValue = await repeatPasswordInput.inputValue();

    await expect(passwordValue).toBe(repeatPasswordValue);
};

export const getNewButtonWhenFilterButtonPresnt = async ({
    page,
    selector,
    exact = false,
}: TgetNewButtonWhenFilterButtonHave) => {
    // selector page assertion
    const pageHeader = await pageLocat({ page, selector, exact });

    // Check search bar
    const pageSearchBar = pageHeader.locator(USER_FIELD.USER_SEARCH_BAR);
    await expect(pageSearchBar).toBeVisible({ timeout: TEST_TIME['10sec'] });
    await pageSearchBar.fill('test user');
    await expect(pageSearchBar).toHaveValue('test user');

    // Check the search button
    const searchButton = pageSearchBar.locator(USER_FIELD.SEARCH_BUTTON);
    await expect(searchButton).toBeVisible({ timeout: TEST_TIME['10sec'] });
    await searchButton.click();

    // Collapse button click
    /* const collapseButton = searchButton.locator(USER_FIELD.SEARCH_BUTTON);
    await expect(collapseButton).toBeVisible({ timeout: TEST_TIME['10sec'] });
    await collapseButton.click(); */

    // Check the "New" button
    const newButton = page.getByRole('button', { name: 'New' });
    await expect(newButton).toBeVisible({ timeout: TEST_TIME['10sec'] });
    await newButton.click();
};

export const hasElement = async ({ page, selector, exact = false, type, time = '10sec' }: TGetElement) => {
    let locator: Locator;
    switch (type) {
        case 'text': {
            locator = page.getByText(selector, { exact });
            break;
        }
        case 'role': {
            locator = page.getByRole(selector as TRole, { exact });
            break;
        }
        case 'css': {
            locator = page.locator(selector);
            break;
        }
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
    // Assert visibility with timeout
    await expect(locator).toBeVisible({ timeout: TEST_TIME[time] });

    // Return the validated locator
    const isExist = await locator.isVisible();
    if (!isExist) {
        console.log(`Element not visible: ${selector} using type: ${type}`);
        throw new Error('Add User title not found, cannot proceed with the test.');
    }
    console.log(`Element found: ${selector} using type: ${type}`);
};

export const locatBy = async ({
    page,
    selector,
    exact = false,
    name = '',
    type,
    time = '10sec',
    locator, // 👈 NEW
}: TGetElement & { locator?: Locator }): Promise<Locator> => {
    const root = locator ?? page;
    let element: Locator;

    switch (type) {
        case 'text':
            element = root.getByText(selector, { exact });
            break;

        case 'role':
            element = name
                ? root.getByRole(selector as TRole, { name, exact })
                : root.getByRole(selector as TRole, { exact });
            break;

        case 'css':
            element = root.locator(selector);
            break;

        default:
            throw new Error(`Unsupported type: ${type}`);
    }

    await expect(element.first()).toBeVisible({ timeout: TEST_TIME[time] });
    return element.first(); // 👈 force single match
};

interface FillAndVerifyOptions {
    page: Page;
    locator: string; // the selector
    value: string; // value to fill
    timeout?: number; // optional timeout
}

export async function fillInput({ page, locator, value, timeout = 10000 }: FillAndVerifyOptions) {
    const input = page.locator(locator);
    await expect(input).toBeVisible({ timeout });
    await input.fill(value);
    await expect(input).toHaveValue(value, { timeout });
}

export async function fillFilterInput(filterPanel: Locator, value: string, index = 0, timeout = 10000) {
    const input = filterPanel.locator('input').nth(index);

    await expect(input).toBeVisible({ timeout });
    await input.fill(value);
    await expect(input).toHaveValue(value);
}

export async function getFirstTableRow(table: Locator, timeout = 10000): Promise<Locator> {
    const firstRow = table.locator('tbody tr').first();
    await expect(firstRow).toBeVisible({ timeout });
    return firstRow;
}

export async function getActionsCell(page: Page, rowNumber: number): Promise<Locator> {
    const table: Locator = page.locator('table');
    const headers: Locator = table.locator('thead th');

    // Find Actions column index
    const texts: string[] = await headers.allTextContents();
    const actionsIndex: number = texts.findIndex((t) => t.trim() === 'Actions');

    if (actionsIndex < 0) throw new Error('Actions column not found');

    // Get target row
    const row: Locator = table.locator('tbody tr').nth(rowNumber);
    await expect(row).toBeVisible();

    // Get Actions cell
    const actionsCell: Locator = row.locator('td').nth(actionsIndex);
    await expect(actionsCell).toBeVisible();

    // Hover to reveal icons
    await actionsCell.hover();

    return actionsCell;
}

export async function getCellInputs(page: Page, columnHeader: string, rowIndex: number = 0): Promise<Locator> {
    const table: Locator = page.locator('table');
    const headers: Locator = table.locator('thead th');

    // Find the column index
    const texts: string[] = await headers.allTextContents();
    const columnIndex: number = texts.findIndex((t) => t.trim() === columnHeader);

    if (columnIndex < 0) throw new Error(`Column "${columnHeader}" not found`);

    // Get the row
    const row: Locator = table.locator('tbody tr').nth(rowIndex);
    await expect(row).toBeVisible();

    // Get the cell
    const cell: Locator = row.locator('td').nth(columnIndex);
    await expect(cell).toBeVisible();

    // Get all inputs in the cell
    const inputs: Locator = cell.locator('input');
    return inputs;
}

export const getColumnIndexByHeaderText = async (
    page: Page,
    headerText: string,
    headerSelector: string,
    timeout = 10000
): Promise<number> => {
    // Locate header text
    const header = page.getByText(headerText, { exact: true });
    await expect(header).toBeVisible({ timeout });

    // Get all headers in the same row/group
    const headers = header.locator(headerSelector);

    // Find index
    const index = await headers.allTextContents().then((texts) => texts.findIndex((t) => t.trim() === headerText));

    expect(index).toBeGreaterThan(-1);
    return index;
};

export const getFirstRowCellByHeader = async (
    page: Page,
    headerText: string,
    headerSelector: string,
    cellFinder: string,
    timeout = 10000
): Promise<Locator> => {
    // Find header
    const header = page.getByText(headerText, { exact: true });
    await expect(header).toBeVisible({ timeout });

    // All headers in the table
    const headers = header.locator(headerSelector);

    // Column index
    const columnIndex = await headers
        .allTextContents()
        .then((texts) => texts.findIndex((t) => t.trim() === headerText));

    expect(columnIndex).toBeGreaterThan(-1);

    // First row
    const firstRow = page.locator('table tbody tr').first();

    // Cell at that column
    const cell = firstRow.locator('td').nth(columnIndex);

    // Return visible inputs/elements inside the cell
    return cell.locator(cellFinder);
};

export const fillColumnInput = async ({
    page,
    columnName,
    inputLocator,
    value,
}: {
    page: Page;
    columnName: string;
    inputLocator: string;
    value: string;
}) => {
    // Check column header
    const columnHeader = page.getByRole('columnheader', { name: columnName });
    await expect(columnHeader).toBeVisible({ timeout: TEST_TIME['5min'] });

    // Locate input
    const input = page.locator(inputLocator);
    await expect(input).toBeVisible({ timeout: TEST_TIME['5min'] });

    // Click, clear, and fill
    await input.click();
    await input.fill(value);

    // Assert value
    await expect(input).toHaveValue(value);
};

export async function clickToggleByHeader(table: Locator, headerName: string, rowIndex = 0) {
    // Get all headers
    const headers = table.locator('thead th');

    // Find column index
    const columnIndex = await headers
        .allTextContents()
        .then((texts) => texts.findIndex((t) => t.trim() === headerName));

    expect(columnIndex).toBeGreaterThan(-1);

    // Get target row
    const row = table.locator('tbody tr').nth(rowIndex);

    // Get target cell
    const cell = row.locator('td').nth(columnIndex);
    await expect(cell).toBeVisible();

    // Find toggle inside cell
    const toggle = cell.locator('input[type="checkbox"], button, [role="switch"]').first();

    await expect(toggle).toBeVisible();
    await toggle.click();
}
async function getLastEditableRow(page: Page) {
    const rows = page.locator('table tbody tr');

    const count = await rows.count();
    for (let i = count - 1; i >= 0; i--) {
        const row = rows.nth(i);

        const hasInput = await row.locator('input, [role="combobox"], [tabindex="0"]').count();

        if (hasInput > 0) {
            return row;
        }
    }

    throw new Error('No editable row found in table');
}
export async function updateClearanceStatus(page, rowIndex = 1, status = 'Approved') {
    // Switch (toggle)
    const switches = page.locator('td:nth-child(8) [role="switch"]');
    await switches.nth(rowIndex).click();

    // Input field
    const input = page.locator('td:nth-child(8) input, td:nth-child(8) textarea').nth(rowIndex);
    await input.fill(status);

    // Save button (success icon/button after input)
    const save = input.locator('xpath=following::*[contains(@class,"success")][1]');
    await save.waitFor({ state: 'visible' });

    await save.click();
}
// Select dropdown in the last row of the table
export async function selectDropdownOption(page: Page, columnIndex: number, optionName: string) {
    const row = await getLastEditableRow(page);
    await row.scrollIntoViewIfNeeded();

    const cell = row.locator('td').nth(columnIndex);
    await expect(cell).toBeVisible({ timeout: 60_000 });

    // activate edit mode if needed
    await cell.click({ force: true });

    const dropdown = cell.locator('input, [role="combobox"], [tabindex="0"]').first();

    await expect(dropdown).toBeVisible({ timeout: 60_000 });
    await dropdown.click();

    const option = page.getByRole('option', { name: optionName, exact: true });
    await expect(option).toBeVisible({ timeout: 60_000 });
    await option.click();
}

export async function selectDropdownInModal(page: Page, labelText: string, optionText: string) {
    const input = page.locator('label', { hasText: labelText }).locator('xpath=following::input[1]');

    await expect(input).toBeVisible({ timeout: 30000 });
    await input.click();

    // STRICT-SAFE option click
    await page.getByRole('option', { name: optionText }).click();
}

export async function fillInputByLabel(
    page: Page,
    label: string | RegExp,
    value: string,
    timeout = 120000 // 2 minutes
) {
    const input = page.getByLabel(label);

    await expect(input).toBeVisible({ timeout });
    await input.fill(value);
    await expect(input).toHaveValue(value);
}

type LoginParams = {
    page: Page;
    email: string;
    password: string;
};

export async function login({ page, email, password }: LoginParams) {
    // Go to base URL
    await page.goto(URLS.BASE, { waitUntil: 'domcontentloaded' });

    // Check app exists
    await isExist({ page, selector: 'text=TSL Admin' });

    // Handle warning page if exists
    const goLoginButton = page.getByRole('button', { name: /Go To Login|Go Home/ });
    if (await goLoginButton.isVisible()) {
        await goLoginButton.click();
        await page.waitForURL(/login/i);
    }

    // Locators
    const emailInput = page.locator(USER_FIELD.EMAIL);
    const passwordInput = page.locator(USER_FIELD.PASSWORD);
    const loginButton = page.locator(USER_FIELD.LOGIN_BUTTON);

    // Wait until visible
    await waitForVisible([emailInput, passwordInput, loginButton]);

    // Fill credentials
    await emailInput.fill(email);
    await passwordInput.fill(password);

    // Login and wait for navigation
    await Promise.all([page.waitForURL(URLS.AFTER_LOGIN), loginButton.click()]);

    // Assert login success
    await expect(page).toHaveURL(URLS.AFTER_LOGIN);
}

export async function navigateMenu(page: Page, sectionText: string, optionText: string, subOptionText: string) {
    // Click main section
    const section = page.getByText(sectionText, { exact: true });
    await expect(section).toBeVisible({ timeout: TEST_TIME['5min'] });
    await section.click();

    // Click option
    const option = page.getByText(optionText, { exact: true });
    await expect(option).toBeVisible({ timeout: TEST_TIME['5min'] });
    await option.click();

    // Click sub-option
    const subOption = page.getByText(subOptionText, { exact: true });
    await expect(subOption).toBeVisible({ timeout: TEST_TIME['5min'] });
    await subOption.click();
}
export async function checkAndClearSearchBar(pageHeader: Locator, searchBarSelector: string, searchText: string) {
    const searchBar = pageHeader.locator(searchBarSelector);

    // Check visible
    await expect(searchBar).toBeVisible({ timeout: TEST_TIME['5min'] });

    // Fill value
    await searchBar.fill(searchText);
    await expect(searchBar).toHaveValue(searchText);

    // Clear value
    await searchBar.fill('');
    await expect(searchBar).toHaveValue('');
}
export async function closeFilterPanel(filterPanel: Locator) {
    const closeButton = filterPanel.getByRole('button', { name: 'Close' });

    await expect(closeButton).toBeVisible({ timeout: TEST_TIME['5min'] });
    await closeButton.click();

    await expect(filterPanel).toBeHidden({ timeout: TEST_TIME['5min'] });
}
export async function resetFilter(filterButton: Locator, resetSelector: string) {
    const resetButton = filterButton.locator(resetSelector);

    await expect(resetButton).toBeVisible({ timeout: TEST_TIME['5min'] });
    await resetButton.click({ force: true });
}
type ToggleAndActionParams = {
    page: Page;
    filterButton: Locator;
    toggleSearchSelector: string;
    togglePanelSelector: string;
    toggleFieldSelector: string;
    downloadButtonSelector: string;
    refreshButtonSelector: string;
};

export async function toggleColumnAndActions({
    page,
    filterButton,
    toggleSearchSelector,
    togglePanelSelector,
    toggleFieldSelector,
    downloadButtonSelector,
    refreshButtonSelector,
}: ToggleAndActionParams) {
    // Toggle columns button
    const toggleColumnsButton = filterButton.locator(toggleSearchSelector);
    await expect(toggleColumnsButton).toBeVisible({ timeout: TEST_TIME['5min'] });
    await toggleColumnsButton.click({ force: true });

    // Toggle panel
    const togglePanel = page.locator(togglePanelSelector);
    await expect(togglePanel).toBeVisible({ timeout: TEST_TIME['5min'] });

    // Toggle first checkbox option
    const toggleRow = togglePanel.first().locator(toggleFieldSelector).first();
    await expect(toggleRow).toBeVisible({ timeout: TEST_TIME['5min'] });
    await toggleRow.click({ force: true });

    // Click outside to close panel
    await page.mouse.click(0, 0);

    // Download (PDF/Excel)
    const downloadButton = toggleColumnsButton.locator(downloadButtonSelector);
    await expect(downloadButton).toBeVisible({ timeout: TEST_TIME['5min'] });
    await downloadButton.click({ force: true });

    // Refresh
    const refreshButton = downloadButton.locator(refreshButtonSelector);
    await expect(refreshButton).toBeVisible({ timeout: TEST_TIME['5min'] });
    await refreshButton.click({ force: true });
}
export async function deleteFirstRow(
    page: Page,
    tableSelector: string,
    confirmButtonName = 'Confirm',
    timeout = TEST_TIME['5min']
) {
    // Locate table
    const table = page.locator(tableSelector);
    await expect(table).toBeVisible({ timeout });

    // Get first row (uses your getFirstTableRow helper)
    const firstRow = await getFirstTableRow(table, timeout);
    await expect(firstRow).toBeVisible({ timeout });

    // Action cell in last column
    const actionCell = firstRow.locator('td').last();
    await expect(actionCell).toBeVisible({ timeout });

    // Click delete button (assume 2nd button in action cell)
    const deleteButton = actionCell.locator('button').nth(1);
    await expect(deleteButton).toBeVisible({ timeout });
    await deleteButton.click();

    // Confirm delete in modal
    const confirmDeleteButton = page.getByRole('button', { name: confirmButtonName });
    await expect(confirmDeleteButton).toBeVisible({ timeout });
    await confirmDeleteButton.click();
}
type SortOrder = 'Ascending' | 'Descending';

export async function sortTableByColumn(
    page: Page,
    table: Locator,
    columnHeaderText: string,
    sortOrder: SortOrder,
    timeout: number
) {
    // Ensure first row exists (table loaded)
    const firstRow = table.locator('tbody tr').first();
    await expect(firstRow).toBeVisible({ timeout });

    // Find table header
    const tableHeader = table.locator('thead th').filter({ hasText: columnHeaderText }).first();

    await expect(tableHeader).toBeVisible({ timeout });

    // Click 3-dot / menu button in header
    const tableHeaderMenuButton = tableHeader.locator('button');
    await expect(tableHeaderMenuButton).toBeVisible({ timeout });
    await tableHeaderMenuButton.click({ force: true });

    // Column menu
    const columnMenu = page.locator(USER_FIELD.FIND_COLUMN_HEADER);
    await expect(columnMenu).toBeVisible({ timeout });

    // Click sort option
    const sortOption = columnMenu.getByText(sortOrder, { exact: true });
    await expect(sortOption).toBeVisible({ timeout });
    await sortOption.click();
}
export async function clickActionButtonFromFirstRow(table: Locator, buttonIndex: number = 0, timeout: number) {
    // Ensure table is visible
    await expect(table).toBeVisible({ timeout });

    // First row in tbody
    const firstRow = table.locator('tbody tr').first();
    await expect(firstRow).toBeVisible({ timeout });

    // Action column (last td)
    const actionCell = firstRow.locator('td').last();
    await expect(actionCell).toBeVisible({ timeout });

    // Action buttons inside cell
    const actionButtons = actionCell.locator('button');
    await expect(actionButtons.nth(buttonIndex)).toBeVisible({ timeout });

    // Click desired action button
    await actionButtons.nth(buttonIndex).click();
}
export async function clickSaveOrSubmitButton(page: Page, timeout: number) {
    const saveButton = page.getByRole('button', { name: /save|submit/i });
    await expect(saveButton).toBeVisible({ timeout });
    await saveButton.click();
}
export async function clickNewButton(page: Page, timeout: number) {
    const newButton = page.getByRole('button', { name: 'New' });
    await expect(newButton).toBeVisible({ timeout });
    await newButton.click();
}
export async function navigateToSection(page: Page, parentText: string, childText: string): Promise<void> {
    const parentSection = page.getByText(parentText, { exact: true });
    await expect(parentSection).toBeVisible({ timeout: TEST_TIME['1min'] });
    await parentSection.click();

    const childOption = page.getByText(childText, { exact: true });
    await expect(childOption).toBeVisible({ timeout: TEST_TIME['1min'] });
    await childOption.click();
}

export async function selectDropdown(page: Page, selectedText: string, path: string) {
    let dropdown;

    // If path contains nth(index)
    const nthMatch = path.match(/nth\((\d+)\)/);

    if (nthMatch) {
        const index = Number(nthMatch[1]);
        const cleanPath = path.replace(/:nth\(\d+\)/, '');
        dropdown = page.locator(cleanPath).nth(index);
    } else {
        dropdown = page.locator(path);
    }

    await expect(dropdown).toBeVisible();
    await dropdown.click();

    const option = page.getByRole('option', { name: selectedText, exact: true });
    await expect(option).toBeVisible();
    await option.click();
}

export async function clickMenuAndOption(page: Page, mainText: string, subText: string) {
    // Click main section
    const mainSection = page.getByText(mainText, { exact: true });
    await expect(mainSection).toBeVisible({ timeout: TEST_TIME['5min'] });
    await mainSection.click();

    // Click sub option
    const subOption = page.getByText(subText, { exact: true });
    await expect(subOption).toBeVisible({ timeout: TEST_TIME['5min'] });
    await subOption.click();
}
export async function selectDialogDropdown(page: Page, selectedText: string, path: string, scope?: Locator) {
    const root = scope ?? page;

    let dropdown;
    const nthMatch = path.match(/nth\((\d+)\)/);

    if (nthMatch) {
        const index = Number(nthMatch[1]);
        const cleanPath = path.replace(/:nth\(\d+\)/, '');
        dropdown = root.locator(cleanPath).nth(index);
    } else {
        dropdown = root.locator(path);
    }

    await expect(dropdown).toBeVisible();
    await dropdown.click();

    const option = page.getByRole('option', { name: selectedText, exact: true });
    await expect(option).toBeVisible();
    await option.click();
}
export async function selectDepartmentAndDesignation(page: Page, departmentName: string, designationName: string) {
    // -------- Department --------
    const departmentLabel = await pageLocat({
        page,
        selector: 'Department',
        exact: true,
    });

    const deptDropdown = await locat({
        locator: departmentLabel,
        selector: USER_FIELD.DEPT_DROPDOWN,
    });

    await deptDropdown.waitFor({ state: 'visible' });
    await deptDropdown.click();

    const deptOption = page.getByRole('option', {
        name: departmentName,
        exact: true,
    });

    await deptOption.waitFor({ state: 'visible', timeout: 10000 });
    await deptOption.click();

    // Optional depending on UI
    await page.keyboard.press('Enter');

    // -------- Designation --------
    const designationDropdown = await locat({
        locator: deptDropdown,
        selector: USER_FIELD.DESIGNATION_DROPDOWN,
    });

    await designationDropdown.waitFor({ state: 'visible' });
    await designationDropdown.scrollIntoViewIfNeeded();
    await designationDropdown.click();

    // If it's searchable dropdown
    await designationDropdown.fill(designationName);

    const desigOption = page.getByRole('option', {
        name: designationName,
        exact: true,
    });

    await desigOption.waitFor({ state: 'visible', timeout: 10000 });
    await desigOption.click();

    await page.keyboard.press('Enter');
}
