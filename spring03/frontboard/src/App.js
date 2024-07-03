import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

// 화면 라우팅을 위해서 라이브러리 추가
import { Routes, Route } from 'react-router-dom'
import React from 'react';

// 만든화면 추가
import Home from './routes/Home';
import BoardList from './routes/BoardList';
import Login from './routes/Login';
import QnaList from './routes/QnaList';
import BoardDetail from './routes/BoardDetail';

function App() {
  return (
    <Routes>
      {/* a.link를 누르면 화면 전활 될 페이지 */}
      <Route path='/Home' element={<Home />} />
      <Route path='/BoardList' element={<BoardList />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/BoardDetail/:bno' element={<BoardDetail />} />
      <Route path='/QnaList' element={<QnaList />} />
    </Routes>
  );
}

export default App;
