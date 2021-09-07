import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

// const Login = lazy(() => import('../Pages/Landingpage/Login'));
// const Register = lazy(() => import('../Pages/Landingpage/Register'));
// const Home = lazy(() => import('../Pages/Landingpage/Home'));
import Login from '../pages/landingpage/Login'
// import Register from '../pages/landingpage/Register'
// import Register from '../pages/landingpage/Register'
import NotFound from './notFound'

// const NotFound = () => {
//     return <Redirect to="/" />;
// };
const FrontendRoutes = () => {
    const { path } = useRouteMatch();
    return (
        // <Switch>
        //   <Suspense
        //     fallback={
        //       <div className="spin">
        //         <Spin />
        //       </div>
        //     }
        //   >
        //     {/* <Route exact path="/forgot-password" component={ForgotPass} /> */}
        //     <Route exact path="/" component={Login} />
        //     {/* <Route exact path="*" component={NotFound} /> */}
        //   </Suspense>
        // </Switch>
        <Switch>
            <Route exact path={`${path}/login`} component={Login} />
            {/* <Route exact path={`${path}/register`} component={Register} /> */}
            <Route exact path="*" component={NotFound} />

        </Switch>
    );
};

export default FrontendRoutes;
