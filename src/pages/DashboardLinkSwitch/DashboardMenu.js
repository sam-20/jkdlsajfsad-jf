import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Account from './Account'

function DashboardMenu() {
    return (

        <BrowserRouter>
            <div style={{ backgroundColor: 'red', display: 'flex', height: '100vh' }}>

                <div style={{ display: 'flex', flex: 0.2, backgroundColor: 'yellow' }}>

                    <Link to="/account">
                        <p>click me</p>
                    </Link>

                </div>


                <div style={{ display: 'flex', flex: 0.8, backgroundColor: 'green' }}>

                <p>heloooooooooooooooooooooooooooo</p>
                <br/>

                    <Switch>
                        <Route exact path="/account" component={Account} />
                    </Switch>
                </div>

            </div>
        </BrowserRouter>
    )
}

export default DashboardMenu
