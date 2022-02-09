import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Layout/Navbar';
import { MainPageContainer } from '../../Components/Shared/MainPageContainer';
import { Title, TitleContainer } from '../../Components/Shared/Title';
import { Option, Select } from '../../Components/Shared/SelectOption';
import { Button } from '../../Components/Shared/Button';

import axiosInstance from '../../Helpers/Axios';
import { HairColorMainContainer } from './Styles';
import { SuccessMsg, SuccessMsgContainer } from '../../Components/Shared/SuccessMessage';

const HairProductPage = () => {

    const [formData, setFormData] = useState({
        hairbrand:'',
        colornumber:'',
    });
    const {hairbrand, colornumber} = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const [messageBox, setMessageBox] = useState('');
    const [alert, setAlert] = useState(true);
    const [data, setData] = useState([]);

    const getData = async() => {
        try {
            await axiosInstance.get('/api/hair-product').then(res => {
                if (res.status === 200){
                    setData(res.data)
                }
            })
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getData();
    },[])

    const hairBrands = data.map(hb => hb.hairbrand);

    const HBrands = Object.values(
        hairBrands.reduce((a, b) => {
        if (!a[b]) a[b]=b
        return a
    },{})
    )
    const colorNum = data.filter(hairbrands => hairbrands.hairbrand === hairbrand);

    const onSubmitHandler = (e) => {
        e.preventDefault()
        try {
            axiosInstance.post('/api/hair-product/employee/add/hair-brand', formData).then(res => {
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

    return(
        <MainPageContainer>
            <Navbar />
            <TitleContainer>
                <Title>Hair Color</Title>
            </TitleContainer>
            {alert &&
            <SuccessMsgContainer>
                <SuccessMsg>{messageBox}</SuccessMsg>
            </SuccessMsgContainer>
            }
            <form onSubmit={onSubmitHandler}>
                <HairColorMainContainer>
                            <Select margin='20px' name='hairbrand' value={hairbrand} onChange={e => onChange(e)} required>
                                <Option value=''>choose brand</Option>
                                    {HBrands.map((val, index)=> {
                                        return (
                                            <Option key={index}>{val}</Option>
                                        )
                                    })}
                            </Select>
                            <Select  margin='10px' name='colornumber' value={colornumber} onChange={e => onChange(e)} required>
                                <Option value=''>color #</Option>
                                {colorNum.map((val)=> {
                                        return (
                                            <Option key={val._id}>{val.colornumber}</Option>
                                        )
                                    })}
                            </Select>
                            <Button type="submit" value="submit" fontSize="1rem">submit</Button>
                    </HairColorMainContainer>
            </form>
        </MainPageContainer>
        
    ) 
};

export default HairProductPage;
