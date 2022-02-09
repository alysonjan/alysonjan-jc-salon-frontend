import styled from 'styled-components';

export const MainAuthPageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    background: ${({
        theme: {
            colors: { WHITE_2 },
        },
    })=> WHITE_2};
`;

export const AuthCardContainer = styled.div`
    border-radius: 5px;
    width: ${({ width })=> width};
    filter: drop-shadow(4px 12px 40px rgba(0, 0, 0, 0.15));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 10;
    background: ${({
        theme: {
            colors: { WHITE_2 },
        },
    })=> WHITE_2};
`;

export const AuthCardTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
    color: ${({
    theme: {
        colors: { PRIMARY_1 },
    },
    }) => PRIMARY_1};
    margin-top: 1.875rem;
`;

export const AuthCardSubtitle = styled.div`
    font-size: 1.125rem;
    font-weight: 500;
    margin-top: 0.313rem;
    margin-bottom: 3.438rem;
    color: ${({
        theme: {
        colors: { PRIMARY_1 },
        },
    }) => PRIMARY_1};
`;

export const AuthContentForm = styled.form`
    text-align: center;
    width: 17.188rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
`;

export const AuthCardFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    background-color: #E5E5E5;
    border-top: 1px solid #ddd;
    padding: 1.375rem 0;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    font-weight: 300;
`;

export const AuthCardFooterEmail = styled.div`
    text-decoration: underline;
    font-weight: 200;
`;

export const AuthCardClipArtContainer = styled.div`
    width: 100%;
    display: flex;
`;

export const AuthPagesErrorMsgContainer = styled.div`
    margin-top: ${({ marginTop }) => marginTop};
    margin-bottom: ${({ marginBottom }) => marginBottom};
`;

export const ErrorMsg = styled.small`
    color: red;
`;