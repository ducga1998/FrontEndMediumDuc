import * as React from 'react';
import { allArticleContainer } from '../Container/articleContainer';

import { SubscribeOne } from 'unstated-x';
import styled from 'styled-components';
import UIButton from '../Components/UI/UIButton';
import { Section } from '../Components/styled/nav';



function renderButton() {
    const { count, first } = allArticleContainer.state
    const countButton = (count % first === 0 ? Math.round(count / first) : (Math.round(count / first) + 1))
    async function handleOnClick(e) {
        const offset = parseInt(e.target.getAttribute('data-keyButton'))
        // 0  -4  |5 - 9 | 10  - 14 | 15  -19
        // 0         1        2
        // offset   * (5 - 1) + 2 
        //  (offset - 1) * first
        await allArticleContainer.setState({ offset })
        allArticleContainer.fetchData(first, offset * first)

    }
    console.log('countButton', countButton, count % first)

    return <Section>{Array(countButton).fill(1).map((item, key) => {
        return <SubscribeOne to={allArticleContainer} bind={['offset']} >
            {
                () => {

                    const { offset } = allArticleContainer.state
                    console.log(offset, key)
                    return <UIButton style={{ margin: '2px' }} active={key === offset} keyButton={key} onMouseDown={handleOnClick}>{key + 1}</ UIButton >
                }
            }
        </SubscribeOne>
    })}
    </Section>

}
export default function Pagination(props) {

    return <Flex>
        {renderButton()}
    </Flex>
}
const Flex = styled.div`
    text-align : center;
    margin-bottom : 20px;
    /* a {
        padding : 5px;
    } */
`