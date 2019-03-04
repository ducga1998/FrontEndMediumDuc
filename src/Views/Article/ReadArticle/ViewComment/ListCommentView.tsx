import * as React from "react";
import { H2 } from "src/Components/styled/base";
import Comment from './Comment'

const ListCommnentView  =  ({ allComments }) => {
    
    return allComments.length > 0 ? allComments.map((item: any, key) => {
        const { idReply , idComment } = item
        let dataReply = []
        // split data : replyComment  and NormalComment
        if (!idReply) {
            // loop all comment, find idComment  === idReply 
            dataReply = allComments.filter((comment: any) => {
                if (comment.idReply) {
                    return comment.idReply === item.idComment
                }
            })
            return <Comment key={idComment} normalComment={item} replyComments={dataReply} />
        }        
    }) :
        <H2 style={{ textAlign: 'center', color: 'gray' }}>  NO  Comment,  : ))) cmt vào cho vui đi thằng ngu</H2>
}
export default ListCommnentView
