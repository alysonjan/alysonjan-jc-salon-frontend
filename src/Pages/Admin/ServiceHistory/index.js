import React from 'react';
import Navbar from '../../../Components/Layout/Navbar';
import { MainPageContainer } from '../../../Components/Shared/MainPageContainer';
import { TableContainer } from '../../../Components/Shared/Table';
import Spacer from "../../../Components/Shared/Spacer";
import ServiceHistoryTable from '../../../Components/Tables/Admin/ServiceHistoryTable';

const ServiceHistory = () => {
    return (
        <MainPageContainer>
            <Navbar/>
            <Spacer size="3.75rem" />
            <TableContainer>
                <ServiceHistoryTable/>
            </TableContainer>
        </MainPageContainer>
    )
};

export default ServiceHistory;
