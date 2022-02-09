import React from 'react';
import Navbar from '../../../Components/Layout/Navbar';
import { MainPageContainer } from '../../../Components/Shared/MainPageContainer';
import { TableContainer } from '../../../Components/Shared/Table';
import { Title, TitleContainer } from '../../../Components/Shared/Title';
import CommissionTable from '../../../Components/Tables/Admin/CommissionTable';

const Commission = () => {
    return (
        <MainPageContainer>
        <Navbar/>
        <TitleContainer>
            <Title>Daily Commission</Title>
        </TitleContainer>
        <TableContainer>
            <CommissionTable/>
        </TableContainer>
    </MainPageContainer>
    )
};

export default Commission;
