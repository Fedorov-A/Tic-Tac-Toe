Feature: API

   Game API   
    
    # user1 gets error because he (she) is already exist
    # user3 successfull signs in because he (she) is new
    Scenario Outline: Sign In

        When user tries to sign in with followed username <username> and password <password>
        Then user gets response <response>

    Examples: 
    | username | password    | response |
    | "user1"  | "password1" | 400      |
    | "user3"  | "password3" | 200      |

    # user1 successfull logs in
    # user4 gets error because he (she) isn't registered
    # user3 successfull logs in
    Scenario Outline: Log In

        When user tries to log in with followed username <username> and password <password>
        Then user gets response <response>
        
    Examples: 
    | username | password    | response |
    | "user1"  | "password1" | 200      |
    | "user4"  | "password4" | 400      |
    | "user3"  | "password3" | 200      |

    # user3 successfull creates game
    # user4 gets error because he (she) unauthorized
    Scenario Outline: Create a new game

        Given user tries to log in with followed username <username> and password <password>
        When user tries to create a new game
        Then user gets response <response>

    Examples: 
    | username | password    | response |
    | "user3"  | "password3" | 200      |
    | "user4"  | "password4" | 401      |  
    
    # user3 successfull gets games
    # user4 gets error because he (she) unauthorized
    Scenario Outline: Get a list of the games

        Given user tries to log in with followed username <username> and password <password>
        When user tries to get a list of games
        Then user gets response <response>

    Examples: 
    | username | password    | response |
    | "user3"  | "password3" | 200      |
    | "user4"  | "password4" | 401      |

    # user3 successfull connects to games
    # user4 gets error because he (she) unauthorized
    Scenario Outline: Connect to the game

        Given user tries to log in with followed username <username> and password <password>
        When user tries to create a new game
        When user tries to connect to that new game
        Then user gets response <response>

    Examples: 
    | username | password    | response |
    | "user3"  | "password3" | 200      |
    | "user4"  | "password4" | 401      |

    # user1 successfull connects to that new game
    # user2 successfull connects to that new game
    # user3 gets error because there is no empty slots :(
    Scenario: Three users try to play in one game

        Given user tries to log in with followed username "user1" and password "password1"
        And user tries to create a new game
        And user tries to connect to that new game
        Then user gets response 200
        And user tries to log in with followed username "user2" and password "password2"
        And user tries to connect to that new game        
        Then user gets response 200
        And user tries to log in with followed username "user3" and password "password3"
        And user tries to connect to that new game        
        Then user gets response 400

    # user3 successfull gets game status
    # user4 gets error because he (she) unauthorized
    Scenario Outline: Get game status

        Given user tries to log in with followed username <username> and password <password>
        When user tries to create a new game
        When user tries to get game status
        Then user gets response <response>

    Examples: 
    | username | password    | response |
    | "user3"  | "password3" | 200      |
    | "user4"  | "password4" | 401      |

    # user3 successfull gets game status
    Scenario: Get game status 2

        Given user tries to log in with followed username "user3" and password "password3"
        When user tries to create a new game
        When user tries to get game status
        Then user gets table [["","",""],["","",""],["","",""]]

    # user3 successfull gets game status
    # user4 gets error because he (she) unauthorized
    Scenario Outline: Make a step

        Given user tries to log in with followed username <username> and password <password>
        When user tries to create a new game
        And user tries to connect to that new game
        And user tries to make a step [1, 1]
        Then user gets response <response>

    Examples: 
    | username | password    | response |
    | "user3"  | "password3" | 200      |
    | "user4"  | "password4" | 401      |

    # user3 successfull makes a step 
    Scenario: Make a step into empty cell

        Given user tries to log in with followed username "user3" and password "password3"
        When user tries to create a new game
        And user tries to connect to that new game
        And user tries to make a step [1, 1]
        When user tries to get game status
        Then user gets table [["","",""],["","1",""],["","",""]]

    # user3 successfull makes a step 
    # user3 tries to make another step but gets error because it's not his (her) turn
    Scenario: One user makes a step into cell twice

        Given user tries to log in with followed username "user3" and password "password3"
        When user tries to create a new game
        And user tries to connect to that new game
        And user tries to make a step [1, 1]
        And user tries to make a step [0, 1]
        Then user gets response 400

    # user3 successfull makes a step 
    # user2 tries to make same step but gets error because cell is not empty
    Scenario: Two users make step into the same cell

        Given user tries to log in with followed username "user3" and password "password3"
        When user tries to create a new game
        And user tries to connect to that new game
        And user tries to make a step [1, 1]
        And user tries to get game status
        Then user gets table [["","",""],["","1",""],["","",""]]
        Given user tries to log in with followed username "user2" and password "password2"
        And user tries to connect to that new game
        And user tries to get game status
        Then user gets table [["","",""],["","1",""],["","",""]]
        And user tries to make a step [1, 1]
        Then user gets response 400

    # user3 successfull makes a step 
    # user2 successfull makes a step
    Scenario: Two users make step into diffrent cells

        Given user tries to log in with followed username "user3" and password "password3"
        When user tries to create a new game
        And user tries to connect to that new game
        And user tries to make a step [1, 1]
        And user tries to get game status
        Then user gets table [["","",""],["","1",""],["","",""]]
        Given user tries to log in with followed username "user2" and password "password2"
        And user tries to connect to that new game
        And user tries to make a step [0, 0]
        And user tries to get game status
        Then user gets table [["2","",""],["","1",""],["","",""]]
        
    # user3 wins (vertical)
    Scenario: Two users play a game

        Given user tries to log in with followed username "user3" and password "password3"
        When user tries to create a new game
        And user tries to connect to that new game
        And user tries to make a step [0, 0]
        Given user tries to log in with followed username "user2" and password "password2"
        And user tries to connect to that new game
        And user tries to make a step [0, 1]
        Given user tries to log in with followed username "user3" and password "password3"
        And user tries to make a step [1, 0]
        Given user tries to log in with followed username "user2" and password "password2"
        And user tries to make a step [1, 1]
        Given user tries to log in with followed username "user3" and password "password3"
        And user tries to make a step [2, 0]
        And user tries to get game status
        Then user gets table [["1","2",""],["1","2",""],["1","",""]]
        Then show message 'Player 1 (user3) has won.'

    # user2 wins (diagonal)
    Scenario: Two users play a game 2

        Given user tries to log in with followed username "user3" and password "password3"
        When user tries to create a new game
        And user tries to connect to that new game
        And user tries to make a step [1, 0]
        Given user tries to log in with followed username "user2" and password "password2"
        And user tries to connect to that new game
        And user tries to make a step [0, 0]
        Given user tries to log in with followed username "user3" and password "password3"
        And user tries to make a step [2, 0]
        Given user tries to log in with followed username "user2" and password "password2"
        And user tries to make a step [1, 1]
        Given user tries to log in with followed username "user3" and password "password3"
        And user tries to make a step [2, 1]
        Given user tries to log in with followed username "user2" and password "password2"
        And user tries to make a step [2, 2]
        And user tries to get game status
        Then user gets table [["2","",""],["1","2",""],["1","1","2"]]
        Then show message 'Player 2 (user2) has won.'
    
    # user3 wins (horizontal)
    Scenario: Two users play a game 3

        Given user tries to log in with followed username "user3" and password "password3"
        When user tries to create a new game
        And user tries to connect to that new game
        And user tries to make a step [0, 0]
        Given user tries to log in with followed username "user2" and password "password2"
        And user tries to connect to that new game
        And user tries to make a step [1, 1]
        Given user tries to log in with followed username "user3" and password "password3"
        And user tries to make a step [0, 1]
        Given user tries to log in with followed username "user2" and password "password2"
        And user tries to make a step [1, 2]
        Given user tries to log in with followed username "user3" and password "password3"
        And user tries to make a step [0, 2]
        And user tries to get game status
        Then user gets table [["1","1","1"],["","2","2"],["","",""]]
        Then show message 'Player 1 (user3) has won.'