# TypeScript JWT Example

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
}x
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
}x
```

## Author

[Sudipto Ghosh](https://sudipto.ghosh.pro) sudipto(at)ghosh(dot)pro

## License

Source code distributed under the MIT License.