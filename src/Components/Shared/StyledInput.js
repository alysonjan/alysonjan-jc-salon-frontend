import styled from 'styled-components';

export const StyledInput = styled.input`
    width: 250px;
    height: 20px;
    font-size: 1.75rem;
    padding: 0.875rem;
    margin-right: ${({ marginRight }) => marginRight};
    border-radius: 5px;
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
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: 0s;
`;