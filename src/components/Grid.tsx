import { useContext } from 'react'
import { Box, Paper, SxProps, Theme } from '@mui/material'
import GameContext from '../GameContext'
import { isAvailableStep as checkAvailableStep } from '../ai'

const Grid = ({x, y, player, onClick}: {x: number, y: number, player?: number, onClick: (valid: boolean) => void}) => {
  const { gameState: {board, round, stepLimit, lastMove}, selectedToken } = useContext( GameContext )
  const isSelected = () => {
    return selectedToken && selectedToken.x === x && selectedToken.y === y
  }
  
  const isAvailableStep = (): boolean => {
    if ( !selectedToken ) return false
    return checkAvailableStep(board, round, selectedToken, {x, y}, stepLimit)
  }

  const getLastMoveClass = (): SxProps<Theme> => {
    if ( lastMove ) {
      const [last_x, last_y] = lastMove
      if ( last_x === x && last_y === y ) 
        return lastPositionLayerSx
      const v = board[round%2 ^ 1][x]
      const range = [Math.min(v, last_y), Math.max(v, last_y)]
      if ( last_x === x && range[0] <= y && y <= range[1] )
        return lastStepLayerSx
    }
    return {}
  }

  return (
    <Paper 
      square 
      variant={"outlined"} 
      sx={cardContainerSx}
      style={{background: backgroundColor[(x+y) % 2]}}
      onClick={() => onClick(isAvailableStep())}
    >
      <Box sx={getLastMoveClass()} />
      <Box sx={isAvailableStep() ? stepLayerSx : {}} />
      {
        player !== undefined && (
          <Box 
            sx={{...chessLayerSx, ...(isSelected() ? selectedChessSx : {})} as SxProps<Theme>}
          />
        )
      }
      {
        player !== undefined && (
          <Box
            sx={{...chessSx, ...(player === 1 ? player1Sx : player2Sx)} as SxProps<Theme>}
          />
        )
      }
    </Paper>
  )
}


const cardContainerSx: SxProps<Theme> = {
  width: '100%',
  paddingTop: '100%',
  position: 'relative',
  border: 'none'
}

const stepLayerSx: SxProps<Theme> = {
  position: 'absolute',
  top: '2%',
  left: '2%',
  width: '96%',
  paddingTop: '96%',
  background: 'rgba(152, 251, 152, 0.8)'
}

const lastPositionLayerSx: SxProps<Theme> = {
  position: 'absolute',
  top: '3%',
  left: '3%',
  width: '96%',
  paddingTop: '90%',
  border: '1px dashed black'
}

const lastStepLayerSx: SxProps<Theme> = {
  position: 'absolute',
  top: '2%',
  left: '3%',
  width: '96%',
  paddingTop: '96%',
  background: 'rgba(251, 152, 152, 0.8)'
}

const chessLayerSx: SxProps<Theme> = {
  position: 'absolute',
  width: '90%',
  paddingTop: '90%',
  top: '5%',
  left: '5%',
  borderRadius: '50%'
}

const chessSx: SxProps<Theme> = {
  position: 'absolute',
  width: '80%',
  paddingTop: '80%',
  top: '10%',
  left: '10%',
  borderRadius: '50%'
}

const player1Sx: SxProps<Theme> = {
  background: 'radial-gradient(circle at 25% 75%, #aaa, #eee)',
}

const player2Sx: SxProps<Theme> = {
  background: 'radial-gradient(circle at 25% 75%, #0a0a0a, #636766)',
}

const selectedChessSx: SxProps<Theme> = {
  background: '#98fb98'
}

const backgroundColor = ['#f1d9b5', '#b58863']

export default Grid