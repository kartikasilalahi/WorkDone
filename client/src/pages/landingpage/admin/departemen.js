import React, { useEffect, useState } from 'react'
import {
    getAllDepartemen
} from '../../../redux/task/actionCreator'
import { Grid, Box } from '@material-ui/core'
import TopBar from '../../component/pages/admin/topBar'
import SideBar from '../../component/pages/admin/sideBar'
import { useSelector, useDispatch } from 'react-redux';
import IconEdit from '../../../Assets/img/icon/edit.png'
import IconDetail from '../../../Assets/img/icon/info.png'
import { Input } from 'antd';
import { Table } from 'antd';

const { Search } = Input


export default function Departemen() {
    const dispatch = useDispatch()

    const listDepartemen = useSelector(state => state.task.all_departemen)
    const isLoadingListDepartemen = useSelector(state => state.task.is_loading_all_departemen)

    const [allDepartemen, setAllDepartemen] = useState([]);


    useEffect(() => {
        dispatch(getAllDepartemen(''))
    }, [dispatch])

    useEffect(() => {
        if (!isLoadingListDepartemen && listDepartemen) {
            let datadepartemen = []
            listDepartemen.map((departemen, i) => {
                const { id, nama_depan, nama_belakang, name } = departemen
                return (
                    datadepartemen.push({
                        id: id,
                        name: name,
                        leader: `${nama_depan} ${nama_belakang}`,
                        action: <div>
                            <img style={{ cursor: 'pointer' }}
                                src={IconEdit} width="30px" /> {' '}
                            <img
                                // onClick={() => {
                                //     setIdDetail(id)
                                //     setOpenPopupDetail(true)
                                // }}
                                style={{ cursor: 'pointer' }}
                                src={IconDetail}
                                width="30px" />
                        </div>
                    })
                )
            })
            setAllDepartemen(datadepartemen)
        }

    }, [listDepartemen, isLoadingListDepartemen])


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Departemen',
            dataIndex: 'name',
        },
        {
            title: 'Leader',
            dataIndex: 'leader',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Action',
            dataIndex: 'action'
        }
    ];


    return (
        <div>
            <Grid container>
                <Grid item lg={2}>
                    <SideBar />

                </Grid>
                <Grid item lg={10} style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
                    <TopBar label='All Departemen' />
                    <Box px={2} className="container-content" pb={5}>
                        <Box pb={2}>
                            <Search placeholder="Search Departemen"
                                onChange={(e) => {
                                    dispatch(getAllDepartemen(e.target.value))
                                }}
                                allowClear
                                style={{ width: 350 }} />
                        </Box>
                        <Box pb={2}>
                            {isLoadingListDepartemen ? 'loading..' :
                                <Table columns={columns} dataSource={allDepartemen} pagination />}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
