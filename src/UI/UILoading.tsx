import * as React from 'react';
import styled from 'styled-components';
import UIWidget from './UIWidget';

interface IUILoadingProps {
    link?: string
}

export const UILoading: React.FunctionComponent<IUILoadingProps> = props => {
    return (
        <UIWidget>
            <$Background>
                <$ImageLoading>
                    <img
                        src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-9/30710734_1894791530812895_692578444441026560_n.jpg?_nc_cat=102&_nc_ht=scontent.fhan5-2.fna&oh=46b63236752f0608bb45efcd83a59d05&oe=5C75BB19"/>
                </$ImageLoading>
            </$Background>
        </UIWidget>
    );
};

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
`;
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
`;
