import React from "react"
import "./homePage.scss"
import LoginPage from "../login/LoginPage"

function Home(props) {
  return (
    <div className="homePage">
      <LoginPage />
    </div>
  )
}

export default Home
