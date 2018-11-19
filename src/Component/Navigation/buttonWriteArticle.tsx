import * as React from 'react';
import { Button, FormControl, FormGroup, Glyphicon, ListGroup, ListGroupItem, MenuItem } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Subscribe } from 'unstated-x';
import ArticleContainer from '../../Container/articleContainer';
import UIButton from '../../UI/UIButton';
import UIModal from '../../UI/UIModal';
export default function ButtonArticle({ history }: any) {

    const [newArticle, setNewArticle] = React.useState(false) as any
    const [open, setOpen] = React.useState(false)
    const [arrHashTag, setArrHashTag] = React.useState([]) as any
    const [nameHashTag, setNameHashTag] = React.useState('')
    const [checkPublicArticle, setCheckPublicArticle] = React.useState(true)
    const handleAddHashTag = async () => {
        if (arrHashTag.length > 6 || arrHashTag < 0) {
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
        await setArrHashTag(arrHashTag)
        await setNameHashTag('')

    }
    if (window.location.pathname === "/writearticle") {
        return <Subscribe to={[ArticleContainer]}>
            {
                (container: any) => {
                    const { isPublicArticle } = container.state
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
                            title="Hash Tag" width="600px" trigger={<MenuItem>Public Article</MenuItem>}>
                            {arrHashTag.length > 0 ? <Grid><ListGroup style={{ flex: '6' }}>
                                {arrHashTag.map((item, key) => {
                                    return <ListGroupItem key={key}>{item}<Button onClick={() => {
                                        const arrHasBeenDelete = arrHashTag.filter(itemHashTag => itemHashTag !== item)
                                        setArrHashTag(arrHasBeenDelete)
                                    }}><Glyphicon glyph="remove" /> </Button>
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
                                    <Glyphicon glyph="plus" /> </Button>
                            </FormGroup>
                            {checkPublicArticle ? <UIButton onChange={async () => {
                                const newArticle = await container.addArticle(arrHashTag)
                                await setNewArticle(newArticle)
                                if (newArticle) {
                                    toast.success('Public article success !!!!')
                                    await setOpen(false) // close modal 
                                    await setCheckPublicArticle(false) //  mode public article  =>  update article 
                                }
                                else {
                                    toast.error(":( Error , just kidding me, FUCKING CODE FOR ME")
                                }
                            }}> Public Article  </UIButton> : <UIButton onChange={async () => {
                                if (newArticle) {
                                    const { idUser } = newArticle.data.addArticle
                                    await container.updateAricle(arrHashTag, idUser)
                                    toast.success('Update aricle success !!!! ')
                                }
                            }} >Update Article</UIButton>}

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