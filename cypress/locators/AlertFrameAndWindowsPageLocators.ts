export class AlertFrameAndWindowsPageLocators {
    // Section and subsection locators (equal to ElementsPageLocators)
    sectionListNames: string = "#app div[class='element-group'] div[class='header-text']";
    subSectionListNames: string = "#app div[class='element-list collapse show'] span[class='text']";

    // Browser Windows
    newTabButton: string = '#tabButton';
    newWindowButton: string = '#windowButton';
    newWindowMessageButton: string = '#messageWindowButton';
    newTabBody: string = '#sampleHeading';
    newWindowBody: string = '#sampleHeading';
    newWindowMessageBody: string = 'body';

    // Alerts
    alertButton: string = '#alertButton';
    timerAlertButton: string = '#timerAlertButton';
    confirmButton: string = '#confirmButton';
    promptButton: string = '#promptButton';

    // Frames
    frame1: string = '#frame1';
    frame2: string = '#frame2';
    nestedFrameParent: string = '#frame1';

    // Modal Dialogs
    showSmallModalButton: string = '#showSmallModal';
    showLargeModalButton: string = '#showLargeModal';
    closeSmallModalButton: string = '#closeSmallModal';
    closeLargeModalButton: string = '#closeLargeModal';
    modalBody: string = '.modal-body';
}
