import { useState } from 'react';
import styled from 'styled-components';

const WorkingTime = ({ setContent, upDateWorkingTime }) => {
	const [startHour, setStartHour] = useState('');
	const [startMinute, setStartMinute] = useState('');
	const [endHour, setEndHour] = useState('');
	const [endMinute, setEndMinute] = useState('');
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [workTime, setWorkTime] = useState(0);

	const calculateWorkTime = (
		newStartHour,
		newStartMinute,
		newEndHour,
		newEndMinute
	) => {
		// 1. 입력 값 검증
		const isInvalidInput = [
			newStartHour,
			newStartMinute,
			newEndHour,
			newEndMinute
		].some((value) => value === '' || isNaN(parseInt(value, 10)));

		if (isInvalidInput) {
			setHour(0);
			setMinute(0);
			setWorkTime(0);
			console.error('올바른 시간을 입력해주세요.');
			return;
		}

		// 2. 시간 범위 검증
		const startHourInt = parseInt(newStartHour, 10);
		const startMinuteInt = parseInt(newStartMinute, 10);
		const endHourInt = parseInt(newEndHour, 10);
		const endMinuteInt = parseInt(newEndMinute, 10);

		if (
			startHourInt < 0 ||
			startHourInt > 23 ||
			startMinuteInt < 0 ||
			startMinuteInt > 59 ||
			endHourInt < 0 ||
			endHourInt > 23 ||
			endMinuteInt < 0 ||
			endMinuteInt > 59
		) {
			setHour(0);
			setMinute(0);
			setWorkTime(0);
			console.error('시간 입력 범위를 확인해주세요. (0~23 시간, 0~59 분)');
			return;
		}

		// 3. 시작 시간과 종료 시간 계산
		const start = startHourInt * 60 + startMinuteInt;
		const end = endHourInt * 60 + endMinuteInt;

		// 4. 하루를 넘기는 경우 처리
		const totalMinutes =
			end >= start
				? end - start // 같은 날
				: 1440 - start + end; // 다음 날

		// 5. 시간 및 분 계산
		const calculatedHours = Math.floor(totalMinutes / 60); // 시간
		const calculatedMinutes = totalMinutes % 60; // 분

		// 6. 상태 업데이트
		setHour(calculatedHours);
		setMinute(calculatedMinutes);
		setWorkTime(calculatedHours + calculatedMinutes / 60); // 소수점 포함 시간
	};

	const handleStartHourChange = (e) => {
		const value = e.target.value;
		setStartHour(value);
		calculateWorkTime(value, startMinute, endHour, endMinute);
	};

	const handleStartMinuteChange = (e) => {
		const value = e.target.value;
		setStartMinute(value);
		calculateWorkTime(startHour, value, endHour, endMinute);
	};

	const handleEndHourChange = (e) => {
		const value = e.target.value;
		setEndHour(value);
		calculateWorkTime(startHour, startMinute, value, endMinute);
	};

	const handleEndMinuteChange = (e) => {
		const value = e.target.value;
		setEndMinute(value);
		calculateWorkTime(startHour, startMinute, endHour, value);
	};

	const onCreate = () => {
		setContent(false);
		upDateWorkingTime(startHour, startMinute, endHour, endMinute);
	};

	return (
		<Layout>
			<div>근무시간</div>
			<FirstContainer>
				<div>출근</div>
				<div>
					<InputBox value={startHour} onChange={handleStartHourChange} />
					<span> : </span>
					<InputBox value={startMinute} onChange={handleStartMinuteChange} />
				</div>
			</FirstContainer>
			<SecondContainer>
				<div>퇴근</div>
				<div>
					<InputBox value={endHour} onChange={handleEndHourChange} />
					<span> : </span>
					<InputBox value={endMinute} onChange={handleEndMinuteChange} />
				</div>
			</SecondContainer>
			<WorkTime>
				<div>총</div>
				<div>
					{hour}시간 {minute}분
				</div>
				<div>근무</div>
			</WorkTime>
			<Button onClick={onCreate}>적용하기</Button>
		</Layout>
	);
};

export default WorkingTime;

const WorkTime = styled.div`
	display: flex;
	gap: 10%;
`;
const FirstContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10%;
`;
const SecondContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10%;
`;
const Layout = styled.div`
	width: 100%;
	height: 231px;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
	padding-left: 13%;
	padding-top: 10%;
	display: flex;
	flex-direction: column;
	gap: 8%;
`;
const InputBox = styled.input`
	width: 40px;
	height: 30px;
	border-radius: 5px;
	background: #d9d9d9;
`;
const Button = styled.button`
	width: 170px;
	height: 30px;
	padding: 0px 51px;
	border-radius: 10px;
	color: white;
	background: var(--surface-surface-primary, #ff5238);
`;
