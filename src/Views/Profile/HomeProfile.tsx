import UIEditer from '../../Components/UI/UIEditer';
import * as React from 'react';
import { getAllInformationUser, IUsertype } from 'src/API/userAPI';
import styled from 'styled-components';
import userContainer from '../../Container/userContainer';
// import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../Components/UI/UILoading';
import UIButton from '../../Components/UI/UIButton';
import UIModal from '../../Components/UI/UIModal';
import UIInput from '../../Components/UI/UIInput';
import { H1, H4, FlexRow, FlexCol, H2 } from '../../Components/styled/base';
import UIFieldAlgin from '../../Components/UI/UIFieldAlgin';
import { AvatarImage } from '../../Components/styled/avatar';
import Tabs from 'src/workspace/tabs';

interface IViewUserCurrent {
    match: any
}
class ViewUserDetail extends React.Component<IViewUserCurrent> {
    state = {
        dataUser: {} as IUsertype,
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
            const { articles, avatarLink, name, location, biographical, birthday } = dataUser;
            return <$ArticleDetail>
                <Backgroud src="https://i.ytimg.com/vi/X42N5384rLk/maxresdefault.jpg" >
                    <UIModal title="Form Change AvatarLink" trigger={<WrapperAvatar><AvatarImage size={200}
                        src={avatarLink ? avatarLink : 'srcImg'} />  <H2 style={{ textAlign: 'center' }}>{name}</H2></WrapperAvatar>
                    } openModal={() => this.setState({ open: true })}
                        open={open}
                        onClickOutSide={() => this.setState({ open: false })}
                        closeMoDal={() => this.setState({ open: false })}>
                        <H1>Please paste link avatar need change</H1>
                        <UIInput onChange={(value) => this.setState({ newAvatarLink: value })} />
                        <UIButton onMouseDown={() => { }}>Update Avatar</UIButton>
                    </UIModal>
                </Backgroud>

                <UIFieldAlgin flex={9} >
                    <$Author>
                        {[{ name }, { birthday }, { location }, { biographical }].map((item, key) => {
                            const info = Object.keys(item)[0]
                            const value = item[info]
                            return <UIEditer onUpdateProfile={(value) => { userContainer.updateProfile({ [info]: value }) }} info={info} key={key} content={value} />
                        })}
                        <H4> Article : {articles.length}</H4>
                        <UIButton onMouseDown={() => { this.setState({ isChangePass: true }) }}>Change password</UIButton>
                    </$Author>

                </UIFieldAlgin>
                <UIFieldAlgin flex={3}>
                    {/* <UIEditer info={'biographical'} content={biographical ? biographical : ''} /> */}
                </UIFieldAlgin>
                <hr />
                <Tabs items={[{ name: 'abc', component: <div>nguyen minh duc</div> }, { name: 'ducccc', component: <div>nguyen minh ducascjkasc</div> }]} />
            </$ArticleDetail>
        }
        return <UILoading />
    }
}
const WrapperAvatar = styled(FlexCol)`
    background-color: #ffffff;
    padding: 20px;
    align-items : center;
    border-radius: 10px;
    box-shadow: 1px 1px 14px 0px black;
    transform: translateY(50%);

`
const Backgroud = styled(FlexRow) <any>`
    background-size: cover;
    width : 100%;
    height : 500px;
    background-color : blue;
    align-items : flex-end;
    justify-content : center;
    background-image : url(${(props: any) => props.src ? props.src : './default.jpg'});
`
//"idArticle", "hashTag", "category", "comment", "totalClap", "notification", "contentArticle", "titleArticle", "imageArticle", "createTime", "__typename"
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
const $ArticleDetail = styled(FlexCol) <any>`

`

export default ViewUserDetail