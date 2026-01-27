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

}