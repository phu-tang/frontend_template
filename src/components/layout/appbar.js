import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import {
  isOpenMenuSelector,
  titleSelector,
  updateMenuAction,
  toggleMenuAction
} from './state';

import { navigatePageAction } from '../../utils/locationMiddleware';

const MyAppBar = ({ title, toggleMenu, classes }) => (
  <AppBar position="static" color={'primary'}>
    <Toolbar>
      <IconButton
        className={classes.menuButton}
        color="inherit"
        onClick={toggleMenu}
        aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" className={classes.flex}>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

export const EnhanceAppbar = compose(
  connect(
    state => ({ title: titleSelector(state) }),
    {
      toggleMenu: toggleMenuAction
    }
  ),
  withStyles(styles)
)(MyAppBar);

const MyDrawer = ({
  updateMenu,
  updateMenuisOpen,
  toggleMenu,
  navigatePage,
  isOpen,
  classes
}) => (
  <Drawer
    docked={false}
    onOpen={() => {}}
    open={isOpen}
    onClose={() => {
      updateMenu(false);
    }}>
    <div className={classes.drawer}>
      <MenuItem
        onClick={() => {
          toggleMenu();
          navigatePage('/');
        }}>
        Home
      </MenuItem>
      <MenuItem
        onClick={() => {
          toggleMenu();
          navigatePage('/setting');
        }}>
        Setting
      </MenuItem>
    </div>
  </Drawer>
);

export const EnhanceDrawer = compose(
  connect(
    state => ({ isOpen: isOpenMenuSelector(state) }),
    {
      toggleMenu: toggleMenuAction,
      navigatePage: navigatePageAction,
      updateMenu: updateMenuAction
    }
  ),
  withStyles({
    drawer: {
      width: 200
    }
  })
)(MyDrawer);
