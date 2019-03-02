import * as React from "react";
import { H2 } from "src/Components/styled/base";
import Comment from './Comment'

const ListCommnentView  =  ({ allComments }) => {
    
    return allComments.length > 0 ? allComments.map((item: any, key) => {
        const { idRely , idComment } = item
        let dataRely = []
        // split data : relyComment  and NormalComment
        if (!idRely) {
            // loop all comment, find idComment  === idRely 
            dataRely = allComments.filter((comment: any) => {
                if (comment.idRely) {
                    return comment.idRely === item.idComment
                }
            })
            return <Comment key={idComment} normalComment={item} relyComments={dataRely} />
        }        
    }) :
        <H2 style={{ textAlign: 'center', color: 'gray' }}>  NO  Comment,  : ))) cmt vào cho vui đi thằng ngu</H2>
}
export default ListCommnentView
