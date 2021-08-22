import Grid from './Grid'
import { makeStyles } from '@material-ui/core'
import GameContext from '../GameContext'
import { useContext } from 'react'

const Playground = () => {
  const { gameState: {board}, isMisere, onBoardClick } = useContext(GameContext)
  const classes = useStyles()

  const X = 'ABCDEFGH'.split('')
  const Y = '1234567890'.split('')

  const occupiedPlayer = (x: number, y: number) => {
    if ( board[0][x] === y ) return 0
    if ( board[1][x] === y ) return 1
    return undefined
  }
  
  return (
    <div className={classes.container} style={{filter: `invert(${isMisere ? 1 : 0})`}}>
      <div className={classes.yAxisContainer} style={{filter: `invert(${isMisere ? 1 : 0})`}}>
        {Y.map((y, i) => <div key={`axis-${i}`}>{i+1}</div>)}
      </div>
      {
        X.map((x, i) => (
          <div key={`line-${x}`} className={classes.lineContainer}>
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
          </div>
        ))
      }
    </div>
  )
}

const useStyles = makeStyles (theme => ({
  container: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  lineContainer: {
    width: '10%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  yAxisContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-around',
    paddingRight: '5px',
    paddingBottom: '20px'
  }
}))

export default Playground