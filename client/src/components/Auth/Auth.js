import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import Icon from './Icon'
import {useNavigate } from 'react-router-dom'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
// import GoogleLogin from 'react-google-login'
import Input from './Input';
import { useDispatch } from 'react-redux';
import { GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import {signup,signin} from '../../actions/auth'

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}
const Auth = () => {
    const classes = useStyles()
    // const state = null;
    const navigate=useNavigate ();
    const [shwoPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData,setFormData]=useState(initialState)
    const handleShwoPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const dispatch=useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signup(formData,navigate))
        } else {
            dispatch(signin(formData,navigate))
        }
    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value})

    }
    const switchMode= () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        //handleShwoPassword(false)
        setShowPassword(false)
    }
    const googleSuccess=async (res)=>{
        const result = jwt_decode(res?.credential);
        //const result =res?.profileObj
        const token=res?.tokenId
        // console.log(result)
        try {
            dispatch({type:'AUTH' , data:{result,token}})
            navigate('/')
            
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure=(error)=>{
        console.log(error)
        console.log("Google Sign In  was unsuccessful. Try Again Later")
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />

                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type='email' />
                        <Input name="password" label="Password" handleChange={handleChange} type={shwoPassword ? "text" : "password"} handleShwoPassword={handleShwoPassword} />
                        {isSignup &&  <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}  
                    </Button>
                    <GoogleOAuthProvider clientId="Your client id">
                    <GoogleLogin justifyContent="center"
                        
                        render={(renderProps)=>(
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon/>} 
                                variant="contained"
                                
                            >
                                Google Sign In
                            </Button>

                            
                        )}
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        useOneTap
                        cookiePolicy="single_host_origin"
                    />
                    </GoogleOAuthProvider>
                   

                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? sign In' : "Don't have an account? Sign Up"}  
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
}

export default Auth