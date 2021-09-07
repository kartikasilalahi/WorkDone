import React, { Suspense, Lazy } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './dashboard'
import User from './user'
import Admin from './admin'


const Routing = ({ component: Component, ...rest }) => {
    const id = localStorage.getItem('id')
    // const isAuthenticated = () => {
    //     console.log("rol", localStorage.getItem('role'))
    //     if (typeof window == 'undefined') {
    //         return false
    //     }
    //     // if(localStorage.getItem('token')) {  <Route path={`${path}/users`} component={Users} />
    //     if (localStorage.getItem('role')) {
    //         return localStorage.getItem('role')
    //     } else {
    //         return false
    //     }
    // }
    const { path } = useRouteMatch();
    return (

        // <Route
        //     {...rest}
        //     render={props => {
        //         if (id && isAuthenticated()) {
        //             console.log("inis")
        //             return <Component {...props} />
        //         }
        //         else {
        //             return <Redirect
        //                 to={{
        //                     pathname: "*",
        //                     state: { from: props.location }
        //                 }}
        //             />
        //         }

        //     }}
        // />
        <Switch>

            <Route path={`${path}/user`} component={User} />
            <Route path={`${path}/admin`} component={Admin} />
        </Switch>

    )

}

export default Routing;