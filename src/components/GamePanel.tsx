import { Box, Button, Divider, FormControlLabel, Paper, Switch, SxProps, Theme, Typography } from '@mui/material'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Star as StarIcon,
  Replay as ReplayIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material"
import GameContext from '../GameContext'
import { AiColors, Level, PlayerName } from '../constants';
import { useHistory, useParams } from 'react-router-dom';
import { validLv } from '../utils';

const GamePanel = () => {
  const { lvId } = useParams<{lvId: string | undefined}>()
  const { gameState: {round, playerFirst, isAi}, isMisere, aiLv, toggleAi, togglePlayer, resetGame } = useContext(GameContext) 
  const { t, i18n } = useTranslation()
  const history = useHistory()
 
  return (
    <Paper sx={containerSx}>
      <Typography variant="h5"><InfoMsg /></Typography>
      <Divider />
      <Box sx={setupButtonSx}>
        <Button
          variant="contained"
          onClick={() => history.replace(`/${i18n.language}/${validLv(lvId)}`)}
          disabled={ validLv(lvId) === 0 }
        >
          <NavigateBeforeIcon />
        </Button>
        <Button
          variant="contained"
          onClick={resetGame}
          sx={resetButtonSx}
        >
          <ReplayIcon />
          {t('Reset')}
        </Button>
        <Button
          variant="contained"
          onClick={() => history.replace(`/${i18n.language}/${validLv(lvId) + 2}`)}
          disabled={ validLv(lvId) === Level.length - 1 }
        >
          <NavigateNextIcon />
        </Button>
      </Box>
      <Box sx={setupButtonSx}>
        <FormControlLabel
          control={
            <Switch
              checked={isAi}
              onChange={() => toggleAi()}
              disabled={round !== 0}
            ></Switch>
          }
          label={`${t('Challenge')} ${t((isMisere ? 'm' : '')+'ai'+aiLv)}`}
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
      </Box>
    </Paper>
  )
}

const InfoMsg = ( ) => {
  const { gameState: {round, playerFirst, isAi}, isMisere, aiLv, winner } = useContext(GameContext) 
  const { t } = useTranslation()
  const infoMsg = () : string => {
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
      return t(`${isMisere ? 'm' : ''}ai${aiLv}`) + t('thinking...')
    }
    return t(`${PlayerName[round%2]}'s turn`)
  }

  return (
    <>
      {infoMsg()}
      {
        winner && isAi && !(winner-1) === playerFirst? 
          <>{t(', obtain a ')} <StarIcon style={{color: AiColors[aiLv]}}></StarIcon></> : 
          <></>
      }
    </>
  )
}


const containerSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  px: 2,
  py: 1, 
}

const resetButtonSx: SxProps<Theme> = {
  width: '150px'
}

const setupButtonSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px'
}

export default GamePanel