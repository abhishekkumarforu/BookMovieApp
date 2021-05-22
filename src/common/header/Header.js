import React from 'react'
import { Button } from '@material-ui/core'
import MovieLogo from '../../assets/logo.svg'
import './Header.css'
import AuthModal from '../AuthModal/AuthModal'

function Header() {
    return (
        <header className="Navbar">
            <div className="Toolbar">
                <div className="logoDiv">
                    <img src={MovieLogo} className="logo" alt="Header Logo" />
                </div>

                <div>
                    {/* <Button variant="contained" color="default">Login</Button> */}
                    <AuthModal />
                </div>
                
                {/* <div>
                    <Button variant="contained" color="primary">Book Show</Button>
                </div> */}
            </div>
        </header>
    )
}

export default Header
