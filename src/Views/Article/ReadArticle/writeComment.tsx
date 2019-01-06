
import * as React from 'react';
import FormComment from './FormComment';

interface IWriteComment {
    idUser: string
}
export default class WriteComment extends React.Component<IWriteComment> {
    render() {
        return <FormComment />
    }
}


