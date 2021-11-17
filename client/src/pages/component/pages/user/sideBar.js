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
    { name: "/user/dashboard", label: "Home", Icon: HomeIcon, onClick },
    // {
    //   name: "/user/notifications",
    //   label: "Notifications",
    //   Icon: NotificationsIcon,
    //   onClick
    // },
    {
      name: "task",
      label: "Tasks",
      Icon: ReceiptIcon,
      items: [
        { name: "/user/all-task", label: "All Task", onClick },
        { name: "/user/reports", label: "Reports", onClick }
      ]
    },
    "divider",

    {
      name: "settings",
      label: "Settings",
      Icon: SettingsIcon,
      items: [
        { name: "/user/profile", label: "Profile", onClick },
        { name: "/user/change-password", label: "Change Password", onClick },
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