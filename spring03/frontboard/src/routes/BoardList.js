import axios from 'axios';  // REST API 

// Hook 함수 사용
import React, { useState, useEffect } from 'react';

// Navigation
import { Link } from 'react-router-dom';

function BoardList() {  // 객체를 만드는 함수
    // 변수 선언
    const [boardList, setBoardList] = useState([]); // 배열값을 받아서 상태를 저장하기 때문에[]

    // 함수 선언 (가장 중요‼️)
    const getBoardList = async () => {
        var pageString = 'page=0';
        const resp = (await axios.get("http://localhost:8080/api/board/list/free?" + pageString)).data;
        setBoardList(resp);
        console.log(resp);
    }

    useEffect(() => {
        getBoardList();
    }, []);


    return (
        <div className="container">
            <table className='table'>
                <thead className='table-dark'>
                    <tr className='text-center'>
                        <th scope="col">번호</th>
                        <th style={{ width: '50%' }}>제목</th>
                        <th scope="col">글쓴이</th>
                        <th scope="col">조회수</th>
                        <th scope="col">작성일시</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 반복구문 */}
                    {boardList.map((board) => (
                        <tr className='text-center' key={board.bno}>
                        <td>{board.bno}</td>
                        <td className='text-start'>{board.title}</td>
                        <td>{board.writer}</td>
                        <td>{board.hit}</td>
                        <td>{board.createDate}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default BoardList;