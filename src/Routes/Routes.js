import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

//Auth Guard
import ProtectedRoute from '../Routes/ProtectedRoute';
import { AuthContext } from '../Helpers/AuthProvider'
import { UserRoleContext } from '../Helpers/UserRoleProvider';

//Auth Pages
import SignInPage from '../Pages/SignInPage/SignInPage';

// EMPLOYEE PAGE
import ServicePage from '../Pages/ServicePage/ServicePage';
import HairProductPage from '../Pages/HairProductPage/HairProductPage';

// ADMIN PAGE
import Dashboard from '../Pages/Admin/Dashboard';
import AdminProductPage from '../Pages/Admin/Products/';
import HairProducts from '../Pages/Admin/HairProducts';
import Employee from '../Pages/Admin/Employee';
import Commission from '../Pages/Admin/Commission/';
import ServiceHistory from '../Pages/Admin/ServiceHistory';
import UserAccounts from '../Pages/Admin/UserAccount';

import Routes from '../Constants/Route';
import UserRoles from '../Constants/UserRoles'


const { SIGN_IN, SERVICE, HAIRPRODUCTS, DASHBOARD, ADMINPRODUCTS, HAIRCOLOR, EMPLOYEES, COMMISSION, SERVICEHISTORY, USERACCOUNT } = Routes;
const { EMPLOYEE, ADMIN } = UserRoles

const RouteComponent = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { userRole } = useContext(UserRoleContext)

    if (isAuthenticated && userRole === EMPLOYEE) {
    return (
        <Switch>
            <ProtectedRoute exact path={SERVICE} component={ServicePage} ></ProtectedRoute>
            <ProtectedRoute exact path={HAIRPRODUCTS} component={HairProductPage} ></ProtectedRoute>
            <Redirect to={SERVICE} />
        </Switch>
    )};
    if(isAuthenticated && userRole === ADMIN) {
        return (
            <Switch>
                <ProtectedRoute exact path={DASHBOARD} component={Dashboard} ></ProtectedRoute>
                <ProtectedRoute exact path={ADMINPRODUCTS} component={AdminProductPage} ></ProtectedRoute>
                <ProtectedRoute exact path={HAIRCOLOR} component={HairProducts} ></ProtectedRoute>
                <ProtectedRoute exact path={EMPLOYEES} component={Employee} ></ProtectedRoute>
                <ProtectedRoute exact path={COMMISSION} component={Commission} ></ProtectedRoute>
                <ProtectedRoute exact path={SERVICEHISTORY} component={ServiceHistory} ></ProtectedRoute>
                <ProtectedRoute exact path={USERACCOUNT} component={UserAccounts} ></ProtectedRoute>
                <Redirect to={DASHBOARD} />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path={SIGN_IN} component={SignInPage} />
            <Redirect to={SIGN_IN} />
        </Switch>
    );
};

export default RouteComponent