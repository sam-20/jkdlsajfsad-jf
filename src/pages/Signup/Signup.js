import { Switch, Link, Route, BrowserRouter } from 'react-router-dom'
import Maincomponent from '../../components/MainComponent'
import MyComponent from '../../components/MyComponent'


function Signup() {

    return (
        <BrowserRouter>
            <div>
                signup page

            <Link to='/maincomponent'> <li> Main component</li></Link>

                <li>My component</li>

                <div style={{ display: 'flex', background: 'gray', width: 300, height: 500 }}>
                    <Switch>
                        <Route exact path='/maincomponent' component={Maincomponent} />
                        <Route exact path='/mycomponent' component={MyComponent} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}


export default Signup;

