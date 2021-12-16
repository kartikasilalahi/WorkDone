import React, { useState, useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import Sidebar from "../../sideBar";
import { useRouteMatch } from "react-router-dom";



function SideBar() {
  const { path } = useRouteMatch();
  const [activeMenu, setactiveMenu] = useState(path);
  const [label, setlabel] = useState("Home");
  if (path === null) {
    localStorage.setItem("path", "Home")
  }
  useEffect(() => {

    if (path === null) {
      localStorage.setItem("path", "Home")
    }
    localStorage.setItem("path", label)
  }, [label])

  const onClick = (e, item) => {
    setactiveMenu(path)
    localStorage.setItem("path", item.label)
    setlabel(item.label)
  }

  const items = [
    { name: "/admin/dashboard", label: "Home", Icon: HomeIcon, onClick },
    // {
    //   name: "/admin/notifications",
    //   label: "Notifications",
    //   Icon: NotificationsIcon,
    //   onClick
    // },
    {
      name: "user",
      label: "User",
      Icon: ReceiptIcon,
      items: [
        { name: "/admin/all-user", label: "All User", onClick },
        { name: "/admin/departemen", label: "Departemen", onClick },
        { name: "/admin/jabatan", label: "Jabatan", onClick },
      ]
    },
    "divider",
    {
      name: "task",
      label: "Project & Task",
      Icon: ReceiptIcon,
      items: [
        { name: "/admin/all-task", label: "All Task", onClick },
        { name: "/admin/all-project", label: "All Project", onClick }
      ]
    },
    "divider",
    {
      name: "settings",
      label: "Settings",
      Icon: SettingsIcon,
      items: [
        { name: "/admin/change-password", label: "Change Password", onClick },
        "divider",
        ,

      ]
    },

    {
      name: "logout",
      label: "Logout",
      Icon: MeetingRoomRoundedIcon,
      onClick
    },

  ];



  return (
    <div>
      <Sidebar items={items} active={activeMenu} />
    </div>
  );
}

export default SideBar;