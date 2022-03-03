import React, { useState } from 'react';
import MaterialTable from '@material-table/core';
import { useSelector } from 'react-redux';


import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axiosInstance from '../../../Helpers/Axios';

const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const ExpenseTable = () => {
    const newExpense = useSelector((state) => state.expense);
    const { expense } = newExpense;

    const [changeTrigger, setChangeTrigger] = useState(false);

    return( 
        <>
            <MaterialTable
                    title="Expense"
                    icons = {tableIcons}
                    data={expense}
                    isLoading={!expense}
                    options={{
                        draggable: false,
                        sorting: false,
                        search:false,
                        pageSize: 3,
                        pageSizeOptions:[5],
                        emptyRowsWhenPaging: false, 
                        actionsColumnIndex: -1,
                        rowStyle: {
                        backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#B6BEC1',
                            color: '#333333',
                            fontWeight: '600',
                        }
                    }}
                    columns={[
                        {
                            title: 'EXPENSE (amount)', field: 'expense',
                        },
                        {
                            title: 'TYPE', field: 'expensetype',
                        },
                        {
                            title: 'DATE', field: 'date', editable:'never'
                        },
        
                    ]}
                    
                    editable={{
                        onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                axiosInstance.post('/api/expense/add',
                                    {
                                        expense: newData.expense,
                                        expensetype: newData.expensetype,
                                    }).then((response) => {
                                        if (response.data.errors) {
                                            reject();
                                        } else {
                                            window.location.reload(false);
                                            // setExpense([...expense, newData]);
                                            setChangeTrigger(!changeTrigger);
                                            resolve();
                                        }
                                    });
                            }, 1000)
                        }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...expense];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
        
                                    axiosInstance.post('/api/expense/delete',
                                        {
                                            expenseId: expense[index]._id,
                                        }).then((response) => {
                                            if (response.data.error) {
                                                reject();
                                            } else {
                                                window.location.reload(false);
                                                setChangeTrigger(!changeTrigger);
                                                resolve();
                                            }
                                        });
                                }, 1000)
                            }),
                    }}
                />
        </>
    )
};

export default ExpenseTable;
