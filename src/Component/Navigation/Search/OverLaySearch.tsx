import * as React from 'react'
import UIInput from '../../../UI/UIInput';
import UIWidget from '../../../UI/UIWidget';
import styled from 'styled-components';
export default class OverLaySearch extends React.Component {
    state = {
        value: '',
        isFocus: false
    }
    handleOnChange = (e) => {

    }

    render() {
        return <UIWidget>
            <OverLay>

            </OverLay>
        </UIWidget>
    }
}
const OverLay = styled.div`
    background : black;
    opacity : 0.4;
`
const Input = styled.input`
`