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
    width: ${({ width })=> width};
    filter: drop-shadow(4px 12px 40px rgba(0, 0, 0, 0.15));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 10;
    background: rgb(25,2,40);
    background: linear-gradient(90deg, rgba(25,2,40,1) 0%, rgba(2,0,36,1) 0%, rgba(40,3,42,1) 44%, rgba(121,9,56,1) 100%, rgba(0,212,255,1) 100%);
`
export const AuthCardTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
    color:#ffff;
    margin-top: 1.875rem;
`;

export const AuthCardSubtitle = styled.div`
    font-size: 1.125rem;
    font-weight: 500;
    margin-top: 0.313rem;
    margin-bottom: 3.438rem;
    color:#ffff;
`;

export const AuthContentForm = styled.form`
    text-align: center;
    width: 17.188rem;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
`;

export const AuthCardFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    padding: 1.375rem 0;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    font-weight: 300;
    color:#ffff;
`;

export const AuthCardFooterEmail = styled.div`
    color:#aacff8;
`;


export const AuthPagesErrorMsgContainer = styled.div`
    margin-top: ${({ marginTop }) => marginTop};
    margin-bottom: ${({ marginBottom }) => marginBottom};
`;

export const ErrorMsg = styled.small`
    color: #ffffff;
`;