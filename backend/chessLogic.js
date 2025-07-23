// Helper functions for chess logic
const files = ['A','B','C','D','E','F','G','H'];
const ranks = ['1','2','3','4','5','6','7','8'];

function posToCoord(pos) {
  const file = files.indexOf(pos[0].toUpperCase());
  const rank = ranks.indexOf(pos[1]);
  if (file === -1 || rank === -1) throw new Error('Invalid position: ' + pos);
  return [file, rank];
}

function coordToPos([file, rank]) {
  return files[file] + ranks[rank];
}

function isOnBoard(file, rank) {
  return file >= 0 && file < 8 && rank >= 0 && rank < 8;
}

function getOccupied(postions) {
  const occ = {};
  for (const [piece, pos] of Object.entries(postions)) {
    occ[pos.toUpperCase()] = piece;
  }
  return occ;
}

function getValidMoves(slug, postions) {
  slug = slug.toLowerCase();
  const pieceName = Object.keys(postions).find(
    k => k.toLowerCase() === slug
  );
  if (!pieceName) throw new Error('Piece not found in postions');
  const from = postions[pieceName].toUpperCase();
  const [fx, fy] = posToCoord(from);
  const occupied = getOccupied(postions);
  const moves = [];

  const directions = {
    rook:   [[1,0], [-1,0], [0,1], [0,-1]],
    bishop: [[1,1], [1,-1], [-1,1], [-1,-1]],
    queen:  [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    knight: [
      [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1], [-2,1], [-1,2]
    ]
  };

  if (slug === 'knight') {
    for (const [dx, dy] of directions.knight) {
      const nx = fx + dx, ny = fy + dy;
      if (!isOnBoard(nx, ny)) continue;
      const pos = coordToPos([nx, ny]);
      if (!occupied[pos] || occupied[pos] !== pieceName) {
        moves.push(pos);
      }
    }
  } else {
    const dirs = directions[slug];
    if (!dirs) throw new Error('Unknown piece: ' + slug);
    for (const [dx, dy] of dirs) {
      let nx = fx + dx, ny = fy + dy;
      while (isOnBoard(nx, ny)) {
        const pos = coordToPos([nx, ny]);
        if (occupied[pos]) {
          if (occupied[pos] !== pieceName) moves.push(pos); // capture
          break;
        }
        moves.push(pos);
        nx += dx; ny += dy;
      }
    }
  }
  return moves;
}

module.exports = { getValidMoves }; 