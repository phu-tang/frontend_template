import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import {
  isOpenMenuSelector,
  titleSelector,
  updateMenuAction,
  toggleMenuAction
} from './state';

import { navigatePageAction } from '../../utils/locationMiddleware';

const MyAppBar = ({ title, toggleMenu }) => (
  <AppBar
    title={title}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    onLeftIconButtonClick={() => toggleMenu()}
  />
);
export const EnhanceAppbar = compose(
  connect(state => ({ title: titleSelector(state) }), {
    toggleMenu: toggleMenuAction
  })
)(MyAppBar);

const MyDrawer = ({
  updateMenu,
  updateMenuisOpen,
  toggleMenu,
  navigatePage,
  isOpen
}) => (
  <Drawer
    docked={false}
    width={200}
    open={isOpen}
    onRequestChange={open => {
      updateMenu(open);
    }}>
    <MenuItem
      onClick={() => {
        toggleMenu();
        navigatePage('/');
      }}>
      Home
    </MenuItem>
  </Drawer>
);

export const EnhanceDrawer = compose(
  connect(state => ({ isOpen: isOpenMenuSelector(state) }), {
    toggleMenu: toggleMenuAction,
    navigatePage: navigatePageAction,
    updateMenu: updateMenuAction
  })
)(MyDrawer);
