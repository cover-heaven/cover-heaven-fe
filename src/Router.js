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
import coffeeIcon from './assets/icon/coffee icon.png';

const mockData = [
  {
    title: '광흥창 투썸 알바 급구',
    image: coffeeIcon,
    storeName: '투썸 플레이스',
    address: '서울시 마포구 광흥창역',
    writer: '김동휘',
    tag: '#요식업 #카페',
    period: '2024.11.1 - 2024.11.5',
    date: {
      firstDay: '11/1 16:00 - 20:00',
      secondDay: '11/2 16:00 - 20:00',
      thirdDay: '11/3 16:00 - 20:00',
      fourthDay: '11/4 16:00 - 20:00',
      fifthDay: '11/5 16:00 - 20:00',
    },
    wage: '12,000원',
    grossPay: '60,000원',
    dayCount: '10',
    message: '여러분, 광흥창 투썸 알바 구합니다',
  },
  {
    title: '신촌 나무카페 알바 급구',
    image: coffeeIcon,
    storeName: '나무 카페',
    address: '서울특별시 서대문구 연세로',
    writer: '유민우',
    tag: '#요식업 #카페',
    period: '2024.12.1 - 2024.12.5',
    date: {
      firstDay: '12/1 16:00 - 20:00',
      secondDay: '12/2 16:00 - 20:00',
      thirdDay: '12/3 16:00 - 20:00',
      fourthDay: '12/4 16:00 - 20:00',
      fifthDay: '12/5 16:00 - 20:00',
    },
    wage: '10,000원',
    grossPay: '40,000원',
    dayCount: '8',
    message: '여러분, 신촌역 나무카페 알바 구합니다',
  },
];

const AppRouter = () => {
  const [totalData, setTotalData] = useState(mockData);

  const onCreate = (title, storeName, address, wage, message) => {
    const newJobData = {
      title: title,
      storeName: storeName,
      address: address,
      wage: wage,
      message: message,
    };
    setTotalData([newJobData, ...totalData]);
  };

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
        <Route
          path="/findjobswriting"
          element={<FindJobsWriting onCreate={onCreate} />}
        />
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
