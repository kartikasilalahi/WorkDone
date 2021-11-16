import React, { useState, useEffect } from 'react'
import { Box, Divider, Grid } from '@material-ui/core'
import SideBar from '../../component/pages/user/sideBar'
import TopBar from '../../component/pages/user/topBar'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Table } from 'antd';
import moment from 'moment'

import {
    getAllTaskUser,
    getDetailTask,
    getAllProjectUser,
    getDetailProject,
    updateProgressTask,
    getUserDepartemen,
    addNewTask
} from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button } from '@mui/material';

const columns = [
    {
        title: 'Progress',
        dataIndex: 'progress',
        filters: [
            {
                text: 'Done',
                value: 'DONE',
            },
            {
                text: 'Decline',
                value: 'DECLINE',
            },
            {
                text: 'In Progress',
                value: 'IN PROGRESS',
            },
            {
                text: 'Review',
                value: 'REVIEW',
            },
            {
                text: 'Todo',
                value: 'TO DO',
            },
            // {
            //     text: 'Submenu',
            //     value: 'Submenu',
            //     children: [
            //         {
            //             text: 'Green',
            //             value: 'Green',
            //         },
            //         {
            //             text: 'Black',
            //             value: 'Black',
            //         },
            //     ],
            // },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.progress.indexOf(value) === 0,
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortDirections: ['descend'],
        // render(text, record) {
        //     return {
        //         props: {
        //             style: { color: text === 'Done' ? "red" : "green" }
        //         },
        //         children: <div>{text}</div>
        //     };
        // }

    },
    {
        title: 'Task Name',
        dataIndex: 'task_name',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Project',
        dataIndex: 'project_name',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Start Datetime',
        dataIndex: 'start_datetime',
        // filters: [
        //     {
        //         text: 'London',
        //         value: 'London',
        //     },
        //     {
        //         text: 'New York',
        //         value: 'New York',
        //     },
        // ],
        // onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
        title: 'End Datetime',
        dataIndex: 'end_datetime',
        // filters: [
        //     {
        //         text: 'London',
        //         value: 'London',
        //     },
        //     {
        //         text: 'New York',
        //         value: 'New York',
        //     },
        // ],
        // onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
];


export default function Task() {
    const dispatch = useDispatch()
    const history = useHistory();
    const allTaskUser = useSelector(state => state.task.all_task_user)
    const isLoadingTaskUser = useSelector(state => state.task.is_loading_all_task_user)
    const detailTask = useSelector(state => state.task.detail_task_user)
    const allProjectUser = useSelector(state => state.task.all_project_user)
    const isLoadingProjectUser = useSelector(state => state.task.is_loading_all_project_user)
    const isLoadingUpdateProgressTask = useSelector(state => state.task.is_loading_update_progress_task)
    const messageUpdateProgressTask = useSelector(state => state.task.message_update_progress_task)
    const listUserDepartemen = useSelector(state => state.task.departemen_user)
    const messageSuccess = useSelector(state => state.task.message_add_new_task)
    const ListTotalTask = useSelector(state => state.task.total_task)

    const id = Number(localStorage.getItem('id'));
    const iddepartemen = Number(localStorage.getItem('iddepartemen'));

    const [listTask, setListTask] = useState([]);

    // let dataTask = isLoadingTaskUser && allTaskUser.map((tas,i)=>{

    // })

    useEffect(() => {
        dispatch(getAllTaskUser(id))
        dispatch(getAllProjectUser(id))
        if (allTaskUser) {
            let datatask = []
            // for (var i = 0; i < allTaskUser.length; i++) {
            //     datatask.push(allTaskUser[i])
            // }
            allTaskUser.map((task) => {
                const { id, task_name, project_name, progress, start_datetime, end_datetime } = task
                return (
                    datatask.push({
                        key: id,
                        progress: <div
                            style={{
                                backgroundColor: `${progress === 'DONE' ? '#6BE497'
                                    : progress === 'IN PROGRESS' ? '#F8B032'
                                        : progress === 'REVIEW' ? '#57D8E5'
                                            : progress == 'TO DO' ? '#6C757D' : '#EF4D5F'}`,
                                borderRadius: '5px',
                                textAlign: 'center',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                width: '120px',
                                color: 'white',
                                fontWeight: 'bold',
                                borderColor: 'whitesmoke'
                            }}
                        >{progress}</div>,
                        start_datetime: moment(start_datetime).format('DD MMM YYYY, h:mm'),
                        end_datetime: moment(end_datetime).format('DD MMM YYYY, h:mm'),
                        task_name,
                        project_name,
                    })
                )
            })
            console.log('dayaaa', datatask)

            setListTask(datatask)
        }

    }, [dispatch])


    useEffect(() => {
        dispatch(getUserDepartemen(iddepartemen))
    }, [iddepartemen])

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10}>
                    {/* <TopBar /> */}
                    <Box px={2} className="container-content" pb={5}>
                        ALL TASK
                        <Box pb={2}>
                            <Table columns={columns} dataSource={listTask} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
