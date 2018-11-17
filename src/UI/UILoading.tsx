
import * as React from 'react';
import styled from 'styled-components';
import UIWidget from './UIWidget';
interface IUILoading {
    link: string
}
export default class UILoading extends React.Component<IUILoading> {

    render() {
        return <UIWidget>
            <$Background>
                <$ImageLoading>
                    <img src={this.props.link} />
                </$ImageLoading>
            </$Background>
        </UIWidget>

    }
}
const $Background = styled.div`
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: fixed;
    width: 100%;  
    top : 0px;
    opacity : 0.5;    
`
const $ImageLoading = styled.div`
    width: 100px;
    height: 100px;
    transform: rotate3d(360);
    animation: yAxis 3s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
    @keyframes yAxis {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 1;
                transform: rotateZ(360deg);
                transform: rotateX(360deg);
                transform: rotateY(360deg);
            }
        }
    img {
        width : 100%
    }
`