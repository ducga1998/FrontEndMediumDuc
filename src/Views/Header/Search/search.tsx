import * as React from 'react'
import UIInput from '../../../Components/UI/UIInput';
import styled from 'styled-components';
import buttonX from './buttonX.svg'
import { getDataSearch } from '../../../API/articleAPI';
import SmartList from './smartList';
import { Input, fontStack } from '../../../Components/styled/base';
import { OverLay } from 'src/Components/styled/overlay';
import UIWidget from 'src/Components/UI/UIWidget';
export default class Search extends React.Component {
    state = {
        value: '',
        isFocus: false,
        afterData: [],
        smartList: []
    }
    async componentWillMount() {
        const afterData = await getDataSearch()
        this.setState({ afterData })
    }

    handleOnChange = (e) => {
        const { afterData } = this.state
        const { value } = e.target
        this.setState({ value })
        const smartList = afterData.filter((item: any) => item.titleArticle.includes(value))
        this.setState({ smartList })
    }
    close = () => {
        this.setState({ isFocus: false })
    }
    open = () => {
        this.setState({ isFocus: true })
    }
    render() {
        const { isFocus, smartList, value } = this.state
        return <Wrapper>
            <UIInput placeholder="Search Something ... " style={{ background: '#e7f1fa' }} value={value} onFocus={this.open} onChange={() => { }} />
            {isFocus ? <>
                <UIWidget>
                    <OverLaySearch open={true}>
                        <div className="width-80">
                            <p className="label--search">Search:</p>
                            <div className="wrapper--search">
                                <SearchInput
                                    value={value}
                                    autoFocus={true}
                                    onChange={this.handleOnChange} />
                                <span onMouseDown={this.close} className="close">
                                    <span dangerouslySetInnerHTML={{ __html: buttonX }} />
                                </span>
                            </div>
                            <SmartList smartList={smartList} close={this.close} />
                        </div>
                    </OverLaySearch>
                </UIWidget>
            </> : null
            }
        </Wrapper>
    }
}
const OverLaySearch = styled(OverLay)`
   background : rgb(33, 34, 34);
   align-items: flex-start;
   .width-80 {
        width : 80%;
       .wrapper--search {
            display: flex;
            .close {
                cursor : pointer;
            }
        }
    .label--search {
        color: #3e4141;
        font-size: 30px;
        padding: 30px;
        color: #3e4141;
    }
}
    
`
const Wrapper = styled.div`
        ${fontStack}
        display : flex;
        span.close{
        display: block;
        margin: 0px;
        cursor: pointer;
        color: #fff;
        margin-left: auto;
        padding: 0;
        border-width: 0;
        background-color: transparent;
    }
    sgv {
        height: 48px;
        width: 48px;
    }
    & .wrapper--search{
        display: flex;
    }
   
`
const SearchInput = styled(Input)`
        border: none;
        padding: 30px;
        width: 90%;
        color: #3e4141;
        font-size: 60px;
        color: #888;
        background-color: rgba(33,34,34,.96);
        &:focus{
            font-size: 60px;
        color: #888;
        background-color: rgba(33,34,34,.96);
        } 
`
