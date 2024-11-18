import FindJobsItem from '../../components/FindjobsList/FindJobsItem';
import { useState } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 74px;
  padding-left: 215px;
  background-color:;
  gap: 84px;
`;

const JobsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 41px;
  padding-right: 215px;
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
  width: 150px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;

const ToggleDate = styled.select`
  width: 259px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 1px solid var(--border-border-primary, #e8e8e8);
  background: #fff;
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
  width: 440px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 1px solid #ede6e6;
  background: #fff;
  margin-right: 215px;
`;

const FindJobsList = ({ totalData }) => {
  const [searchData, setSearchData] = useState('');

  const onChange = (e) => {
    setSearchData(e.target.value);
  };

  const searchedData = () => {
    if (searchData === '') {
      return totalData;
    } else {
      return totalData.filter((data) =>
        data.title.toLowerCase().includes(searchData.toLowerCase()),
      );
    }
  };

  const filteredButton = (e) => {
    const buttonValue = e.target.value;

    if (buttonValue == 'total') {
      return totalData;
    } else {
      alert('급구');
    }
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
            <ToggleDate>
              <option>원하는 근무 일자를 선택하세요</option>
            </ToggleDate>
            <ToggleJobs>
              <option>직종</option>
              <option>과외</option>
              <option>주점</option>
              <option>식당</option>
              <option>카페</option>
              <option>학원</option>
              <option>기타</option>
            </ToggleJobs>
          </Toggle>
          <SearchInput
            onChange={onChange}
            placeholder="검색어를 입력해주세요"
          />
        </Filter>
      </SubHeader>
      <JobsListContainer>
        <ListArray>
          <div>
            <button value="total" onClick={filteredButton}>
              전체
            </button>
            <span>|</span>
            <button value="quick" onClick={filteredButton}>
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
          {searchedData().map((data) => (
            <FindJobsItem data={data} key={data.id} />
          ))}
        </ItemList>
      </JobsListContainer>
    </Layout>
  );
};

export default FindJobsList;
