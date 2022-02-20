import React, { useState } from 'react';
import Navbar from '../../../Components/Layout/Navbar';
import { MainPageContainer } from '../../../Components/Shared/MainPageContainer'
import Spacer from "../../../Components/Shared/Spacer";
import { Button } from '../../../Components/Shared/Button'
import { TableContainer } from '../../../Components/Shared/Table';
import ProductTable from '../../../Components/Tables/Admin/ProductTable';
import { Form, FormContainer } from '../../../Components/Shared/Form';
import { StyledInput } from '../../../Components/Shared/StyledInput'
import axiosInstance from '../../../Helpers/Axios';
import { SuccessMsg, SuccessMsgContainer } from '../../../Components/Shared/SuccessMessage';

const Products = () => {

    const [formData, setFormData] = useState({
        category: '',
        brand: '',
        quantity: '',
    });
    const [messageBox, setMessageBox] = useState('');
    const [alert, setAlert] = useState(true);

    const { category, brand, quantity  } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/api/product/add',formData).then(res => {

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
                    <StyledInput required placeholder='category' marginRight='10px' name='category' value={category} onChange={e => onChange(e)} />
                    <StyledInput required placeholder='brand' marginRight='10px' name='brand' value={brand} onChange={e => onChange(e)} />
                    <StyledInput required placeholder='quantity' type='Number' marginRight='10px' name='quantity' value={quantity} onChange={e => onChange(e)} />
                    <Button type="submit" value="submit" fontSize="1rem" height="2.15rem">Add Item</Button>
                </Form>
            </FormContainer>
            <TableContainer>
                <ProductTable/>
            </TableContainer>
        </MainPageContainer>
    )
};

export default Products;
