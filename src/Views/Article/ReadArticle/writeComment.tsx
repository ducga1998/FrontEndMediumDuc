
import * as React from 'react';
// import { addComment, getAllCommentinArtcileCurrent } from '../../../API/commentAPI';
import userContainer from '../../../Container/userContainer';
import { notificationSocket } from '../../../socketClient/socket';
import FormComment from './FormComment';

interface IWriteComment {
    idUser: string
}
export default class WriteComment extends React.Component<IWriteComment> {
    async componentDidMount() {
        notificationSocket.emit('join', this.props.idUser)
    }
    componentWillUnmount() {
        if (this.props.idUser !== userContainer.state.dataUser.idUser) {
            notificationSocket.emit('leave', this.props.idUser)
        }
    }
    render() {
        return <FormComment />
    }
}


