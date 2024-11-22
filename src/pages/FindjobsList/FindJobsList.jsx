import FindJobsItem from '../../components/FindjobsList/FindJobsItem';
import { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar'; // 캘린더 라이브러리 (npm install react-calendar)
import 'react-calendar/dist/Calendar.css'; // 캘린더 스타일 적용

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 74px;
  padding-left: 14.2%;
  padding-right: 14.2%;
  gap: 84px;
`;

const JobsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 41px;
`;

const ListArray = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MainTitle = styled.div`
  font-size: 40px;
`;

const SubTitle = styled.div`
  font-size: 15px;
`;

const ToggleJobs = styled.select`
  width: 40%;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;

const ToggleDate = styled.div`
  position: relative;
  width: 80%;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 1px solid var(--border-border-primary, #e8e8e8);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  overflow: hidden;
  width: 259px;
  height: 313px;

  .react-calendar {
    width: 259px;
    height: 313px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    border-radius: 15px;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    background: #f8f8f8;
    border-bottom: 1px solid #e8e8e8;
  }

  .react-calendar__month-view__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    height: 30px;
    background: #f0f0f0;
    padding: 5px 0;
  }

  .react-calendar__tile {
    text-align: center;
    padding: 15px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  .react-calendar__tile--active {
    background: #f66a24;
    color: white;
    border-radius: 10px;
  }

  .react-calendar__tile--hover {
    background: rgba(246, 106, 36, 0.1);
  }

  .react-calendar__month-view__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 50px;
  }

  .react-calendar__tile--now {
    background: rgba(246, 106, 36, 0.1);
    border-radius: 10px;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Toggle = styled.div`
  display: flex;
  gap: 16px;
`;

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 39px;
`;

const TitleContainter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SearchInput = styled.input`
  width: 29%;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 1px solid #ede6e6;
  background: #fff;
`;

const FindJobsList = ({ totalData }) => {
  const [searchData, setSearchData] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [showCalendar, setShowCalendar] = useState(false); // 캘린더 표시 여부
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜

  const onChangeSearch = (e) => {
    setSearchData(e.target.value);
  };

  const onChangeJob = (e) => {
    setSelectedJob(e.target.value);
  };

  const onToggleCalendar = () => {
    setShowCalendar((prev) => !prev); // 캘린더 표시 상태 토글
  };

  const onDateChange = (date) => {
    setSelectedDate(date); // 선택된 날짜 업데이트
    setShowCalendar(false); // 날짜 선택 후 캘린더 숨김
  };

  const filteredData = () => {
    return totalData
      .filter((data) =>
        searchData
          ? data.title.toLowerCase().includes(searchData.toLowerCase())
          : true,
      )
      .filter((data) => (selectedJob ? data.job_tag === selectedJob : true));
  };

  return (
    <Layout>
      <SubHeader>
        <TitleContainter>
          <MainTitle>단기알바 찾기</MainTitle>
          <SubTitle>
            단기로 일할 수 있는 아르바이트 공고를 한 눈에 확인해보세요
          </SubTitle>
        </TitleContainter>
        <Filter>
          <Toggle>
            <ToggleDate onClick={onToggleCalendar}>
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : '원하는 근무 일자를 선택하세요'}
              {showCalendar && (
                <CalendarWrapper>
                  <Calendar
                    onChange={onDateChange}
                    formatDay={(locale, date) => date.getDate()} // 날짜를 숫자로만 표시
                  />
                </CalendarWrapper>
              )}
            </ToggleDate>
            <ToggleJobs onChange={onChangeJob}>
              <option value="">직종</option>
              <option value="과외">과외</option>
              <option value="주점">주점</option>
              <option value="식당">식당</option>
              <option value="카페">카페</option>
              <option value="학원">학원</option>
              <option value="기타">기타</option>
            </ToggleJobs>
          </Toggle>
          <SearchInput
            onChange={onChangeSearch}
            placeholder="검색어를 입력해주세요"
          />
        </Filter>
      </SubHeader>
      <JobsListContainer>
        <ListArray>
          <div>
            <button onClick={() => setSelectedJob('')}>전체</button>
            <span>|</span>
            <button onClick={() => alert('급구 필터를 선택했습니다.')}>
              급구
            </button>
          </div>
          <div>
            <select>
              <option>최신순</option>
              <option>총급여순</option>
              <option>시급높은순</option>
            </select>
          </div>
        </ListArray>
        <ItemList>
          {filteredData().map((data) => (
            <FindJobsItem data={data} key={data.id} />
          ))}
        </ItemList>
      </JobsListContainer>
    </Layout>
  );
};

export default FindJobsList;
