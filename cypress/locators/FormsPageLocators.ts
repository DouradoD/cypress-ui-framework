export class FormsPageLocators {
    // Section and subsection locators (equal to ElementsPageLocators)
    sectionListNames: string = "#app div[class='element-group'] div[class='header-text']";
    subSectionListNames: string = "#app div[class='element-list collapse show'] span[class='text']";

    // Practice Form locators
    firstNameInput: string = '#firstName';
    lastNameInput: string = '#lastName';
    userEmailInput: string = '#userEmail';
    genderRadio: string = 'input[name="gender"]';
    mobileNumberInput: string = '#userNumber';
    openCalendarButton: string = '#dateOfBirthInput';
    selectYearDropdown: string = 'div[class="react-datepicker"] select[class*="year"]';
    selectMonthDropdown: string = 'div[class="react-datepicker"] select[class*="month"]';
    dayListItem: string = '.react-datepicker__month .react-datepicker__day:not(.react-datepicker__day--outside-month)';
    subjectsInput: string = '.subjects-auto-complete__input';
    hobbiesCheckbox: string = 'input[type="checkbox"]';
    currentAddressInput: string = '#currentAddress';
    stateDropdown: string = '#state';
    cityDropdown: string = '#city';
    submitButton: string = '#submit';

    // Practice Form output
    outputTable: string = '.table';
}
