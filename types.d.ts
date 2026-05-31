import { Locator, Page } from '@playwright/test';

export type TRole =
    | 'alert'
    | 'alertdialog'
    | 'application'
    | 'article'
    | 'banner'
    | 'blockquote'
    | 'button'
    | 'caption'
    | 'cell'
    | 'checkbox'
    | 'code'
    | 'columnheader'
    | 'combobox'
    | 'complementary'
    | 'contentinfo'
    | 'definition'
    | 'deletion'
    | 'dialog'
    | 'directory'
    | 'document'
    | 'emphasis'
    | 'feed'
    | 'figure'
    | 'form'
    | 'generic'
    | 'grid'
    | 'gridcell'
    | 'group'
    | 'heading'
    | 'img'
    | 'insertion'
    | 'link'
    | 'list'
    | 'listbox'
    | 'listitem'
    | 'log'
    | 'main'
    | 'marquee'
    | 'math'
    | 'meter'
    | 'menu'
    | 'menubar'
    | 'menuitem'
    | 'menuitemcheckbox'
    | 'menuitemradio'
    | 'navigation'
    | 'none'
    | 'note'
    | 'option'
    | 'paragraph'
    | 'presentation'
    | 'progressbar'
    | 'radio'
    | 'radiogroup'
    | 'region'
    | 'row'
    | 'rowgroup'
    | 'rowheader'
    | 'scrollbar'
    | 'search'
    | 'searchbox'
    | 'separator'
    | 'slider'
    | 'spinbutton'
    | 'status'
    | 'strong'
    | 'subscript'
    | 'superscript'
    | 'switch'
    | 'tab'
    | 'table'
    | 'tablist'
    | 'tabpanel'
    | 'term'
    | 'textbox'
    | 'time'
    | 'timer'
    | 'toolbar'
    | 'tooltip'
    | 'tree'
    | 'treegrid'
    | 'treeitem';

export type TTestTime = '1sec' | '3sec' | '5sec' | '10sec';
export type TGetElementType = 'text' | 'role' | 'css';
export type TPageDefault = {
    page: Page;
    selector: string;
    exact?: boolean;
};

export type TLocatorDefault = {
    locator: Locator;
    selector: string;
};

export type TgetNewButtonWhenFilterButtonHave = TPageDefault;

export type TGetElement = TPageDefault & {
    type: TGetElementType;
    name?: string;
    time?: TTestTime;
};
