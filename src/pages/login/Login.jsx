import React from "react";
import "./login.scss";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";

import { Form, Input, Button, message } from "antd";
import axios from "axios";

function Login() {
  const URL = "http://18.220.223.236:5000/";
  const URL_LOCAL = "http://localhost:5000/";
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const data = await axios.post(URL + "user/login", values);
      const resData = data.data;
      switch (data.status) {
        case 200:
          message.success("Login successfully");
          localStorage.setItem("accessToken", resData.accessToken);
          localStorage.setItem("role", resData.role);
       
          if (resData.role == "admin") {
            history.push("/admin");
          } else {
            history.push("/home");
          }
          break;
        case 201:
          message.error("Account does not exist");
          break;
        case 202:
          message.error("Wrong password");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container ">
      <div className="form">
        <p className="text_title">Login</p>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="pass"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn">
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="a-routing">
          <p>You don't have an account,</p>
          <a className="text_routing" href="/register">
            &nbsp;create one?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
