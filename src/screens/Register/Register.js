import React, { useState } from 'react'
import { TextField, Grid, Button } from '@material-ui/core'

function Register() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [contact, setContact] = useState('')
    const [errors, setErrors] = useState({})

    const validate = () =>{
        let valid = true
        let err = {}
        if(!firstname){
            err.firstname = "required"
            valid = false
        }
        if(!lastname){
            err.lastname = "required"
            valid = false
        }
        if(!email){
            err.email = "required"
            valid = false
        }
        if(!password){
            err.password = "required"
            valid = false
        }
        if(!contact){
            err.contact = "required"
            valid = false
        }
        setErrors(err)
        return valid
    }

    const registerUser = (e) => {
        e.preventDefault()
        if(validate()){alert("Hi "+firstname)}
        
    }

    return (
        <form noValidate={false} autoComplete="off"  >
            <Grid container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <TextField
                        id="register_firstname"
                        required
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                        variant="standard"
                        label="First Name"
                        error={errors.firstname}
                        helperText={errors.firstname}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 5 }} >
                    <TextField
                        id="register_lastname"
                        required
                        value={lastname}
                        onChange={e => setlastname(e.target.value)}
                        variant="standard"
                        label="Last Name"
                        error={errors.lastname}
                        helperText={errors.lastname}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 5 }} >
                    <TextField
                        id="register_email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        variant="standard"
                        label="Email"
                        type="email"
                        error={errors.email}
                        helperText={errors.email}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 5 }} >
                    <TextField
                        id="register_password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        variant="standard"
                        label="Password"
                        type="password"
                        error={errors.password}
                        helperText={errors.password}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 5 }} >
                    <TextField
                        id="register_contact"
                        required
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        variant="standard"
                        label="Contact No"
                        error={errors.contact}
                        helperText={errors.contact}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 40 }}>
                    <Button type="submit" onClick={registerUser} variant="contained" color="primary">Register</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Register
