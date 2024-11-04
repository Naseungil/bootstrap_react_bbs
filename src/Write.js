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
  write = () => {
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
  render() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" name="content" rows={3} />
        </Form.Group>
        <div className="d-flex gap-1">
          <Button variant="primary" type="submit">
            작성완료
          </Button>
          <Button variant="danger" type="reset">
            취소
          </Button>
        </div>
      </Form>
    );
  }
}
