import UIEditer from '../../Components/UI/UIEditer';
import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { follow, getAllInfomationUserFollowYour, unFollow } from '../../API/followAPI';
import userContainer from '../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../Components/UI/UILoading';
import Article from '../Article';
import UIButton from '../../Components/UI/UIButton';
import UIModal from '../../Components/UI/UIModal';
import UIInput from '../../Components/UI/UIInput';
import { H1 , H4 } from '../../Components/styled/base';

interface IViewUserCurrent {
    match: any
}


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
                                <H1>Please paste link avatar need change</H1>
                                <UIInput onChange={(value) => this.setState({ newAvatarLink: value })} />
                                <UIButton onMouseDown={() => { }}>Update Avatar</UIButton>
                            </UIModal>
                            {[{ name }, { birthday }, { location }, { biographical }].map((item, key) => {
                                console.log(key)
                                const info = Object.keys(item)[0]
                                const value = item[info]
                                return <UIEditer info={info} key={key} content={value} />
                            })}
                            <H4> Article : {articles.length}</H4>
                            <UIButton onMouseDown={() => { this.setState({ isChangePass: true }) }}>Change password</UIButton>
                        </$Author>
                    </Left>
                    <Right>
                        <UIEditer info={'biographical'} content={biographical ? biographical : ''} />
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