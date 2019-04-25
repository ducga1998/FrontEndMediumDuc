import * as  React from 'react';
import styled from 'styled-components';

class Tag extends React.Component<any, any> {
    handleDelete = event => {
        const { props } = this
        const label = props.tag[props.labelField];
        console.log('label ===>', label)
        this.props.onDelete(label)
    }
    render() {
        const { props } = this;
        const label = props.tag[props.labelField];
        const {
            tag
        } = props;
        const tagComponent = (<Span
            onClick={props.onTagClicked}
            onKeyDown={props.onTagClicked}
        >
            {label}
            <span
                data-item={label}
                onMouseDown={this.handleDelete}
            >
                <i className="fas fa-window-close" />
            </span>
        </Span>
        );
        return tagComponent
    }
}
const Span = styled.span`
 i {
    margin : 0px 4px;
    cursor : pointer;   
    color : ${props => props.theme.warn.default};
 }
 margin : 5px;
 background : ${props => props.theme.brand.border};
 padding  : 10px 20px;
 transition : .1s;
 &:hover{
     background : ${props => props.theme.brand.alt};
 }
`
export default Tag