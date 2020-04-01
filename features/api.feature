Feature: API

   Game API   
    
    # user1 is already exist, user3 is new
    Scenario Outline: Sign In

        When user tries to sign in with followed <username> and <password>
        Then user gets <response>

    Examples: 
    | username | password    | response |
    | "user1"  | "password1" | 400      |
    | "user3"  | "password3" | 200      |

    # user1 is already exist, user4 isn't exist, user3 was created in previous scenario
    Scenario Outline: Log In

        When user tries to log in with followed <username> and <password>
        Then user gets <response>
        
    Examples: 
    | username | password    | response |
    | "user1"  | "password1" | 200      |
    | "user4"  | "password4" | 400      |
    | "user3"  | "password3" | 200      |

    # user3 can create new game, user4 can't
    Scenario Outline: User creates a new game

        Given user tries to log in with followed <username> and <password>
        When user creates a new game
        Then user gets <response>

    Examples: 
    | username | password    | response |
    | "user3"  | "password3" | 200      |
    | "user3"  | "password4" | 401      |
