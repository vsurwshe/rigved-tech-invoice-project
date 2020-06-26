import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Button, TextField, Fade, Card, Grid, Paper, } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '25%',
      },
    },
  }));

const Register = (props) => {
    const [spacing, setSpacing] = useState(3);
    var classes = useStyles();
    return <> 
    <Card>
        <h1>Register User</h1>
            {RegsiterFrom({
                classes,
                spacing
            })}
    </Card>
        {/* <TextField
            id="name"
            InputProps={{
                classes: {
                    underline: props.classes.textFieldUnderline,
                    input: props.classes.textField,
                },
            }}
            value={props.nameValue}
            onChange={e => props.setNameValue(e.target.value)}
            margin="normal"
            placeholder="Full Name"
            type="text"
            fullWidth
        /> */}
        {/* <TextField
            id="email"
            InputProps={{
                classes: {
                    underline: props.classes.textFieldUnderline,
                    input: props.classes.textField,
                },
            }}
            value={props.loginValue}
            onChange={e => props.setLoginValue(e.target.value)}
            margin="normal"
            placeholder="Email Adress"
            type="email"
            fullWidth
        />
        <TextField
            id="password"
            InputProps={{
                classes: {
                    underline: props.classes.textFieldUnderline,
                    input: props.classes.textField,
                },
            }}
            value={props.passwordValue}
            onChange={e => props.setPasswordValue(e.target.value)}
            margin="normal"
            placeholder="Password"
            type="password"
            fullWidth
        /> */}
        {/* <div className={props.classes.creatingButtonContainer}>
            {props.isLoading ? (
                <CircularProgress size={26} />
            ) : (
                    <Button
                        onClick={() =>
                            RegisterUser(props)
                        }
                        disabled={
                            props.loginValue.length === 0 ||
                            props.passwordValue.length === 0 ||
                            props.nameValue.length === 0
                        }
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={props.classes.createAccountButton}
                    >
                        Register User Account
                    </Button>
                )}
        </div> */}
        {/* <div className={props.classes.formDividerContainer}>
            <div className={props.classes.formDivider} />
            <Typography className={props.classes.formDividerWord}>or</Typography>
            <div className={props.classes.formDivider} />
        </div>
        <Button
            size="large"
            className={classnames(
                props.classes.googleButton,
                props.classes.googleButtonCreating,
            )}
        >
            {/* <img src={google} alt="google" className={classes.googleIcon} />
&nbsp;Sign in with Google */}
        {/* </Button> */}
    </>
}

const RegisterUser = (props) => {
    console.log(props);
}

const RegsiterFrom=(props)=>{
    const {classes,spacing} =props
    return <Grid container className={classes.root}>
      <Grid item>
        <form className={classes.root} noValidate autoComplete="off">
        <Grid container justify="center" spacing={spacing}>
            <Grid item justify="left">
            <div>
                <h4>profile img upload</h4>
            </div>
            <div>
                <TextField id="standard-required" label="Enter First Name" type="text" InputLabelProps={{ shrink: true}} />
                <TextField id="standard-required" label="Enter Last Name" type="text" InputLabelProps={{ shrink: true}} />
            </div>
            </Grid>
            <Grid item justify="right">
            <div>
            </div>
            <div>
                <TextField id="standard-required" label="Enter First Name" type="text" InputLabelProps={{ shrink: true}} />
                <TextField id="standard-required" label="Enter Last Name" type="text" InputLabelProps={{ shrink: true}} />
            </div>
            </Grid>
        </Grid>
        </form>
      </Grid>
      </Grid>



}

export default Register;


{/* 
        <div>
            <h1>profile img upload</h1>
        </div>
        <div>
            <TextField
              id="standard-required"
              label="Enter First Name"
              type="text"
              InputLabelProps={{ shrink: true}}
            />
            <TextField
              id="standard-required"
              label="Enter Last Name"
              type="text"
              InputLabelProps={{ shrink: true}}
            />
        </div>
        <div>
        <TextField
          id="standard-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>
    </form> */}