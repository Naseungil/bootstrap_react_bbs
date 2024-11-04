import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Form from "react-bootstrap/Form";

/*
const submitTest = () => {
  //react->server 요청을 보내고, 그 결과를 출력
  Axios.get("http://localhost:8000/")
    .then(function (response) {
      // 성공 핸들링
      alert("등록완료!");
    })
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    });
};
*/
class Board extends Component {
  render() {
    return (
      <tr>
        <td>
          <Form.Check // prettier-ignore
            type="checkbox"
            id={`default-checkbox`}
            value={this.props.id}
            onChange={(e) => {
              this.props.onCheckboxChange(e.target.checked, e.target.value);
            }}
          />
        </td>
        <td>{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.registerId}</td>
        <td>{this.props.date}</td>
      </tr>
    );
  }
}

export default class BoardList extends Component {
  state = {
    BoardList: [],
    checkList: [],
  };
  onCheckboxChange = (checked, id) => {
    const list = [...this.state.checkList];
    if (checked) {
      if (!list.includes(id)) {
        list.push(id);
      } else {
        let idx = list.indexOf(id);
        list.splice(idx, 1);
      }
    }

    this.setState({
      checkList: list,
    });
    console.log(this.state.checkList);
  };
  getList = () => {
    Axios.get("http://localhost:8000/list")
      .then((res) => {
        //const data = res.data;
        const { data } = res; //destructuring 비구조 할당
        this.setState({
          BoardList: data,
        });
      })
      .catch((e) => {
        // 에러 핸들링
        console.log(e);
      });
  };
  componentDidMount() {
    this.getList();
  }
  render() {
    console.log(this.state.BoardList);
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>선택</th>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {this.state.BoardList.map((item) => (
              <Board
                key={item.BOARD_ID}
                id={item.BOARD_ID}
                title={item.BOARD_TITLE}
                registerId={item.REGISTER_ID}
                date={item.REGISTER_DATE}
                onCheckboxChange={this.onCheckboxChange}
              />
            ))}
          </tbody>
        </Table>
        <div className="d-flex gap-1">
          <Button variant="primary">글쓰기</Button>
          <Button variant="secondary">수정하기</Button>
          <Button variant="danger">삭제하기</Button>
        </div>
      </>
    );
  }
}
