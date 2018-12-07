import * as React from 'react'
import UIInput from '../../../UI/UIInput';
import OverLaySearch from './OverLaySearch';
import { Input } from '../../../UI/styled/input';
import styled from 'styled-components';
import buttonX from './buttonX.svg'
export default class Search extends React.Component {
    state = {
        value: '',
        isFocus: false
    }
    handleOnChange = (e) => {

    }
    handleOnKeyDown = (e) => {

    }
    render() {
        const { isFocus } = this.state
        return <Wrapper>
            <UIInput style={{ background: '#e7f1fa' }} onFocus={() => this.setState({ isFocus: true })} onChange={() => { }} />
            {isFocus ? <OverLaySearch><InputSeach onKeyDown={this.handleOnKeyDown} autoFocus={true} onChange={this.handleOnChange} />
                <span onMouseDown={() => this.setState({ isFocus: false })} className="close">  <span dangerouslySetInnerHTML={{ __html: buttonX }} /></span></OverLaySearch> : null}
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