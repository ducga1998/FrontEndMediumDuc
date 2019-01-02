import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import * as React from "react";
import UIInput from "./UIInput";
import { Label, H2, FlexCol , FlexRow } from "../styled/base";
interface IUIFieldAlgin {
    vectical ?:boolean
    horizontal?: boolean
    flex ?:number ,
    children : any
    style  ?: any
}
export default class UIFieldAlgin extends React.Component<IUIFieldAlgin> {
    // default render UIField  is vectical
    render() {
        const { horizontal , flex, children , style} = this.props
        
      const styleUIField = {...{flex : flex?`${flex}`:'none' } , ...style}
        console.log('styleUIField',styleUIField)
       if(horizontal){  
           return <FlexCol style ={styleUIField}>{children}</FlexCol>
       }
       return  <FlexRow style ={styleUIField}>{children}</FlexRow>
       
    }
       
       
}