import {FormGroup, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import * as React from "react";

interface IUIFieldProps {
    titleField?: string;
    help?: boolean;
    label?: string;
    onChange: (value: string | any) => void;
    placeholder?: string;
    value?: string | any;
    type?: string;
    minLength?: number;
    maxLength?: number;
}

export class UIField extends React.Component<IUIFieldProps, any> {
    static defaultProps = {
        type: 'text'
    };

    getValidationState() {
        const length = 10;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    render() {
        const {help, titleField, label, onChange, placeholder, value, type, minLength, maxLength} = this.props;
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
                        minLength={minLength || undefined}
                        maxLength={maxLength || undefined}
                    />
                    <FormControl.Feedback/>
                    {help ? <HelpBlock>Validation is based on string length.</HelpBlock> : null}
                </FormGroup>
            </form>
        );
    }
}