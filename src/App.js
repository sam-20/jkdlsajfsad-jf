
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
  );
}

export default App;
