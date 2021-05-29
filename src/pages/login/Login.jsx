import React from "react";
import "./login.scss";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";

function login() {
  const onFinish = async (values) => {
    try {
      console.log(values);

      const data = await axios.post("http://localhost:5000/user/login", values);
      console.log("data: ", data);
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

export default login;
