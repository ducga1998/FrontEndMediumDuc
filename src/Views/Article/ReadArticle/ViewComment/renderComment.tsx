import FormComment from "./FormComment";
import { NormalComment, WrapperReply } from "./Comment";
import * as React from 'react'
export function renderComment({ normalComment, context, replyComments }) {
    const [open, setOpen] = React.useState(false);
    const [replys, setReplys] = React.useState(replyComments ? replyComments : []);
    const { user: { avatarLink, name } } = context;
    const { createdAt, content, idComment } = normalComment;
    function addCommentReply(reply) {
        replys.push(reply);
        setReplys(replys);
    }
    return <>
        <NormalComment {...{ idComment, avatarLink, content, createdAt, replys, setOpen, open, name }} />
        {open && <WrapperReply>
            {replys.length > 0 ? replys.map(item => <NormalComment {...{ ...item, ...{ avatarLink, setOpen, open, name } }} />)
                : null}
            <FormComment onChange={addCommentReply} idReply={idComment} />
        </WrapperReply>}
    </>;
}