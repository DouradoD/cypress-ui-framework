Feature: Elements
    As a user
    He wants to interact with various elements on the page
    So that he can verify their functionality

  @test
  Scenario: Submit the form from TextBox
    Given he is on the Elements page
    And he navigates to the "Text Box" section
    When he fills out the TextBox form with valid data
    And he submits the form
    Then the submitted data should be displayed correctly

  @test
  Scenario Outline: Select options from CheckBox
    Given he is on the Elements page
    And he navigates to the "Check Box" section
    And he expands all checkbox options
    When he selects the "<option>" checkbox
    Then the selected option "<option>" should be displayed correctly

    Examples:
      | option    |
      | Home      |
      | Documents |
      | Downloads |

  @test
  Scenario Outline: Choose a RadioButton
    Given he is on the Elements page
    And he navigates to the "Radio Button" section
    When he selects the "<option>" radio button
    Then the selected radio button "<option>" should be displayed correctly

    Examples:
      | option     |
      | Yes        |
      | Impressive |
