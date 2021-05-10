import React from 'react'
import DashboardCSS from './Dashboard.module.css'

function Dashboard() {
    return (
        <div>
            <button className={`${DashboardCSS.button} ${DashboardCSS.button1}`}>button 1</button>
            <button className={`${DashboardCSS.button} ${DashboardCSS.button2}`}>button 2</button>
            <button className={`${DashboardCSS.button} ${DashboardCSS.button3}`}>button 3</button>
            <button className={`${DashboardCSS.button} ${DashboardCSS.button4}`}>button 4</button>
            <button className={`${DashboardCSS.button} ${DashboardCSS.button5}`}>button 5</button>
            <button className={`${DashboardCSS.button} ${DashboardCSS.button6}`}>button 6</button>

            <p>this is a normal text</p>
            <p className={DashboardCSS.text1}>this is text 1</p>
            <p className={DashboardCSS.text2}>this is text 2</p>

            <div className={DashboardCSS.text3}>This is a paragraph with the recommended line-height.<br />
                The line height is here set to 1.6. This is a unitless value;<br />
                meaning that the line height will be relative to the font size.
            </div>

            <div className={DashboardCSS.container}>
                <p className={DashboardCSS.animatedtext1}>Hello</p>
                <p className={DashboardCSS.animatedtext2}>World</p>

                <div className={DashboardCSS.loader1}></div>
                <div className={DashboardCSS.loader2}></div>
            </div>


        </div >
    )
}

export default Dashboard
