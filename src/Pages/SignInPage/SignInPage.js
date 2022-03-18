import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Helpers/AuthProvider'
import { UserRoleContext } from '../../Helpers/UserRoleProvider';

import {
    MainAuthPageContainer,
    AuthCardContainer,
    AuthCardTitle,
    AuthCardSubtitle,
    AuthContentForm,
    AuthCardFooter,
    AuthCardFooterEmail,
    AuthPagesErrorMsgContainer,
    ErrorMsg
} from './Styles'
import { LoginStyledInput } from '../../Components/Shared/StyledInput'
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
            <AuthCardContainer width="100%">
                <AuthCardTitle>SALON SYSTEM</AuthCardTitle>
                <AuthCardSubtitle>Login to get access to your files</AuthCardSubtitle>
                <AuthContentForm onSubmit={onLoginHandler} >
                <LoginStyledInput
                    type="text"
                    name = "username"
                    placeholder="username"
                    value={username}
                    onChange={e => onChange(e)}
                    required
                />
                <Spacer size="1.375rem" />
                <LoginStyledInput
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
                <Button type="submit" value="LOGIN" fontSize="1.125rem" width="250px" height="40px" fontWeight="300">LOGIN</Button>
                <Spacer size="0.75rem" />
                </AuthContentForm>
                <AuthCardFooter>
                    Contact us&nbsp;<AuthCardFooterEmail>alysonjan@gmail.com</AuthCardFooterEmail>
                </AuthCardFooter> 
            </AuthCardContainer>
        </MainAuthPageContainer>
    )
}
export default SignInPage
