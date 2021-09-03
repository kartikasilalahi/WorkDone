import React, { useState, useEffect } from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import MenuIcon from '@material-ui/icons/Menu';

import "react-pro-sidebar/dist/css/styles.css";
import { Box, Grid, Link } from "@material-ui/core";

const Header = () => {

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)
    const [tabDashboard, settabDashboard] = useState(true);
    const [tabTaskProject, settabTaskProject] = useState(false);
    const [tabCalender, settabCalender] = useState(false);
    const [tabProfile, settabProfile] = useState(false);
    const [tabSetting, settabSetting] = useState(false);

    //create a custom function that will change menuCollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <>
            <div id="dashboard" style={{ width: `${menuCollapse ? "80px" : "220px"}` }}>
                {/* collapsed props to change menu size using menuCollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <Box textAlign="center" py={3} fontWeight={600}>
                            {menuCollapse ?
                                <Box onClick={menuIconClick} style={{ cursor: "pointer" }}>
                                    <MenuIcon />
                                </Box>
                                :
                                <Box>
                                    WorkDone
                                    <div className="closemenu" onClick={menuIconClick}>
                                        < FiArrowLeftCircle color="#50B799" />
                                    </div>
                                </Box>
                            }



                        </Box>

                        {/* <div className="closemenu" onClick={menuIconClick}>
                            {menuCollapse ? (

                                <FiArrowRightCircle color="#50B799" />
                            ) : (
                                    <FiArrowLeftCircle color="#50B799" />

                                )}
                        </div> */}
                    </SidebarHeader>
                    <SidebarContent>
                        <Box style={{ backgroundColor: "#50B799" }}>
                            <Menu iconShape="square">
                                <Box title="Board"
                                    onClick={() => {
                                        settabDashboard(true)
                                        settabTaskProject(false)
                                        settabCalender(false)
                                        settabProfile(false)
                                        settabSetting(false)
                                    }}>

                                    <MenuItem active={tabDashboard} icon={<FiHome />}>Board</MenuItem>
                                </Box>

                                <Box title="Task & Projects"
                                    onClick={() => {
                                        settabTaskProject(true)
                                        settabCalender(false)
                                        settabProfile(false)
                                        settabSetting(false)
                                        settabDashboard(false)
                                    }}>
                                    <MenuItem active={tabTaskProject} icon={<FaList />}>Task & Projects</MenuItem>
                                </Box>

                                <Box
                                    title="Calender"
                                    onClick={() => {
                                        settabCalender(true)
                                        settabTaskProject(false)
                                        settabProfile(false)
                                        settabSetting(false)
                                        settabDashboard(false)
                                    }}>
                                    <MenuItem icon={<FaRegHeart />}>Calender</MenuItem>
                                </Box>
                                <Box title="Profile"
                                    onClick={() => {
                                        settabProfile(true)
                                        settabTaskProject(false)
                                        settabCalender(false)
                                        settabSetting(false)
                                        settabDashboard(false)
                                    }}>
                                    <MenuItem icon={<RiPencilLine />}>Profile</MenuItem>
                                </Box>
                                <Box title="Setting"
                                    onClick={() => {
                                        settabSetting(true)
                                        settabTaskProject(false)
                                        settabDashboard(false)
                                        settabCalender(false)
                                        settabDashboard(false)
                                    }}>
                                    <MenuItem icon={<BiCog />}>Settings</MenuItem>
                                </Box>
                            </Menu>
                        </Box>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <Box title="Logout">
                                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                                {/* <Link href="/">
                                </Link> */}
                            </Box>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>

            <div>
                <Box py={3} style={{ color: "white", paddingLeft: `${menuCollapse ? "100px" : "250px"}`, paddingRight: "50px", backgroundColor: "#50B799" }}>
                    <Grid container justify="space-between" alignItems="center" direction="row" style={{ backgroundColor: "#50B799" }}>
                        <Grid item style={{ color: "white", backgroundColor: "#50B799" }}>
                            <Box fontWeight={700} style={{ color: "white", backgroundColor: "#50B799" }}>Exel Integrasi Solusindo </Box>
                        </Grid>

                        <Grid item style={{ color: "white", backgroundColor: "#50B799" }}>05:00 Live Attendance</Grid>
                        <Grid item style={{ color: "white", backgroundColor: "#50B799" }}>Kartika Nirwana</Grid>
                    </Grid>
                </Box>
            </div>



            <div >
                {
                    tabDashboard ?
                        <Box pt={3} style={{ color: "black", paddingRight: "50px", paddingLeft: `${menuCollapse ? "100px" : "250px"}` }}>
                            Dashboard
                            <Box py={12}>
                                loremkxdbshabxacdddddddddddddddddddddddddddddddd
                                sbxajjjjjjjjjjjjjjjjjjjjjjjj
                                Dashboard
                            <Box py={12}>
                                    loremkxdbshabxacdddddddddddddddddddddddddddddddd
                                    sbxajjjjjjjjjjjjjjjjjjjjjjjj

                            </Box>
                            Dashboard
                            <Box py={12}>
                                    loremkxdbshabxacdddddddddddddddddddddddddddddddd
                                    sbxajjjjjjjjjjjjjjjjjjjjjjjj

                            </Box>
                            Dashboard
                            <Box py={12}>
                                    loremkxdbshabxacdddddddddddddddddddddddddddddddd
                                    sbxajjjjjjjjjjjjjjjjjjjjjjjj

                            </Box>

                            </Box>
                        </Box>
                        :
                        null
                }
            </div>

            <div >
                {
                    tabTaskProject ?
                        <>
                            <Box pt={3} style={{ color: "black", paddingRight: "50px", paddingLeft: `${menuCollapse ? "100px" : "250px"}` }}>
                                <Grid container direction="row" justify="space-between" alignItems="center" >
                                    <Grid item>Project 1</Grid>
                                    <Grid item>Project 2</Grid>
                                    <Grid item>Project 3</Grid>
                                    <Grid item>Project 4</Grid>
                                </Grid>
                            </Box>
                        </>
                        :
                        null
                }
            </div>
        </>
    );
};

export default Header;