import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

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
                    로그인
                    회원가입
                </div>
            </header>
        </div>
    );
}

export default Header;