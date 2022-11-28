import React, { useState, useEffect } from 'react'
import { Box, Divider, Grid } from '@material-ui/core'
import SideBar from '../../component/pages/user/sideBar'
import { Button, Form, Dropdown } from 'react-bootstrap';
import ReactQuill from 'react-quill'
import TopBar from '../../component/pages/user/topBar'
import { sendReport } from '../../../redux/task/actionCreator'
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'

const Report = () => {
    const dispatch = useDispatch()
    let id = Number(localStorage.getItem('id'))
    let idlevel = Number(localStorage.getItem('idlevel'))
    let iddepartemen = Number(localStorage.getItem('iddepartemen'))
    const messageSendReport = useSelector(state => state.task.message_send_report)
    const loadingSendReport = useSelector(state => state.task.is_loading_send_report)

    const [reportField, setReportField] = useState('');
    const [isSend, setIsSend] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    let today = new Date()
    let day = today.getDay()
    // console.log("day", day)
    useEffect(() => {
        if (messageSendReport && messageSendReport.length > 0 && isSend) {
            Toast.fire({
                icon: 'success',
                title: messageSendReport
            })
            setIsSend(false)
        }
    }, [messageSendReport])

    let modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
        ]
    };

    let formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image"
    ];
    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                    <SideBar />

                </Grid>
                <Grid item md={10}>
                    <TopBar label="Report" />
                    {
                        idlevel === 2 ?
                            <Box px={2} className="container-content" pb={5}>
                                <Box className="box-quil" px={2}>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={reportField}
                                        onChange={(e) => setReportField(e)}
                                        style={{ minHeight: "200px" }}
                                    />
                                </Box>
                                <Box pt={1} px={2} textAlign="right">
                                    {
                                        day !== 5 ?
                                            <Button variant="success"
                                                style={{
                                                    paddingRight: "40px",
                                                    paddingLeft: '40px',
                                                    fontSize: "13px",
                                                    borderRadius: '20px'
                                                }}
                                                disabled
                                            >{loadingSendReport ? 'loading ..' : 'send'}</Button>
                                            :
                                            <Button variant="success"
                                                style={{
                                                    paddingRight: "40px",
                                                    paddingLeft: '40px',
                                                    fontSize: "13px",
                                                    borderRadius: '20px'
                                                }}
                                                onClick={() => {
                                                    setIsSend(true)
                                                    dispatch(sendReport({
                                                        iduser: id,
                                                        iddepartemen: iddepartemen,
                                                        data: reportField
                                                    }))
                                                }}
                                            >{loadingSendReport ? 'loading ..' : 'send'}</Button>
                                    }
                                </Box>
                            </Box>
                            :
                            null
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Report
