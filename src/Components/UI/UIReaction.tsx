import * as React from 'react';
import styled from 'styled-components';
import { Subscribe } from 'unstated-x';
import allBookMarkContainer from '../../Container/bookMarkContainer';
import UIWidget from './UIWidget';
import Icon, { Glyph } from '../Icon';
import { socketNotication } from '../../socketClient/socket';
// const { useEffect, useState } = React
interface IUIReaction {
    idUseOwnArticler?: string
    idArticle: string
    titleArticle : string
}   
const { useEffect } = React as any
export default function UIReaction({ idUseOwnArticler, idArticle ,titleArticle}: IUIReaction) {
    const refReaction = React.useRef(null) as any
    useEffect(() => {
        allBookMarkContainer.isBookMark({ idArticle })
    })
    return <><UIWidget>
        <Subscribe to={[allBookMarkContainer]}>
            {
                () => {
                    const bookMarkContainer = allBookMarkContainer.getContainerBookMark(idArticle)
                    if (!bookMarkContainer) {
                        return null
                    }
                    return <Subscribe to={[bookMarkContainer]}>
                        {
                            () => {
                                const { isBookMark } = bookMarkContainer.state
                                function handleBookMark(e: any) {
                                    if (isBookMark) {
                                        allBookMarkContainer.unBookMarkToClient({ idUseOwnArticler, idArticle })
                                    }
                                    else {
                                        socketNotication({titleArticle , idUser : idUseOwnArticler} , 'Bookmark')
                                        allBookMarkContainer.bookMarkToClient({ idUseOwnArticler, idArticle })
                                    }
                                }
                                return <$Reaction ref={refReaction} height={screen.height / 4 + 'px'}>
                                    <$Button data-tooltip="2423">
                                        <svg className="svgIcon-use" width="25" height="25"><g fill-rule="evenodd"><path d="M11.738 0l.762 2.966L13.262 0z"></path><path d="M16.634 1.224l-1.432-.47-.408 3.022z"></path><path d="M9.79.754l-1.431.47 1.84 2.552z"></path><path d="M22.472 13.307l-3.023-5.32c-.287-.426-.689-.705-1.123-.776a1.16 1.16 0 0 0-.911.221c-.297.231-.474.515-.535.84.017.022.036.04.053.063l2.843 5.001c1.95 3.564 1.328 6.973-1.843 10.144a8.46 8.46 0 0 1-.549.501c1.205-.156 2.328-.737 3.351-1.76 3.268-3.268 3.041-6.749 1.737-8.914"></path><path d="M12.58 9.887c-.156-.83.096-1.569.692-2.142L10.78 5.252c-.5-.504-1.378-.504-1.879 0-.178.18-.273.4-.329.63l4.008 4.005z"></path><path d="M15.812 9.04c-.218-.323-.539-.55-.88-.606a.814.814 0 0 0-.644.153c-.176.137-.713.553-.24 1.566l1.43 3.025a.539.539 0 1 1-.868.612L7.2 6.378a.986.986 0 1 0-1.395 1.395l4.401 4.403a.538.538 0 1 1-.762.762L5.046 8.54 3.802 7.295a.99.99 0 0 0-1.396 0 .981.981 0 0 0 0 1.394L3.647 9.93l4.402 4.403a.537.537 0 0 1 0 .761.535.535 0 0 1-.762 0L2.89 10.696a.992.992 0 0 0-1.399-.003.983.983 0 0 0 0 1.395l1.855 1.854 2.763 2.765a.538.538 0 0 1-.76.761l-2.765-2.764a.982.982 0 0 0-1.395 0 .989.989 0 0 0 0 1.395l5.32 5.32c3.371 3.372 6.64 4.977 10.49 1.126C19.74 19.8 20.271 17 18.62 13.982L15.812 9.04z"></path></g></svg>
                                    </$Button>
                                    <$Button active={isBookMark} onClick={handleBookMark} > <Icon glyph="flag" /></$Button>
                                </$Reaction>
                            }
                        }
                    </Subscribe>
                }
            }
        </Subscribe>
    </UIWidget> </>
}
const $Reaction = styled.div<{ height: string }>`
    position: fixed;
    align-items: center;
    transition : .3s;
    top:${props => props.height};
    left: 40px;
    width: 80px;
    // height : ${props => props.height};
    background-color: #e7eceb;
    width : 80px;
    display : flex;
    justify-content : center;
    box-shadow: 0px 3px 8px 2px #a5b1ba;
    border-radius: 10px;
    opacity : 1;
    flex-direction: column;
`
const $Button = styled.div<any>`
    margin : 20px 0px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: ${props => props.active ? "#252c32" : '#b1c3d3'};
    display: flex;
    color :  ${props => props.active ? 'white' : 'black'};
    justify-content: center;
    align-items: center;
    transition : .3s;
    cursor : pointer;
    &:hover {
        background-color:  ${props => props.active ? "#252c32" : '#63a3d7;'} 
    }
       
`
