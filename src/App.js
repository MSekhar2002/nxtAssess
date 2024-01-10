import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Assessment from './components/Assessment'

const App = () => (
  //   <BrowserRouter>
  //     <Switch>
  //       <Route exact path="/login" component={Login} />
  //       <Route exact path="/" component={Home} />
  //     </Switch>
  //   </BrowserRouter>
  <Assessment />
)

export default App
