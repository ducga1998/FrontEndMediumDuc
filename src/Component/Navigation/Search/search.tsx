import * as React from 'react'
import UIInput from '../../../UI/UIInput';
import OverLaySearch from './OverLaySearch';
export default class Search extends React.Component {
    state = {
        value: '',
        isFocus: false
    }
    handleOnChange = (e) => {

    }

    render() {
        const { isFocus } = this.state
        return <div>
            <UIInput onChange={this.handleOnChange} />
            {isFocus ? <OverLaySearch /> : null}
        </div>
    }
}