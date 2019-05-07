import * as React  from 'react'
import styled from 'styled-components';
import { FlexCol, FlexRow } from '../styled/base';
export default class UILayout extends React.Component<any> {

    static Row () {
        return <FlexRow />
    }

    static Column() {
        return <FlexCol />
    }

    render(){
        return null
    }
}
const layout = styled.div`

`