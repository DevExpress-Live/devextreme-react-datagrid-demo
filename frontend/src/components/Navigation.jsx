import React from "react";
import { useNavigate } from "react-router-dom";

import Menu, { Item } from "devextreme-react/menu";

const Navigation = () => {
  const navigate = useNavigate();

  const onItemClick = (e) => {
    if (e.itemData.text) {
      if (e.itemData.text === "Home") {
        navigate("/");
      } else {
        navigate(`/${e.itemData.text.toLowerCase()}`);
      }
    }
  };

  return (
    <div className="nav" id="container">
      <Menu adaptivityEnabled={true} onItemClick={onItemClick}>
        <Item text="Home" icon="home"></Item>
        <Item text="Employees" icon="group"></Item>
        <Item text="Customers" icon="user"></Item>
      </Menu>
    </div>
  );
};

export default Navigation;
