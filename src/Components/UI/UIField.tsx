import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import * as React from "react";
import UIInput from "./UIInput";
import { Label, H2, FlexCol } from "../styled/base";
interface IUIField {
    titleField?: String;
    help?: Boolean;
    label?: String;
    onChange: (e: any) => any
    placeholder?: String
    value?: String | any
    type?: String
    minLength?: number
    maxLength?: number
}
export default class UIField extends React.Component<IUIField, any> {
    static defaultProps = {
        type: 'text'
    }
    getValidationState() {
        const length = 10;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }
    render() {
        const { help, titleField, label, onChange, placeholder, value, type, minLength, maxLength } = this.props
        return (
            
                <FlexCol>
                {label ? <Label>{label}</Label> : null}
                <H2>{titleField}</H2>
                <UIInput
                    value={value}
                    placeholder={`${placeholder}`}
                    onChange={(value:string) => {
                        onChange(value)
                    }}
                />
          </FlexCol>
        );
    }
}