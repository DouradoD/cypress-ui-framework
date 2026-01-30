export class ElementsPageLocators {
    static textBoxSection = 'div[id="item-0"]';
    sectionListNames: string = "#app div[class='element-group'] div[class='header-text']";
    subSectionListNames: string = "#app div[class='element-list collapse show'] span[class='text']";

    // Forms - Text Box locators
    fullNameInput: string = '#userName';
    emailInput: string = '#userEmail';
    currentAddressInput: string = 'textarea[id="currentAddress"]';
    permanentAddressInput: string = 'textarea[id="permanentAddress"]';
    submitButton: string = '#submit';
    outputFormName: string = '#name';
    outputFormEmail: string = '#email';
    outputFormCurrentAddress: string = '#output #currentAddress';
    outputFormPermanentAddress: string = '#output #permanentAddress';

    // CheckBox locators
    expandAllButton: string = 'button[title="Expand all"]';
    collapseAllButton: string = 'button[title="Collapse all"]';
    checkboxNamesList: string = 'label[for*="tree-node"] span[class="rct-title"]';
    selectedCheckboxesOutput: string = 'div[id="result"] .text-success';
    
    // Radio Button locators
    yesRadioButton: string = 'label[for="yesRadio"]';
    impressiveRadioButton: string = 'label[for="impressiveRadio"]';
    noRadioButton: string = 'label[for="noRadio"]';
    selectedRadioButtonOutput: string = 'span[class="text-success"]';

    // web tables locators
    rowsPerPageSelect: string = 'select[aria-label*="rows per page"]';
    webTableSearchInput: string = '#searchBox';
    webTableFormFirstNameInput: string = '#firstName';
    webTableFormLastNameInput: string = '#lastName';
    webTableFormEmailInput: string = '#userEmail';
    webTableFormAgeInput: string = '#age';
    webTableFormSalaryInput: string = '#salary';
    webTableFormDepartmentInput: string = '#department';
    webTableFormSubmitButton: string = '#submit';
    webTableAddNewUserButton: string = '#addNewRecordButton';
    webTableNextButton: string = 'div[class="-next"] button';
    webTableTotalPage: string = 'span[class="-totalPages"]';

    webTableRowList: string = 'div[class="rt-tr-group"]';
    webTableRowTextValues: string = 'div.rt-td';
    webTableRowDeleteIconButtonList: string = 'span[id^="delete-record"]';

    // Dynamic properties locators
    visibleAfter5SecondsButton: string = '#visibleAfter';
    colorChangeButton: string = '#colorChange';
    willEnable5SecondsButton: string = '#enableAfter';

    // Upload and download locators
    downloadFileButton: string = '#downloadButton';
    uploadFileButton: string = '#uploadFile';
    uploadedFileNameOutputText: string = '#uploadedFilePath';

}