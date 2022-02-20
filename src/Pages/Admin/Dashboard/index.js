import React, { useEffect } from "react";
import Navbar from "../../../Components/Layout/Navbar";
import axiosInstance from "../../../Helpers/Axios";
import { useDispatch, useSelector } from "react-redux";
import { getNetSaleAction } from "../../../actions/netsale";
import { getExpenseAction } from "../../../actions/expense";

import { MainPageContainer } from "../../../Components/Shared/MainPageContainer";
import Spacer from "../../../Components/Shared/Spacer";
import ExpenseTable from "../../../Components/Tables/Admin/ExpenseTable";
import NetSaleTable from "../../../Components/Tables/Admin/NetSaleTable";
import {
  BalanceContainer,
  BalanceItem,
  BalanceItemContainer,
  DashboardTableContainer,
  ExpenseContainer,
  NetSaleContainer,
} from "./Dashboard.Styles";

const Dashboard = () => {
  const dispatch = useDispatch()

  const netSale = useSelector((state) => state.netsale)
  const { netsale } = netSale;

  const newExpense = useSelector((state) => state.expense)
  const { expense } = newExpense;

  const sumNetsale = netsale.reduce((total, obj) => obj.netsale + total,0)

  const sumExpense = expense.reduce((total, obj) => obj.expense + total,0)

  const currentBalance = sumNetsale - sumExpense


  const getData = async() => {
      try {
          axiosInstance.get('/api/netsale').then(res => {
              if (res.status === 200)
              dispatch(getNetSaleAction(res.data))
          })
          axiosInstance.get('/api/expense').then(res => {
              if (res.status === 200)
              dispatch(getExpenseAction(res.data))
          })
      } catch (err) {
          console.error(err.message)
      }
  }

  useEffect(() => {
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainPageContainer>
      <Navbar />
      <Spacer size="3.75rem" />
      <BalanceContainer>
        <BalanceItemContainer>
          <BalanceItem> Balance: {currentBalance.toFixed(2)}</BalanceItem>
        </BalanceItemContainer>
      </BalanceContainer>
      <DashboardTableContainer>
        <NetSaleContainer>
          <NetSaleTable />
        </NetSaleContainer>
        <ExpenseContainer>
          <ExpenseTable />
        </ExpenseContainer>
      </DashboardTableContainer>
    </MainPageContainer>
  );
};

export default Dashboard;
