import React, {useState} from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'
import useStyles from './styles'
import decode from 'jwt-decode'
import {Link ,useLocation,useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


export const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const location =useLocation()
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user)
    useEffect(()=>{
        const token= user?.token
        //JWT

        if(token){
            const decodedToken=decode(token)
            if(decodedToken.exp*1000< new Date().getTime()) logout()
        }
        // console.log(user)
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    const logout=()=>{
        dispatch({type:'LOGOUT'})
        navigate('/')
        setUser(null)
    }
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                {/* <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography> */}
                <img  src={memoriesText} alt="icon" height="45px" />

                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant="contained" className={classes.logout} color="primary">Sign In</Button>

                )}
            </Toolbar>
        </AppBar>
    )
}
