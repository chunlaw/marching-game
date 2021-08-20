import {
  HashRouter as Router,
  Redirect,
  //Switch,
  Route,
  //useRouteMatch
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

const App = () => {
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={theme}>
      <GameContextProvider>
        <Container maxWidth='xs' disableGutters className={classes.appContainer}>
          <Router>
            <Route exact path="/">
              <Redirect to="/zh" />
            </Route>
            <Route path="/:lang">
              <CssBaseline />
              <Header />
              <Playground />
              <GamePanel />
            </Route>
          </Router>
        </Container>
      </GameContextProvider>
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