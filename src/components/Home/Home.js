import './Home.css'
import Button from '../button/button'
import Inputfield from '../inputfield/inputfield'
import Typography from '../Typography/typography'

function Home() {

    return (
        <div className="body">

            <button className="loginbutton">Login</button>

            <button className="signupbutton">Signup</button>

            <div style={{ background: 'white', marginTop: 20, marginBottom: 20 }}>
                <Button textinsidebutton="Sign In" customizecolor="white" customizeheight={30} />

                <Button textinsidebutton="Sign out" customizecolor="black" customizeheight={20} />
            </div>

            <button>Some text</button>

            <input type="text" />
            <input type="password" />
            <input type="number" />
            <input type="radio" />
            <input type="checkbox" />

            <Button textinsidebutton="my button 1" />

            <Button textinsidebutton="my button 2"> </Button>

            <div style={{ display: 'flex' }}>
                <Inputfield myinputtype="checkbox" />
                <span>Gari</span>

                <Inputfield myinputtype="checkbox" />
                <span>Sugar</span>
            </div>

            <div style={{ display: 'flex' }}>
                <Inputfield myinputtype="checkbox" />
                <span>Gari</span>

            </div>

            <div>
                <Inputfield myinputtype="checkbox" />
                <span>Sugar</span>
            </div>

            <div style={{ display: 'flex' }}>

            </div>

            <Inputfield myinputtype="password" />

            <Inputfield myinputtype="radio" />

            <Typography text="Look here" mytypographycolor="red" />

            <Typography text="mest" mytypographycolor="yellow" />

        </div>
    )
}

export default Home;