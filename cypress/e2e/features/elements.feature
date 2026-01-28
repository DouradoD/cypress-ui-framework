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
