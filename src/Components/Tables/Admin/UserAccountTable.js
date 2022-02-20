import React, { useEffect, useState } from 'react';
import MaterialTable from '@material-table/core';

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


const UserAccountTable = () => {
    const [data, setData] = useState([]);
    const [changeTrigger, setChangeTrigger] = useState(false);

    const getData = async () => {
        try {
            await axiosInstance.get('/api/user').then(res => {
                if (res.status === 200) setData(res.data)
            })
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getData();
    },[])
    
    return (
        <>
            <MaterialTable
                    title="Employees Information"
                    icons = {tableIcons}
                    data={data}
                    options={{
                        draggable: false,
                        sorting: false,
                        search:true,
                        actionsColumnIndex: -1,
                        rowStyle: {
                        backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#C09D88',
                            color: '#333333',
                            fontWeight: '600',
                        }
                    }}
                    columns={[
                        {
                            title: 'USERNAME', field:'username',
                        },
                        {
                            title: 'PASSWORD', field: 'password', editable:'never',
                        },
                        {
                            title: 'ROLE', field: 'role',
                        },
                    ]}
                    
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;

                                    axiosInstance.put('/api/user/update',
                                        {
                                            userid: data[index]._id,
                                            username: data[index].username,
                                            role: dataUpdate[index].role,
                                        }).then((response) => {
                                            if (response.data.errors){
                                                reject();
                                            } else {
                                                setData([...dataUpdate]);
                                                setChangeTrigger(!changeTrigger);
                                                resolve();
                                            }
                                    }).catch(alert)
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);

                                    axiosInstance.post('/api/user/delete',
                                        {
                                            userid: data[index]._id,
                                        }).then((response) => {
                                            if (response.data.errors) {
                                                reject();
                                            } else {
                                                setData([...dataDelete]);
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
}

export default UserAccountTable