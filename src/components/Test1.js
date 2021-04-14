import React, { useState } from 'react'

function Test1() {

    let num1 = 5;
    num1 = 10
    console.log(num1)

    // let myname = 'samuel'
    // myname = 'king'

    // var [num2, changeNum1] = useState(5)
    var [myname2, changeName] = useState()

    let x = "samuel"
    console.log(x);
    console.log({ x });


    function change() {
        changeName('King')
    }

    return (
        <div>


            {/* num2 is : {num2} */}
            <p>my name is : {myname2}</p>

            <button onClick={change} >change the name </button>
        </div>
    )

}


/**
 * we import BrowserRouter and wrap it around our <App/> to tell our app that 
 * our pages will be changing in the <App/> component
 *
 * NB:  if you want all routing or changing of pages to be done in another component, the component's return() should
 * be wrapped in a BrowserRouter. This is useful for dashboard sidemenus with links navigating to 
 * different pages all in the dashboard page. Here, <Link to> should be used to be navigating those menu pages
 * 
 * the Route component is used to render the component
 * 
 * if you define a Route without giving it a path it means its the default render route for anytime a user 
 * enters a url path which doesnt exist..Used for error 404 page not found situations
 * 
 * we wrap multiple Route inside a Switch to route only one component at a time
 * 
 * we add 'exact' to Route component to ensure that react router doesnt render all paths
 * starting with '/' at the same time
 * 
 * history.push, link to and redirect to can be used to route to different pages or components
 * 
 * history.push pushes a new component onto the stack thereby allowing us to go back when we've pushed multiple components onto the stack
 * 
 * redirect to replaces the page thereby preventing us from going back to the previous page
 * eg. used is redirecting from login page to dashboard page to prevent user from pressing back to the login 
 * page when they havent logged out 
 * 
 * link to is used to switch between pages without reloading it
 */


export default Test1