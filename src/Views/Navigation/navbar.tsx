import * as React from 'react';

import { Section, Nav, LogoLink, Logo, IconLink, Label } from '../../Components/styled/nav';

// import Icon from '../../Components/Icon/style';
import medium from './medium.svg'
class Navbar extends React.Component {
    render() {
        return <Nav>
            <LogoLink to="/home">
                <Logo src={medium} role="presentation" />
                {/* <span dangerouslySetInnerHTML={{ __html: medium }} /> */}
            </LogoLink>

            <IconLink to="/home">
                {/* <Icon glyph="home" /> */}
                <Label> Home</Label>
            </IconLink>
            <IconLink to="/chat" >
                <Label> Chat</Label>
            </IconLink>
            <IconLink to="/stories">
                <Label >Stories</Label>
            </IconLink>
            <IconLink to="/bookmarks">
                <Label >Bookmark</Label>
            </IconLink>
            <IconLink to="/about">
                <Label > About </Label>
            </IconLink>

        </Nav>
        // const url = this.props.location.pathname;
        // return (
        //     <Nav>
        //         <Section left hideOnMobile>
        //             <LogoLink to="/">
        //                 <Logo src="/img/mark-white.png" role="presentation" />
        //             </LogoLink>

        //             <IconLink data-active={url === '/'} to="/">
        //                 {/* <Icon glyph="home" /> */}
        //                 <Label>Home</Label>
        //             </IconLink>

        //             <IconLink data-active={url.includes('/threads')} to="/threads">
        //                 <Icon glyph={'post'} />
        //                 <Label>Threads</Label>
        //             </IconLink>

        //             <IconLink data-active={url.includes('/users')} to="/users">
        //                 <Icon glyph={'profile'} />
        //                 <Label>Users</Label>
        //             </IconLink>

        //             <IconLink
        //                 data-active={url.includes('/communities')}
        //                 to="/communities"
        //             >
        //                 <Icon glyph={'community'} />
        //                 <Label>Communities</Label>
        //             </IconLink>
        //         </Section>
        //     </Nav>
        // );
    }
}

export default Navbar