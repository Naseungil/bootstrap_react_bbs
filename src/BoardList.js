import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";

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
        <td>{this.props.no}</td>
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
                no={item.BOARD_ID}
                title={item.BOARD_TITLE}
                registerId={item.REGISTER_ID}
                date={item.REGISTER_DATE}
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
