import * as React from 'react'
// import { Aside, Header, Layout, Main, Nav, SubHeader } from '../UI/styled/layout'
import AppRouter from '../route'
import { Col, Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap';
import DropDown from '../UI/UIDropDown';
class Navication extends React.Component<any>{
    public render() {
        return <Navbar fluid inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#brand">Medium App</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        Link
            </NavItem>
                    <NavItem eventKey={2} href="#">
                        Link
            </NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">
                        Login
            </NavItem>
                    <NavItem eventKey={2} href="#">

                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>;
        return <header>
            <Col xs={9} md={6}>
                <AppRouter />
            </Col>
            <Col xs={3} md={6}>
                <DropDown title="duc" />
            </Col>
        </header>
    }
}
export default Navication