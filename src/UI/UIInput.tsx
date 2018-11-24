
import * as React from 'react'
import styled from 'styled-components';
interface IUIInput {
    onChange: (e: any) => any,
    value: string | number,
    size?: 'xs' | 'ls' | 'sm',
}
export default class UIInput extends React.Component<IUIInput> {

    render() {
        const { value, onChange } = this.props
        return <$Input
            onChange={e => { onChange(e.target.value) }}
            value={value}
        />

    }
}
const $Input = styled.input`
    padding :10px;
    width : 100px;
    &:focus {
        transition: .3s;
        outline : none;
        background-color : gray;
        color : black;
    }
`
