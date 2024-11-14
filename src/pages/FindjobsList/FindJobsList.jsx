import FindJobsItem from '../../components/FindjobsList/FindJobsItem';
import Filter from '../../components/common/Filter';
import { useState } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 31px;
  padding-top: 238px;
  background-color: #f5f5f5;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 755px;

  & > input {
    padding-left: 25px;
    width: 427px;
    height: 56px;
    border-radius: 20px 0px 0px 20px;
    background-color: #fff;
    border: none;
  }

  & > input:focus {
    outline: none;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 31px;
`;

const JobsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const FilterAndJobsContainer = styled.div`
  display: flex;
  padding-left: 206px;
  gap: 59px;
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
      <SearchContainer>
        <SearchInput onChange={onChange} placeholder="검색어를 입력해주세요" />
        <SearchButton>검색</SearchButton>
      </SearchContainer>
      <FilterAndJobsContainer>
        <FilterContainer>
          <p>필터</p>
          <Filter />
        </FilterContainer>
        <JobsListContainer>
          <div>
            <button>전체</button>
            <span>|</span>
            <button>급구</button>
          </div>
          <div>
            {filteredData().map((data) => (
              <FindJobsItem data={data} key={data.id} />
            ))}
          </div>
        </JobsListContainer>
      </FilterAndJobsContainer>
    </Layout>
  );
};

export default FindJobsList;
