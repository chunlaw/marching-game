import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAvaliableSteps, getAiStep, getRandomInt } from './ai'
import { GameStateProps, CoordinateProps, RecordsProps, Level, MisereLevelOffset } from './constants'
import { validLv, vibrate } from './utils'

interface GameContextProps {
  level: number,
  aiLv: number,
  gameState: GameStateProps;
  selectedToken: CoordinateProps | null;
  winner: number|null;
  records: RecordsProps;
  isMisere: boolean;
  onBoardClick: (c: CoordinateProps, validStep: boolean|undefined) => void;
  resetGame: () => void;
  setLevel: (idx: number) => void;
  setAiLv: (lv: number) => void;
  toggleAi: () => void;
  togglePlayer: () => void;
  toggleMisere: () => void;
}

const GameContext = React.createContext({} as GameContextProps)

export const GameContextProvider = ({children}: {children: any}) => {
  const { lvId } = useParams<{lvId ?: string|undefined}>()
  const [level, setLevel] = useState<number>( validLv( lvId ) )
  const [gameState, setGameState] = useState<GameStateProps>(Level[level])
  const [selectedToken, setSelectedToken] = useState<CoordinateProps | null>(null)
  const [winner, setWinner] = useState<number|null>(null)
  const [records, setRecords] = useState<RecordsProps>(JSON.parse(localStorage.getItem('@records') || 'null') || Level.reduce((acc, _, idx) => ({...acc, [idx]: [0,0,0,0]}), {}))
  const [isMisere, setIsMisere] = useState<boolean>(false)
  const aiLv = useRef<number>(0)

  useEffect(() => {
    const { board, round } = gameState
    let sum = 0
    for (var i=0;i<board[0].length;++i) {
      sum += Math.abs(board[0][i] - board[1][i]) - 1
    }
    
    if ( sum === 0 ) {
      const _winner = 2 - ( ( round % 2 ) ^ ( isMisere ? 1 : 0 ) )
      setWinner(_winner)

      const { isAi, playerFirst } = gameState
      if ( isAi && !(_winner-1) === playerFirst ) {
        updateRecords(Level.map(level => level.lv).indexOf( gameState.lv ), aiLv.current)
      }
    } else if ( gameState.isAi && ( gameState.round % 2 === 1 ) === gameState.playerFirst ) {
      const steps = getAvaliableSteps(gameState)
      const [x, y] = getAiStep (steps, aiLv.current, isMisere)
      setTimeout ( () => {
        setGameState( prev => {
          const _board = JSON.parse(JSON.stringify(prev.board)) 
          _board[prev.round%2][x] = y
          return {
            ...prev,
            board: _board,
            lastMove: [x, prev.board[round%2][x]],
            round: prev.round + 1
          } 
        })
      }, getRandomInt(750, 2000) ) // pretend to think.....
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState])

  useEffect(() => {
    resetGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  useEffect(() => {
    setLevel(validLv(lvId))
  }, [lvId])

  useEffect(() => {
    localStorage.setItem('@records', JSON.stringify(records))
  }, [records])

  useEffect(() => {
    document.getElementsByTagName('body')[0].className = isMisere 
      ? "invertBody" 
      : ""    
  }, [isMisere])

  const onBoardClick = ( coor: CoordinateProps, validStep: boolean|undefined ) => {
    if ( winner ) return;
    vibrate(1);
    const { board, round } = gameState
    const { x, y } = coor
    if ( selectedToken !== null && selectedToken.x === x && selectedToken.y === y ) {
      setSelectedToken(null)
      return
    } else if ( board[round % 2][x] === y ) {
      setSelectedToken(coor)
      return
    } else if ( validStep ) {
      setGameState ( () => {
        const _ret = JSON.parse(JSON.stringify(gameState))
        _ret.lastMove = [coor.x, gameState.board[round%2][coor.x]]
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
    const _gameState = JSON.parse(JSON.stringify(Level[level]))
    if ( _gameState.random ) {
      _gameState.stepLimit = getRandomInt(2, 10) 
      const warlines = [1, 1, 0, 1, 1, 0, 1, 0].map(v => {
        if ( v ) return v
        else return getRandomInt(0, 2)
      })

      _gameState.board = [
        warlines.map(v => v ? getRandomInt(0, 4) : -9 ),
        warlines.map(v => v ? getRandomInt(5, 9) : -8 ),
      ]
    }
    _gameState.isAi = gameState.isAi
    setGameState(_gameState)
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

  const toggleMisere = () : void => {
    setIsMisere(!isMisere)
  }

  const setAiLv = (lv: number) : void => {
    aiLv.current = lv
    resetGame()
  }

  const updateRecords = ( lv: number, aiLv: number ): void => {
    lv += isMisere ? MisereLevelOffset : 0
    if ( records[lv] && records[lv][aiLv] ) return;
    setRecords( (prev: RecordsProps) => {
      const ret = {...prev}
      if ( !ret[lv] ) ret[lv] = [0, 0, 0, 0]
      ret[lv][aiLv] = 1
      return ret
    })
  }

  return (
    <GameContext.Provider
      value={{
        aiLv: aiLv.current, level,
        gameState, selectedToken, 
        winner, records, isMisere,
        onBoardClick, resetGame,
        toggleAi, togglePlayer, toggleMisere,
        setLevel, setAiLv
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameContext