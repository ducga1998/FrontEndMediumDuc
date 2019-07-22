
import * as React from "react";
import UIInput from "./UIInput";
import { Label, H2, FlexCol, FlexRow } from "../styled/base";
interface IUIFieldAlgin {
    vectical?: boolean
    horizontal?: boolean
    flex?: number,
    children: React.ReactNode
    style?: any
    shadow?: string
}
export default class UIFieldAlgin extends React.Component<IUIFieldAlgin> {
    // default render UIField  is vectical
    render() {
        const { horizontal, flex, children, style, shadow } = this.props

        const styleUIField = { ...{ flex: flex ? `${flex}` : 'none', boxShadow: shadow }, ...style }
        if (horizontal) {
            return <FlexCol style={styleUIField}>{children}</FlexCol>
        }
        return <FlexRow style={styleUIField}>{children}</FlexRow>

    }


}