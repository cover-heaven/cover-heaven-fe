import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Main from './pages/Main/Main';
import FindJobsList from './pages/FindjobsList/FindJobsList';
import WorkersList from './pages/WorkersList/WorkersList';
import Chat from './pages/Chat/Chat';
import ChatList from './pages/ChatList/ChatList';
import WorkersWriting from './pages/WorkersWriting/WorkersWriting';
import FindJobsWriting from './pages/FindJobsWriting/FIndJobsWriting';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import MyProfile from './pages/MyProfile/MyProfile';
import FindJobsDetail from './pages/FindJobsDetail/FindJobsDetail';
import DaySelect from './pages/DaySelect/DaySelect';

const mockData = [
  {
    name: '광흥창 투썸 알바 급구',
    address: '서울시 마포구 광흥창역',
    period: '11/2',
    wage: '12,000원',
  },
  {
    name: '신촌 나무카페 알바 급구',
    address: '서울시 서대문구 연세로',
    period: '2024.12.1~2024.12.12',
    wage: '10,000원',
  },
  {
    name: '서강대 조교 알바 급구',
    address: '서울시 마포구 신수동',
    period: '2024.09.01~2024.12.20',
    wage: '13,000원',
  },
];

const AppRouter = () => {
  const [totalData, setTotalData] = useState(mockData);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/findjobslist"
          element={<FindJobsList totalData={totalData} />}
        />
        <Route path="/findjobsdetail" element={<FindJobsDetail />} />
        <Route path="/workerslist" element={<WorkersList />} />
        <Route path="/findjobswriting" element={<FindJobsWriting />} />
        <Route path="/workerswriting" element={<WorkersWriting />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/dayselect" element={<DaySelect />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
