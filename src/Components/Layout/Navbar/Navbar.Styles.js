import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';


export const Nav = styled.nav`
    background: ${({
        theme: {
            colors: { PRIMARY_1 },
        },
    })=> PRIMARY_1};
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`
export const NavLogo = styled.div`
    color: #fafafa;
    justify-self:flex-start;
    cursor: pointer;
    font-size: 2rem;
    font-family: 'Lora', serif;
    display:flex;
    align-items:center;
    margin-left:24px;
    font-weight:bold;
    text-decoration:none;

    @media screen and (max-width: 1024px) {
        font-size: 1.25rem;
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
`


export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;
`

export const NavItem = styled.li`
    height: 80px;
`

export const NavLinks = styled(LinkRouter)`
    color: #fff;
    display:flex;
    font-size: 1.25rem;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    @media screen and (max-width: 1024px) {
        font-size: 1rem;
        position: relative;
        right: 70%;
    }

    @media screen and (max-width: 768px) {
        font-size: 0.80rem;
        position: relative;
        right: 5%;
    }

`;

export const UserIconContainer = styled.div`
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 35%);


`

export const UserIcon = styled.div`
    font-size: 2.25rem;
    cursor: pointer;
    color: #fff;

    @media screen and (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const MenuContainer = styled.div`
    position: absolute;
    top: ${({ active }) => (active ? "50px" : "25px")};
    left: -125px;
    padding: 20px 20px;
    background: #dddbdb;
    text-align: center;
    width: 180px;
    box-sizing: 0 5px 25px rgba(0,0,0,0.1);
    border-radius: 10px;
    transition: all 0.5s ease;
    opacity: ${({ active }) => (active ? "1" : "0")};
    visibility: ${({ active }) => (active ? "visible" : "hidden")};

    &:before {
    content: '';
    position: absolute;
    top: -5px;
    right: 28px;
    width: 20px;
    height: 20px;
    background: #dddbdb;
    transform:rotate(45deg)
}

`

export const LogoutButton = styled.button`
    background: none!important;
    border: none;
    padding: 0!important;
    font-size: 1.10rem;
    color: #069;
    cursor: pointer;
`
