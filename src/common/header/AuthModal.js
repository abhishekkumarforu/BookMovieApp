import React from 'react'
import Modal from 'react-modal';
import { Button, AppBar, Tabs, Tab, Paper, Typography } from '@material-ui/core';
import Login from '../../screens/Login/Login';
import Register from '../../screens/Register/Register';
import { makeStyles } from '@material-ui/styles';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')
  
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <div style={{margin: 20}}>
              {children}
          </div>
        )}
      </div>
    );
  }
  

function AuthModal({baseUrl, userHasAuthenticated, modalIsOpen, setIsOpen}) {
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
            <Button variant="contained" color="default" onClick={openModal}>Login</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Login/Registration Modal"
            >
                <Paper square elevation={0}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        aria-label="login and register tabs"    
                    >
                        <Tab label="Login" id="login" />
                        <Tab label="Register" id="register" />
                    </Tabs>
                </Paper>

                <TabPanel value={value} index={0}>
                    <Login closeModal={closeModal} baseUrl={baseUrl} userHasAuthenticated={userHasAuthenticated} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Register closeModal={closeModal} baseUrl={baseUrl} />
                </TabPanel>
            </Modal>
        </div>
    )
}

export default AuthModal
