import styled from 'styled-components';

export const Button = styled.button`
    cursor: pointer;
    padding: 0.75rem;
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    line-height: 1.375rem;
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    margin-left: ${({ marginLeft }) => marginLeft};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: ${({
        theme: {
            colors: { WHITE },
        },
    })=> WHITE};
    background: ${({
        theme: {
            colors: { PRIMARY_1 },
        },
    })=> PRIMARY_1};
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: 0s;
`;

