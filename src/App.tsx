import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { SxProps, Theme } from "@mui/material"
import { Container } from '@mui/material'
import GamePanel from './components/GamePanel'
import Header from './components/layout/Header'
import './App.css';
import { GameContextProvider } from './GameContext';
import Playground from './components/Playground';

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
  return (
    <Container maxWidth='xs' disableGutters sx={appContainerSx}>
      <Router>
        <Route exact path="/">
          <Redirect to="/zh" />
        </Route>
        <Route path="/:lang">
          <PageSwitch />
        </Route>
      </Router>
    </Container>
  );
}

export default App;

const appContainerSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
  justifyContent: "space-between",
}