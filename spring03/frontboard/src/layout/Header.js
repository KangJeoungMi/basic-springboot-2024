import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate(); // Hook함수는 직접 사용불가(x)
    function gotoLogin() {
        navigate('/login');
    }
    function logout(){
        // localStorage.setItem("username", "");
        // localStorage.setItem("email", "");
        // localStorage.setItem("mid", "");
        // localStorage.setItem("role", "");
        // localStorage.setItem("loginDt", "");
        // window.location.replace("http://localhost:3000/home");
        
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('mid');
        localStorage.removeItem('role');
        localStorage.removeItem('loginDt');
        window.location.reload();

        // navigate('/home');
    }

    // return은 화면을 그리겠다
    return (
        <div className="container  header">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-1 mb-2">
                    <Link to='/Login' className="d-inline-flex link-body-emphasis text-decoration-none">
                        <img src={require('../logo.png')} alt='logo' width={40} />
                    </Link>
                </div>

                <ul className='nav col-12 col-md-6 mb-2 justify-content-center'>
                    <li><Link to='/Home' className='nav-link px-2 link-secondary'> 홈</Link></li>
                    <li><Link to='/BoardList' className='nav-link px-2 link-secondary'>게시판</Link></li>
                    <li><Link to='/QnaList' className='nav-link px-2 link-secondary'>질문응답</Link></li>
                </ul>

                <div className='col-md-3 text-end me-5'>
                    {localStorage.getItem("username") != null ? (
                        <button type='button' className='btn btn-outline-primary me-2' onClick={logout}>로그아웃</button>

                    ) : (
                        <>
                            <button type='button' className='btn btn-outline-primary me-2' onClick={gotoLogin}>로그인</button>
                            <button type='button' className='btn btn-primary me-2'>회원가입</button>
                        </>
                    )}

                </div>
            </header>
        </div>
    );
}

export default Header;