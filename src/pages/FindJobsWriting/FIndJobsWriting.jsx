import { useState } from 'react';
import styled from 'styled-components';

const FindJobsWriting = ({ onCreate }) => {
  const [wage, setWage] = useState();
  const [dateTimeInputs, setDateTimeInputs] = useState([{ id: 1 }]);
  const [firstHour, setFirstHour] = useState(0);
  const [secondHour, setSecondHour] = useState(0);
  const [timeSave, setTimeSave] = useState([]);
  const [title, setTitle] = useState();
  const [storeName, setStoreName] = useState();
  const [address, setAddress] = useState();
  const [message, setMessage] = useState();
  const [timePeriod, setTimePeriod] = useState();

  const onChangeFirstHour = (e) => {
    setFirstHour(e.target.value);
  };

  const onChangeSecondHour = (e) => {
    setSecondHour(e.target.value);
  };

  const onChangeTimeMinus = () => {
    const timeMinus = secondHour - firstHour;
    setTimeSave([...timeSave, timeMinus]);
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

  const onChangeTimePeriod = (e) => {
    setTimePeriod(e.target.value);
  };

  const onSubmit = () => {
    onCreate(title, storeName, address, wage, message);
  };

  return (
    <Layout>
      <Input placeholder="글제목" onChange={onChangeTitle} />
      <Input placeholder="가게이름" onChange={onChangeStoreName} />
      <Input placeholder="주소" onChange={onChangeAddress} />
      {dateTimeInputs.map((input, index) => (
        <RowLayout key={input.id}>
          <Input placeholder="월" />
          <p>월</p>
          <Input placeholder="일" />
          <p>일</p>
          <Input onChange={onChangeFirstHour} placeholder="시" />
          <p>시</p>
          <select name="시간대">
            <option value="AM"> AM </option>
            <option value="PM"> PM </option>
          </select>
          <Input placeholder="분" />
          <p>분</p>
          <p>~</p>
          <Input onChange={onChangeSecondHour} placeholder="시" />
          <select name="시간대" onChange={onChangeTimePeriod}>
            <option value="AM"> AM </option>
            <option value="PM"> PM </option>
          </select>
          <p>시</p>
          <Input placeholder="분" />
          <p>분</p>
          {index === dateTimeInputs.length - 1 && (
            <Button
              onClick={() => {
                addDateTimeInput();
                onChangeTimeMinus();
              }}
            >
              +
            </Button>
          )}
        </RowLayout>
      ))}
      <Input placeholder="시급" onChange={onChangeWage} />
      <Input
        placeholder="상세내용 (이런 사람을 구해요)"
        onChange={onChangeMessage}
      ></Input>
      <Button onClick={() => onSubmit()}>제출</Button>
    </Layout>
  );
};

const Layout = styled.div`
  padding-top: 175px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 60px;
  height: 40px;
  border: 1px solid black;
`;

const Input = styled.input`
  padding: 15px;
`;

export default FindJobsWriting;
