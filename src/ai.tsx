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
        steps.push([i, j, ...getNimSum(_board, stepLimit)])
      }
    }
  }
  return steps
}

const AiRandomness = [0.75, 0.5, 0.25, 0]

export const getAiStep = ( steps: Array<number[]>, aiLv: number, isMisere: boolean ): number[] => {
  if ( Math.random() < AiRandomness[aiLv] ) {
    return steps[getRandomInt(0, steps.length)]
  }

  const bestMoves = steps.filter(([,, nimSum, allOnes, nonZeroCol]) => {
    if ( !isMisere ) return nimSum === 0;
    // if in misere game
    if ( allOnes === 1 || nonZeroCol <= 1 )
      return nimSum === 1
    return nimSum === 0 && allOnes === 0
  }).sort( (a, b) => a[3] - b[3] )

  if ( bestMoves.length ) {
    return bestMoves[0]
  }
  return steps[getRandomInt(0, steps.length)]
}

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const getNimSum = ( board:number[][], stepLimit: number ) => {
  let nimSum = 0
  let sum = 0
  let allOnes = true
  let nonZeroCol = 0
  for ( var i=0; i<board[0].length; ++i) {
    if ( board[0][i] < 0 ) continue
    let diff = Math.abs(board[0][i] - board[1][i]) - 1
    sum += diff
    nimSum ^= diff % (stepLimit + 1)
    allOnes = allOnes && diff <= 1
    nonZeroCol += ( diff > 0 ? 1 : 0 )
  }
  return [nimSum, sum, allOnes ? 1 : 0, nonZeroCol]
}