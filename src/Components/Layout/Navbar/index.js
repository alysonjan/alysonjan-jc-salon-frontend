import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { MenuContainer,LogoutButton, Nav, NavbarContainer, NavItem, NavLinks, NavMenu, UserIcon, UserIconContainer, NavLogo } from './Navbar.Styles';
import { FaUserCircle } from 'react-icons/fa';
import Routes from '../../../Constants/Route'
import UserRoles from '../../../Constants/UserRoles'
import { useHistory } from 'react-router-dom';
import { UserRoleContext } from '../../../Helpers/UserRoleProvider';

const { SERVICE, HAIRPRODUCTS, DASHBOARD, ADMINPRODUCTS, HAIRCOLOR, EMPLOYEES, COMMISSION, SERVICEHISTORY, USERACCOUNT } = Routes
const { EMPLOYEE, ADMIN} = UserRoles

const Navbar = () => {
    const history = useHistory()
    const { userRole } = useContext(UserRoleContext)
    const [active, setActive] = useState(false);

    const onActive = () => {
        setActive((prevState) => !prevState)
    }

    const logoutPopoverRef = useRef();

    const mousePress = useCallback((e) => {
        if (logoutPopoverRef.current && !logoutPopoverRef.current.contains(e.target)) {
            setActive(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", mousePress);
        return () => document.removeEventListener("mousedown", mousePress);
    }, [mousePress]);

    const logoutHandler = (e) => {
        e.preventDefault()
        sessionStorage.clear()
        window.location.reload(false);
    }
    const userAccountHandler = () => {
        history.push(USERACCOUNT)
    }
        return (
            <>
            <Nav>
                <NavbarContainer>
                        <NavLogo>MY SALON</NavLogo>
                    <NavMenu>
                        {userRole === EMPLOYEE && 
                        <>
                        <NavItem>
                            <NavLinks to={SERVICE}>Service</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={HAIRPRODUCTS}>Hair Color</NavLinks>
                       </NavItem>
                        </>
                        }
                        {userRole === ADMIN && 
                        <>
                        <NavItem>
                            <NavLinks to={DASHBOARD}>Dashboard</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={ADMINPRODUCTS}>Products</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={HAIRCOLOR}>Hair Color</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={EMPLOYEES}>Employees</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={COMMISSION}>Commission</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to={SERVICEHISTORY}>Service History</NavLinks>
                        </NavItem>
                        </>
                        }
                    </NavMenu>
                    <UserIconContainer>
                        <UserIcon onClick={() => onActive()}>
                            <FaUserCircle/>
                        </UserIcon>
                        <MenuContainer active={active} ref={logoutPopoverRef}>
                            {userRole === ADMIN &&
                                <>
                                <LogoutButton onClick={userAccountHandler}>User Accounts</LogoutButton>
                                <br />
                                <br />
                                </>
                            }
                            <LogoutButton onClick={logoutHandler}>Log out</LogoutButton>

                        </MenuContainer>
                    </UserIconContainer>
                </NavbarContainer>
            </Nav>
        </>
        )
    }

export default Navbar;
