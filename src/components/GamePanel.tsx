import { Button, FormControlLabel, makeStyles, Switch, Typography } from '@material-ui/core'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import GameContext from '../GameContext'

const PlayerName = ['Black', 'White']

const GamePanel = () => {
  const { gameState: {round, playerFirst, isAi}, aiLv, winner, toggleAi, togglePlayer, resetGame } = useContext(GameContext) 
  const classes = useStyles()
  const { t } = useTranslation()

  const infoMsg = (): string => {
    if ( winner ) {
      if ( isAi ) {
        if ( !(winner-1) === playerFirst ) 
          return t('You win!')
        return t('You lose')
      }
      return t(`${PlayerName[winner - 1]} wins!`)
    }
      
    if ( isAi ) {
      if ( ( round % 2 === 0 ) === playerFirst )
        return t(`Your turn`)
      return t(`ai${aiLv}`) + t('thinking...')
    }
    return t(`${PlayerName[round%2]}'s turn`)
  }
  
  return (
    <div className={classes.container}>
      <Typography>{infoMsg()}</Typography>
      <Button
        variant="contained"
        onClick={resetGame}
        className={classes.resetButton}
      >
        {t('Reset')}
      </Button>
      <div className={classes.setupButton}>
        <FormControlLabel
          control={
            <Switch
              checked={isAi}
              onChange={() => toggleAi()}
              disabled={round !== 0}
            ></Switch>
          }
          label={`${t('Challenge')} ${t('ai'+aiLv)}`}
        />
        <FormControlLabel
          control={
            <Switch
              checked={playerFirst}
              disabled={!isAi || round !== 0}
              onChange={() => togglePlayer()}
            ></Switch>
          }
          label={t('initiative')}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles (theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  resetButton: {
    width: '150px'
  },
  setupButton: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

export default GamePanel