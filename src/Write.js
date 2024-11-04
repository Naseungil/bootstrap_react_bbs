import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

export default class Write extends Component {
  state = {
    isModifyMode: false,
    title: "",
    content: "",
  };
  write = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/insert", {
      title: this.state.title,
      content: this.state.content,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        // 에러 핸들링
        console.log(e);
      });
  };
  update = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/update", {
      title: this.state.title,
      content: this.state.content,
      id: this.props.boardId, //수정 할 번호
    })
      .then((res) => {
        this.setState({
          title: "",
          content: "",
        });
        this.props.handleCancel();
      })
      .catch((e) => {
        // 에러 핸들링
        console.log(e);
      });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, //계산된 속성 ES6 문법
    });
    console.log(this.state);
  };
  render() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            rows={3}
            onChange={this.handleChange}
          />
        </Form.Group>
        <div className="d-flex gap-1">
          <Button
            variant="primary"
            type="submit"
            onClick={this.state.isModifyMode ? this.update : this.write}
          >
            {this.state.isModifyMode ? "수정완료" : "입력완료"}
          </Button>
          <Button variant="danger" type="reset">
            취소
          </Button>
        </div>
      </Form>
    );
  }
}
