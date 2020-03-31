# Tic-Tac-Toe
Backend for Tic-Tac-Toe

## Endpoints

### GET

#### /getTable

##### Response

Example: [["","",""],["","",""],["","",""]]

### POST

#### /makeStep

##### Request

JSON body with following parameters (zero-based numbering):
- x - row
- y - column

##### Response

'OK' message

## Client

Please use this [client](https://github.com/Fedorov-A/Tic-Tac-Toe-Client)
