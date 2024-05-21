# Getting Started

## Authentication
If the API requires authentication, obtain token as per the authentication mechanism used. Include token in the request headers for routes that require authentication.

# Routes
# BASEURL:
### https://referral.onrender.com

`USER ROUTE`

### Register User
- Route: /api/user/register
- Request Type: POST
## Description:
- This endpoint allows users to register by providing their firstName, lastName, referralCode(Optional), username, email, and password. User input is validated using bcrypt, and if validation passes, the user is created in the database with a hashed password.

`Request Body:`

- firstName (string): The first name of the user.
- lastName (string): The last name of the user.
- username (string): The desired username for the user.
- email (string): The email address of the user.
- password (string): The user's password.

`Response:`

`msg (string): A message indicating the result of the registration process.`
`status (number): The HTTP status code (Accepted - 202) indicating success.`

### Login User
- Route: /api/user/login
- Request Type: POST

## Description:
- This endpoint allows registered users to log in by providing their email and password. User input is validated using bcrypt, and if validation passes, the provided email is used to retrieve the user's hashed password from the database. If the password is verified successfully, a JSON Web Token (JWT) is generated and returned as part of the response.

`Request Body:`

- `email (string): The email address of the user.`
- `password (string): The user's password.`

`Response:`

- `token (string): A JSON Web Token (JWT) for the logged-in user.`
- `message (string): A message indicating the result of the login process.`


# Referral Route
##### Please note that all request to be made to the referral route requires a `Bearer Token` which can be gotten only when a user has already registered and is logged in.

### Generate Referral Code
- Route: /api/referrals/generate
- Request Type: POST

## Description:
- This endpoint allows users to generate referral code of their own. 

`Request Body:`

- `This endpoint does not require a request body.`


`Response:`

- `referralCode (string): the referral code that is been generated`
- `message (string): success message.`


`Retrieve User Referral Code`

- Route: /api/referrals/get
- Request Type: GET

### Description:
- This endpoint allows users to retrieve the generated referral code.

`Request Body:`

- `This endpoint does not require a request body.`

`Response:`

- `referralCode (string): the referral code that is been generated`
- `message (string): success message.`

#### Wallet Route
##### Please note that all request to be made to the wallet route requires a `Bearer Token` which can be gotten only when a user has already registered and is logged in.

## Withdraw from Wallet

- **Route:** `/api/wallet/withdraw`
- **Request Type:** POST
- **Description:** This endpoint allows users to withdraw from their account balance

**Request Body:**

- `"account_no": "string",`
- `"amount": "number",`
- `"bank_code": "string",`

**Response:**

- `data (string): message from server`
- `message (string): success message.`

## Fund Wallet

- **Route:** `/api/wallet/fund`
- **Request Type:** POST
- **Description:** This endpoint allows users to fund their wallets

**Request Body:**

- `"amount": "number",`

**Response:**

- `message (string): success message.`

`Error Handling`
In case of errors, the Referral returns appropriate HTTP status codes and error messages in the response. Refer to the following common error codes for troubleshooting:

`Common Error Codes`
- 400 Bad Request: Invalid request parameters or data.
- 401 Unauthorized: Authentication required or invalid credentials.
- 403 Forbidden: Access denied due to insufficient permissions.
- 404 Not Found: Resource not found.
- 500 Internal Server Error: Server-side issues; contact support.

That's the basic structure of a documentation guide for a RESTFUL API. You can expand on each section to provide more detailed information, examples, and usage tips as needed for your specific API.
