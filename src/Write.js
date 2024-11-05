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
  detail = () => {
    //글번호에 맞는 데이터 조회, 글 결과를 title, content반영, 수정모드 true
    Axios.get(`http://localhost:8000/detail?id=${this.props.boardId}`)
      .then((res) => {
        const { data } = res; //destructuring 비구조 할당
        this.setState({
          title: data[0].BOARD_TITLE,
          content: data[0].BOARD_CONTENT,
          isModifyMode: true,
        });
      })
      .catch((e) => {
        // 에러 핸들링
        console.log(e);
      });
  };
  //this.props.isModifyMode에 변동사항이 생기면 detail 함수 실행, componentDidUpdate 함수로

  componentDidUpdate(prevProps) {
    // 수정모드이고 boardId가 변경되었다면, 그 글의 내용조회(detail 함수) 실행
    if (this.props.isModifyMode && this.props.boardId !== prevProps.boardId) {
      this.detail();
    }
  }

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
            value={this.state.title}
            placeholder="제목을 입력하세요"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={this.state.content}
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
