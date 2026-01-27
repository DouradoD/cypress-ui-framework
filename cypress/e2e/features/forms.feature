Feature: Forms
    As a user
    He wants to interact with the forms
    To submit and verify form data

  Scenario: Submit the Practice Form with valid data
    Given he is on the Forms page
    And he navigates to the "Practice Form" section
    When he fills out the Practice Form with valid data
    And he submits the form
    Then the submitted data from practice form should be displayed correctly

  Scenario: Try to submit the practice form without any data
    Given he is on the Forms page
    And he navigates to the "Practice Form" section
    When he attempts to submit the Practice Form without filling any data
    Then appropriate validation messages should be displayed for required fields
