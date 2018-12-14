import * as React from 'react';
import { MenuItem, Nav, NavDropdown, NavItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Subscribe } from 'unstated-x';
import userContainer from '../../Container/userContainer';
// import BrowserHistory from 'react-router/lib/BrowserHistory'
import ButtonArticle from './buttonWriteArticle';
import Search from './Search/search';
import Navbar from './navbar';
import DropDown from '../../Components/UI/UIDropDown'
class Navication extends React.Component<any, any>{

    public render() {

        return <Row>


            <Navbar />
            <DropDown >caskjcnasncasc</DropDown>
            <Nav pullRight>
                <NavItem eventKey={1}><NavItem /><Search /></NavItem>
                {window.location.pathname === '/home' ? <NavItem eventKey={1} href="#">
                    <Link to="/writearticle" > Write Article</Link>
                </NavItem> : null}
                <ButtonArticle />

                <Subscribe to={[userContainer]} >
                    {
                        container => {
                            const { login, dataUser } = container.state
                            return !login ? <NavItem> <Link to="/login">Login</Link> </NavItem> : <NavDropdown eventKey={3} title="Setting" id="basic-nav-dropdown">

                                <MenuItem eventKey={3.2}><Link to="/profile" > Profile</Link></MenuItem>
                                <MenuItem eventKey={3.3}><Link to="/stories" >Stories</Link></MenuItem>
                                <MenuItem eventKey={3.4}><Link to="/bookmarks" >Bookmark</Link></MenuItem>
                                <MenuItem eventKey={3.5}><Link to="/writearticle" >Write Article</Link></MenuItem>

                                <MenuItem eventKey={3.6}></MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.7}><Link to="/logout" >Logout</Link></MenuItem>
                            </NavDropdown>
                        }
                    }
                </Subscribe>

            </Nav>

        </Row >


    }
}
export default Navication