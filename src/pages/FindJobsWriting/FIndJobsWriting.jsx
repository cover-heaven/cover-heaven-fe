import { useState, useMemo } from 'react';
import styled from 'styled-components';
import WorkingTime from '../../components/FindJobsWriting/WorkingTime';
import axios from 'axios';

const TitleBox = styled.div`
  display: flex;
`;
const StoreNameBox = styled.div`
  display: flex;
`;
const JobTypeBox = styled.div`
  display: flex;
`;
const AddressBox = styled.div`
  display: flex;
`;
const WorkConditionBox = styled.div`
  display: flex;
`;
const DetailBox = styled.div`
  display: flex;
`;
const AddressInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const P = styled.div`
  min-width: 108px;
  padding-right: 15%;
  margin: 0;
`;
const ButtonLayout = styled.div`
  display: flex;
  justify-content: right;
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-left: 20%;
  padding-right: 20%;
`;
const RowLayout = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  height: 49px;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;
const InputBox = styled.input`
  width: 80%;
  height: 49px;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;
const DetailInput = styled.textarea`
  width: 100%;
  height: 202px;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;
const Button = styled.button`
  width: 212px;
  height: 49px;
  border-radius: 15px;
  background: var(--surface-surface-primary, #ff5238);
  color: white;
`;
const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
const AddButton = styled.button`
  width: 100%;
  height: 49px;
  padding: 15px 168px;
  border-radius: 15px;
  border: 1px solid var(--surface-surface-primary, #ff5238);
  background: #fff;
  color: #ff5238;
`;
const MainTitle = styled.div`
  font-size: 40px;
`;
const SubTitle = styled.div`
  font-size: 15px;
`;
const TitleContainter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 5% 0;
`;
const AddButtonLayout = styled.div`
  display: flex;
  justify-content: center;
`;
const Tag = styled.div`
  width: 100%;
  display: flex;
`;
const Label = styled.label`
  flex: 1;
`;
const TimeBox = styled.div`
  width: 100%;
`;
const TotalWage = styled.div`
  padding-left: 87.5%;
`;
const DeleteBox = styled.button`
  width: 49px;
  height: 49px;
  border-radius: 15px;
  background: var(--border-border-secondary, #c3c3c3);
`;

const FindJobsWriting = () => {
  const [wage, setWage] = useState('');
  const [dateTimeInputs, setDateTimeInputs] = useState([{ id: 1 }]);
  const [title, setTitle] = useState('');
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState(''); // 단일 선택 상태
  const [content, setContent] = useState(false);
  const [error, setError] = useState();
  const [time, setTime] = useState();
  const [timeString, setTimeString] = useState();

  const timeWage = time * wage;

  const tags = ['학원', '과외', '주점', '식당', '카페'];

  const onClickWorkingTime = () => {
    setContent(true);
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
  };

  const onClickAddButton = () => {
    setDateTimeInputs((prev) => [...prev, { id: prev.length + 1 }]);
    setTimeString('');
  };

  const onDelete = (id) => {
    const updateItem = dateTimeInputs.filter((data) => data.id !== id);
    setDateTimeInputs(updateItem);
  };

  const onMove = (workTime) => {
    setTime(workTime);
  };

  const onDataMove = (startHour, startMinute, endHour, endMinute) => {
    setTimeString(
      `${startHour}시 ${startMinute}분 - ${endHour}시 ${endMinute}분`,
    );
  };

  const onSubmit = async () => {
    try {
      await axios.post('/job-offers', {
        title,
        wage,
        store_name: storeName,
        address,
        context: message,
        job_tag: selectedTag,
      });
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Layout>
      <TitleContainter>
        <MainTitle>대타 공고 작성하기</MainTitle>
        <SubTitle>
          단기로 일할 수 있는 아르바이트 공고를 한 눈에 확인해보세요
        </SubTitle>
      </TitleContainter>
      <TitleBox>
        <P>공고 제목</P>
        <Input
          placeholder="공고 제목을 입력해주세요"
          onChange={(e) => setTitle(e.target.value)}
        />
      </TitleBox>
      <StoreNameBox>
        <P>근무지명</P>
        <Input
          placeholder="가게 이름을 입력해주세요"
          onChange={(e) => setStoreName(e.target.value)}
        />
      </StoreNameBox>
      <JobTypeBox>
        <P>직종</P>
        <Tag>
          {tags.map((tag) => (
            <Label key={tag}>
              <input
                type="radio"
                onChange={() => handleTagChange(tag)}
                checked={selectedTag === tag}
              />
              {tag}
            </Label>
          ))}
        </Tag>
      </JobTypeBox>
      <AddressBox>
        <P>주소</P>
        <AddressInput>
          <Input
            placeholder="상호명으로 주소를 검색하세요."
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input placeholder="상세 주소를 작성해주세요." />
        </AddressInput>
      </AddressBox>
      <WorkConditionBox>
        <P>근무 조건</P>
        <ColumnLayout>
          {dateTimeInputs.map((input, index) => (
            <ColumnLayout>
              <RowLayout key={input.id}>
                <Input placeholder="2024년 11월 23일 (토)" />
                <TimeBox>
                  <Input
                    onClick={onClickWorkingTime}
                    placeholder="00시 00분 - 00시 00분"
                    value={timeString}
                  />
                  {content && (
                    <WorkingTime
                      onDataMove={onDataMove}
                      setContent={setContent}
                      onMove={onMove}
                    ></WorkingTime>
                  )}
                </TimeBox>
                <InputBox
                  onChange={(e) => setWage(e.target.value)}
                  placeholder="시급 00,000원"
                />
                <DeleteBox onClick={() => onDelete(input.id)}>X</DeleteBox>
              </RowLayout>
              <div>
                <TotalWage>일급 {timeWage.toLocaleString()}원</TotalWage>
              </div>
            </ColumnLayout>
          ))}
          <AddButtonLayout>
            <AddButton onClick={onClickAddButton}>
              + 근무일자 추가하기
            </AddButton>
          </AddButtonLayout>
        </ColumnLayout>
      </WorkConditionBox>
      <DetailBox>
        <P>상세 정보</P>
        <DetailInput
          placeholder="상세 정보를 작성해주세요."
          onChange={(e) => setMessage(e.target.value)}
        />
      </DetailBox>
      <ButtonLayout>
        <Button onClick={() => onSubmit()}>작성 완료</Button>
      </ButtonLayout>
    </Layout>
  ); // 버튼 클릭시 onSubmit 함수가 실행되면서 서버로 데이터 전송
};

export default FindJobsWriting;
