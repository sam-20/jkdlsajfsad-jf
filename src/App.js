import React, { useState } from 'react'

import { Switch, Route } from 'react-router-dom';

import Statemgt from './components/Statemgt'
import Test1 from './components/Test1'

import Form from './pages/Form/Form'

import { Home, Mounting, Button, Inputfield } from './components'

import Signup from './pages/Signup/Signup'
import Signin from './pages/Signin/Signin'

import DashboardPractice from './pages/DashboardPractice/DashboardPractice'

import MyComponent from './components/MyComponent'
import Maincomponent from './components/MainComponent'

function App() {


  return (
    <div className="App">

      {/* <Switch>

        <Route path="/" exact component={Form} />

        <Route path="/signup" exact component={Signup} />

        <Route path="/signin" exact component={Signin} />

        <Route path="/dashboardpractice" exact component={DashboardPractice} />

      </Switch> */}



      {/* <Statemgt />

        <Test1 />

        <Home />

        <Inputfield/>

        <Button/>


        <Mounting /> */}

      {/* <MyComponent></MyComponent> */}
      {/* <MyComponent /> */}

      <MyComponent />


    </div>
  );


}

export default App;
