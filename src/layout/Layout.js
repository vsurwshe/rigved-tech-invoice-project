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
import ClientManagment from '../views/client/ClientManagement';
import PurchaseOrderManagement from '../views/purchaseOrder/PurchaseOrderManagement';
import ProjectManagement from '../views/project/ProjectManagement';
import PurchaseOrderFrom from '../views/purchaseOrder/PurchaseOrderFrom';


const RoutesPath=[
    {path:"/register",component: Register},
    {path:"/app/dashborad",component: Dashboard},
    {path:"/client",component: ClientManagment},
    {path:"/purchaseOrder",component: PurchaseOrderManagement},
    {path:"/project",component: ProjectManagement},
    {path:"/purchaseOrder/view",component: PurchaseOrderFrom, exact:true}
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
                    { RoutesPath.map((route,key)=>{ return <Route key={key} exact={route.exact} path={route.path} component={route.component} />})}
                </Switch>
            </div>
        </>
    </div>
}

export default withRouter(Layout);