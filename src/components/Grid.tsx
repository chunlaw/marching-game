import { useContext } from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import GameContext from '../GameContext'
import { isAvailableStep as checkAvailableStep } from '../ai'

const Grid = ({x, y, player, onClick}: {x: number, y: number, player?: number, onClick: (valid: boolean) => void}) => {
  const classes = useStyles()
  const { gameState: {board, round, stepLimit}, selectedToken } = useContext( GameContext )
  const isSelected = () => {
    return selectedToken && selectedToken.x === x && selectedToken.y === y
  }

  const isAvailableStep = (): boolean => {
    if ( !selectedToken ) return false
    return checkAvailableStep(board, round, selectedToken, {x, y}, stepLimit)
  }

  return (
    <Paper 
      square 
      variant={"outlined"} 
      className={classes.cardContainer}
      style={{background: backgroundColor[(x+y) % 2]}}
      onClick={() => onClick(isAvailableStep())}
    >
      <div
        className={`${isAvailableStep() ? classes.stepLayer : ''}`}
      ></div>
      {
        player !== undefined ? 
          <div 
            className={`${classes.chessLayer} ${isSelected() ? classes.selectedChess : ''}`}
          >
          </div> : 
          <></>
      }
      {
        player !== undefined ? 
          <div 
            className={`${classes.chess} ${player === 1 ? classes.player1 : classes.player2}`}
          >
          </div> : 
          <></>
      }
    </Paper>
  )
}

const useStyles = makeStyles(theme => ({
  cardContainer: {
    width: '100%',
    paddingTop: '100%',
    position: 'relative',
    border: 'none'
  },
  stepLayer: {
    position: 'absolute',
    top: '2%',
    left: '2%',
    width: '96%',
    paddingTop: '96%',
    background: 'rgba(152, 251, 152, 0.8)'
  },
  chessLayer: {
    position: 'absolute',
    width: '90%',
    paddingTop: '90%',
    top: '5%',
    left: '5%',
    borderRadius: '50%'
  },
  chess: {
    position: 'absolute',
    width: '80%',
    paddingTop: '80%',
    top: '10%',
    left: '10%',
    borderRadius: '50%'
  },
  player1: {
    background: 'radial-gradient(circle at 25% 75%, #aaa, #eee)',
  },
  player2: {
    background: 'radial-gradient(circle at 25% 75%, #0a0a0a, #636766)',
  },
  selectedChess: {
    background: '#98fb98'
  }
}))

const backgroundColor = ['#f1d9b5', '#b58863']

export default Grid