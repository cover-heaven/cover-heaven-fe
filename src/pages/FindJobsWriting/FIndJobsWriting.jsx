import { useState } from 'react';
import styled from 'styled-components';

const FindJobsWriting = ({ onCreate }) => {
  const [wage, setWage] = useState();
  const [dateTimeInputs, setDateTimeInputs] = useState([{ id: 1 }]);
  const [title, setTitle] = useState();
  const [storeName, setStoreName] = useState();
  const [address, setAddress] = useState();
  const [message, setMessage] = useState();
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [startHour, setStartHour] = useState();
  const [startMinute, setStartMinute] = useState();
  const [endHour, setEndHour] = useState();
  const [endMinute, setEndMinute] = useState();
  const [workTime, setWorkTime] = useState();

  const TimeDiffernceCalculator = () => {
    const startHourNum = parseInt(startHour, 10);
    const startMinuteNum = parseInt(startMinute, 10);
    const endHourNum = parseInt(endHour, 10);
    const endMinuteNum = parseInt(endMinute, 10);

    const startTime = new Date();
    startTime.setHours(startHourNum, startMinuteNum, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHourNum, endMinuteNum, 0, 0);

    const timeDifference = endTime - startTime;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60)); // 밀리초를 시간으로 변환
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    ); // 나머지 -> 분

    const workTime = hours + minutes / 60;
    setWorkTime(workTime);
  };

  const addDateTimeInput = () => {
    setDateTimeInputs([...dateTimeInputs, { id: dateTimeInputs.length + 1 }]);
  };

  const onChangeWage = (e) => {
    setWage(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeStoreName = (e) => {
    setStoreName(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const onChangeStartHour = () => {
    setStartHour(e.target.value);
  };
  const onChangeStartMinute = () => {
    setStartMinute(e.target.value);
  };
  const onChangeEndHour = () => {
    setEndHour(e.target.value);
  };
  const onChangeEndMinute = () => {
    setEndMinute(e.target.value);
  };

  const onSubmit = () => {
    onCreate(title, storeName, address, workTime, wage, message);
  };

  // writing에서 onSubmit를 누르면 Router에서 props받은 onCreate함수가 실행되어 newJobData가 생성되고,
  // 이는 totalData에 저장된다. (totalData는 공고 list페이지로 props된다.)

  return (
    <Layout>
      <p>공고 제목</p>
      <Input placeholder="공고 제목을 입력해주세요" onChange={onChangeTitle} />
      <p>가게 이름</p>
      <Input
        placeholder="가게 이름을 입력해주세요"
        onChange={onChangeStoreName}
      />
      <p>직종</p>
      <label>
        <input
          type="checkbox"
          checked={isChecked1}
          onChange={(e) => setIsChecked1(e.target.checked)}
        ></input>
        학원
        <input
          type="checkbox"
          checked={isChecked2}
          onChange={(e) => setIsChecked2(e.target.checked)}
        ></input>
        과외
        <input
          type="checkbox"
          checked={isChecked3}
          onChange={(e) => setIsChecked3(e.target.checked)}
        ></input>
        주점
        <input
          type="checkbox"
          checked={isChecked4}
          onChange={(e) => setIsChecked4(e.target.checked)}
        ></input>
        식당
        <input
          type="checkbox"
          checked={isChecked5}
          onChange={(e) => setIsChecked5(e.target.checked)}
        ></input>
        카페
      </label>
      <p>주소</p>
      <Input placeholder="주소" onChange={onChangeAddress} />
      <p>급여계산기</p>
      {dateTimeInputs.map((input, index) => (
        <RowLayout key={input.id}>
          <input placeholder="월" />
          <input placeholder="일" />
          <input placeholder="시" onChange={onChangeStartHour} />
          <input placeholder="분" onChange={onChangeStartMinute} />
          <p>~</p>
          <input placeholder="시" onChange={onChangeEndHour} />
          <input placeholder="분" onChange={onChangeEndMinute} />
          <input placeholder="시급" onChange={onChangeWage} />
          {index === dateTimeInputs.length - 1 && (
            <button
              onClick={() => {
                addDateTimeInput();
              }}
            >
              +
            </button>
          )}
        </RowLayout>
      ))}
      <p>상세 정보</p>
      <DetailInput
        placeholder="많은 사람들이 보고 지원할 수 있도록, 공고에 대한 상세 정보를 작성해주세요.
        예) 00 직군 경험자 우대합니다. 인근 거주자 우대합니다."
        onChange={onChangeMessage}
      ></DetailInput>
      <Button onClick={() => onSubmit()}>작성 완료</Button>
    </Layout>
  );
};

const DetailInput = styled.input`
  width: 691px;
  height: 202px;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > input {
    width: 100px;
  }
`;

const Button = styled.button`
  width: 398px;
  height: 49px;
  border-radius: 15px;
  background: var(--surface-surface-primary, #ff5238);
  color: white;
`;

const Input = styled.input`
  width: 691px;
  height: 49px;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;

export default FindJobsWriting;
