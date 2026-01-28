export class WidgetsPageLocators {
    // Section and subsection locators (equal to ElementsPageLocators)
    sectionListNames: string = "#app div[class='element-group'] div[class='header-text']";
    subSectionListNames: string = "#app div[class='element-list collapse show'] span[class='text']";

    // Accordion (demoqa uses "accordian" in URL; section ids: section1Heading, section2Heading, section3Heading)
    messageHeading: string = ' div[class="card-header"][id*="section"]';
    messageContent: string = 'div[class="collapse show"] div[id*="section"]';

    // Auto Complete
    autoCompleteMultipleContainerInput: string = '#autoCompleteMultipleInput';
    autoCompleteSingleContainerInput: string = '#autoCompleteSingleInput';
    autoCompleteMultipleOptions: string = 'div[id^="react-select-2-option"]';
    autoCompleteSingleOptions: string = 'div[id^="react-select-3-option"]';
}
