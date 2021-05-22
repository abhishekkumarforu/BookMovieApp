import React, { useState } from 'react'
import { TextField, Grid, Button } from '@material-ui/core'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const validate = () =>{
        let valid = true
        let err = {}
        if(!username){
            err.username = "required"
            valid = false
        }
        if(!password){
            err.password = "required"
            valid = false
        }
        setErrors(err)
        return valid
    }

    const userLogin = (e) => {
        e.preventDefault()
        if(validate()){alert("Hi "+username)}
    }

    return (
        <form noValidate autoComplete="off" >
            <Grid container 
                 direction="column"
                 justify="center"
                 alignItems="center"
            >
                <Grid item xs={12}>
                    <TextField
                        id="login_username"
                        required
                        value={username}
                        onChange={e=>setUsername(e.target.value)}
                        variant="standard"
                        label="Username"
                        error={errors.username}
                        helperText={errors.username}
                    />
                </Grid>
                <Grid item xs={12} style={{marginTop: 20}} >
                    <TextField
                        id="login_password"
                        required
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        variant="standard"
                        label="Password"
                        type="password"
                        error={errors.password}
                        helperText={errors.password}
                    />
                </Grid>
                <Grid item xs={12} style={{marginTop: 40}}>
                    <Button onClick={userLogin} variant="contained" color="primary">Login</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Login
