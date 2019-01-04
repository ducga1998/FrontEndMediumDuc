import * as React from 'react'
import UIFieldAlgin from './UIFieldAlgin';
import UIWidget from './UIWidget';
import UIButton from './UIButton';

interface IUIConfirm {
    content: string,
    customBtnCancel?: (e: any) => any,
    customBtnOk?: (e: any) => any,
    onMouseDownCancel: () => any
    onMouseDownConfirm: () => any
}
let instance: any
export default class UIConfirm extends React.Component<IUIConfirm> {
    state = {
        open: false,
        content : ''
    }
    componentDidMount() {
        console.log('component did mouny =)) ')
        instance = this
    }
    handleMouseDownCancel = () => {
        this.setState({ open: false })
        this.props.onMouseDownCancel();
    }
    handleMouseDownConfirm = () => {
        
    }
    render() {
        const {  customBtnOk, customBtnCancel } = this.props
        return <UIWidget>
            <UIFieldAlgin horizontal>
            {this}.state
                <UIFieldAlgin>
                    <UIButton onMouseDown={this.handleMouseDownConfirm}>{customBtnOk || 'Confirm'}</UIButton>
                    <UIButton onMouseDown={this.handleMouseDownCancel} >{customBtnCancel || 'Cancel'}</UIButton>
                </UIFieldAlgin>
            </UIFieldAlgin>

        </UIWidget>
    }
}


// if oly use UICofirm => Editer 
// export only confirm =>
// I am will call function cofirm => open 
export const confirm = (content) => {
    instance.setState({ open: true , content })
}  
