import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({ name,handleChange,label,half,autoFocus,type,handleShwoPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                autoFocus={autoFocus}
                type={type}
                InputProps={name==='password' ? {
                    endAdornment:(
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShwoPassword}>
                                {type==='password'?<Visibility />: <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }:null}
                
            />

        </Grid>
    )
}

export default Input