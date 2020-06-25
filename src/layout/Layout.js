import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import classnames from "classnames";

// styles
import useStyles from "./styles";
import { useLayoutState } from "../context/LayoutContext";
import Sidebar from "../views/Sidebar/Sidebar";
import { Dashboard } from '@material-ui/icons';


const Layout = (props) => {
    var classes = useStyles();
    
    // global
    var layoutState = useLayoutState();

    return <div className={classes.root}>
        <>
            {/* <Header history={props.history} /> */}
            <Sidebar />
            <div
                className={classnames(classes.content, {
                    [classes.contentShift]: layoutState.isSidebarOpened,
                })}
            >
                <div className={classes.fakeToolbar} />
                <Switch>
                    <Route path="/app/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </>
    </div>
}

export default withRouter(Layout);