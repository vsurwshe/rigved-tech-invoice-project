import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import classnames from "classnames";
import Sidebar from "../views/Sidebar/Sidebar";
import Header from '../views/Header/Header'
// styles
import useStyles from "./styles";
import { useLayoutState } from "../context/LayoutContext";
import { Dashboard } from '@material-ui/icons';
import Register from '../views/register/UserRegister';


const RoutesPath=[
    {path:"/register",component: Register},
    {path:"/app/dashborad",component: Dashboard},
]

const Layout = (props) => {
    var classes = useStyles();
    
    // global
    var layoutState = useLayoutState();

    return <div className={classes.root}>
        <>
            <Header history={props.history} />
            <Sidebar />
            <div className={classnames(classes.content, { [classes.contentShift]: layoutState.isSidebarOpened})}>
                <div className={classes.fakeToolbar} />
                <Switch>
                    { RoutesPath.map((route,key)=>{ return <Route key={key} path={route.path} component={route.component} />})}
                </Switch>
            </div>
        </>
    </div>
}

export default withRouter(Layout);