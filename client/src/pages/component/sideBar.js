import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import { Box, Avatar, Link } from '@material-ui/core'
import { useHistory } from "react-router-dom";
import swal from 'sweetalert'

function SidebarItem({ depthStep = 10, depth = 0, expanded, active, item, ...rest }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const { label, items, Icon, onClick: onClickProp } = item;
  const history = useHistory();
  function toggleCollapse() {
    setCollapsed(prevValue => !prevValue);
  }
  // useEffect(() => {
  //   if (active === '/user/all-task') {
  //     setCollapsed(false)
  //   }
  //   if (active === '/user/change-password') {
  //     setCollapsed(false)
  //   }

  // }, [])

  function onClick(e) {
    if (Array.isArray(items)) {
      toggleCollapse();
    }
    if (onClickProp) {
      onClickProp(e, item);
      if (label === "Logout") {
        swal({
          title: "Anda yakin logout?",
          icon: "info",
          buttons: [
            'Cancel',
            'Yes'
          ],
          dangerMode: true,
        }).then((value) => {
          if (value) {
            localStorage.clear()
            if (localStorage.getItem("isLogin") === null) {
              window.location.href = '/'
            }
          }
        })
      } else {
        history.push(`${item.name}`);
      }
    }
  }

  let expandIcon;

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon
        style={{ fill: 'white' }}
        className={
          "sidebar-item-expand-arrow" + " sidebar-item-expand-arrow-expanded"
        }
      />
    ) : (
        <ExpandMoreIcon style={{ fill: 'white' }} className="sidebar-item-expand-arrow" />
      );
  }


  return (
    <>
      <ListItem
        className="sidebar-item"
        onClick={onClick}
        button
        dense
        {...rest}
      >
        <div
          className="sidebar-item-content"
          style={{
            borderRight: `${active === item.name ? "3px solid #51AC56" : "none"}`,
            // backgroundColor: `${active === item.name ? "#EDF8F1" : "transparent"}`,
            paddingLeft: `${depth * depthStep > 0 ? `${depth * depthStep}px` : "2rem"}`
          }}
        >
          {Icon &&
            <Icon className="sidebar-item-icon" fontSize="small"
              style={{ fill: `${active === item.name ? "#51AC56" : "#2F2E41"}` }} />
          }
          <div className="sidebar-item-text"
            style={{
              color: `${active === item.name ? "#51AC56" : "white"}`,
              fontWeight: `${active === item.name ? "bold" : "normal"}`
            }}
          >{label}</div>
          {expandIcon}
        </div>
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense>
            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider style={{ margin: "6px 0" }} />
                ) : (
                    <SidebarItem
                      depth={depth + 8}
                      depthStep={depthStep}
                      item={subItem}
                      active={active}

                    />
                  )}
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </>
  );
}

function Sidebar({ items, depthStep, depth, expanded, active }) {
  // console.log("active", active)
  return (
    <div className="sidebar">
      <Box pt={5} pb={1} display="flex"
        justifyContent="center"
        alignItems="center" textAlign="center">
        <Avatar
          style={{ height: "100px", width: "100px" }}
          src="https://minimal-kit-react.vercel.app/static/illustrations/illustration_avatar.png" />
      </Box>
      <Box textAlign="center" color="white" fontSize={15} fontWeight={600}>
        {localStorage.getItem("nama_depan")} {localStorage.getItem("nama_belakang")}
      </Box>
      <Box textAlign="center" color="#51AC56" fontSize={12}>
        {localStorage.getItem("jabatan")}
      </Box>
      <Box fontSize={10} pb={5} textAlign="center" color="#dedede">
        {localStorage.getItem("email")}
        {/* <Divider style={{ marginTop: "16px", backgroundColor: 'gray' }} /> */}
      </Box>


      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.name}${index}`}>
            {sidebarItem === "divider" ? (
              <Divider style={{ margin: "6px 0" }} />
            ) : (
                <SidebarItem
                  depthStep={depthStep}
                  depth={depth}
                  expanded={expanded}
                  item={sidebarItem}
                  active={active}
                />
              )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default Sidebar;