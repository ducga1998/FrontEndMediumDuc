import * as React from 'react';
import { Button, FormControl, FormGroup, Glyphicon, ListGroup, ListGroupItem, MenuItem } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Subscribe } from 'unstated-x';
import ArticleContainer from '../../Container/articleContainer';

import uuid from 'uuid';
import articleContainer from '../../Container/articleContainer';
import UIModal from '../../Components/UI/UIModal';
import UIButton from '../../Components/UI/UIButton';
export default function ButtonArticle({ history }: any) {

    // state support UIModal 
    const [open, setOpen] = React.useState(false)
    // state support hashTag
    // const [arrHashTag, setArrHashTag] = React.useState([]) as any
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
                    const { isPublicArticle, isUpdate, idArticleNeedUpdate, arrHashTag } = container.state


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
                            title="Hash Tag" width="600px"
                            trigger={<MenuItem>Public Article</MenuItem>}>
                            {arrHashTag.length > 0 ? <Grid><ListGroup style={{ flex: '6' }}>
                                {arrHashTag.map((item, key) => {
                                    return <ListGroupItem key={key}>{item}
                                        <Button
                                            onClick={() => {
                                                const arrHasBeenDelete = arrHashTag.filter(itemHashTag => itemHashTag !== item)
                                                articleContainer.setState({ arrHashTag: arrHasBeenDelete })
                                            }}><Glyphicon glyph="remove" />
                                        </Button>
                                    </ListGroupItem>
                                })}
                            </ListGroup>
                            </Grid> : null}
                            <FormGroup style={{ display: 'flex' }}>
                                <FormControl
                                    type="text"
                                    value={nameHashTag}
                                    placeholder="Enter text"
                                    onChange={(e: any) => setNameHashTag(e.target.value)}
                                />
                                <Button onClick={handleAddHashTag}>
                                    <Glyphicon glyph="plus" />
                                </Button>
                            </FormGroup>
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

const Grid = styled.div`
    display : 'flex';
`