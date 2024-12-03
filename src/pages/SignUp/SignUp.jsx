import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
	const [formData, setFormData] = useState({
		user_id: '',
		name: '',
		gender: '',
		phone: '',
		birth_date: '',
		school: '',
		department: '',
		student_id: '',
		password: ''
	});

	const [studentCard, setStudentCard] = useState(null); // 학생증 파일 상태
	const [error, setError] = useState(''); // 에러 메시지
	const [success, setSuccess] = useState(''); // 성공 메시지

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		setStudentCard(e.target.files[0]); // 파일 상태 업데이트
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// FormData 객체 생성
			const data = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				data.append(key, value); // 텍스트 데이터 추가
			});
			data.append('student_card', studentCard); // 파일 추가

			// 회원가입 요청 전송
			const response = await axios.post('/users/register', data, {
				headers: {
					'Content-Type': 'multipart/form-data' // 파일 업로드 설정
				}
			});

			setSuccess('Registration successful!');
			setError('');
			console.log('Response:', response.data);
		} catch (err) {
			setError('Registration failed. Please check your inputs.');
			setSuccess('');
			console.error(err.response?.data || err.message);
		}
	};

	return (
		<div>
			<h2>Register</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{success && <p style={{ color: 'green' }}>{success}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="user_id"
					placeholder="User ID"
					value={formData.user_id}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="gender"
					placeholder="Gender"
					value={formData.gender}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="phone"
					placeholder="Phone"
					value={formData.phone}
					onChange={handleInputChange}
					required
				/>
				<input
					type="date"
					name="birth_date"
					placeholder="Birth Date"
					value={formData.birth_date}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="school"
					placeholder="School"
					value={formData.school}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="department"
					placeholder="Department"
					value={formData.department}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="student_id"
					placeholder="Student ID"
					value={formData.student_id}
					onChange={handleInputChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleInputChange}
					required
				/>
				<input
					type="file"
					name="student_card"
					onChange={handleFileChange}
					required
				/>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default SignUp;
