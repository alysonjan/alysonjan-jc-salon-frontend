import styled from 'styled-components';


export const Select = styled.select`
    width: 250px;
    height: 115%;
    font-size: 15px;
    border-radius: 5px;
    margin: ${({ margin }) => margin};
    margin-right: ${({ marginRight }) => marginRight};
    border: solid 3px
        ${({
        theme: {
            colors: { WHITE_2 },
        },
        }) => WHITE_2};

    &:focus {
        outline: none;
        border-color: ${({
        theme: {
            colors: { PRIMARY_1 },
        },
        }) => PRIMARY_1};
    }
`
export const Option = styled.option`
    
`
export const Input = styled.input`
    border-style: solid;
    border-color: #000000;  
`
