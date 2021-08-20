export const isAvailableStep = (board: number[][], round: number, from: any, to: any, stepLimit: number) => {
  if ( !from || !to ) return false
  if ( from.x !== to.x ) return false
  if ( board[0][from.x] < 0 ) return false
  if ( board[round%2][from.x] === to.y ) return false

  const opponentY = board[(round%2) ^ 1][from.x]
  if ( round % 2 && opponentY >= to.y ) return false
  if ( !(round % 2) && opponentY <= to.y ) return false
  if ( Math.abs(to.y - board[round%2][from.x]) <= stepLimit ) return true
  return false
}

export const getAvaliableSteps = (gameState: any) => {
  const { board, round, stepLimit } = gameState
  const steps = []
  for ( var i=0; i<board[0].length; ++i) {
    for ( var j=0; j<10; ++j ) {
      if ( isAvailableStep( board, round, {x: i, y: board[round%2][i]} , {x: i, y: j}, stepLimit ) ) {
        let _board = JSON.parse(JSON.stringify(board))
        _board[round%2][i] = j
        steps.push([i, j, getNimSum(_board, stepLimit)])
      }
    }
  }
  return steps
}

const AiRandomness = [0.75, 0.5, 0.25, 0]

export const getAiStep = ( steps: Array<number[]>, aiLv: number ) => {
  if ( Math.random() < AiRandomness[aiLv] ) {
    return steps[getRandomInt(0, steps.length)]
  }
  const bestMoves = steps.filter(step => step[2] === 0)
  if ( bestMoves.length ) {
    return bestMoves[getRandomInt(0, bestMoves.length)]
  }
  return steps[getRandomInt(0, steps.length)]
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const getNimSum = ( board:number[][], stepLimit: number ) => {
  let nimSum = 0
  for ( var i=0; i<board[0].length; ++i) {
    if ( board[0][i] < 0 ) continue
    nimSum ^= ( Math.abs(board[0][i] - board[1][i]) - 1 ) % (stepLimit + 1)
  }
  return nimSum
}