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
function RenderEditInfoser({ info, content, index, handleClickEdit, openEdit }: any) {
    // console.log(key)
    const handleMousuOut = () => {
        console.log('out')
    }
    // const [isWantChange, setWantChange] = React.useState(false)
    return <div><h3><b>{info} : </b>{openEdit ? <input type='text' placeholder={info + ' ...'} /> : (content ? content : '')}
        <Glyphicon data-index={index} onMouseLeave={handleMousuOut} glyph="edit" onClick={handleClickEdit} /></h3></div>
}
class ViewUserDetail extends React.Component<IViewUserCurrent> {
    state = {
        dataUser: null,
        isChangePass: false,
        newAvatarLink: '',
        open: false,
        openEdit: [false, false, false]

    }
    async componentDidMount() {
        const { idUser } = userContainer.state.dataUser
        const data = await getAllInformationUser(idUser)
        const dataUser = data['data']['getAllInformationUser']

        await this.setState({ dataUser })
    }
    handleEdit = (e) => {
        let { openEdit } = this.state
        console.log(e.target.getAttribute('data-index'))
        const index = e.target.getAttribute('data-index')
        const data = openEdit.map((item, key) => {
            console.log(index, key)
            if (key == index) {
                item = true
            }
            else {
                item = false
            }
            return item
        })
        console.log('openEdit', data)
        this.setState({ openEdit: data })
    }
    render() {
        const { dataUser, open, openEdit } = this.state
        if (dataUser) {
            const { articles, avatarLink, name, location, biographical, birthday } = dataUser as any;
            console.log('articles', articles)

            return <$ArticleDetail>
                <$Content>
                    <Left>
                        <$Author>
                            <UIModal title="Form Change AvatarLink" trigger={<Img onClick={() => {

                            }} src={avatarLink ? avatarLink : srcImg} />} openModal={() => {
                                this.setState({ open: true })
                            }} open={open} onClickOutSide={() => {
                                this.setState({ open: false })
                            }} closeMoDal={() => {
                                this.setState({ open: false })
                            }}>
                                <h1>Please paste link avatar need change</h1>
                                <UIInput value={avatarLink} onChange={(value) => { this.setState({ newAvatarLink: value }) }} />
                                <UIButton onChange={() => { }}>Update Avatar</UIButton>
                            </UIModal>
                            {[{ name }, { birthday }, { location }].map((item, key) => {
                                console.log(key)
                                const info = Object.keys(item)[0]
                                const value = item[info]
                                return <RenderEditInfoser openEdit={openEdit[key]} handleClickEdit={this.handleEdit} index={key} info={info} key={key} content={value} />
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
                {/* <h3> All Article <b style={
                    {
                        color: "#4797db"
                    }
                } >{name} </b> has write</h3> */}
                {/* <$ViewArticle>
                    {articles && articles.length > 0 ? articles.map((item, key) => {
                        const { hashTag, isUSer, contentArticle, titleArticle, createTime, idArticle } = item
                        return <Article user={dataUser} idArticle={idArticle} key={key} hashTag={hashTag} time={createTime} content={contentArticle} totalClap={8} totalComment={9} titleArticle={titleArticle} avatar={`https://picsum.photos/200/200/?a${item}`} />

                    }) : <h2>NO Article  :), fuck own account stupid </h2>}
                </$ViewArticle> */}
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