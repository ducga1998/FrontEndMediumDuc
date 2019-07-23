import * as React from "react";
import { H2 } from "Components/styled/base";
import Comment from './Comment'
import { ICommentType } from "../../../../API/commentAPI";

const ListCommnentView = ({ allComment }: { allComment: ICommentType[] }) => {

    return allComment.length > 0 ? <>
        {
            allComment.map((item: any, key) => {
                const { idReply, idComment } = item
                let commentReplys = [] as ICommentType[]
                // split data : replyComment  and NormalComment
                if (!idReply) {
                    // loop all comment, find idComment  === idReply 
                    commentReplys = allComment.filter((comment: ICommentType) => {
                        if (comment.idReply) {
                            return comment.idReply === item.idComment
                        }
                    })
                    return <Comment key={idComment} normalComment={item} replyComments={commentReplys} />
                }
            })
        }
    </> :
        <H2 style={{ textAlign: 'center', color: 'gray' }}>  NO  Comment,  : ))) cmt vào cho vui đi thằng ngu</H2>
}
export default ListCommnentView
