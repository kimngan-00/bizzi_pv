import React from "react";
import "antd/dist/antd.css";
import {
  Table,
  Space,
  message,
  Button,
  Modal,
  Form,
  Input,
  Switch,
} from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  PlusCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import "./admin.scss";

function AdminPage() {
  const history = useHistory();
  const URL = "http://18.220.223.236:5000/";
  const URL_LOCAL = "http://localhost:5000/";
  const [userList, setUserList] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  //check authen
  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }

    if (role == "user") {
      message.error("You aren't admin");
      history.push("/login");
    }
  }, []);

  //Get data todoList
  useEffect(async () => {
    var data = await axios.get(URL + "admin", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setUserList(data.data);
  }, []);

  //func delete 1 Todo
  const deleteItem = async (index) => {
    try {
      const data = await axios.delete(URL + "admin/" + index, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (data.status == 200) {
        setUserList(data.data);
      }
      if (data.status == 201) {
        message.error("User is not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //func user logout
  const logOut = async () => {
    try {
      localStorage.removeItem("accessToken");
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  //setup table display
  const columns = [
    {
      title: "Display Name",
      dataIndex: "displayName",
      width: "30%",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "20%",
      align: "center",
    },

    {
      title: "Action",
      width: "10%",
      dataIndex: "_id",
      align: "center",
      render: (text, record, index) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => deleteItem(record._id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="container-homepage">
      <p className="title">User List </p>

      <div className="container-handle">
        <Button
          icon={<LogoutOutlined />}
          type="primary"
          onClick={() => logOut()}
        >
          Logout
        </Button>
      </div>
      <Table
        className="table"
        columns={columns}
        dataSource={userList}
        pagination={false}
        bordered={true}
      />
    </div>
  );
}

export default AdminPage;
