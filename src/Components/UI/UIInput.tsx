
import * as React from 'react'
import { Input } from '../styled/base';
import styled from 'styled-components';


interface IUIInput {
    onChange: (e: any) => any,
    value?: string | number,
    size?: 'xs' | 'ls' | 'sm',
    style?: any,
    placeholder?: string,
    type?: string
    refInput?: any,
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLElement>) => void
    autoFocus?: boolean

}
export default class UIInput extends React.Component<IUIInput> {
    inputRef :React.RefObject<HTMLInputElement> = React.createRef()
    componentDidUpdate() {

    }
    
    render() {
        const { value, onChange, style, placeholder, type, refInput, onKeyPress, onFocus, autoFocus } = this.props
        return <$Input
            type={type || undefined}
            autoFocus={autoFocus || undefined}
            onKeyPress={onKeyPress}
            ref={  refInput }
            placeholder={placeholder || undefined}
            style={style}
            onChange={e => {
                onChange(e.target.value)
            }}
            onFocus={onFocus}
            value={value}
        />
    }
}

const $Input = styled(Input)`
width : auto;
`