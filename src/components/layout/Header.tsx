import React, { useContext, useState } from "react"
import {
  IconButton,
  Tabs,
  Tab,
  Toolbar,
  Typography
} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { vibrate } from '../../utils'
import GameContext from '../../GameContext'
import MenuDrawer from './MenuDrawer'
import MenuIcon from '@material-ui/icons/Menu'

const Header = () => {
  const { gameState: {lv}, level } = useContext(GameContext)
  const [ open, setOpen ] = useState(false)
  const { t, i18n } = useTranslation()
  const classes = useStyles()
  let location = useLocation()
  const history = useHistory()

  const handleLanguageChange = (lang: string) => {
    vibrate(1)
    history.replace( location.pathname.replace('/'+i18n.language, '/'+lang) )
    i18n.changeLanguage(lang)
  }

  return (
    <Toolbar className={classes.toolbar}>
      <IconButton
        onClick={() => setOpen(true)}
      ><MenuIcon/></IconButton>
      <MenuDrawer open={open} onClose={() => setOpen(false)} />
      <Typography variant="subtitle1">{`${t('Level')} ${level+1} - ${t(lv)}`}</Typography>
      <Tabs className={classes.languageTabs}
          value={i18n.language}
          onChange={(e, v) => handleLanguageChange(v)}
        >
        <Tab disableRipple className={classes.languageTab}
          id="en-selector" value="en" label="En"
          component={Link} to={`${window.location.pathname.replace('/zh', '/en')}`}  
          onClick={(e) => e.preventDefault()}
        />
        <Tab disableRipple className={classes.languageTab} 
          id="zh-selector" value="zh" label="繁" 
          component={Link} to={`${window.location.pathname.replace('/en', '/zh')}`}  
          onClick={(e) => e.preventDefault()}
        />
      </Tabs>
    </Toolbar>
  )
}

export default Header

const useStyles = makeStyles(theme => ({
  appTitle: {
    color: theme.palette.text.primary,
  },
  toolbar: {
    backgroundColor: '#68af68',
    '& a': {
      color: 'black',
      textDecoration: 'none',
    },
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    zIndex: theme.zIndex.drawer * 2
  },
  languageTabs: {
    borderBottom: 'none',
    minHeight: 24,
    '& .MuiTabs-indicator': {
      backgroundColor: 'transparent'
    }
  },
  languageTab: {
    textTransform: 'none',
    minWidth: 36,
    fontWeight: 900,
    marginRight: theme.spacing(0),
    fontSize: '15px',
    opacity: 1,
    padding: '6px 6px',
    borderRadius: '30px',
    "& > .MuiTab-wrapper": {
      color: theme.palette.text.primary,
      padding: '2px 10px 0px 10px'
    },
    "&.Mui-selected": {
      color: 'black',
      backgroundColor: theme.palette.background.paper,
    }
  }
}))