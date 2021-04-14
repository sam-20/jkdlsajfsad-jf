import React, { } from 'react'

// import { Switch, Route } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom"

// import Statemgt from './components/Statemgt'
// import Test1 from './components/Test1'

import Form from './pages/Form/Form'

// import { Home, Mounting, Button, Inputfield } from './components'

// import Signup from './pages/Signup/Signup'
// import Signin from './pages/Signin/Signin'

// import DashboardPractice from './pages/DashboardPractice/DashboardPractice'

import Appliances from './pages/Appliances';
import Shoes from './pages/Shoes'

// import MyComponent from './components/MyComponent'
// import Maincomponent from './components/MainComponent'

import ComponentA from './components/ComponentA'
import ComponentB from './components/ComponentB'
import ComponentC from './components/ComponentC'
import ComponentD from './components/ComponentD'

import MyLogin from './contextpractice/MyLogin'
import MyDashboard from './contextpractice/MyDashboard'

import { Dashboard,Signin, Signup } from './pages/wednesday/index'

function App() {


  return (

    <Switch>
      <Route path="/" exact component={ComponentA} />
      <Route path="/second" exact component={ComponentB} />
      <Route path="/third" exact component={ComponentC} />
      <Route path="/form" exact component={Form} />
      <Route path="/appliances" exact component={Appliances} />
      <Route path="/shoes" exact component={Shoes} />
      <Route path="/mylogin" exact component={MyLogin} />
      <Route exact path="/mydashboard" component={MyDashboard} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route component={ComponentD} />
    </Switch>

    // <div>
    //   <Switch>

    //     <Route path="/" exact component={Form} />

    //     <Route path="/signup" exact component={Signup} />

    //     <Route path="/signin" exact component={Signin} />

    //     <Route path="/dashboardpractice" exact component={DashboardPractice} />

    //   </Switch>
    // </div>

    // <div>

    //   <nav>
    //     <ul>
    //       <li><Link to="/">Signin</Link></li>
    //       <li><Link to="/signup">Signup</Link></li>
    //     </ul>
    //   </nav>

    //   <Switch>
    //     <Route exact path='/' component={Signin} />
    //     <Route exact path='/signup' component={Signup} />
    //     {/* <Route render={() => <h1>404: page not found</h1>} /> */}
    //     {/* <Route component={Signup} /> */}
    //   </Switch>

    // </div>
  );


}

export default App;
