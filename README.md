# ChessMoves Detector

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

## Notes
- The API returns only valid moves for the specified piece, considering blocking and capture rules.
- The React frontend provides a chessboard UI for easy interaction. 
