Feature: Forms
    As a user
    He wants to interact with the forms
    To submit and verify form data

  @positive
  Scenario: Submit the Practice Form with valid data
    Given he is on the Forms page
    And he navigates to the "Practice Form" subSection from Forms
    When he fills out the Practice Form with valid data
    And he submits the form
    Then the submitted data from practice form should be displayed correctly
