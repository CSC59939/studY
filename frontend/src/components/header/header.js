
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, AppBar, Typography, Toolbar, withStyles,
  Modal,
} from '@material-ui/core';
import propTypes from 'prop-types';
import { Login, Register } from '../../containers';

const styles = theme => ({
  title: {
    '&:hover': {
      backgroundColor: theme.palette.primary,
      color: 'white',
    },
  },
  divide: { flex: 1 },
  right_actions: {
    display: 'flex',
    flex: -1,
  },
  user_name: {
    marginRight: theme.spacing.unit,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  loginPaper: {
    position: 'absolute',
    left: '50%',
    width: '600px',
    backgroundColor: theme.palette.background.paper,
    transform: 'translate(-50%, 50%)',
  },
  registerPaper: {
    position: 'absolute',
    left: '50%',
    width: '700px',
    backgroundColor: theme.palette.background.paper,
    transform: 'translate(-50%, 30%)'
  },
});

export function Header({
  user, handleLogout, classes, handleModalClose,
  handleModalOpen, loginOpen, registerOpen,
}) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          style={{ textDecoration: 'none' }}
          component={Link}
          to="/"
          className={classes.title}
          variant="headline"
          color="inherit"
        >
          studY
        </Typography>
        <div className={classes.divide} />
        {user.owner ? (
          <div className={classes.right_actions}>
            <Typography
              style={{ textDecoration: 'none' }}
              component={Link}
              to="/profile"
              margin="10px"
              className={classes.user_name}
              variant="subtitle1"
              color="inherit">
              {user.owner.first_name}
            </Typography>
            <Button
              className={classes.logout_button}
              color="inherit"
              children="logout"
              onClick={() => handleLogout()}
            />
          </div>
        ) : (
          <div>
            <Button
              onClick={() => handleModalOpen('login')}
              className="login-button"
              children="Login"
              color="inherit"
            />
            <Button
              onClick={() => handleModalOpen('register')}
              className="register-button"
              color="inherit"
              children="Register"
            />

            <Modal open={loginOpen} onClose={() => handleModalClose('login')}>
              <div className={classes.loginPaper}>
                <Login />
              </div>
            </Modal>
            <Modal open={registerOpen} onClose={() => handleModalClose('register')}>
              <div className={classes.registerPaper}>
                <Register handleModalClose={handleModalClose} />
              </div>
            </Modal>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  user: propTypes.object,
  handleLogout: propTypes.func,
  classes: propTypes.object.isRequired,
  handleModalClose: propTypes.func.isRequired,
  handleModalOpen: propTypes.func.isRequired,
  loginOpen: propTypes.func.isRequired,
  registerOpen: propTypes.func.isRequired,

};

Header.defaultProps = {
  user: null,
  handleLogout: undefined,
};

export default withStyles(styles)(Header);
