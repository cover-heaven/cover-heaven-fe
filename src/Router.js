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

const mockData1 = [
  {
    job_search_id: '1',
    profile: '컴퓨터공학과 24',
    gender: '여자',
    uer_name: '김서강',
    department: '컴퓨터공학과',
    student_id: '24학번',
    manner_temperature: '39도',
    job_tag: ['학원', '과외', '카페'],
  },
  {
    job_search_id: '2',
    profile: '경영학과 24',
    gender: '남자',
    uer_name: '박서강',
    department: '경영학과',
    student_id: '24학번',
    manner_temperature: '40도',
    job_tag: ['음식점', '주점', '카페'],
  },
  {
    job_search_id: '3',
    profile: '화공생명공학과 24',
    gender: '남자',
    uer_name: '이서강',
    department: '심리학과',
    student_id: '24학번',
    manner_temperature: '41도',
    job_tag: ['음식점', '주점', '편의점'],
  },
  {
    job_search_id: '4',
    profile: '경제학과 24',
    gender: '여자',
    uer_name: '남궁서강',
    department: '미국문화학과',
    student_id: '24학번',
    manner_temperature: '42도',
    job_tag: ['음식점', '편의점', '카페'],
  },
  {
    job_search_id: '5',
    profile: '사진',
    gender: '남자',
    uer_name: '유서강',
    department: '유럽문화학과',
    student_id: '24학번',
    manner_temperature: '43도',
    job_tag: ['음식점', '주점', '카페'],
  },
  {
    job_search_id: '6',
    profile: '사진',
    gender: '여자',
    uer_name: '서서강',
    department: '',
    student_id: 'string',
    manner_temperature: 'double',
    job_tag: ['string'],
  },
];

const mockData2 = [
  {
    title: '광흥창 투썸 알바 급구',
    storeName: '투썸 플레이스',
    address: '서울시 마포구 광흥창역',
    wage: '12,000원',
    message: '여러분, 광흥창 투썸 알바 구합니다',
  },
  {
    title: '신촌 나무카페 알바 급구',
    storeName: '나무카페',
    address: '서울특별시 서대문구 연세로',
    wage: '10,000원',
    message: '여러분, 신촌 나무카페 알바 구합니다',
  },
  {
    title: '서강대 조교 알바 급구',
    storeName: '서강대학교',
    address: '서울특별시 마포구 신수동',
    wage: '13,000원',
    message: '여러분, 서강대 조교 구합니다',
  },
];

const AppRouter = () => {
  const [totalData, setTotalData] = useState(mockData2);

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
        <Route path="/workerslist" element={<WorkersList mockData1={mockData1}/>} />
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
