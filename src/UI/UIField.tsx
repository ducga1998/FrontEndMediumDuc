import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import * as React from "react";
interface IUIField {
    titleField?: String;
    help?: Boolean;
    label?: String;
    onChange: (e: any) => any
    placeholder?: String
    value?: String | any
    type?: String
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
        const { help, titleField, label, onChange, placeholder, value, type } = this.props
        return (
            <form>
                <FormGroup
                    // controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    {label ? <ControlLabel>{label}</ControlLabel> : null}
                    <h2>{titleField}</h2>
                    <FormControl
                        type={type ? `${type}` : 'text'}
                        value={value}
                        placeholder={`${placeholder}`}
                        onChange={(e: any) => {
                            onChange(e.target.value)
                        }}
                    />
                    <FormControl.Feedback />
                    {help ? <HelpBlock>Validation is based on string length.</HelpBlock> : null}
                </FormGroup>
            </form>
        );
    }
}