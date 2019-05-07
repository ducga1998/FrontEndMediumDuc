import * as React from 'react'
import styled from 'styled-components';


export default class SmartList extends React.Component<{smartList : {titleArticle : string ,idArticle  :string  }[] , close : () => void}> {
    render() {
        const { smartList } = this.props
        if (!smartList) {
            return null
        }
        return <ul>
            {smartList.map((item, key) =>
                <Li key={key}>
                    <A onClick={() => {
                        location.href = `/article/${item.idArticle}`
                        this.props.close();

                    }}>
                        {item.titleArticle}
                    </A>
                </Li>
            )
            }
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