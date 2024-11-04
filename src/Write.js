import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Write extends Component {
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
