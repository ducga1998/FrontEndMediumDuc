
import * as React from 'react'
import styled from 'styled-components';
import { Input } from '../styled/input';


interface IUIInput {
    onChange: (e: any) => any,
    value?: string | number,
    size?: 'xs' | 'ls' | 'sm',
    style?: any,
    placeholder?: string,
    type?: 'uncontrol' | 'control',
    refInput?: any,
    onKeyPress?: (e: any) => any,
    onFocus?: (e: any) => any
    autoFocus?: boolean

}
export default class UIInput extends React.Component<IUIInput> {
    inputRef: any = React.createRef()
    componentDidUpdate() {

    }
    render() {
        const { value, onChange, style, placeholder, type, refInput, onKeyPress, onFocus, autoFocus } = this.props
        if (type && type === 'uncontrol') {
            return <$Input
                placeholder={placeholder || undefined}
                style={style}
                ref={this.inputRef}
            />
        }
        return <Input
            autoFocus={autoFocus || undefined}
            onKeyPress={onKeyPress}
            ref={refInput}
            placeholder={placeholder || undefined}
            style={style}
            onChange={e => { onChange(e.target.value) }}
            onFocus={onFocus}
            value={value}
        />

    }
}
const $Input = styled(Input)`
`
