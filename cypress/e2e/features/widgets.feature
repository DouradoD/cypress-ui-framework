Feature: Widgets
    As a user
    He wants to interact with the widgets
    So that he can verify their functionality

  @positive
  Scenario Outline: Interact with the Accordion widget
    Given he is on the Widgets page
    And he navigates to the "Accordion" subSection from Widgets
    When he open the message "<message>" in the Accordion widget
    Then the message displayed should include "<expected content>"

    Examples:
      | message                  | expected content                                                                                                                                                                                                                                                                                                  |
      | What is Lorem Ipsum?     | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,                    |
      | Where does it come from? | Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,      |
      | Why do we use it?        | It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. |

  @positive
  Scenario Outline: Interact with the Auto Complete widget
    Given he is on the Widgets page
    And he navigates to the "Auto Complete" subSection from Widgets
    When he interacts with the Auto Complete widget typing the substring "<substring>"
    Then the Auto Complete widget should display the options containing the substring "<substring>"

    Examples:
    //TODO: Only substring from colors
      | substring |
      | Red       |
      | Bl        |
      | Gr        |
      | Yel       |
      | Purp      |
