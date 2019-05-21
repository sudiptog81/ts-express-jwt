# TypeScript JWT Example

Simple Authentication API using JWT written in TypeScript with SQLite DB.

## API

### User Registration

**Endpoint**: **`POST /api/register`**

#### Request Body

- **name**: name of the user
- **email**: email of the user
- **password**: password (plaintext or externally hashed)

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

- **email**: email of the user
- **password**: password (plaintext or externally hashed)

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

## Author

[Sudipto Ghosh](https://sudipto.ghosh.pro) sudipto(at)ghosh(dot)pro

## License

Source code distributed under the MIT License.