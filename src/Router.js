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
				<Route path="/workerslist" element={<WorkersList />} />
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
