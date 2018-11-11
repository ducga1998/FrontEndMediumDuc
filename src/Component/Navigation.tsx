import * as React from 'react'
// import { Aside, Header, Layout, Main, Nav, SubHeader } from '../UI/styled/layout'
import AppRouter from '../route'
import { Col, Navbar, Nav, MenuItem, NavDropdown, NavItem, Row } from 'react-bootstrap';
import DropDown from '../UI/UIDropDown';
import { SubscribeOne, Subscribe } from 'unstated-x';
import userContainer from '../Container/userContainer';
class Navication extends React.Component<any>{
    public render() {
        return <Row><Navbar fluid collapseOnSelect style={{
            backgroundColor: '#6bb9f0'
        }}>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#brand">Medium App</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        Home
            </NavItem>
                    <NavItem eventKey={2} href="#">
                        Article
            </NavItem>
                    {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown> */}
                </Nav>
                <Nav pullRight>
                    <Subscribe to={[userContainer]} >
                        {
                            container => {
                                return container.state.login ? "nguyen minh duc" : <NavDropdown eventKey={3} title="Setting" id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.1}>Action</MenuItem>
                                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                                </NavDropdown>
                            }
                        }
                    </Subscribe>

                </Nav>
            </Navbar.Collapse>
        </Navbar> </Row>


    }
}
export default Navication