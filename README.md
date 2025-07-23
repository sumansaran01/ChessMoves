# VinferAi Chess API

## Overview
This is a Node.js backend API and React frontend that lets you determine valid moves for a given chess piece (Rook, Queen, Bishop, Knight) based on the current board positions.

## How to Run Locally

### 1. Start the Backend
Open a terminal and run:
```sh
cd backend
npm install
npm start
```
The backend API will be available at `http://localhost:8000`.

### 2. Start the Frontend
Open another terminal and run:
```sh
cd frontend
npm install
npm start
```
The React app will open at `http://localhost:3000`.

## API Usage

### Endpoint
`POST /chess/:slug`
- `:slug` is the piece name (e.g., `rook`, `queen`, `bishop`, `knight`)

### Request Body Example
```
{
  "postions": {
    "Queen": "E7",
    "Bishop": "B7",
    "Rook": "G5",
    "Knight": "C3"
  }
}
```

### Response Example
```
{
  "valid_moves": ["A4", "A2", "B1", "D1"]
}
```

## Example cURL Request
```
curl -X POST http://localhost:8000/chess/knight \
  -H "Content-Type: application/json" \
  -d '{"postions": {"Queen": "E7", "Bishop": "B7", "Rook": "G5", "Knight": "C3"}}'
```

## Notes
- The API returns only valid moves for the specified piece, considering blocking and capture rules.
- The React frontend provides a chessboard UI for easy interaction. 