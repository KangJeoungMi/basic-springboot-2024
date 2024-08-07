import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// RestAPI -> axios
import axios from 'axios';

function Login() {

    // 변수
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    // 함수
    const handleChange = (e) => {
        const { name, value } = e.target; // username, password둘중 하나
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();//submit동안 다른 이벤트가 발생하지 않도록 중지 시키는 것
        try {
            const formData = new FormData();
            formData.append('username', user.username);
            formData.append('password', user.password);

            // console.log(formData.get('password'));

            const resp = await axios({
                url: ' http://localhost:8080/api/member/login ', // Rest API 호출
                method: 'POST', // GET, POST, DELETE, PUT
                data: formData,
                withCredentials: true
            });

            console.log(resp);
            if (resp.data.resultCode == 'OK') {
                const { email, mid, role, username } = resp.data.data;
                const transactionTime = resp.data.transactionTime;
                // console.log(email, mid, role, username);
                localStorage.setItem("username", username);
                localStorage.setItem("email", email);
                localStorage.setItem("mid", mid);
                localStorage.setItem("role", role);
                localStorage.setItem("loginDt", transactionTime);
                console.log(localStorage);

                alert("로그인 성공");
                // 다른페이지로 데이터 전달
                // navigate("/home", {data : {userData:resp.data.data}});

                navigate("/home");
            }else{
                alert("로그인 실패");
            }

        } catch (error) {
            console.log('로그인 에러' + error);
            alert("로그인 실패");
        }

    }
    return (
        <div className="container card form-register" style={{ maxWidth: '400px', padding: '1rem' }}>
            <div>
                <div className="my-3 border-bottom">
                    <h3 className="text-center">로그인</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="text-start mb-3">
                        <label htmlFor="username" className="form-label">사용자 이름</label>
                        <input type="text" name="username" placeholder="사용자 이름" className="form-control" required
                            value={user.username} onChange={handleChange} />
                    </div>
                    <div className="text-start mb-3">
                        <label htmlFor="password" className="form-label">비밀번호</label>
                        <input type="password" name="password" placeholder="비밀번호" className="form-control" required
                            value={user.password} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">로그인</button>
                    <Link to={'/home'} className='btn btn-secondary'>취소</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;