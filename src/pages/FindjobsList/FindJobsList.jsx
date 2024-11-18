import FindJobsItem from '../../components/FindjobsList/FindJobsItem';
import { useState } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 74px;
  background-color:;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 857px;

  & > input {
    width: 440px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 15px;
    border: 1px solid #ede6e6;
    background: #fff;
  }

  & > input:focus {
    outline: none;
  }
`;

const JobsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 41px;
  padding-left: 215px;
  padding-right: 215px;
`;

const SearchInput = styled.input`
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 80px;
  height: 58px;
  background-color: #fff;
  border-radius: 0px 20px 20px 0px;
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

const TitleContainter = styled.div`
  padding-left: 215px;
`;

const FindJobsList = ({ totalData }) => {
  const [searchData, setSearchData] = useState('');

  const onChange = (e) => {
    setSearchData(e.target.value);
  };

  const filteredData = () => {
    if (searchData === '') {
      return totalData;
    } else {
      return totalData.filter((data) =>
        data.title.toLowerCase().includes(searchData.toLowerCase()),
      );
    }
  };

  return (
    <Layout>
      <TitleContainter>
        <MainTitle>단기알바찾기</MainTitle>
        <SubTitle>
          단기로 일할 수 있는 아르바이트 공고를 한 눈에 확인해보세요
        </SubTitle>
      </TitleContainter>
      <SearchContainer>
        <SearchInput onChange={onChange} placeholder="검색어를 입력해주세요" />
      </SearchContainer>
      <JobsListContainer>
        <ListArray>
          <div>
            <button>전체</button>
            <span>|</span>
            <button>급구</button>
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
