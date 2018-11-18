import * as React from 'react';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Subscribe } from 'unstated-x';
import userContainer from '../../Container/userContainer';
import ButtonArticle from './buttonWriteArticle';
class Navication extends React.Component<any, any>{

    public render() {
        return <Row><Navbar fluid collapseOnSelect style={{
            backgroundColor: '#6bb9f0'
        }}>
            <Navbar.Header>
                <Navbar.Brand >
                    <a style={{
                        padding: '0 0px 0px 100px'
                    }} href="#brand"><svg className="svgIcon-use" width="45" height="45"><path d="M5 40V5h35v35H5zm8.56-12.627c0 .555-.027.687-.318 1.03l-2.457 2.985v.396h6.974v-.396l-2.456-2.985c-.291-.343-.344-.502-.344-1.03V18.42l6.127 13.364h.714l5.256-13.364v10.644c0 .29 0 .342-.185.528l-1.848 1.796v.396h9.19v-.396l-1.822-1.796c-.184-.186-.21-.238-.21-.528V15.937c0-.291.026-.344.21-.528l1.823-1.797v-.396h-6.471l-4.622 11.542-5.203-11.542h-6.79v.396l2.14 2.64c.239.292.291.37.291.768v10.353z"></path></svg></a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        <Link to="/home" > Home</Link>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    {window.location.pathname === '/home' ? <NavItem eventKey={1} href="#">
                        <Link to="/writearticle" > Write Article</Link>
                    </NavItem> : null}
                    <ButtonArticle />

                    <Subscribe to={[userContainer]} >
                        {
                            container => {
                                const { login, dataUser } = container.state
                                return !login ? <NavItem> <Link to="/login">Login</Link> </NavItem> : <NavDropdown eventKey={3} title="Setting" id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.1}><Link to="/profile" > Profile</Link></MenuItem>
                                    <MenuItem eventKey={3.2}><Link to="/writearticle" >Write Article</Link></MenuItem>
                                    <MenuItem eventKey={3.3}></MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey={3.4}><Link to="/logout" >Logout</Link></MenuItem>
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