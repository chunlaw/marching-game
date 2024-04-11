import { useContext } from 'react'
import { Avatar, Box, Divider, Drawer, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, SxProps, Theme, Typography } from "@mui/material"
import { FormControlLabel, Switch } from "@mui/material"
import { useHistory } from 'react-router-dom'
import GameContext from '../../GameContext'
import { useTranslation } from 'react-i18next'
import {
  GitHub as GitHubIcon,
  StarBorder as StarBorderIcon,
  Star as StarIcon,
} from "@mui/icons-material"
import { AiColors, Level, MisereLevelOffset } from '../../constants'

const MenuDrawer = ({open, onClose}: {open: boolean, onClose: () => void}) => {
  const { aiLv, level, setAiLv, records, isMisere, toggleMisere } = useContext(GameContext)
  const { t, i18n } = useTranslation()
  const history = useHistory()
  const getDescription = ( {board, stepLimit, random} : {board: number[][], stepLimit: number, random?: boolean} ): string => {
    if ( random ) return t('Random Setup')
    return `${t('Move limit')}: ${stepLimit !== 100 ? stepLimit : '∞'}, ${t('War line')}: ${board[0].filter(r => r >= 0).length}`
  }

  return (
    <Drawer 
      open={open} 
      ModalProps={{ onClose: () => onClose() }}
      sx={containerSx} 
      PaperProps={{sx: innerContainerSx}}
    >
      <Box sx={rulesContainerSx}>
        <Typography variant="h5">{t('ruleTitle')}</Typography>
        <Typography variant="body1">{t('rule 1')}</Typography>
        <Typography variant="body1">{ !isMisere ? t('rule 2') : t('rule 2 - isMisere')}</Typography>
        <Typography variant="body1">{t('rule 3')}</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isMisere}
              onChange={() => toggleMisere()}
            ></Switch>
          }
          label={`${t('reverse rule 2')}`}
        />
      </Box>
      <Divider />
      <FormControl sx={selectContainerSx}>
        <InputLabel shrink id="ai-level-label">{t('AI Lv')}</InputLabel>
        <Select
          labelId="ai-level-label"
          value={aiLv}
          onChange={(e:any) => {setAiLv(e.target.value || 0)}}
        >
          {
            [0,1,2,3].map(v => (
              <MenuItem key={`ai${v}-item`} value={v} sx={menuItemSx}>{t(`${isMisere?'m':''}ai${v}`)} <StarIcon style={{color: AiColors[v]}} /></MenuItem>    
            ))
          }
        </Select>
      </FormControl>
      <Divider />
      <List sx={{flex: 1}}>
        {
          Level.map((_level, idx) => (
            <ListItem
              button
              key={`level-${_level.lv}`}
              onClick={() => history.replace(`/${i18n.language}/${idx+1}`)}
              sx={{...listItemSx, ...(level === idx ? selectedItemSx : {})} as SxProps<Theme>}
            >
              <ListItemText
                primary={t("Level") + ` ${_level.lv.replace('lv', '')}: ` + t(_level.lv)}
                secondary={getDescription(_level)}
              />
              {
                (records[idx + (isMisere ? MisereLevelOffset : 0)] || [0, 0, 0, 0]).map( (record: number, i: number) => (
                  record ? 
                    <StarIcon key={`star-${idx}-${i}`} style={{color: AiColors[i]}}></StarIcon> : 
                    <StarBorderIcon key={`star-${idx}-${i}`} style={{color: AiColors[i]}}></StarBorderIcon>
                )) 
              }
            </ListItem>
          ))
        }
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={'a'}
          href={'https://www.freepik.com'}
          target="_blank"
        >
          <ListItemAvatar>
            <Avatar src="/marching-game/logo128.png" alt="App logo" />
          </ListItemAvatar>
          <ListItemText
            primary={'Icons made by Freepik'}
            secondary={'from www.flaticon.com'}
          ></ListItemText>    
        </ListItem>
        <ListItem
          component={'a'}
          href={'https://www.github.com/chunlaw/marching-game'}
          target="_blank"
        >
          <ListItemAvatar>
            <Avatar><GitHubIcon /></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={'Source code'}
            secondary={'GPL-3.0 License'}
          ></ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default MenuDrawer

const containerSx: SxProps<Theme> = {
  maxWidth: '320px',
  width: '80%',
}

const innerContainerSx: SxProps<Theme> = {
  width: '80%',
  maxWidth: '320px',
  paddingTop: '66px',
  height: '100dvh',
}

const rulesContainerSx: SxProps<Theme> = {
  paddingLeft: '10px',
  marginBottom: '10px'
}

const listItemSx: SxProps<Theme> = {
  '&:hover': {
    background: '#eee'
  }
}

const menuItemSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const selectedItemSx: SxProps<Theme> = {
  background: '#eee'
}

const selectContainerSx: SxProps<Theme> = {
  width: '80%',
  margin: '5%',
  '& .MuiSelect-selectMenu': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}