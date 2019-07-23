import * as React from 'react'
import Select from 'react-select'
interface IUISelect {
    options: { value: string, label: string }[],
    value: { value: string, label: string }
    onChange: (e: any) => any
}
export default function UISelect({ value, onChange, options }: IUISelect) {
    const [valueSelect, setValue] = React.useState(value)
    React.useEffect(() => {
        setValue(value)
        return () => {

        }
    }, [value])
    return <Select isSearchable={false} options={options} onChange={onChange} value={valueSelect} />
}