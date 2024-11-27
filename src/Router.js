import React, { useRef, useState } from 'react';
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
    job_offer_id: 3,
    title: '광흥창 투썸 알바 급구',
    store_name: '투썸 플레이스',
    job_tag: '카페',
    address: '서울시 마포구 광흥창역',
    work_detail: {
      work_date: '2024.11.01',
      work_hour: '4',
      hourly_wage: '10000',
    },
    context: '여러분, 광흥창 투썸 알바 구합니다',
  },
  {
    job_offer_id: 2,
    title: '수학 과외 알바 급구합니다',
    store_name: '수학과외',
    job_tag: '과외',
    address: '서울시 서대구문구 연세로',
    work_detail: {
      work_date: '2024.11.02',
      work_hour: '2',
      hourly_wage: '30000',
    },
    context: '여러분, 수학 과외 알바 구합니다',
  },
  {
    job_offer_id: 1,
    title: '고밥 알바 급구합니다',
    store_name: '고기마니밥마니',
    job_tag: '식당',
    address: '서울시 마포구 백범로',
    work_detail: {
      work_date: '2024.11.02',
      work_hour: '7',
      hourly_wage: '11000',
    },
    context: '여러분, 고밥 알바 급구합니다',
  },
  {
    job_offer_id: 0,
    title: '신촌역 나무카페 알바 급구합니다',
    store_name: '나무카페',
    job_tag: '카페',
    address: '서울시 서대구문구 연세로',
    work_detail: {
      work_date: '2024.11.02',
      work_hour: '7',
      hourly_wage: '9000',
    },
    context: '여러분, 신촌 나무카페 알바 구합니다',
  },
];

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/findjobslist"
          element={<FindJobsList mockData={mockData} />}
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
        <Route
          path="/login"
          element={
            <Login onLogin={(token) => console.log('Logged in:', token)} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
