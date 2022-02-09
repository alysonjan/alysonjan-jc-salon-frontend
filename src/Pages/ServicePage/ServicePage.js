import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Layout/Navbar'
import { Button } from '../../Components/Shared/Button'
import { TableContainer } from '../../Components/Shared/Table'
import ServiceTable from '../../Components/Tables/ServiceTable'
import { MainPageContainer } from '../../Components/Shared/MainPageContainer'
import dayjs from 'dayjs'
import { Input, Option, Select } from '../../Components/Shared/SelectOption'
import { Title, TitleContainer } from '../../Components/Shared/Title'
import { Form, FormContainer } from '../../Components/Shared/Form'
import { DateContainer } from '../../Components/Shared/Date'
import axiosInstance from '../../Helpers/Axios'
import { SuccessMsg, SuccessMsgContainer } from '../../Components/Shared/SuccessMessage'

const ServicePage = () => {
    var date = dayjs().format('dddd, MMMM DD, YYYY');

    const [data, setData] = useState([]);
    const [messageBox, setMessageBox] = useState('');
    const [alert, setAlert] = useState(true);

    const [formData, setFormData] = useState({
        servicetype:'',
        employeename:'',
        amount:'',
    });

    const { servicetype, employeename, amount  } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const getEmployee = async () => {
        try {
            await axiosInstance.get('/api/employee').then(res => {
                if (res.status === 200) setData(res.data)
            })
        } catch (err) { 
            console.error(err.message)
        }
    }
    useEffect(() => {
        getEmployee();
    },[])
    
    const onSubmitHandler = async(e) => {
        e.preventDefault()
        try {
            axiosInstance.post('/api/service/add',formData).then(res => {
                if (res.status === 200) {
                    setMessageBox(res.data)
                    setTimeout(() => {
                        setAlert(false);
                    }, 50000);
                    window.location.reload(false);
                }
            })
            axiosInstance.post('/api/employee-commission/add',formData)
            axiosInstance.post('/api/netsale/add',formData )
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
                <Title>Service Rendered</Title>
            </TitleContainer>
            {alert &&
            <SuccessMsgContainer>
                <SuccessMsg>{messageBox}</SuccessMsg>
            </SuccessMsgContainer>
            }
            <FormContainer>
                <Form onSubmit={onSubmitHandler}>
                    <Select name='servicetype' value={servicetype} onChange={e => onChange(e)} required>
                        <Option value='' disabled>Choose service</Option>
                        <Option value='Nail/hand'>Nail/hand</Option>
                        <Option value='Nail/color'>Nail/color</Option>
                        <Option value='Manicure + pedicure'>Manicure+pedicure</Option>
                        <Option value='Haircut'>Haircut</Option>
                        <Option value='Hair Developer'>Hair Developer</Option>
                        <Option value='Haircolor + haircut'>Haircolor + haircut</Option>
                        <Option value='Haircolor solo'>Haircolor solo</Option>
                        <Option value='Haircolor with rebond'>Haircolor with rebond</Option>
                        <Option value='Haircolor + brazilian'>Haircolor + brazilian</Option>
                        <Option value='Hair Fusion'>Hair Fusion</Option>
                        <Option value='Hair Towel'>Hair Towel</Option>
                        <Option value='Rebond solo'>Rebond solo</Option>
                        <Option value='Footspa pack a (w/ manicure/pedicure)'>Footspa pack a (w/ manicure/pedicure)</Option>
                        <Option value='Footspa pack b(w/ manicure, pedicure)'>Footspa pack b(w/ manicure, pedicure)</Option>
                        <Option value='Footspa solo'>Footspa solo</Option>
                        <Option value='Foot Towel'>Foot Towel</Option>
                        <Option value='Others'>Others</Option>
                    </Select>
                    
                    <Select name='employeename' value={employeename} onChange={e => onChange(e)} required>
                    <Option value='' disabled>employee name</Option>
                    {data.map((val) => {
                        return (
                            <Option key={val._id} value={val.fullname}>{val.fullname}</Option>
                        )
                    })}
                    </Select>

                    <Input placeholder='amount' type='Number' name='amount' value={amount} onChange={e => onChange(e)} required />

                    <Button type="submit" value="submit" fontSize="1rem">submit</Button>
                </Form>
            </FormContainer>
            <TableContainer>
                <DateContainer>{date}</DateContainer>
                <ServiceTable />
            </TableContainer>
        </MainPageContainer>
    )
}

export default ServicePage
