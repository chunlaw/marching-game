import Grid from './Grid'
import GameContext from '../GameContext'
import { useContext } from 'react'
import { Box, SxProps, Theme } from '@mui/material'

const Playground = () => {
  const { gameState: {board}, isMisere, onBoardClick } = useContext(GameContext)

  const X = 'ABCDEFGH'.split('')
  const Y = '1234567890'.split('')

  const occupiedPlayer = (x: number, y: number) => {
    if ( board[0][x] === y ) return 0
    if ( board[1][x] === y ) return 1
    return undefined
  }
  
  return (
    <Box sx={containerSx} style={{filter: `invert(${isMisere ? 1 : 0})`}}>
      <Box sx={yAxisContainerSx} style={{filter: `invert(${isMisere ? 1 : 0})`}}>
        {Y.map((_, i) => <div key={`axis-${i}`}>{i+1}</div>)}
      </Box>
      {
        X.map((x, i) => (
          <Box key={`line-${x}`} sx={lineContainerSx}>
            <div style={{filter: `invert(${isMisere ? 1 : 0})`}}>{x}</div>
            {
              Y.map((y, j) => (
                <Grid 
                  key={`${x}${y}`}
                  x={i}
                  y={j}
                  player={occupiedPlayer(i,j)}
                  onClick={(validStep) => onBoardClick({x:i, y: j}, validStep)}
                />
              ))
            }
          </Box>
        ))
      }
    </Box>
  )
}

const containerSx: SxProps<Theme> = {
  flexDirection: 'row',
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
}

const lineContainerSx: SxProps<Theme> = {
  width: '10%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column-reverse'
}

const yAxisContainerSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column-reverse',
  justifyContent: 'space-around',
  paddingRight: '5px',
  paddingBottom: '20px'
}

export default Playground