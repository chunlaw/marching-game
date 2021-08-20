import React, { useRef, useState, useEffect } from 'react'
import { getAvaliableSteps, getAiStep } from './ai'

interface CoordinateProps {
  x: number,
  y: number
}

interface GameStateProps {
  lv: string;
  board: number[][];
  round: number;
  stepLimit: number;
  isAi: boolean;
  playerFirst: boolean;
}

interface GameContextProps {
  gameLv: number,
  aiLv: number,
  gameState: GameStateProps;
  selectedToken: CoordinateProps | null;
  winner: number|null;
  onBoardClick: (c: CoordinateProps, validStep: boolean|undefined) => void;
  resetGame: () => void;
  setLevel: (idx: number) => void;
  setAiLv: (lv: number) => void;
  toggleAi: () => void;
  togglePlayer: () => void;
}


const GameContext = React.createContext({} as GameContextProps)

export const GameContextProvider = ({children}: {children: any}) => {
  const [level, setLevel] = useState<number>(1)
  const [gameState, setGameState] = useState<GameStateProps>(Level[level])
  const [selectedToken, setSelectedToken] = useState<CoordinateProps | null>(null)
  const [winner, setWinner] = useState<number|null>(null)
  const gameLv = useRef<number>(0)
  const aiLv = useRef<number>(0)

  useEffect(() => {
    const { board, round } = gameState
    let sum = 0
    for (var i=0;i<board[0].length;++i) {
      sum += Math.abs(board[0][i] - board[1][i]) - 1
    }
    
    if ( sum === 0 ) {
      setWinner(round % 2 ? 1 : 2)
    } else if ( gameState.isAi && ( gameState.round % 2 === 1 ) === gameState.playerFirst ) {
      const steps = getAvaliableSteps(gameState)
      const [x, y] = getAiStep (steps, aiLv.current)
      setTimeout ( () => {
        setGameState( prev => {
          const _board = JSON.parse(JSON.stringify(prev.board)) 
          _board[prev.round%2][x] = y
          return {
            ...prev,
            board: _board,
            round: prev.round + 1
          } 
        })
      }, 0 )
    }
  }, [gameState])

  useEffect(() => {
    resetGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  const onBoardClick = ( coor: CoordinateProps, validStep: boolean|undefined ) => {
    if ( winner ) return;
    const { board, round } = gameState
    const { x, y } = coor
    if ( selectedToken !== null && selectedToken.x === x && selectedToken.y === y ) {
      setSelectedToken(null)
      return
    } else if ( board[round % 2][x] === y ) {
      setSelectedToken(coor)
      return
    } else if ( validStep ) {

      setGameState ( prev => {
        const _ret = JSON.parse(JSON.stringify(gameState))
        _ret.board[round % 2][coor.x] = coor.y
        _ret.round += 1
        return _ret
      })
      setSelectedToken(null)
      return
    }
  }

  const resetGame = () : void => {
    setWinner(null)
    setGameState(JSON.parse(JSON.stringify(Level[level])))
  }

  const toggleAi = () : void => {
    setGameState(prev => ({
      ...prev,
      isAi: !prev.isAi
    }))
  }

  const togglePlayer = () : void => {
    setGameState(prev => ({
      ...prev,
      playerFirst: !prev.playerFirst
    }))
  }

  const setAiLv = (lv: number) : void => {
    aiLv.current = lv
    resetGame()
  }

  return (
    <GameContext.Provider
      value={{
        aiLv: aiLv.current, gameLv: gameLv.current,
        gameState, selectedToken, 
        winner, 
        onBoardClick, resetGame,
        toggleAi, togglePlayer,
        setLevel, setAiLv
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const Level = [
  {
    lv: 'lv1',
    board: [[-10, -10, -10, 0, -10, -10, -10, -10], [-9, -9, -9, 9, -9, -9, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 100,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv2',
    board: [[-10, -10, -10, 0, -10, -10, -10, -10], [-9, -9, -9, 9, -9, -9, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 3,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv3',
    board: [[-10, -10, 0, -10, -10, 2, -10, -10], [-9, -9, 8, -9, -9, 9, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 100,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv4',
    board: [[-10, -10, 0, -10, -10, 0, -10, -10], [-9, -9, 9, -9, -9, 8, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 3,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv5',
    board: [[-10, 0, -10, 0, -10, 0, -10, -10], [-9, 9, -9, 7, -9, 8, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 100,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv6',
    board: [[-10, 0, -10, 0, -10, 0, -10, -10], [-9, 7, -9, 9, -9, 8, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 3,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv7',
    board: [[-10, 0, 2, 1, 0, 3, 0, 1], [-9, 7, 9, 9, 8, 8, 7, 9]],
    turn: 0,
    round: 0,
    stepLimit: 100,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv8',
    board: [[0, 1, 0, 2, 0, 1, 2, 0], [9, 7, 9, 8, 9, 8, 9, 7]],
    turn: 0,
    round: 0,
    stepLimit: 3,
    isAi: true,
    playerFirst: true
  }
]

export default GameContext