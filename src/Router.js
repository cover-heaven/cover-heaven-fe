import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
const mockData1 = [
	{
		job_search_id: '1',
		profile: '글로벌한국학과 23',
		gender: '남성',
		uer_name: '김동휘',
		department: '글로벌한국학과',
		student_id: '23학번',
		manner_temperature: '39도',
		job_tag: ['학원', '과외', '카페']
	},
	{
		job_search_id: '2',
		profile: '경영학과 23',
		gender: '남성',
		uer_name: '이형빈',
		department: '경영학과',
		student_id: '24학번',
		manner_temperature: '40도',
		job_tag: ['식당', '주점', '카페']
	},
	{
		job_search_id: '3',
		profile: '미국문화학과 19',
		gender: '여성',
		uer_name: '유민우',
		department: '미국문화학과',
		student_id: '19학번',
		manner_temperature: '41도',
		job_tag: ['식당', '주점', '편의점']
	},
	{
		job_search_id: '4',
		profile: '컴퓨터공학과 24',
		gender: '남성',
		uer_name: '김현승',
		department: '컴퓨터공학과',
		student_id: '24학번',
		manner_temperature: '42도',
		job_tag: ['식당', '편의점', '카페']
	},
	{
		job_search_id: '5',
		profile: '사진',
		gender: '여성',
		uer_name: '유서강',
		department: '유럽문화학과',
		student_id: '24학번',
		manner_temperature: '43도',
		job_tag: ['식당', '주점', '카페']
	},
	{
		job_search_id: '6',
		profile: '사진',
		gender: '여성',
		uer_name: '서서강',
		department: '글로벌한국학과',
		student_id: '23학번',
		manner_temperature: 'double',
		job_tag: ['string']
	}
];

const Router = () => {
	const location = useLocation();
	const hideHeaderRoutes = ['/login', '/signup'];
	return (
		<>
			{!hideHeaderRoutes.includes(location.pathname) && <Header />}
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/findjobslist" element={<FindJobsList />} />
				<Route path="/findjobsdetail" element={<FindJobsDetail />} />
				<Route
					path="/workerslist"
					element={<WorkersList mockData1={mockData1} />}
				/>
				<Route path="/findjobswriting" element={<FindJobsWriting />} />
				<Route path="/workerswriting" element={<WorkersWriting />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/chatlist" element={<ChatList />} />
				<Route path="/myprofile" element={<MyProfile />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	);
};

export default Router;
