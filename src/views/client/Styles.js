import { makeStyles } from "@material-ui/styles";
export default makeStyles(theme => ({
    clientTableRoot: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5)
    },
    clientTableTable: { 
        minWidth: 500 
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    selectTextField: {
        marginRight: theme.spacing(0.8),
        width: '9ch',
    },
}))