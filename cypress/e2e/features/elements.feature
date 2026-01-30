@elements
Feature: Elements
    As a user
    He wants to interact with various elements on the page
    So that he can verify their functionality

  @positive
  Scenario: Submit the form from TextBox
    Given he is on the Elements page
    And he navigates to the "Text Box" subSection from Elements
    When he fills out the TextBox form with valid data
    And he submits the form
    Then the submitted data should be displayed correctly

  @positive
  Scenario Outline: Select options from CheckBox
    Given he is on the Elements page
    And he navigates to the "Check Box" subSection from Elements
    And he expands all checkbox options
    When he selects the "<option>" checkbox
    Then the selected option "<option>" should be displayed correctly

    Examples:
      | option    |
      | Home      |
      | Documents |
      | Downloads |

  @positive
  Scenario Outline: Choose a RadioButton
    Given he is on the Elements page
    And he navigates to the "Radio Button" subSection from Elements
    When he selects the "<option>" radio button
    Then the selected radio button "<option>" should be displayed correctly

    Examples:
      | option     |
      | Yes        |
      | Impressive |

  @test
  Scenario: Add a new user on the Web Tables
    Given he is on the Elements page
    And he navigates to the "Web Tables" subSection from Elements
    When he adds "1" new user with valid data
    Then the new user should be displayed correctly

  @test
  Scenario: Remove a user from the Web Tables
    Given he is on the Elements page
    And he navigates to the "Web Tables" subSection from Elements
    And he adds "3" new user with valid data
    And he removes the new user from the table
    When he searchs for the user deleted
    Then the user should not be displayed in the table

  @test
  Scenario: Add multiple users to the Web Tables
    Given he is on the Elements page
    And he navigates to the "Web Tables" subSection from Elements
    And he selects the limit page size as "5"
    When he adds "<numberOfUsers>" new user with valid data
    Then the next button should be enabled
    And the total page should be "<totalPage>"

    Examples:
      | numberOfUsers | totalPage |
      |             4 |         2 |
      |             9 |         3 |

  @positive
  Scenario: Check the Dynamic elements from Dynamic properties subSection
    Given he is on the Elements page
    When he navigates to the "Dynamic Properties" subSection from Elements
    Then the Visible After 5 Seconds button should be displayed
    And the Color change button should be displayed in red color
    And the Will enable 5 Seconds button should be enabled

  @positive
  Scenario: Download and upload file
    Given he is on the Elements page
    When he navigates to the "Upload and Download" subSection from Elements
    And he downloads the file
    And he uploads the file the same file that was downloaded
    Then the uploaded file name should be displayed bellow the upload button
