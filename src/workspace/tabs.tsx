import * as React from 'react'
import { StyledOutlineButton } from '../Components/styled/button';
import UIButton from '../Components/UI/UIButton';
import styled from 'styled-components';
import { FlexRow } from '../Components/styled/base';
import { Nav } from '../Components/styled/nav';
interface ITabs {
    items: { name: string, component: any }[]
}
export default class Tabs extends React.Component<ITabs>{
    state = {
        active: 0
    }
    handleMouseDown = (active) => {
        this.setState({ active })
    }
    render() {
        const { active } = this.state
        const { items } = this.props
        if (items.length <= 0) {
            return <UIButton isLoading />
        }
        return <div className="tabs-element">
            <$Nav>{items.map((itemNav, key) => <NavButton borderColor="" onMouseDown={() => this.handleMouseDown(key)}>{itemNav.name}</NavButton>)}</$Nav>
            <FlexRow>{items.map((tab, key) => <Tab open={active === key} >{tab.component}</Tab>)}</FlexRow>
        </div>
    }
}
const NavButton = styled(StyledOutlineButton)`
    box-shadow: none;
    border-bottom: none;
    border-radius: 4px 4px 0px 0px;
`
const $Nav = styled(Nav)`
    justify-content : flex-start;
    background : white;
    ${NavButton}{
        border : none;
    }
    box-shadow : none;
`

const Tab = styled.div`
    display : ${(props: { open?: boolean }) => props.open ? 'block' : 'none'}
`