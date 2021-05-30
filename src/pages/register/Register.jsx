import React from "react";
import "../login/login.scss";
import "antd/dist/antd.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Input, Select, Button, message } from "antd";
const { Option } = Select;

function Register() {
  const URL = "http://18.220.223.236:5000/";
  const URL_LOCAL = "http://localhost:5000/";
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const data = await axios.post(URL_LOCAL + "user/register", values);
      switch (data.status) {
        case 200:
          message.success("Register successfully");
          history.push("/login");
          break;
        case 201:
          message.error("Account exist");
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
    <div className="container">
      <div className="form">
        <p className="text_title"> Register</p>
        <Form name="register" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="pass"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("pass") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="displayName"
            label="Display Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn">
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="a-routing">
          <p>You had an account,</p>
          <a className="text_routing" href="/login">
            &nbsp;login here?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
