import * as React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Subscribe } from 'unstated-x';

import uuid from 'uuid';
import articleContainer from '../../Container/articleContainer';
import UIModal from '../../Components/UI/UIModal';
import UIButton from '../../Components/UI/UIButton';
import { IconLink } from '../../Components/styled/nav';
import UIInput from '../../Components/UI/UIInput';
import { H2, FlexRow } from '../../Components/styled/base';
import UIHashTagInput from '../../Components/UI/UIHashTagInput'
export default function ButtonArticle({ history }: any) {
    const [open, setOpen] = React.useState(false)
    const [nameHashTag, setNameHashTag] = React.useState('')

    let id = uuid()
    const [idArticle, setIdArticle] = React.useState(id)
    const handleAddHashTag = async () => {
        const { arrHashTag } = articleContainer.state
        if (arrHashTag.length > 6 || nameHashTag.length < 0) {
            toast.error('Maximum 6 hash tag and Min > 0!!!!');
            return
        }
        if (arrHashTag.includes(nameHashTag)) {
            toast.error('Name exites!!!');
            return
        }
        if (nameHashTag.length === 0) {
            toast.error('Name hash tag not empty!!!');
            return
        }

        arrHashTag.push(nameHashTag);
        await articleContainer.setState({ arrHashTag })
        await setNameHashTag('')

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
                            trigger={<Button >Public</Button>}>
                            {arrHashTag.length > 0 ?
                                <div>
                                    {arrHashTag.map((item, key) => {
                                        return <FlexRow key={key}><H2 style={{ flex: 1 }} >{item}</H2>
                                            <UIButton icon="delete"
                                                style={{ padding: '0px' }}
                                                onMouseDown={() => {
                                                    const arrHasBeenDelete = arrHashTag.filter(itemHashTag => itemHashTag !== item)
                                                    articleContainer.setState({ arrHashTag: arrHasBeenDelete })
                                                }} />
                                        </FlexRow>
                                    })}
                                </div>
                                : null}

                            <FlexRow>
                                <UIHashTagInput 
                                tags={arrHashTag}
                                 suggestions={[]} 
                                 onAdd ={() => {
                                    handleAddHashTag()
                                 }}
                                 onDelete ={() => {
                                    // const arrHasBeenDelete = arrHashTag.filter(itemHashTag => itemHashTag !== item)
                                    // articleContainer.setState({ arrHashTag: arrHasBeenDelete })
                                 }}
                                 />
                                <UIInput
                                    value={nameHashTag}
                                    placeholder="Enter text"
                                    onChange={(value) => setNameHashTag(value)}
                                    onKeyPress={(event) => {
                                        if (event.charCode === 13) {
                                            handleAddHashTag()
                                        }
                                    }}
                                />
                                <UIButton style={{ padding: '0px' }} icon="plus" onMouseDown={handleAddHashTag} />
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