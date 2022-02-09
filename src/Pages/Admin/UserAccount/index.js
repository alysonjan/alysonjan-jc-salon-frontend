import React from 'react'
import { useState } from 'react'
import Navbar from '../../../Components/Layout/Navbar'
import { Button } from '../../../Components/Shared/Button'
import { Form, FormContainer } from '../../../Components/Shared/Form'
import { MainPageContainer } from '../../../Components/Shared/MainPageContainer'
import { Option, Select } from '../../../Components/Shared/SelectOption'
import { StyledInput } from '../../../Components/Shared/StyledInput'
import { SuccessMsg, SuccessMsgContainer } from '../../../Components/Shared/SuccessMessage'
import { TableContainer } from '../../../Components/Shared/Table'
import { Title, TitleContainer } from '../../../Components/Shared/Title'
import UserAccountTable from '../../../Components/Tables/Admin/UserAccountTable'
import axiosInstance from '../../../Helpers/Axios'

const UserAccounts = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
  });
  const [messageBox, setMessageBox] = useState('');
  const [alert, setAlert] = useState(true);

  const { username, password, role } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    try {
      axiosInstance.post('/api/user/add',formData).then(res => {
        if (res.status === 200) {
          setMessageBox(res.data)
          setTimeout(() => {
              setAlert(false);
          }, 50000);
          window.location.reload(false);
        }
      })
      
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) errors.forEach(error => {
      setMessageBox(error.msg)
    })
  }
}

  return (
    <MainPageContainer>
      <Navbar/>
      <TitleContainer>
        <Title>User Accounts</Title>
      </TitleContainer>
      {alert &&
        <SuccessMsgContainer>
          <SuccessMsg>{messageBox}</SuccessMsg>
        </SuccessMsgContainer>
      }
      <FormContainer>
        <Form onSubmit={onSubmitHandler}>
          <StyledInput marginRight='10px' placeholder='username' name='username' value={username} onChange={e => onChange(e)} required/>
          <StyledInput marginRight='10px' placeholder='password' name='password' value={password} onChange={e => onChange(e)} required/>
          <Select name='role' value={role} onChange={e => onChange(e)} required >
            <Option value=''>choose role</Option>
            <Option value='admin'>admin</Option>
            <Option value='employee'>employee</Option>
          </Select>
          <Button marginLeft='10px' type="submit" value="submit" fontSize="1rem" height="2.15rem">Add User</Button>
        </Form>
      </FormContainer>
      <TableContainer>
        <UserAccountTable/>
      </TableContainer>
    </MainPageContainer>
  )
}

export default UserAccounts