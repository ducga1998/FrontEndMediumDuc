// @flow
import * as React from 'react';


import { Wrapper, MenuContainer, MenuOverlay, Absolute } from './style';

// import { IconButton } from '../styled/nav'
class Menu extends React.Component<any> {
  state = {
    menuIsOpen: false,
  };

  toggleMenu() {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  }

  render() {
    const { hasNavBar, darkContext, hasTabBar } = this.props;
    const { menuIsOpen } = this.state;
    return <div></div>
  }
}

export default Menu;
