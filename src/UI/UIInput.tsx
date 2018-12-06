
import * as React from 'react'
import styled from 'styled-components';
interface IUIInput {
    onChange: (e: any) => any,
    value?: string | number,
    size?: 'xs' | 'ls' | 'sm',
    style?: any,
    placeholder?: string,
    type?: 'uncontrol' | 'control',
    refInput?: any,
    onKeyPress?: (e: any) => any

}
export default class UIInput extends React.Component<IUIInput> {
    inputRef: any = React.createRef()
    componentDidUpdate() {

    }
    render() {
        const { value, onChange, style, placeholder, type, refInput, onKeyPress } = this.props
        if (type && type === 'uncontrol') {
            return <$Input
                placeholder={placeholder || undefined}
                style={style}
                ref={this.inputRef}
            />
        }
        return <$Input
            onKeyPress={onKeyPress}
            ref={refInput}
            placeholder={placeholder || undefined}
            style={style}
            onChange={e => { onChange(e.target.value) }}
            value={value}
        />

    }
}
const $Input = styled.input`
    border: none;
    padding: 10px;
    width: 400px;
    border-radius: 2px;
    background-color: #d9edf4;
    color: #3e4141;
    font-size: 20px;
    &:focus {

    -webkit-transition: .3s;
    transition: .3s;
    outline: none;
    
    background-color: #97cddf;
    color: #454948;
   
    font-size: 20px;
  
   
   
    transition: .3s;

    }
`
