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

import "./home.scss";

function HomePage() {
  const history = useHistory();
  const URL = "http://18.220.223.236:5000/";
  const URL_LOCAL = "http://localhost:5000/";
  const [todoList, setTodoList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueUpdate, setValueUpdate] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  var [form] = Form.useForm();

  const accessToken = localStorage.getItem("accessToken");

  //check authen
  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue(valueUpdate);
  }, [form, valueUpdate]);

  //Get data todoList
  useEffect(async () => {
    var data = await axios.get(URL + "todo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setTodoList(data.data);
  }, []);

  //func Add new Todo;
  const addTodo = async (values) => {
    try {
      var data;
      console.log("is Update: ", isUpdate);
      if (isUpdate) {
        values.id = valueUpdate._id;
        console.log("value update: ", values);
        data = await axios.patch(URL + "todo", values, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setIsUpdate(false);
      } else {
        data = await axios.post(URL_LOCAL + "todo", values, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      setTodoList(data.data);

      setValueUpdate("");
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (record) => {
    setValueUpdate(record);
    setIsUpdate(true);
    setIsModalVisible(true);
  };

  //func delete 1 Todo
  const deleteItem = async (index) => {
    try {
      const data = await axios.delete(URL + "todo/" + index, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (data.status == 200) {
        setTodoList(data.data);
      }
      if (data.status == 201) {
        message.error("Todo is not exist");
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
      title: "Title",
      dataIndex: "title",
      width: "20%",
      align: "center",
    },
    {
      title: "Job Description",
      dataIndex: "jd",
      width: "30%",
      align: "center",
    },
    {
      title: "Finished",

      width: "20%",
      align: "center",
      render: (text, record, index) => {
        if (record.isFinished) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        } else {
          return <CloseCircleTwoTone twoToneColor="#e30b16" />;
        }
      },
    },
    {
      title: "Note",
      dataIndex: "note",
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
          <EditOutlined onClick={() => updateItem(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="container-homepage">
      <p className="title">To do List </p>

      <div className="container-handle">
        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={() => setIsModalVisible(true)}
        >
          Add Todo
        </Button>
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
        dataSource={todoList}
        pagination={false}
        bordered={true}
      />

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} onFinish={addTodo} initialValues={valueUpdate}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input onChange={(value) => console.log(value)} />
          </Form.Item>
          <Form.Item name="jd" label="Job Description">
            <Input />
          </Form.Item>
          <Form.Item name="isFinished" label="Finished">
            <Switch
              size={"large"}
              checkedChildren={<CheckCircleTwoTone twoToneColor="#52c41a" />}
              unCheckedChildren={<CloseCircleTwoTone twoToneColor="#e30b16" />}
            />
          </Form.Item>
          <Form.Item name="note" label="Note">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                type="danger"
                onClick={() => {
                  setIsModalVisible(false);
                  setIsUpdate(false);
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default HomePage;
