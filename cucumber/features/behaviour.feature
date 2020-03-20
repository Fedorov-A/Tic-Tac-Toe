Feature: Tic-Tac-Toe

    Scenario: Players make a step into empty cell
        Given table 
        | . | . | . |
        | . | . | . |
        | . | . | . |
        When player 1 makes a step into cell 0, 0
        Then table becomes 
        | X | . | . |
        | . | . | . |
        | . | . | . |
        When player 2 makes a step into cell 0, 1
        Then table becomes 
        | X | O | . |
        | . | . | . |
        | . | . | . |
        When player 1 makes a step into cell 0, 2
        Then table becomes 
        | X | O | X |
        | . | . | . |
        | . | . | . |
        When player 2 makes a step into cell 1, 0
        Then table becomes 
        | X | O | X |
        | O | . | . |
        | . | . | . |
        When player 1 makes a step into cell 1, 1
        Then table becomes 
        | X | O | X |
        | O | X | . |
        | . | . | . |
        When player 2 makes a step into cell 1, 2
        Then table becomes 
        | X | O | X |
        | O | X | O |
        | . | . | . |
        When player 1 makes a step into cell 2, 0
        Then table becomes 
        | X | O | X |
        | O | X | O |
        | X | . | . |
        When player 2 makes a step into cell 2, 1
        Then table becomes 
        | X | O | X |
        | O | X | O |
        | X | O | . |
        When player 1 makes a step into cell 2, 2
        Then table becomes 
        | X | O | X |
        | O | X | O |
        | X | O | X |

    Scenario: Playes make a step into fill cell
        Given table
        | . | . | . |
        | . | . | . |
        | . | . | . |
        When player 1 makes a step into cell 0, 0
        Then table becomes 
        | X | . | . |
        | . | . | . |
        | . | . | . |
        When player 2 makes a step into cell 0, 0
        Then throw error        
        Given table 
        | X | O | . |
        | . | . | . |
        | . | . | . |
        When player 1 makes a step into cell 0, 0
        Then throw error        

    Scenario: Check winner in columns
        Given table
        | X | O | . |
        | X | O | . |
        | . | . | . |
        When player 1 makes a step into cell 2, 0
        Then table becomes
        | X | O | . |
        | X | O | . |
        | X | . | . |
        And show message "Player 1 has won"        
        Given table
        | X | O | . |
        | X | O | . |
        | . | . | . |
        When player 1 makes a step into cell 1, 2
        Then table becomes
        | X | O | . |
        | X | O | X |
        | . | . | . |
        When player 2 makes a step into cell 2, 1
        Then table becomes
        | X | O | . |
        | X | O | X |
        | . | O | . |
        And show message "Player 2 has won"

    Scenario: Check winner in rows
        Given table
        | X | X | . |
        | O | O | . |
        | . | . | . |
        When player 1 makes a step into cell 0, 2
        Then table becomes
        | X | X | X |
        | O | O | . |
        | . | . | . |
        And show message "Player 1 has won"        
        Given table
        | X | X | . |
        | O | O | . |
        | . | . | . |
        When player 1 makes a step into cell 2, 1
        Then table becomes
        | X | X | . |
        | O | O | . |
        | . | X | . |
        When player 2 makes a step into cell 1, 2
        Then table becomes
        | X | X | . |
        | O | O | O |
        | . | X | . |
        And show message "Player 2 has won"

    Scenario: Check winner in diagonals 
        Given table
        | X | O | . |
        | O | X | . |
        | . | . | . |
        When player 1 makes a step into cell 2, 2
        Then table becomes
        | X | O | . |
        | O | X | . |
        | . | . | X |
        And show message "Player 1 has won" 
        Given table
        | X | X | O |
        | . | O | . |
        | . | . | . |
        When player 1 makes a step into cell 2, 2
        Then table becomes
        | X | X | O |
        | . | O | . |
        | . | . | X |
        When player 2 makes a step into cell 2, 0
        Then table becomes
        | X | X | O |
        | . | O | . |
        | O | . | X |
        And show message "Player 2 has won" 

    Scenario: Check draw
        Given table
        | X | O | X |
        | X | O | X |
        | O | . | . |
        When player 1 makes a step into cell 2, 1
        Then table becomes
        | X | O | X |
        | X | O | X |
        | O | X | . |
        When player 2 makes a step into cell 2, 2
        Then table becomes
        | X | O | X |
        | X | O | X |
        | O | X | O |
        And show message "There is no winner (yet)" 