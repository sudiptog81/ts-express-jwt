# TypeScript Express JWT Example

[![Drone (self-hosted)](https://img.shields.io/drone/build/sudipto/typescript-express.svg?logo=drone&server=https%3A%2F%2Fci.ghosh.pro&style=flat-square)](https://ci.ghosh.pro/sudipto/typescript-express)
[![Travis (.com)](https://img.shields.io/travis/com/sudiptog81/ts-express-jwt.svg?logo=travis&style=flat-square)](https://travis-ci.com/sudiptog81/ts-express-jwt)
[![Codecov](https://img.shields.io/codecov/c/gh/sudiptog81/ts-express-jwt.svg?style=flat-square)](https://codecov.io/gh/sudiptog81/ts-express-jwt)

Simple Authentication API using JWT written in TypeScript with SQLite DB.

## API

### User Registration

**Endpoint**: **`POST /api/register`**

#### Request Body

- **name**: name of the user (required)
- **email**: email of the user (required)
- **password**: password (plaintext or externally hashed) (required)

#### Example Response

```json
{
    "user": {
        "id": 1,
        "name": "Awesome User",
        "email": "a@b.com",
        "password": "<INTERNALLY_HASHED_PASSWORD>"
    },
    "access_token": "<ACCESS_TOKEN>",
    "expires_in": 86400
}
```

### User Login

**Endpoint**: **`POST /api/login`**

#### Request Body

- **email**: email of the user (required)
- **password**: password (plaintext or externally hashed) (required)

#### Example Response

```json
{
    "user": {
        "id": 1,
        "name": "Awesome User",
        "email": "a@b.com",
        "password": "<INTERNALLY_HASHED_PASSWORD>"
    },
    "access_token": "<ACCESS_TOKEN>",
    "expires_in": 86400
}
```

### User Deletion

**Endpoint**: **`DELETE /api/delete`**

#### Request Body

- **email**: email of the user (required)
- **password**: password (plaintext or externally hashed) (required)

#### Example Response

```json
{
    "message": "User <USER_EMAIL> deleted!",
    "access_token": "<ACCESS_TOKEN>",
    "expires_in": 86400
}
```

### User Profile Update

**Endpoint**: **`PUT /api/update`**

#### Request Body

- **email**: email of the user (required)
- **password**: password (plaintext or externally hashed) (required)

Either

- **newEmail**: new email of the user, OR
- **newName**: new name of the user

#### Example Response

```json
{
    "user": {
        "id": 1,
        "name": "Awesome User",
        "email": "c@d.com",
        "password": "<INTERNALLY_HASHED_PASSWORD>"
    },
    "access_token": "<ACCESS_TOKEN>",
    "expires_in": 86400
}
```

## Author

[Sudipto Ghosh](https://sudipto.ghosh.pro) sudipto(at)ghosh(dot)pro

## License

Source code distributed under the MIT License.