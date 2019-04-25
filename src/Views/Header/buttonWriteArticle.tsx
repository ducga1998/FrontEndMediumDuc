import * as React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Subscribe } from 'unstated-x';

import uuid from 'uuid';
import articleContainer from '../../Container/articleContainer';
import UIModal from '../../Components/UI/UIModal';
import UIButton from '../../Components/UI/UIButton';
import { IconLink } from '../../Components/styled/nav';
import {  FlexRow } from '../../Components/styled/base';
import UIHashTagInput from '../../Components/UI/UIHashTagInput'
export default function ButtonArticle() {
    const [open, setOpen] = React.useState(false)
    const [nameHashTag, setNameHashTag] = React.useState('')

    let id = uuid()
    const [idArticle, setIdArticle] = React.useState(id)
    const handleAddHashTag = async (tag) => {
        const {text :nameHashTag  } = tag
        const { arrHashTag } = articleContainer.state
        if (arrHashTag.length > 6 || nameHashTag.length < 0) {
            toast.error('Maximum 6 hash tag and Min > 0!!!!');
            return
        }
        console.log('nameHashTag',nameHashTag)
        if (arrHashTag.includes(nameHashTag)) {
            toast.error('Name exites!!!');
            return
        }
        if (nameHashTag.length === 0) {
            toast.error('Name hash tag not empty!!!');
            return
        }
        arrHashTag.push(tag.text);
        await articleContainer.setState({ arrHashTag })
        // await setNameHashTag('')

    }
    if (window.location.pathname === "/writearticle" || window.location.pathname.match('store')) {
        return <Subscribe to={[articleContainer]}>
            {
                (container: any) => {
                    const { isPublicArticle, isUpdate, arrHashTag } = container.state


                    return isPublicArticle ?
                        (<UIModal open={open} openModal={() => {
                            setOpen(true)
                        }}
                            closeMoDal={() => {
                                setOpen(false)
                            }}
                            onClickOutSide={() => {
                                setOpen(false)
                            }}
                            width="1000px"
                            height="400px"
                            trigger={<Button >Public</Button>}>


                            <FlexRow>
                                <UIHashTagInput
                                    onChange={value => setNameHashTag(value)}
                                    tags={arrHashTag}
                                    suggestions={['cácbasjhcasc', 'ccascnasjckjasnnc']}
                                    onAdd={(tag) => {
                                        handleAddHashTag(tag)
                                    }}
                                    onDelete={(item) => {
                                        // console.log(':V :V value' , value)
                                        const arrHasBeenDelete = arrHashTag.filter(itemHashTag => itemHashTag !== item)
                                        articleContainer.setState({ arrHashTag: arrHasBeenDelete })
                                    }}
                                />

                            </FlexRow>


                            {isUpdate ? <UIButton onMouseDown={async () => {
                                if (window.location.pathname.match('store')) {
                                    const id = window.location.pathname.replace(/[/]store[/]/, '')
                                    await container.updateAricle(id)
                                }
                                else {
                                    await container.updateAricle(idArticle)
                                }
                                toast.success('Update aricle success !!!! ')
                                await setOpen(false)
                            }
                            } >Update Article</UIButton> : <UIButton onMouseDown={async () => {

                                const newArticle = await container.addArticle(idArticle)

                                if (newArticle) {
                                    toast.success('Public article success !!!!')
                                    await setOpen(false) // close modal 
                                    // a here  => help change button 
                                    await container.setState({ isUpdate: true }) //  mode public article  =>  update article 
                                }
                                else {
                                    toast.error(":( Error , just kidding me, FUCKING CODE FOR ME")
                                }
                            }}> Public Article  </UIButton>}

                        </UIModal>) : null
                }
            }
        </Subscribe>
    }
    return null

}

const Button = styled(IconLink.withComponent('a'))`
    cursor : pointer;
    background-color : ${props => props.theme.brand.dark};
    // border-left : 5px solid ${props => props.theme.special.alt};

`