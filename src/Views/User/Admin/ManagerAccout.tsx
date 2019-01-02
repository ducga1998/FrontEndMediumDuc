import * as React from 'react';
import styled from 'styled-components';
import { FlexCol, FlexRow, H2, P, H3 } from '../../../Components/styled/base';
import { getAllUser } from '../../../API/client';
import { AvatarImage } from '../../../Components/styled/avatar';
import UIButton from '../../../Components/UI/UIButton';
import UIModal from '../../../Components/UI/UIModal';
import { Section } from '../../../Components/styled/nav';
import UIFieldAlgin from '../../../Components/UI/UIFieldAlgin';

// import Footer from './footer'
interface IManagerAccount {
    listUser: any,
    delete: any,
    update: any
}
export default class ManagerAccount extends React.Component<any> {
    state = {
        listUser: [],
        open: false,
        userSelect: null
    }
    async componentDidMount() {
        const listUser = await getAllUser()
        console.log('allUserData', listUser)
        this.setState({ listUser })
    }
    deleteUser() {

    }
    updateUser() {

    }
    detailInfoUser(user){
        this.setState({ open: true, userSelect: user }) 
    }
    //idUser", "name", "avatarLink", "biographical", "birthday", "location", "decentraliz", "articles", "__typename"
    render() {
        const { listUser, open, userSelect } = this.state
        return <><FlexCol>
            {listUser.length > 0 && listUser.map((user: any, key) => {
                const { idUser, name, avatarLink, biographical, birthday, location, decentraliz, articles } = user
                const role = decentraliz === 1 ? 'User Normal' : 'Admin'
                return <Wrapper onDoubleClick={() => this.detailInfoUser(user)}><UIFieldAlgin key={key} style={{ justifyContent: 'center', margin: '10px' }} vectical>
                    <UIFieldAlgin flex={3}>
                        <AvatarImage src={avatarLink} size={80} />
                    </UIFieldAlgin>
                    <UIFieldAlgin flex={3} >    <H2 > {name}</H2> </UIFieldAlgin >
                    <UIFieldAlgin flex={3} >    <H3> Role : </H3><HightLigth>{role}</HightLigth> </UIFieldAlgin >
                    <UIFieldAlgin flex={3} >
                        <UIButton style={{}} onMouseDown={() => { }}>Update</UIButton>
                        <UIButton style={{}} onMouseDown={() => { }}>Delete</UIButton>
                        <UIButton style={{}} onMouseDown={() => this.detailInfoUser(user)}>Detail</UIButton>
                    </UIFieldAlgin >
                </UIFieldAlgin></Wrapper>
            })}


        </FlexCol>
            <UIModal
                onClickOutSide={() => { this.setState({ open: false }) }}
                openModal={() => { }}
                closeMoDal={() => { this.setState({ open: false }) }}
                open={open}
            >
                {
                    renderUser(userSelect)
                }

            </UIModal>
        </>
    }
}
function renderUser(user) {
    if (!user) {
        return 'Loading ...'
    }
    const { idUser, name, avatarLink, biographical, birthday, location, decentraliz, articles } = user
    return <> <AvatarImage src={avatarLink} />
        <H2>{name}</H2>
        {/* <H2>Decentraliz {role}</H2> */}
        Biographical : {biographical}
        birthday : {birthday}
        location : {location}
        Count Article : {articles.length} </>
}
const Wrapper = styled.div`
    &:hover {
        background-color : ${props => props.theme.bg.wash};
        transition : .2s;
    }
    &:active {
    background-color : ${props => props.theme.bg.hairline};
    }
`
const HightLigth = styled(H2)`
    color  : ${props => props.theme.brand.default};
`
