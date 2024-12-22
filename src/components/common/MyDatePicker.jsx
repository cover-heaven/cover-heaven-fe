import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 스타일 가져오기
import styled from 'styled-components';

// Styled-components로 스타일 정의
const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px;

	h1 {
		font-size: 24px;
		margin-bottom: 16px;
		color: #333;
	}

	p {
		margin-top: 12px;
		font-size: 18px;
		color: #555;
	}
`;

// DatePicker에 커스텀 스타일 적용
const StyledDatePicker = styled(DatePicker)`
	width: 100%;
	height: 40px;
	font-size: 16px;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	text-align: center;

	&:focus {
		border-color: #007bff;
		outline: none;
	}
`;

const MyDatePicker = () => {
	const [selectedDate, setSelectedDate] = useState(null);

	return (
		<StyledWrapper>
			<StyledDatePicker
				selected={selectedDate} // 선택한 날짜 표시
				onChange={(date) => setSelectedDate(date)} // 날짜 선택 시 상태 업데이트
				placeholderText="2024년 11월 23일 (토)" // 입력창 placeholder
			/>
		</StyledWrapper>
	);
};

export default MyDatePicker;
