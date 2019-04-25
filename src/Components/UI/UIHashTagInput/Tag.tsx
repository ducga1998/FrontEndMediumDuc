import * as  React from 'react';
import styled from 'styled-components';

class Tag extends React.Component<any, any> {
    handleDelete = event => {
        const {props}  = this
        const label = props.tag[props.labelField];
        console.log('label ===>',label)
    }
    render() {
        const { props } = this;
        const label = props.tag[props.labelField];
        const {
            tag
        } = props;
        const tagComponent = (<span
            onClick={props.onTagClicked}
            onKeyDown={props.onTagClicked}
            >
            {label}
            <Span 
                data-item ={label} 
                onMouseDown=  {this.handleDelete}
            >
                <i className="fas fa-window-close" />
            </Span>
        </span>
        );
        return tagComponent
    }
}
const Span = styled.span`
 i {
     margin : 0px 4px;
     cursor : pointer;
 }
`
export default Tag