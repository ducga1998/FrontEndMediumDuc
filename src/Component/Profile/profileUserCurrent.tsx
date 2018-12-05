import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { follow, getAllInfomationUserFollowYour, unFollow } from '../../API/followAPI';
import userContainer from '../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../UI/UILoading';
import Article from '../Article';
import UIButton from '../../UI/UIButton';
import UIModal from '../../UI/UIModal';
import UIInput from '../../UI/UIInput';
interface IViewUserCurrent {
    match: any
}
const { useState, useRef } = React
function RenderEditInfoser({ info, content, index, handleClickEdit, openEdit }: any) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(content)
    const inputref = useRef(null) as any
    const handleMousuOut = () => {
        console.log('out')
    }
    React.useEffect(() => {
        // setValue(content)
        if (inputref.current) {
            inputref.current.value = (content ? content : '')
        }
    })
    async function handleOnClick(val) {
        if (inputref.current) {
            setValue(inputref.current.value)
            setOpen(false)
            userContainer.updateProfile({ [info]: inputref.current.value })
        }
    }
    return <div><h3 onClick={(e: any) => { setOpen(!open); }} ><b>{info} : </b>{(value ? value : '')}
        <Glyphicon data-index={index} glyph="edit" /></h3>
        {open ? <$Flex>
            <UIInput style={{ width: '100%' }} refInput={inputref} onChange={() => { }} placeholder={info} />
            <UIButton style={{ "margin-left": "20px" }} onChange={handleOnClick}>Edit</UIButton>
        </$Flex> : null}
    </div>

}
const $Flex = styled.div`
    display : flex;
`
class ViewUserDetail extends React.Component<IViewUserCurrent> {
    state = {
        dataUser: null,
        isChangePass: false,
        newAvatarLink: '',
        open: false,
    }
    async componentDidMount() {
        const { idUser } = userContainer.state.dataUser
        const dataUser = await getAllInformationUser(idUser)
        await this.setState({ dataUser })
    }

    render() {
        const { dataUser, open } = this.state
        if (dataUser) {
            const { articles, avatarLink, name, location, biographical, birthday } = dataUser as any;
            console.log('articles', articles)

            return <$ArticleDetail>
                <$Content>
                    <Left>
                        <$Author>
                            <UIModal title="Form Change AvatarLink" trigger={
                                <Img
                                    src={avatarLink ? avatarLink : srcImg} />} openModal={() => this.setState({ open: true })}
                                open={open}
                                onClickOutSide={() => this.setState({ open: false })}
                                closeMoDal={() => this.setState({ open: false })}>
                                <h1>Please paste link avatar need change</h1>
                                <UIInput value={avatarLink} onChange={(value) => this.setState({ newAvatarLink: value })} />
                                <UIButton onChange={() => { }}>Update Avatar</UIButton>
                            </UIModal>
                            {[{ name }, { birthday }, { location }].map((item, key) => {
                                console.log(key)
                                const info = Object.keys(item)[0]
                                const value = item[info]
                                return <RenderEditInfoser handleClickEdit={() => { }} index={key} info={info} key={key} content={value} />
                            })}
                            <h5> Article : {articles.length}</h5>
                            <UIButton onChange={() => { this.setState({ isChangePass: true }) }}>Change password</UIButton>
                        </$Author>
                    </Left>
                    <Right onClick={() => {
                        this.setState({ openEdit: [false, false, false] })
                    }}>
                        Biographical
                    <h3 ><b> : </b>{biographical ? biographical : ''}    <Glyphicon glyph="edit" /></h3>
                    </Right>
                </$Content >
                <hr />
            </$ArticleDetail>
        }
        return <UILoading />
    }
}
//"idArticle", "hashTag", "category", "comment", "totalClap", "notification", "contentArticle", "titleArticle", "imageArticle", "createTime", "__typename"
const Img = styled.img`
    cursor : pointer;
    width : 200px;
    height : 200px;
    border-radius : 50%;
    :hover {
        background-color : #000066;
        transition : .3s;
    }
    `
const $Author = styled.div`
    h3 {
        margin : 0px;
        padding : 10px;
    }
    h3 .glyphicon {
                opacity : 0;
        transition : .3s;
        cursor : pointer;
    }
    h3:hover {
        background-color: #f8f8f8;
    }
    h3:hover .glyphicon{
        opacity : 1;
        transition : .3s;
    }
    h3 span {
                float : right;
    }
`
const $ArticleDetail = styled.div`
                        `
const $ViewArticle = styled.div`
                border-top  :2px solid #9eaee8;
                padding-top : 20px;
                        `
const $Content = styled.div`
                         display : flex;
                         
                        `
const Left = styled.div`
                        flex : 3;
                        `
const Right = styled.div`
                        flex : 9;
                        `

export default ViewUserDetail