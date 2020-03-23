Feature: Tic-Tac-Toe

    Scenario: Players make a step into empty cell
        Given table 
        |  |  |  |
        |  |  |  |
        |  |  |  |
        When player 1 makes a step into cell 0, 0
        Then table becomes 
        | 1 |  |  |
        |  |  |  |
        |  |  |  |
        When player 2 makes a step into cell 0, 1
        Then table becomes 
        | 1 | 2 |  |
        |  |  |  |
        |  |  |  |
        When player 1 makes a step into cell 0, 2
        Then table becomes 
        | 1 | 2 | 1 |
        |  |  |  |
        |  |  |  |
        When player 2 makes a step into cell 1, 0
        Then table becomes 
        | 1 | 2 | 1 |
        | 2 |  |  |
        |  |  |  |
        When player 1 makes a step into cell 1, 1
        Then table becomes 
        | 1 | 2 | 1 |
        | 2 | 1 |  |
        |  |  |  |
        When player 2 makes a step into cell 1, 2
        Then table becomes 
        | 1 | 2 | 1 |
        | 2 | 1 | 2 |
        |  |  |  |
        When player 1 makes a step into cell 2, 0
        Then table becomes 
        | 1 | 2 | 1 |
        | 2 | 1 | 2 |
        | 1 |  |  |
        When player 2 makes a step into cell 2, 1
        Then table becomes 
        | 1 | 2 | 1 |
        | 2 | 1 | 2 |
        | 1 | 2 |  |
        When player 1 makes a step into cell 2, 2
        Then table becomes 
        | 1 | 2 | 1 |
        | 2 | 1 | 2 |
        | 1 | 2 | 1 |

    Scenario: Players make a step into fill cell
        Given table
        |  |  |  |
        |  |  |  |
        |  |  |  |
        When player 1 makes a step into cell 0, 0
        Then table becomes 
        | 1 |  |  |
        |  |  |  |
        |  |  |  |
        When player 2 makes a step into cell 0, 0
        Then table becomes 
        | 1 |  |  |
        |  |  |  |
        |  |  |  |
        Given table 
        | 1 | 2 |  |
        |  |  |  |
        |  |  |  |
        When player 1 makes a step into cell 0, 0
        Then table becomes
        | 1 | 2 |  |
        |  |  |  |
        |  |  |  |

    Scenario: Check winner in columns
        Given table
        | 1 | 2 |  |
        | 1 | 2 |  |
        |  |  |  |
        When player 1 makes a step into cell 2, 0
        Then table becomes
        | 1 | 2 |  |
        | 1 | 2 |  |
        | 1 |  |  |
        And show message "Player 1 has won"        
        Given table
        | 1 | 2 |  |
        | 1 | 2 |  |
        |  |  |  |
        When player 1 makes a step into cell 1, 2
        Then table becomes
        | 1 | 2 |  |
        | 1 | 2 | 1 |
        |  |  |  |
        When player 2 makes a step into cell 2, 1
        Then table becomes
        | 1 | 2 |  |
        | 1 | 2 | 1 |
        |  | 2 |  |
        And show message "Player 2 has won"

    Scenario: Check winner in rows
        Given table
        | 1 | 1 |  |
        | 2 | 2 |  |
        |  |  |  |
        When player 1 makes a step into cell 0, 2
        Then table becomes
        | 1 | 1 | 1 |
        | 2 | 2 |  |
        |  |  |  |
        And show message "Player 1 has won"        
        Given table
        | 1 | 1 |  |
        | 2 | 2 |  |
        |  |  |  |
        When player 1 makes a step into cell 2, 1
        Then table becomes
        | 1 | 1 |  |
        | 2 | 2 |  |
        |  | 1 |  |
        When player 2 makes a step into cell 1, 2
        Then table becomes
        | 1 | 1 |  |
        | 2 | 2 | 2 |
        |  | 1 |  |
        And show message "Player 2 has won"

    Scenario: Check winner in diagonals 
        Given table
        | 1 | 2 |  |
        | 2 | 1 |  |
        |  |  |  |
        When player 1 makes a step into cell 2, 2
        Then table becomes
        | 1 | 2 |  |
        | 2 | 1 |  |
        |  |  | 1 |
        And show message "Player 1 has won" 
        Given table
        | 1 | 1 | 2 |
        |  | 2 |  |
        |  |  |  |
        When player 1 makes a step into cell 2, 2
        Then table becomes
        | 1 | 1 | 2 |
        |  | 2 |  |
        |  |  | 1 |
        When player 2 makes a step into cell 2, 0
        Then table becomes
        | 1 | 1 | 2 |
        |  | 2 |  |
        | 2 |  | 1 |
        And show message "Player 2 has won" 

    Scenario: Check draw
        Given table
        | 1 | 2 | 1 |
        | 1 | 2 | 1 |
        | 2 |  |  |
        When player 1 makes a step into cell 2, 1
        Then table becomes
        | 1 | 2 | 1 |
        | 1 | 2 | 1 |
        | 2 | 1 |  |
        When player 2 makes a step into cell 2, 2
        Then table becomes
        | 1 | 2 | 1 |
        | 1 | 2 | 1 |
        | 2 | 1 | 2 |
        And show message "There is no winner" 