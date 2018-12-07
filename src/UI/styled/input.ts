import styled from "styled-components";

export const Input = styled.input`
    border: none;
    padding: 10px;
    width: 400px;
    border-radius: 2px;
    background-color: #d9edf4;
    color: #3e4141;
    font-size: 20px;
    &:focus {
    -webkit-transition: .3s;
    transition: .3s;
    outline: none;

    background-color: #97cddf;
    color: #454948;
    font-size: 20px;
    transition: .3s;

}
`