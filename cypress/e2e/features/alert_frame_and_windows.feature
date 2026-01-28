@positive
Feature: Alerts Frame & Windows
    As a user
    He wants to interact with alerts, frames, and windows
    So that he can verify their functionality


  Scenario: Open a new tab and verify content
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Browser Windows" subSection from Alerts Frame & Windows
    When he clicks on the "New Tab" button
    Then a new tab should open with the correct content

  Scenario: Open a new window and verify content
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Browser Windows" subSection from Alerts Frame & Windows
    When he clicks on the "New Window" button
    Then a new window should open with the correct content

  Scenario: Open a new window message and verify content
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Browser Windows" subSection from Alerts Frame & Windows
    When he clicks on the "New Window Message" button
    Then a new window message should open with the correct content

  Scenario: Handle alerts and verify messages
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Alerts" subSection from Alerts Frame & Windows
    When he clicks on the Click button to see alert
    Then the alert dialog should be displayed

  Scenario: Check the frame content
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Frames" subSection from Alerts Frame & Windows
    Then the frame dialog should be displayed

  Scenario: Check the nested frame content
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Nested Frames" subSection from Alerts Frame & Windows
    Then the nested frame dialog should be displayed

  Scenario: Check the modal dialog
    Given he is on the Alerts Frame & Windows page
    And he navigates to the "Modal Dialogs" subSection from Alerts Frame & Windows
    When he opens the small modal dialog
    Then the small modal dialog should be displayed
   
