import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";

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

export default class BoardList extends Component {
  render() {
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
            <tr>
              <td>1</td>
              <td>안녕하세요</td>
              <td>admin</td>
              <td>2024-11-04</td>
            </tr>
            <tr>
              <td>2</td>
              <td>안녕하세요</td>
              <td>admin</td>
              <td>2024-11-04</td>
            </tr>
            <tr>
              <td>3</td>
              <td>안녕하세요</td>
              <td>admin</td>
              <td>2024-11-04</td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex gap-1">
          <Button onClick={submitTest} variant="primary">
            글쓰기
          </Button>
          <Button variant="secondary">수정하기</Button>
          <Button variant="danger">삭제하기</Button>
        </div>
      </>
    );
  }
}
