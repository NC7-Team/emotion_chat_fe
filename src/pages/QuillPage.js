import React, { Component } from "react";
import "./List.css";

class List extends Component {
  constructor() {
    super();
    this.state = {
      posts: [
        {
          id: 1,
          title: "게시물 제목 1",
          author: "작성자 1",
          date: "2023-10-17",
          likes: 5,
        },
        {
          id: 2,
          title: "게시물 제목 2",
          author: "작성자 2",
          date: "2023-10-18",
          likes: 10,
        },
        {
          id: 3,
          title: "게시물 제목 3",
          author: "작성자 3",
          date: "2023-10-19",
          likes: 7,
        },
        {
          id: 4,
          title: "게시물 제목 4",
          author: "작성자 4",
          date: "2023-10-20",
          likes: 15,
        },
        {
          id: 5,
          title: "게시물 제목 5",
          author: "작성자 5",
          date: "2023-10-21",
          likes: 12,
        },
        {
          id: 6,
          title: "게시물 제목 6",
          author: "작성자 6",
          date: "2023-10-22",
          likes: 20,
        },
        {
          id: 7,
          title: "게시물 제목 7",
          author: "작성자 7",
          date: "2023-10-23",
          likes: 8,
        },
        {
          id: 8,
          title: "게시물 제목 8",
          author: "작성자 8",
          date: "2023-10-24",
          likes: 13,
        },
        {
          id: 9,
          title: "게시물 제목 9",
          author: "작성자 9",
          date: "2023-10-25",
          likes: 3,
        },
        {
          id: 10,
          title: "게시물 제목 10",
          author: "작성자 10",
          date: "2023-10-26",
          likes: 18,
        },
        // 추가적인 게시물 데이터를 필요한 만큼 추가하세요
      ],
    };
  }

  render() {
    return (
      <div className="list-container">
        <h1 className="list-heading">리스트 입니당</h1>
        <table className="post-table">
          <colgroup>
            <col span="1" style={{ width: "10%" }} />
            <col span="1" style={{ width: "40%" }} />
            <col span="1" style={{ width: "20%" }} />
            <col span="1" style={{ width: "15%" }} />
            <col span="1" style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>게시글 번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>추천</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <a href={`/post/${post.id}`}>{post.title}</a>
                </td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
