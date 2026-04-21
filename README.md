# mcp-demo-products-api-dk01

Simple Express API for managing products using an in-memory store. Great for demos, tests, and quick prototypes.

## Setup 🧰

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm (comes with Node.js)

### Install

From the project root:

1) Install dependencies

```
npm install
```

### Configuration

No configuration is required. You can optionally set the port:

- `PORT` (default: `3000`)

## Run the API 🚀

### Development (auto-reload)

```
npm run dev
```

### Production

```
npm start
```

The server starts at: `http://localhost:3000`

## API Endpoints 📚

Base URL: `http://localhost:3000`

### Health

- `GET /health`

Response:

```
{ "status": "ok" }
```

### Products

#### List products

- `GET /products`

Response:

```
[
	{ "id": "1", "name": "Mouse", "price": 19.99 }
]
```

#### Get a product

- `GET /products/:id`

Responses:

- `200 OK` with product
- `404 Not Found` when missing

#### Create a product

- `POST /products`

Body:

```
{ "name": "Mouse", "price": 19.99 }
```

Validation rules:

- `name` must be a string with at least 2 characters
- `price` must be a number greater than 0

Responses:

- `201 Created` with the created product
- `400 Bad Request` with validation details

#### Update a product

- `PUT /products/:id`

Body:

```
{ "name": "Mouse Pro", "price": 29.99 }
```

Responses:

- `200 OK` with updated product
- `400 Bad Request` with validation details
- `404 Not Found` when missing

#### Delete a product

- `DELETE /products/:id`

Responses:

- `204 No Content` when deleted
- `404 Not Found` when missing

## Testing 🧪

Run all tests (unit + integration):

```
npm test
```

Test structure:

- `src/tests/unit` – model validation tests
- `src/tests/integration` – API tests using Supertest
