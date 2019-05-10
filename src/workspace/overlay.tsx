import * as React from 'react'
import styled from 'styled-components';
import UIWidget from '../Components/UI/UIWidget';
// import { Input } from '../Components/styled/base';

export default function OverLay({ getRef, imgSrc }) {
    const [state, setState] = React.useState([0, 0, 0, 0])

    return <UIWidget>
        <Wrapper onMouseDown={e => e.stopPropagation()} ref={(ref) => { getRef(ref) }}>
        <Full>
            <Input>
                {['Left', 'Center', 'Full', 'Right'].map(item => {
                    return <button data-event={item} >{item}</button>
                })}
            </Input>
        </Full>

    </Wrapper>
    </UIWidget>

}
const Wrapper = styled.div`
position : absolute;
z-index : 22;
border : 3px solid ${(props  ) => props.theme.brand.default};
`
const Full = styled.div`
    width : 100%;
    height : 100%;
    position : relative;
`
const Input = styled.div`
display : flex;
justify-content : flex-end;
position : absolute;
width : 50%;
transform : translateX(25%);
`