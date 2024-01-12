import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Assessment from './components/Assessment'
import Result from './components/Result'
import NotFound from './components/NotFound'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/result" component={Result} />
      <Route exact path="/assessment" component={Assessment} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
