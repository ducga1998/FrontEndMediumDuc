import { DropdownButton, MenuItem } from "react-bootstrap";
import * as React from "react";

export default function DropDown({ title }: any) {
    return <DropdownButton
        bsStyle={title.toLowerCase()}
        title={title}
        id={`dropdown-basic-2`}
    >
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3" active>
            Active Item
    </MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
}