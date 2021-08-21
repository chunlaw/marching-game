import { useContext } from 'react'
import { Divider, Drawer, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core'
import GameContext from '../../GameContext'
import { useTranslation } from 'react-i18next'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { AiColors, Level } from '../../constants'

const MenuDrawer = ({open, onClose}: {open: boolean, onClose: () => void}) => {
  const { aiLv, level, setLevel, setAiLv, records } = useContext(GameContext)
  const { t } = useTranslation()
  const classes = useStyles()
  const getDescription = ( {board, stepLimit} : {board: number[][], stepLimit: number} ): string => {
    return `${t('Move limit')}: ${stepLimit !== 100 ? stepLimit : '∞'}, ${t('War line')}: ${board[0].filter(r => r >= 0).length}`
  }

  return (
    <Drawer open={open} onClose={onClose} className={classes.container} PaperProps={{className: classes.innerContainer}}>
      <div
        onClick={onClose}
        onKeyDown={onClose}
      >
        <div className={classes.rulesContainer}>
          <Typography variant="h5">{t('ruleTitle')}</Typography>
          <Typography variant="body1">{t('rule 1')}</Typography>
          <Typography variant="body1">{t('rule 2')}</Typography>
          <Typography variant="body1">{t('rule 3')}</Typography>
        </div>
        <Divider />
        <FormControl className={classes.selectContainer}>
          <InputLabel shrink id="ai-level-label">{t('AI Lv')}</InputLabel>
          <Select 
            labelId="ai-level-label"
            value={aiLv}
            onChange={(e:any) => {setAiLv(e.target.value || 0)}}
          >
            <MenuItem value={0}>{t('ai0')}</MenuItem>
            <MenuItem value={1}>{t('ai1')}</MenuItem>
            <MenuItem value={2}>{t('ai2')}</MenuItem>
            <MenuItem value={3}>{t('ai3')}</MenuItem>
          </Select>
        </FormControl>
        <Divider />
        <List>
          {
            Level.map((_level, idx) => (
              <ListItem
                button
                key={`level-${_level.lv}`}
                onClick={() => setLevel(idx)}
                className={`${classes.listItem} ${level === idx ? classes.selectedItem : ''}`}
              >
                <ListItemText
                  primary={t("Level") + ` ${_level.lv.replace('lv', '')}: ` + t(_level.lv)}
                  secondary={getDescription(_level)}
                />
                {
                  records[idx].map( (record: number, i: number) => (
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
  selectedItem: {
    background: '#eee'
  },
  selectContainer: {
    width: '80%',
    margin: '5%'
  }
}))