import './DashboardPractice.css'
import myimage from '../../images/download.png'

function DashboardPractice() {

    return (
        <div className="maincontainer">

            <div className="left">

                <div className="branddiv">
                    <img className="logo" src={myimage} alt="logo" />
                    <p className="brandname">CREATIVE TIM</p>
                </div>


                <div className="menudiv"></div>
                <div className="signoutdiv"></div>
            </div>

            <div className="right">

                <div className="righttop">

                </div>

                <div className="rightbottom">

                    <div className="cardtoprow">

                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>

                    </div>

                    <div className="cardbottomrow">

                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>

                    </div>

                </div>

            </div>

        </div>
    )

}


export default DashboardPractice;