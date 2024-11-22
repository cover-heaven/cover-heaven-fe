import { useState } from 'react';
import styled from 'styled-components';

const TitleBox = styled.div`
  display: flex;
  gap: 15%;
`;
const StoreNameBox = styled.div`
  display: flex;
  gap: 15%;
`;
const JobTypeBox = styled.div`
  display: flex;
`;
const AddressBox = styled.div`
  display: flex;
  gap: 15%;
`;
const WorkConditionBox = styled.div`
  display: flex;
  gap: 15%;
`;
const DetailBox = styled.div``;

const FindJobsWriting = ({ onCreate }) => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [wage, setWage] = useState('');
  const [dateTimeInputs, setDateTimeInputs] = useState([{ id: 1 }]);
  const [title, setTitle] = useState('');
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState(''); // 단일 선택 상태
  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');
  const [workTime, setWorkTime] = useState(0);

  const tags = ['학원', '과외', '주점', '식당', '카페'];

  const handleTagChange = (tag) => {
    setSelectedTag(tag); // 단일 선택
  };

  const calculateWorkTime = () => {
    const start = parseInt(startHour, 10) * 60 + parseInt(startMinute, 10);
    const end = parseInt(endHour, 10) * 60 + parseInt(endMinute, 10);
    const totalMinutes = end - start;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours + minutes / 60;
  };

  const onSubmit = () => {
    const calculatedWorkTime = calculateWorkTime(); // 동기적 계산
    setWorkTime(calculatedWorkTime);

    onCreate(title, storeName, address, workTime, wage, message, selectedTag);
  };

  const addDateTimeInput = () => {
    setDateTimeInputs([...dateTimeInputs, { id: dateTimeInputs.length + 1 }]);
  };

  return (
    <Layout>
      <TitleBox>
        <p>공고 제목</p>
        <Input
          placeholder="공고 제목을 입력해주세요"
          onChange={(e) => setTitle(e.target.value)}
        />
      </TitleBox>
      <StoreNameBox>
        <p>가게 이름</p>
        <Input
          placeholder="가게 이름을 입력해주세요"
          onChange={(e) => setStoreName(e.target.value)}
        />
      </StoreNameBox>
      <JobTypeBox>
        <p>직종</p>
        {tags.map((tag) => (
          <label key={tag}>
            <input
              type="radio"
              onChange={() => handleTagChange(tag)}
              checked={selectedTag === tag}
            />
            {tag}
          </label>
        ))}
      </JobTypeBox>
      <AddressBox>
        <p>주소</p>
        <Input
          placeholder="주소를 입력해주세요"
          onChange={(e) => setAddress(e.target.value)}
        />
      </AddressBox>
      <WorkConditionBox>
        <p>근무 조건</p>
        {dateTimeInputs.map((input, index) => (
          <RowLayout key={input.id}>
            <input
              placeholder="월"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              placeholder="일"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              placeholder="시"
              onChange={(e) => setStartHour(e.target.value)}
            />
            <input
              placeholder="분"
              onChange={(e) => setStartMinute(e.target.value)}
            />
            <p>~</p>
            <input
              placeholder="시"
              onChange={(e) => setEndHour(e.target.value)}
            />
            <input
              placeholder="분"
              onChange={(e) => setEndMinute(e.target.value)}
            />
            <input
              placeholder="시급"
              onChange={(e) => setWage(e.target.value)}
            />
            {index === dateTimeInputs.length - 1 && (
              <button onClick={addDateTimeInput}>+</button>
            )}
          </RowLayout>
        ))}
      </WorkConditionBox>
      <DetailBox>
        <p>상세 정보</p>
        <DetailInput
          placeholder="상세 정보를 작성해주세요."
          onChange={(e) => setMessage(e.target.value)}
        />
      </DetailBox>
      <ButtonLayout>
        <Button onClick={onSubmit}>작성 완료</Button>
      </ButtonLayout>
    </Layout>
  );
};
const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 20%;
  padding-right: 20%;
`;

const RowLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > input {
    width: 100px;
  }
`;

const Input = styled.input`
  width: 691px;
  height: 49px;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;

const DetailInput = styled.textarea`
  width: 691px;
  height: 202px;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;

const Button = styled.button`
  width: 398px;
  height: 49px;
  border-radius: 15px;
  background: var(--surface-surface-primary, #ff5238);
  color: white;
`;

export default FindJobsWriting;
