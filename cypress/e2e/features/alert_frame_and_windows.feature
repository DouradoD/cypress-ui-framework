Feature: Alerts Frame & Windows
    As a user
    He wants to interact with alerts, frames, and windows
    So that he can verify their functionality

  Scenario: Open a new tab and verify content
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Browser Windows" section
    When he clicks on the "New Tab" button
    Then a new tab should open with the correct content

  Scenario: Open a new window and verify content
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Browser Windows" section
    When he clicks on the "New Window" button
    Then a new window should open with the correct content

  Scenario: Open a new window message and verify content
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Browser Windows" section
    When he clicks on the "New Window Message" button
    Then a new window message should open with the correct content

  Scenario: Handle alerts and verify messages
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Alerts" section
    When he clicks on the Click button to see alert
    Then the alert message should be displayed correctly

  Scenario: Check the frame content
    Given he is on the Alerts Frame & Windows page
    When he navigates to the "Frames" section
    Then the frame content should be displayed correctly

  Scenario: Check the nested frame content
    Given he is on the Alerts Frame & Windows page
    When he navigates to the "Nested Frames" section
    Then the nested frame content should be displayed correctly

  Scenario: Check the modal dialog
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Modal Dialogs" section
    When he opens the small modal dialog
    Then the small modal dialog content should be displayed correctly
   
