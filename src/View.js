import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { Link } from "react-router-dom";

export default class View extends Component {
  state = {
    title: "",
    content: "",
  };

  detail = () => {
    let url = window.location.href;
    let urlParams = url.split("?")[1];
    console.log(urlParams); //id=1

    const searchParams = new URLSearchParams(urlParams); //{id:1}

    let id = searchParams.get("id"); //1

    //글번호에 맞는 데이터 조회, 글 결과를 title, content반영, 수정모드 true
    Axios.get(`http://localhost:8000/detail?id=${id}`)
      .then((res) => {
        const { data } = res;
        console.log(data);
        this.setState({
          title: data[0].BOARD_TITLE,
          content: data[0].BOARD_CONTENT,
        });
      })
      .catch((e) => {
        // 에러 핸들링
        console.log(e);
      });
  };

  componentDidMount() {
    this.detail();
  }

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <h2>본문</h2>
        {this.state.content}
        <hr />
        <Link to="/" className="btn btn-secondary">
          목록
        </Link>
      </div>
    );
  }
}
