import React, { useState } from 'react';
import Navbar from '../../../Components/Layout/Navbar';
import EmployeeTable from '../../../Components/Tables/Admin/EmployeeTable'
import { Button } from '../../../Components/Shared/Button';
import { MainPageContainer } from '../../../Components/Shared/MainPageContainer';
import { TableContainer } from '../../../Components/Shared/Table';
import Spacer from "../../../Components/Shared/Spacer";
import { Form, FormContainer } from '../../../Components/Shared/Form';
import { StyledInput } from '../../../Components/Shared/StyledInput';
import axiosInstance from '../../../Helpers/Axios';
import { SuccessMsg, SuccessMsgContainer } from '../../../Components/Shared/SuccessMessage';

const Employee = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        datestarted: '',
        position: '',
        dayoff: '',
    });
    const [messageBox, setMessageBox] = useState('');
    const [alert, setAlert] = useState(true);

    const { fullname, datestarted, position, dayoff } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/api/employee/add', formData).then(res => {
                if (res.status === 200)
                setMessageBox(res.data)
                setTimeout(() => {
                    setAlert(false);
                }, 50000);

                window.location.reload(false);
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
            <Spacer size="3.75rem" />
            {alert &&
            <SuccessMsgContainer>
                <SuccessMsg>{messageBox}</SuccessMsg>
            </SuccessMsgContainer>
            }
            <FormContainer>
                <Form onSubmit={onSubmitHandler}>
                    <StyledInput required placeholder='fullname' marginRight='10px' name='fullname' value={fullname} onChange={e => onChange(e)} />
                    <StyledInput required placeholder='date started' marginRight='10px' type='date' name='datestarted' value={datestarted} onChange={e => onChange(e)} />
                    <StyledInput required placeholder='position' marginRight='10px' name='position' value={position} onChange={e => onChange(e)} />
                    <StyledInput required placeholder='day-off' marginRight='10px' name='dayoff' value={dayoff} onChange={e => onChange(e)} />
                    <Button type="submit" value="submit" fontSize="1rem" height="2.15rem">submit</Button>
                </Form>
            </FormContainer>

            <TableContainer>
                <EmployeeTable/>
            </TableContainer>
        </MainPageContainer>
    )
};

export default Employee;
