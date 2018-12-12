import * as React from 'react'
import { Config } from '../../../help/config'
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define'
import { input } from '../../../UI/styled/input'
import styled from 'styled-components'
import FormComment from './FormComment'
import renderHTML from 'react-render-html'
import MediumEditer from 'medium-editor'
const CommentRely = ({ dataUserComment }) => {
    const [open, setOpen] = React.useState(false)
    const refContent = React.useRef(null)
    React.useEffect(() => {
        if (refContent.current) {
            const title = new MediumEditer(refContent.current, Config)
        }
    })
    const { userComment: { avatarLink, name }, createdAt, content } = dataUserComment
    return <>
        <div onMouseDown={() => { setOpen(!open) }} data-tooltip={`Created At : ${new Date(createdAt)}`}>
            <img className="smallAvatar" data-tooltip={name} src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} />
            <$Content  >{renderHTML(content)}</$Content>
        </div>
        {open ? <FormComment onMouseDown={() => { }} /> : null}
    </>
}
const $Content = styled(input)`
`
export default CommentRely