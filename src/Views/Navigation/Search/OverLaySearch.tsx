import * as React from 'react'
import UIInput from '../../../UI/UIInput';
import UIWidget from '../../../UI/UIWidget';
import styled from 'styled-components';
import { Input } from '../../../UI/styled/input';
import { OverLay } from '../../../UI/styled/overlay';
import SmartList from './smartList';
export default class OverLaySearch extends React.Component {
    state = {
        value: '',
    }
    handleOnChange = (e) => {

    }

    render() {
        return <UIWidget>
            <OvrelaySear open={true}>

                <Algin>
                    <Text>Search:</Text>
                    {this.props.children}
                </Algin>

            </OvrelaySear>
        </UIWidget>
    }
}
const OvrelaySear = styled(OverLay)`
   background : rgb(33, 34, 34);
   align-items: flex-start;
`
const Algin = styled.div`
width : 80%;
`
const Text = styled.p`
   
    color: #3e4141;
    font-size: 30px;
    padding: 30px;
    color: #3e4141;
`