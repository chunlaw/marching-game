import { useContext, useState } from "react"
import {
  IconButton,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  SxProps,
  Theme
} from "@mui/material"
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { vibrate } from '../../utils'
import GameContext from '../../GameContext'
import MenuDrawer from './MenuDrawer'
import { Menu as MenuIcon } from '@mui/icons-material'

const Header = () => {
  const { gameState: {lv}, level } = useContext(GameContext)
  const [ open, setOpen ] = useState(false)
  const { t, i18n } = useTranslation()
  let location = useLocation()
  const history = useHistory()

  const handleLanguageChange = (lang: string) => {
    vibrate(1)
    history.replace( location.pathname.replace('/'+i18n.language, '/'+lang) )
    i18n.changeLanguage(lang)
  }

  return (
    <Toolbar sx={toolbarSx}>
      <IconButton
        onClick={() => setOpen(true)}
      ><MenuIcon/></IconButton>
      <MenuDrawer open={open} onClose={() => setOpen(false)} />
      <Typography variant="subtitle1">{`${t('Level')} ${level+1} - ${t(lv)}`}</Typography>
      <Tabs sx={languageTabsSx}
        value={i18n.language}
        onChange={(_, v) => handleLanguageChange(v)}
      >
        <Tab disableRipple sx={languageTabSx}
          id="en-selector" value="en" label="En"
          component={Link} to={`${window.location.pathname.replace('/zh', '/en')}`}  
          onClick={(e: any) => e.preventDefault()}
        />
        <Tab disableRipple sx={languageTabSx} 
          id="zh-selector" value="zh" label="繁" 
          component={Link} to={`${window.location.pathname.replace('/en', '/zh')}`}  
          onClick={(e: any) => e.preventDefault()}
        />
      </Tabs>
    </Toolbar>
  )
}

export default Header

const toolbarSx: SxProps<Theme> = {
  backgroundColor: '#68af68',
  '& a': {
    color: 'black',
    textDecoration: 'none',
  },
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
  zIndex: theme => theme.zIndex.drawer * 2
}

const languageTabsSx: SxProps<Theme> = {
  borderBottom: 'none',
  minHeight: 24,
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent'
  }
}

const languageTabSx: SxProps<Theme> = {
  textTransform: 'none',
  minWidth: 36,
  fontWeight: 900,
  marginRight: theme => theme.spacing(0),
  fontSize: '15px',
  opacity: 1,
  padding: '6px 6px',
  borderRadius: '30px',
  "& > .MuiTab-wrapper": {
    color: theme => theme.palette.text.primary,
    padding: '2px 10px 0px 10px'
  },
  "&.Mui-selected": {
    color: 'black',
    backgroundColor: theme => theme.palette.background.paper,
  }
}
