import * as React from 'react';
import { Nav, NavDropdown, NavItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Subscribe } from 'unstated-x';
import userContainer from '../../Container/userContainer';
import ButtonArticle from './ButtonWrite';
import Search from './Search/search';
import Navbar from './Navigation/navbar';
class Navication extends React.Component<any, any>{

    public render() {

        return <Row>
            <Navbar />
            <Nav >
                <NavItem ><NavItem /><Search /></NavItem>
                {window.location.pathname === '/home' ? <NavItem >
                    <Link to="/writearticle" > Write Article</Link>
                </NavItem> : null}
                <ButtonArticle />
                <Subscribe to={[userContainer]} >
                    {
                        container => {
                            const { login, dataUser } = container.state
                            return !login ? <NavItem> <Link to="/login">Login</Link> </NavItem> : <NavDropdown eventKey={3} title="Setting" id="basic-nav-dropdown">

                                <Nav.Item ><Link to="/profile" > Profile</Link></Nav.Item>
                                <Nav.Item ><Link to="/stories" >Stories</Link></Nav.Item>
                                <Nav.Item ><Link to="/bookmarks" >Bookmark</Link></Nav.Item>
                                <Nav.Item ><Link to="/writearticle" >Write Article</Link></Nav.Item>



                                <Nav.Item ><Link to="/logout" >Logout</Link></Nav.Item>
                            </NavDropdown>
                        }
                    }
                </Subscribe>
            </Nav>

        </Row >


    }
}
export default Navication