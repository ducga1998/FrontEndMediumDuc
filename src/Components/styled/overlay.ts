import styled from "styled-components";

export const OverLay = styled.div<{ open?: Boolean }>`
    top: 0px;
    left: 0px;
    z-index : 999999;
	box-shadow: none;
	overflow: visible !important;
    position: absolute;
    width : 100%;
    height : 100%;
    display  : ${(props: any) => {
        const { open } = props;
        if (open) {
            return 'flex';
        }
        return 'none';
    }};
    align-items : center;
    justify-content : center;
    background: #0000005e;
`