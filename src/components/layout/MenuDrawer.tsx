import { useContext } from 'react'
import { Divider, Drawer, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@material-ui/core"
import { FormControlLabel, Switch } from "@material-ui/core"
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import GameContext from '../../GameContext'
import { useTranslation } from 'react-i18next'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { AiColors, Level, MisereLevelOffset } from '../../constants'

const MenuDrawer = ({open, onClose}: {open: boolean, onClose: () => void}) => {
  const { aiLv, level, setAiLv, records, isMisere, toggleMisere } = useContext(GameContext)
  const { t, i18n } = useTranslation()
  const history = useHistory()
  const classes = useStyles()
  const getDescription = ( {board, stepLimit, random} : {board: number[][], stepLimit: number, random?: boolean} ): string => {
    if ( random ) return t('Random Setup')
    return `${t('Move limit')}: ${stepLimit !== 100 ? stepLimit : '∞'}, ${t('War line')}: ${board[0].filter(r => r >= 0).length}`
  }

  return (
    <Drawer 
      open={open} 
      ModalProps={{ onBackdropClick: onClose }}
      className={classes.container} 
      PaperProps={{
        className: classes.innerContainer, 
        style: {filter: `invert(${isMisere ? 1 : 0})`}}
      }
    >
      <div>
        <div className={classes.rulesContainer}>
          <Typography variant="h5">{t('ruleTitle')}</Typography>
          <Typography variant="body1">{t('rule 1')}</Typography>
          <Typography variant="body1">{ !isMisere ? t('rule 2') : t('rule 2 - isMisere')}</Typography>
          <Typography variant="body1">{t('rule 3')}</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isMisere}
                onChange={() => toggleMisere()}
                // disabled={Object.values(records).reduce((acc, arr) => acc || arr.filter((v:number) => v === 0).length, false)} // enable only if clean all normals
              ></Switch>
            }
            label={`${t('reverse rule 2')}`}
          />
        </div>
        <Divider />
        <FormControl className={classes.selectContainer}>
          <InputLabel shrink id="ai-level-label">{t('AI Lv')}</InputLabel>
          <Select
            labelId="ai-level-label"
            value={aiLv}
            onChange={(e:any) => {setAiLv(e.target.value || 0)}}
          >
            {
              [0,1,2,3].map(v => (
                <MenuItem key={`ai${v}-item`} value={v} className={classes.menuItem}>{t(`ai${v}`)} <StarIcon style={{color: AiColors[v]}} /></MenuItem>    
              ))
            }
          </Select>
        </FormControl>
        <Divider />
        <List>
          {
            Level.map((_level, idx) => (
              <ListItem
                button
                key={`level-${_level.lv}`}
                onClick={() => history.replace(`/${i18n.language}/${idx+1}`)}
                className={`${classes.listItem} ${level === idx ? classes.selectedItem : ''}`}
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
      </div>
    </Drawer>
  )
}

export default MenuDrawer

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: '320px',
    width: '80%',
  },
  innerContainer: {
    width: '80%',
    maxWidth: '320px',
    paddingTop: '66px'
  },
  rulesContainer: {
    paddingLeft: '10px',
    marginBottom: '10px'
  },
  listItem: {
    '&:hover': {
      background: '#eee'
    }
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 
  selectedItem: {
    background: '#eee'
  },
  selectContainer: {
    width: '80%',
    margin: '5%',
    '& .MuiSelect-selectMenu': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }
}))