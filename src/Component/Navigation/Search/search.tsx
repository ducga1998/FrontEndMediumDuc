import * as React from 'react'
import UIInput from '../../../UI/UIInput';
import OverLaySearch from './OverLaySearch';
import { Input } from '../../../UI/styled/input';
import styled from 'styled-components';
import buttonX from './buttonX.svg'
import { getDataSearch } from '../../../API/articleAPI';
import SmartList from './smartList';
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
        const smartList = afterData.filter((item: any) => item.titleArticle.includes(value))
        console.log('dataFilter', smartList)
        this.setState({ smartList })

    }
    handleOnKeyDown = (e) => {

    }
    close = () => {
        this.setState({ isFocus: false })
    }
    open = () => {
        this.setState({ isFocus: true })
    }
    render() {
        const { isFocus, smartList } = this.state
        return <Wrapper>
            <UIInput style={{ background: '#e7f1fa' }} onFocus={this.open} onChange={() => { }} />
            {isFocus ? <> <OverLaySearch >
                <InputSeach onKeyDown={this.handleOnKeyDown} autoFocus={true} onChange={this.handleOnChange} />
                <span onMouseDown={this.close} className="close">
                    <span dangerouslySetInnerHTML={{ __html: buttonX }} />
                </span>
                <SmartList smartList={smartList} close={this.close} />
            </OverLaySearch></> : null
            }
        </Wrapper>
    }
}
const Wrapper = styled.div`
    span.close{
    display: block;
    margin: 35px;
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
`
const InputSeach = styled(Input)`
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