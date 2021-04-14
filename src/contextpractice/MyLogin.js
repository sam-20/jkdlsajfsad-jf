import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './ContextStore'

function MyLogin() {

    const { contextUsername, setContextUsername } = useContext(AppContext)

    let history = useHistory();

    const goToMyDashboard = () => {
        history.push('/mydashboard')
    }

    function updateContextUsername(e){
        setContextUsername(e.target.value)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

            <input type="text" placeholder="Username" value={contextUsername} onChange={updateContextUsername} />

            <button onClick={goToMyDashboard}>Login</button>

        </div>
    )
}

export default MyLogin;