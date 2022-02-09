import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Helpers/AuthProvider'
import { UserRoleContext } from '../../Helpers/UserRoleProvider';

import LoginClipArt from '../../Assets/image_1.png';
import Logo from '../../Assets/logo.PNG';
import {
    MainAuthPageContainer,
    AuthCardContainer,
    AuthCardTitle,
    AuthCardSubtitle,
    AuthContentForm,
    AuthCardFooter,
    AuthCardFooterEmail,
    AuthCardClipArtContainer,
    AuthPagesErrorMsgContainer,
    ErrorMsg
} from './Styles'
import {StyledInput} from '../../Components/Shared/StyledInput'
import Spacer from '../../Components/Shared/Spacer'
import { Button } from '../../Components/Shared/Button'
import { saveItem } from '../../Utils/sessionStorage';
import axiosInstance from '../../Helpers/Axios';
import LSContants from '../../Constants/SessionStorage';
import { useHistory } from 'react-router-dom';

import Routes from '../../Constants/Route';

const { TOKEN } = LSContants

const { SERVICE } = Routes;

const SignInPage = () => {
    const history = useHistory()

    const { setIsAuthenticated } = useContext(AuthContext);
    const { setUserRole } = useContext(UserRoleContext)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errMsg, setErrMsg] = useState('')

    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onLoginHandler = async e => {
        e.preventDefault();
        axiosInstance.post('/api/login',formData).then(res => {
            const token = res.data.response[0].token
            const text = token.split(' ')
            const userrole = text[1]

            if (res.status === 200 ) {
                setIsAuthenticated(token)
                setUserRole(userrole)
                history.push(SERVICE)
                saveItem(TOKEN,token)
                window.location.reload(false);
            }
        }).catch(err => {
            const errors = err.response.data.errors;
            if (errors) errors.forEach(error => {
                setErrMsg(error.msg)
            });
        })
    }
    return (
        <MainAuthPageContainer>
            <AuthCardContainer width="75%">
                <img src={Logo} alt="" width="20%" />
                <AuthCardTitle>LOGIN</AuthCardTitle>
                <AuthCardSubtitle>To get access to your files</AuthCardSubtitle>
                <AuthContentForm onSubmit={onLoginHandler} >
                <StyledInput
                    type="text"
                    name = "username"
                    placeholder="username"
                    value={username}
                    onChange={e => onChange(e)}
                    required
                />
                <Spacer size="1.375rem" />
                <StyledInput
                    required
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={e => onChange(e)}
                />
                <Spacer size="2.25rem" />
                <AuthPagesErrorMsgContainer>
                    <ErrorMsg>{errMsg}</ErrorMsg>
                </AuthPagesErrorMsgContainer>
                <Button type="submit" value="LOGIN" fontSize="1.125rem" width="278px" fontWeight="600">LOGIN</Button>
                <Spacer size="0.75rem" />
                </AuthContentForm>
                <AuthCardFooter>
                    Contact us&nbsp;<AuthCardFooterEmail>dualipa@gmail.com</AuthCardFooterEmail>
                </AuthCardFooter> 
            </AuthCardContainer>
                <AuthCardClipArtContainer>
                <img src={LoginClipArt} alt="" width="100%" />
                </AuthCardClipArtContainer>
        </MainAuthPageContainer>
    )
}
export default SignInPage
