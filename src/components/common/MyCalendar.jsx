import React, { useState } from 'react';
import styled from 'styled-components';

const MyCalendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date()); // 현재 년, 월, 일 반환
	const renderDays = () => {
		const days = [];
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();

		// 빈 칸 추가
		const firstDay = new Date(year, month, 1).getDay(); // getDay: 요일 반환, Ex. 일(0)~토(6)
		// new Date(year, month, 1): 해당 년도 해당 달의 첫번째 요일을 숫자로 반환
		for (let i = 0; i < firstDay; i++) {
			days.push(<Day key={i}>&nbsp;</Day>);
		}

		// 날짜 추가
		const totalDays = new Date(year, month + 1, 0).getDate(); // getDate: 날짜 반환, Ex. 25(25일)
		// 해당 년도 해당 달의 마지막 날짜 반환
		for (let day = 1; day <= totalDays; day++) {
			days.push(
				<Day key={day}>
					<span>{day}</span>
				</Day>
			);
		}
		return days;
	};

	// 이전 달 이동
	const handlePrevMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
		);
	};

	//다음 달 이동
	const handleNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
		);
	};

	return (
		<Calendar>
			<Header>
				<Button onClick={handlePrevMonth}>&lt;</Button>
				<Title>
					{currentDate.toLocaleString('default', { month: 'long' })}
				</Title>
				<Button onClick={handleNextMonth}>&gt;</Button>
			</Header>
			<Body>
				<DayNames>
					<div>Sun</div>
					<div>Mon</div>
					<div>Tue</div>
					<div>Wed</div>
					<div>Thu</div>
					<div>Fri</div>
					<div>Sat</div>
				</DayNames>
				<Days>{renderDays()}</Days>
			</Body>
		</Calendar>
	);
};

export const Calendar = styled.div`
	width: 300px;
	margin: auto;
	border: 1px solid #ddd;
	border-radius: 10px;
	overflow: hidden;
	background-color: #fff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 15px;
	background-color: white;
	color: black;
`;

export const Button = styled.button`
	background: none;
	border: none;
	color: black;
	font-size: 18px;
	cursor: pointer;
	&:hover {
		font-weight: bold;
	}
`;

export const Title = styled.h2`
	margin: 0;
	font-size: 18px;
`;

export const Body = styled.div`
	padding: 10px;
`;

export const DayNames = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	text-align: center;
	font-weight: bold;
	margin-bottom: 10px;
`;

export const Days = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 5px;
`;

export const Day = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	background-color: #f9f9f9;
	border-radius: 5px;
	font-size: 14px;

	&:hover {
		background-color: #ff5238;
		color: white;
	}

	& span {
		font-size: 14px;
	}
`;

export default MyCalendar;
