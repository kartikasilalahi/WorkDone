import React, { useEffect, useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import TopBar from '../../component/pages/admin/topBar'
import SideBar from '../../component/pages/admin/sideBar'
import Chart from "react-apexcharts";
import {
    getAllDepartemen,
    getAllUser,
} from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';

export default function DashboardAdmin() {
    const dispatch = useDispatch()
    const listDepartemen = useSelector(state => state.task.all_departemen)
    const isLoadingListDepartemen = useSelector(state => state.task.is_loading_all_departemen)
    const listUser = useSelector(state => state.task.all_user)
    const isLoadingListUser = useSelector(state => state.task.is_loading_all_user)
    const messageNewDepartemen = useSelector(state => state.task.message_add_new_departemen)
    const isLoadingAddNewDepartemen = useSelector(state => state.task.is_loading_add_new_departemen)
    const messageEditDepartemen = useSelector(state => state.task.message_edit_departemen)
    const isLoadingEditDepartemen = useSelector(state => state.task.is_loading_edit_departemen)

    const [listDepart, setlistDepart] = useState([]);
    const [totalUserPerDepartemen, settotalUserPerDepartemen] = useState([]);



    useEffect(() => {
        dispatch(getAllDepartemen(''))
        dispatch(getAllUser(''))
        // getTotal()

    }, [dispatch])

    useEffect(() => {
        let lists = []
        if (listDepartemen && !isLoadingListDepartemen) {
            listDepartemen.map((list) => lists.push(list.name))
        }
        setlistDepart(lists)
    }, [listDepartemen, isLoadingListDepartemen])


    // console.log("alldep", listDepart)
    let options = {
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        labels: listDepart,
        // colors: ['#6C757D', '#F8B032', '#57D8E5', '#6BE497', '#EF4D5F'],
        title: {
            text: 'My Task',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '13px',
                fontWeight: 'normal',
                // fontFamily: undefined,
                color: '#9699a2'
            },
        },
        plotOptions: {
            donut: {
                size: '65%',
                background: 'transparent',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        fontSize: '22px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        color: '#373d3f',
                        formatter: function (w) {
                            return w.globals.seriesTotals.reduce((a, b) => {
                                return a + b
                            }, 0)
                        }
                    }
                }
            }
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item lg={2}>
                    <SideBar />

                </Grid>
                <Grid item lg={10} style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
                    <TopBar label='Dashboard Admin' />


                    <Box mt={7} py={3} pl={5} style={{ backgroundColor: 'white', }}>
                        <Chart
                            options={options}
                            series={[1, 3, 4, 5, 6, 6, 8, 9]}
                            type="donut"
                            width="500"
                        />
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
