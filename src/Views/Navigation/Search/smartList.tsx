import * as React from 'react'
import { getDataSearch } from '../../../API/articleAPI';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { redirect } from '../../../route';
import history from '../../../history';


export default class SmartList extends React.Component<any> {
    render() {
        const { smartList } = this.props
        console.log('smartList', smartList)
        if (!smartList) {
            return null
        }
        return <ul>
            {smartList.map(item => <Li><A onClick={() => {
                location.href = `/article/${item.idArticle}`
                this.props.close();

            }}>{item.titleArticle}</A></Li>)}
        </ul>
    }
}

const A = styled.a <any> `
    color: #888888;
    font-size: 31px;
    cursor : pointer;
    &:hover{
        text-decoration : none;
        color: #e8e6e6;
       
    }
`
const Li = styled.li`
    list-style : none;
`