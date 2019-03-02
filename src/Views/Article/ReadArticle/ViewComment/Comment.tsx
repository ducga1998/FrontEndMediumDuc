import styled from "styled-components";
import { IMAGE_SOURCE_DEFAULT } from "src/help/define";
import FormComment from "./FormComment";
import { timeDifference } from "../../../../help/util";
import { AvatarImage } from "../../../../Components/styled/avatar";
import renderHTML from 'react-render-html';
import * as React from "react";
import { renderElement } from "src/Core/renderElement";
import { H5, H2, P, H3, FlexCol, FlexRow } from "src/Components/styled/base";
export default renderElement(
    function renderComment({ normalComment, context, relyComments }) {
        const [open, setOpen] = React.useState(false)
        const [relys, setRelys] = React.useState(relyComments ? relyComments : [])
        const { user: { avatarLink, name } } = context
        const { createdAt, content, idComment } = normalComment
        function addCommentRely(rely) {
            relys.push(rely);
            setRelys(relys)
        }
        return <>
            <NormalCommnet {...{ idComment, avatarLink, content, createdAt, relys, setOpen, open, name }} />
            {
                open && <WrapperRely>
                    {
                        relys.length > 0 ? relys.map(item => <NormalCommnet {...{ ...item, ...{ avatarLink, setOpen, open, name } }} />)
                            : null
                    }
                    <FormComment
                        onChange={addCommentRely}
                        idRely={idComment} />
                </WrapperRely>
            }
        </>
    }
)
const NormalCommnet = ({ idComment, avatarLink, content, createdAt, relys, setOpen, open, name }) => {
    return <$Comment data-id={idComment}
        onMouseDown={(event) => setOpen(!open)}>
        <AvatarImage src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} />
        <$Content>
            <FlexRow style={{ alignItems: 'center' }}>
                <H2>{name + " :"} </H2>
                <H3> {renderHTML(content)}</H3>
            </FlexRow>
            <H5>{timeDifference(new Date(), new Date(createdAt))}</H5>
        </$Content>
        {relys && relys.length > 0 && <H2>{relys.length} Rely comment</H2>}
    </$Comment>
}
const WrapperRely = styled.div`
padding  : 10px 0px 0px 40px;
`
const $Content = styled.div`
    &:focus {
        flex : 1;
        background-color: #f3f3f3;
        transition: 0.2s;
        outline: none;
        border-radius: 10px;
        color: black;
        padding: 30px;
        font-size: 20px;
    }
    & {
        flex : 10;
        margin-left: 30px;
        margin-bottom : 10px;
        transition: 0.2s;
    }
    ${H2} {
        color : ${props => props.theme.brand.default};
    }
`
const $Comment = styled.div`
    border-bottom: 1px solid  ${props => props.theme.bg.border};
    display : flex;
    padding: 30px 0px 30px 60px;
    &:hover {
        background: ${props => props.theme.bg.wash};
        transition: 0.3s;
        border-radius: 10px;
    }
` 