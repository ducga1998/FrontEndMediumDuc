import * as React from 'react';
import styled from 'styled-components';
import { FlexCol, H2,  H3, Gradient } from '../../../Components/styled/base';
import { getAllUser, updateInfomation, deleteUserById } from '../../../API/client';
import { AvatarImage } from '../../../Components/styled/avatar';
import UIButton from '../../../Components/UI/UIButton';
import UIModal from '../../../Components/UI/UIModal';
import UIFieldAlgin from '../../../Components/UI/UIFieldAlgin';
import UIEditer from '../../../Components/UI/UIEditer';
import omit from 'lodash/omit'
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
    async deleteUser(idUser) {
       const listUser =  this.state.listUser.filter((user :any)=> user.idUser !== idUser)
       this.setState({listUser})
       await deleteUserById(idUser)
    }
    updateUser() {

    }
    detailInfoUser(user) {
        this.setState({ open: true, userSelect: user })
    }
    //idUser", "name", "avatarLink", "biographical", "birthday", "location", "decentraliz", "articles", "__typename"
    render() {
        const { listUser, open, userSelect } = this.state
      
        return <><FlexCol>
                <Header  />
            {listUser.length > 0 && listUser.map((user: any, key) => {
                const { idUser, name, avatarLink, biographical, birthday, location, decentraliz, articles } = user
                const role = decentraliz === 1 ? 'User Normal' : 'Admin'
                return <Wrapper onDoubleClick={() => this.detailInfoUser(user)}><UIFieldAlgin key={key} style={{ justifyContent: 'center', margin: '10px' }} vectical>
                    <UIFieldAlgin flex={3}>
                        <AvatarImage radius="24px" src={avatarLink} size={80} />
                    </UIFieldAlgin>
                    <UIFieldAlgin flex={3} >    <H2 > {name}</H2> </UIFieldAlgin >
                    <UIFieldAlgin flex={3} >    <H3> Role : </H3><HightLigth>{role}</HightLigth> </UIFieldAlgin >
                    <UIFieldAlgin flex={3} >
                     
                        <UIButton icon="delete" category="danger"style={{}} onMouseDown={() => {this.deleteUser(idUser)}}>Delete</UIButton>
                        <UIButton icon="profile"category="space" style={{}} onMouseDown={() => this.detailInfoUser(user)}>Detail</UIButton>
                    </UIFieldAlgin >
                </UIFieldAlgin></Wrapper>
            })}


        </FlexCol>
            <UIModal
                onClickOutSide={() => { this.setState({ open: false }) }}
                openModal={() => { }}
                closeMoDal={() => { this.setState({ open: false }) }}
                open={open}
                title="Update Infomation Detail User : )))"
            >
                <RenderUser user={userSelect} />

            </UIModal>
        </>
    }
}
async function updateProfile(input) {
    const { idUser } = input
    const data = { ...input, ...{ idUser } }
    const newInfoUser = await updateInfomation(data)
    console.log('newInfoUser', newInfoUser)
    return newInfoUser
}
async function handleUpdateInfo(value ,info , user){
    const input = omit({...user , ...{[info] : value}} , ['articles','__typename'])
    console.log('output data' , input )
    await updateProfile(input)
}
function RenderUser({user} :any) {
    React.useEffect(() => {

    },[user])
    if (!user) {
        return <>'Loading ...'</>
    }
    
    const {  name, avatarLink, biographical, birthday, location} = user
    return <>
        <AvatarImage src={avatarLink} size={80} />
        {[{ name }, { birthday }, { location }, { biographical } ,{avatarLink}].map((item, key) => {
            console.log('name',name)
            const info = Object.keys(item)[0]
            const value = item[info]
            return <UIEditer onUpdateProfile={async (value : string) => await handleUpdateInfo(value , info ,user)} info={info} key={key} content={value} />
        })}
    </>
}
function Header(){
   return  <Wrapper header><UIFieldAlgin style={{ justifyContent: 'center', margin: '10px' }} vectical>
    <UIFieldAlgin flex={3}>
       <H2>Avatar User</H2> 
    </UIFieldAlgin>
    <UIFieldAlgin flex={3} >    <H2 >Name </H2> </UIFieldAlgin >
    <UIFieldAlgin flex={3} >    <H2> Role  </H2></UIFieldAlgin >
    <UIFieldAlgin flex={3} >
        <H2>Settings</H2> 
    </UIFieldAlgin >
</UIFieldAlgin></Wrapper>
}
const Wrapper = styled.div<any>`
background-image: ${(props : any)  => props.header? Gradient('#7b16ff85','#34aadc') : 'none'};
    cursor : pointer;
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
