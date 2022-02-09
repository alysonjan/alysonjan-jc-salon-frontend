import React from 'react';
import Navbar from '../../../Components/Layout/Navbar';
import { MainPageContainer } from '../../../Components/Shared/MainPageContainer';
import { TableContainer } from '../../../Components/Shared/Table';
import { Title, TitleContainer } from '../../../Components/Shared/Title';
import ServiceHistoryTable from '../../../Components/Tables/Admin/ServiceHistoryTable';

const ServiceHistory = () => {
    return (
        <MainPageContainer>
            <Navbar/>
            <TitleContainer>
                <Title>Service History</Title>
            </TitleContainer>
            <TableContainer>
                <ServiceHistoryTable/>
            </TableContainer>
        </MainPageContainer>
    )
};

export default ServiceHistory;
