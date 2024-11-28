import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
	const [id, setId] = useState(''); // user_id 입력 필드
	const [password, setPassword] = useState(''); // password 입력 필드
	const [error, setError] = useState(''); // 에러 메시지 상태

	const handleSubmit = async (e) => {
		e.preventDefault();

		const body = {
			user_id: id,
			password: password
		};

		try {
			const response = await axios.post('/users/login', body);

			const { accessToken, refreshToken } = response.data;

			// 로컬 스토리지에 직접 저장
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);

			console.log('Login successful!');
		} catch (err) {
			setError('Invalid ID or password');
		}
	};

	return (
		<div>
			<h2>Login</h2>
			{/* 에러 메시지 출력 */}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="ID"
					value={id}
					onChange={(e) => setId(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
