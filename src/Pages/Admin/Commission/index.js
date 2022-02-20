import React from 'react';
import Navbar from '../../../Components/Layout/Navbar';
import { MainPageContainer } from '../../../Components/Shared/MainPageContainer';
import { TableContainer } from '../../../Components/Shared/Table';
import Spacer from "../../../Components/Shared/Spacer";
import CommissionTable from '../../../Components/Tables/Admin/CommissionTable';

const Commission = () => {
    return (
        <MainPageContainer>
        <Navbar/>
        <Spacer size="3.75rem" />
        <TableContainer>
            <CommissionTable/>
        </TableContainer>
    </MainPageContainer>
    )
};

export default Commission;
