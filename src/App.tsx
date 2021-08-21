import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core"
import { createTheme, makeStyles } from "@material-ui/core/styles"
import { Container, CssBaseline } from '@material-ui/core'
import GamePanel from './components/GamePanel'
import Header from './components/layout/Header'
import './App.css';
import { GameContextProvider } from './GameContext';
import Playground from './components/Playground';

const theme = createTheme()

const PageSwitch = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:lvId?`}>
        <GameContextProvider>
          <Header />
          <Playground />
          <GamePanel />
        </GameContextProvider>
      </Route>
    </Switch>
  )
}

const App = () => {
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={theme}>
      <Container maxWidth='xs' disableGutters className={classes.appContainer}>
        <Router>
          <Route exact path="/">
            <Redirect to="/zh" />
          </Route>
          <Route path="/:lang">
            <CssBaseline />  
            <PageSwitch />
          </Route>
        </Router>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;

const useStyles = makeStyles(theme => ({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
  }
}))