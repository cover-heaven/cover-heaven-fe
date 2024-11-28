import { useState } from 'react';
import styled from 'styled-components';

const WorkingTime = ({ onMove, setContent, upDateWorkingTime }) => {
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
    newEndMinute,
  ) => {
    // 1. 입력 값 검증
    const isInvalidInput = [
      newStartHour,
      newStartMinute,
      newEndHour,
      newEndMinute,
    ].some((value) => value === '' || isNaN(parseInt(value, 10)));

    if (isInvalidInput) {
      setHour(0);
      setMinute(0);
      setWorkTime(0);
      console.log('올바른 시간을 입력해주세요.');
      return;
    }

    // 2. 시작 시간과 종료 시간 계산
    const start =
      parseInt(newStartHour, 10) * 60 + parseInt(newStartMinute, 10);
    const end = parseInt(newEndHour, 10) * 60 + parseInt(newEndMinute, 10);

    // 3. 하루를 넘기는 경우 처리
    const totalMinutes =
      end >= start
        ? end - start // 같은 날
        : 1440 - start + end; // 다음 날

    // 4. 시간 및 분 계산
    const calculatedHours = Math.floor(totalMinutes / 60); // 시간
    const calculatedMinutes = totalMinutes % 60; // 분

    // 5. 상태 업데이트
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
          <InputBox
            placeholder="시"
            value={startHour}
            onChange={handleStartHourChange}
          />
          <span> : </span>
          <InputBox
            placeholder="분"
            value={startMinute}
            onChange={handleStartMinuteChange}
          />
        </div>
      </FirstContainer>
      <SecondContainer>
        <div>퇴근</div>
        <div>
          <InputBox
            placeholder="시"
            value={endHour}
            onChange={handleEndHourChange}
          />
          <span> : </span>
          <InputBox
            placeholder="분"
            value={endMinute}
            onChange={handleEndMinuteChange}
          />
        </div>
      </SecondContainer>
      <div>
        총 {hour}시간 {minute}분 근무
      </div>
      <Button onClick={onCreate}>적용하기</Button>
    </Layout>
  );
};

const FirstContainer = styled.div`
  display: flex;
`;
const SecondContainer = styled.div`
  display: flex;
`;
const Layout = styled.div`
  width: 100%;
  height: 231px;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;
const InputBox = styled.input`
  width: 40px;
  height: 30px;
  border-radius: 5px;
  background: #d9d9d9;
`;
const Button = styled.button`
  width: 152px;
  height: 30px;
  padding: 0px 51px;
  border-radius: 10px;
  background: var(--surface-surface-primary, #ff5238);
`;

export default WorkingTime;
