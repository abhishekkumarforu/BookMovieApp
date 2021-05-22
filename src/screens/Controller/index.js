import React from 'react'
import BookShow from '../bookshow/BookShow'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Details from '../Details/Details'

function Controller() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Details} />
            </Switch>
        </BrowserRouter>
    )
}

export default Controller
