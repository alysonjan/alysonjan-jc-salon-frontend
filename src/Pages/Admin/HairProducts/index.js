import React, { useState } from 'react';
import Navbar from '../../../Components/Layout/Navbar';
import HairColorTable from '../../../Components/Tables/Admin/HairColorTable'
import { Button } from '../../../Components/Shared/Button';
import { MainPageContainer } from '../../../Components/Shared/MainPageContainer';
import { TableContainer } from '../../../Components/Shared/Table';
import { Title, TitleContainer } from '../../../Components/Shared/Title';
import { Form, FormContainer } from '../../../Components/Shared/Form';
import { StyledInput } from '../../../Components/Shared/StyledInput';
import axiosInstance from '../../../Helpers/Axios';
import { SuccessMsg, SuccessMsgContainer } from '../../../Components/Shared/SuccessMessage';


const HairProducts = () => {

    const [formData, setFormData] = useState({
        hairbrand: '',
        colornumber: '',
        quantity: '',
    });
    const [messageBox, setMessageBox] = useState('');
    const [alert, setAlert] = useState(true);

    const { hairbrand, colornumber, quantity  } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/api/hair-product/add', formData).then(res => {
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
            <TitleContainer>
                <Title>Hair Color</Title>
            </TitleContainer>
            {alert &&
            <SuccessMsgContainer>
                <SuccessMsg>{messageBox}</SuccessMsg>
            </SuccessMsgContainer>
            }
            <FormContainer>
                <Form onSubmit={onSubmitHandler}>
                    <StyledInput required placeholder='hair brand' marginRight='10px' name='hairbrand' value={hairbrand} onChange={e => onChange(e)} />
                    <StyledInput required placeholder='color #' marginRight='10px' name='colornumber' value={colornumber} onChange={e => onChange(e)} />
                    <StyledInput required placeholder='quantity' type='Number' marginRight='10px' name='quantity' value={quantity} onChange={e => onChange(e)} />
                    <Button type="submit" value="submit" fontSize="1rem" height="2.15rem">Add Item</Button>
                </Form>
            </FormContainer>
            <TableContainer>
                <HairColorTable/>
            </TableContainer>
        </MainPageContainer>
    )
};

export default HairProducts;
