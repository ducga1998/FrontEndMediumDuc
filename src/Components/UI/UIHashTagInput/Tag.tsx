import * as  React from 'react';
import styled from 'styled-components';
import { fontStack } from '../../styled/base';

class Tag extends React.Component<any, any> {
    handleDelete = event => {
        const { props } = this
        const label = props.tag[props.labelField]
        this.props.onDelete(label)
    }
    render() {
        const { props } = this;
        const label = props.tag[props.labelField];
        const {
            tag
        } = props;
        return <Div
        
        >
            {label}
            <span
                data-item={label}
                onMouseDown={this.handleDelete}
            >
                <i className="fas fa-window-close" />
            </span>
        </Div>
    }
}
const Div = styled.div`
${fontStack}
 i {
    margin : 0px 4px;
    cursor : pointer;   
    color : ${props => props.theme.warn.default};
 }
 display: inline-block;
 margin : 5px;
 background : ${props => props.theme.brand.border};
 padding  : 10px 20px;
 transition : .1s;
 border-radius : 5px;
 &:hover{
     background : ${props => props.theme.brand.alt};
 }
`
export default Tag