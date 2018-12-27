
import * as React from 'react';
import styled from 'styled-components';
import UIWidget from './UIWidget';
import { AvatarImage } from '../styled/avatar';

interface IUILoading {
    link?: string
}
export default class UILoading extends React.Component<IUILoading> {
    render() {
        return <UIWidget>
            <$Background>
                <$ImageLoading>
                    <AvatarImage size={100} src="/default.jpg" />
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
    opacity : 0.4;
`
const $ImageLoading = styled.div`
    width: 100px;
    height: 100px;
    /* transform: rotate3d(360); */
    z-index   : 100;
    animation: yAxis 3s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
    @keyframes yAxis {
            0% {
                opacity: 0;
                transform : scale(1);
                transform : rotate(0deg)
            }
            50% {
                opacity: 0.5;
                transform : scale(3)
            }
            100%  {
                    opacity : 1;
                    transform : scale(1) ;
                    transform : rotate(360deg)
            }
        }
    img {
        width : 100%
    }
`