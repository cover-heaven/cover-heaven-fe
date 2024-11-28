import { useState } from 'react';
import styled from 'styled-components';
import WorkingTime from '../../components/FindJobsWriting/WorkingTime';
import axios from 'axios';
import Calendar from 'react-calendar';
import { useStyleSheetContext } from 'styled-components/dist/models/StyleSheetManager';

// Styled Components
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
const ItemLayout = styled.div`
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
const DateBox = styled.div`
  width: 100%;
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

// Main Component
const FindJobsWriting = () => {
  const [dateTimeInputs, setDateTimeInputs] = useState([
    {
      id: 1,
      time: '',
      timeString: '',
      wage: '',
      content: false,
      isOpen: false,
      date: '',
    },
  ]);

  const [title, setTitle] = useState('');
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [error, setError] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [workDetail, setWorkDetail] = useState([]);

  const makeWorkDetail = () => {
    setWorkDetail(
      dateTimeInputs.map((input) => ({
        work_date: input.date,
        work_hour: input.time,
        hourly_wage: input.time * input.wage,
      })),
    );
  };

  // 서버 전송
  const onSubmit = async () => {
    try {
      makeWorkDetail();
      await axios.post('/job-offers', {
        title: title,
        store_name: storeName,
        job_tag: selectedTag,
        address: address,
        work_detail: workDetail,
        context: message,
      });
    } catch (err) {
      setError(err);
    }
  };

  const tags = ['학원', '과외', '주점', '식당', '카페'];
  // 근무일자 추가
  const onClickAddButton = () => {
    setDateTimeInputs((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        time: '',
        timeString: '',
        wage: '',
        content: false,
        isOpen: false,
        date: '',
      },
    ]);
  };

  // 근무일자 삭제: ID값이 일치하지 않는 것들만 렌더링 (일치하는 걸 삭제하는 게 아니라 렌더링하지 않음)
  const onDelete = (id) => {
    setDateTimeInputs((prev) => prev.filter((input) => input.id !== id));
  };

  // 특정 입력 항목 업데이트
  const updateInput = (id, field, value) => {
    setDateTimeInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, [field]: value } : input,
      ),
    );
  };

  // WorkingTime 열기
  const openWorkingTime = (id) => {
    setDateTimeInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, content: true } : input,
      ),
    );
  };

  // WorkingTime 닫기
  const closeWorkingTime = (id) => {
    setDateTimeInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, content: false } : input,
      ),
    );
  };

  // Calendar 열기
  const openCalendar = (id) => {
    setDateTimeInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, isOpen: true } : input,
      ),
    );
  };

  // Calendar 닫기
  const closeCalendar = (id) => {
    setDateTimeInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, isOpen: false } : input,
      ),
    );
  };

  // date 추가
  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setDateTimeInputs((inputs) =>
      inputs.map((input) =>
        input.isOpen ? { ...input, date: formattedDate, isOpen: false } : input,
      ),
    );
  };

  // 근무 시간 계산
  const calculateWorkTime = (startHour, startMinute, endHour, endMinute) => {
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    const totalMinutes =
      endTimeInMinutes >= startTimeInMinutes
        ? endTimeInMinutes - startTimeInMinutes
        : 24 * 60 - startTimeInMinutes + endTimeInMinutes;

    return totalMinutes / 60;
  };

  // WorkingTime 데이터를 업데이트
  const upDateWorkingTime = (
    id,
    startHour,
    startMinute,
    endHour,
    endMinute,
  ) => {
    const timeStr = `${startHour}시 ${startMinute}분 - ${endHour}시 ${endMinute}분`;
    updateInput(id, 'timeString', timeStr);

    const totalHours = calculateWorkTime(
      startHour,
      startMinute,
      endHour,
      endMinute,
    );
    updateInput(id, 'time', totalHours);
  };

  // 태그 변경
  const handleTagChange = (tag) => {
    setSelectedTag(tag);
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
          {dateTimeInputs.map((input) => (
            <ItemLayout key={input.id}>
              <RowLayout>
                <DateBox>
                  <Input
                    onClick={() => openCalendar(input.id)}
                    placeholder="2024년 11월 23일 (토)"
                    value={input.date}
                  />
                  {input.isOpen && (
                    <Calendar onChange={handleDateChange}></Calendar>
                  )}
                </DateBox>
                <TimeBox>
                  <Input
                    onClick={() => openWorkingTime(input.id)}
                    placeholder="00시 00분 - 00시 00분"
                    value={input.timeString}
                  />
                  {input.content && (
                    <WorkingTime
                      upDateWorkingTime={(
                        startHour,
                        startMinute,
                        endHour,
                        endMinute,
                      ) =>
                        upDateWorkingTime(
                          input.id,
                          startHour,
                          startMinute,
                          endHour,
                          endMinute,
                        )
                      }
                      setContent={() => closeWorkingTime(input.id)}
                      onMove={(workTime) =>
                        updateInput(input.id, 'time', workTime)
                      }
                    />
                  )}
                </TimeBox>
                <InputBox
                  onChange={(e) =>
                    updateInput(input.id, 'wage', e.target.value)
                  }
                  placeholder="시급 00,000원"
                  value={input.wage}
                />
                <DeleteBox onClick={() => onDelete(input.id)}>X</DeleteBox>
              </RowLayout>
              <div>
                <TotalWage>
                  일급 {(input.time * input.wage || 0).toLocaleString()}원
                </TotalWage>
              </div>
            </ItemLayout>
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
  );
};

export default FindJobsWriting;
