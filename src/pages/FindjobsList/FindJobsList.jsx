import FindJobsItem from '../../components/FindjobsList/FindJobsItem';
import './FindJobsList.css';
import Filter from '../../components/common/Filter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 스타일드 컴포넌트 정의
const FindJobsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 31px;
  padding-top: 238px;
  background-color: #f5f5f5;
`;

const SearchBox = styled.div`
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

const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 31px;
`;

const FindJobsListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

// 새롭게 정의된 스타일드 컴포넌트들
const FindJobs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 31px;
  padding-top: 238px;
  background-color: #f5f5f5;
`;

const FilterXFindJobsList = styled.div`
  display: flex;
  padding-left: 206px;
  gap: 59px;
`;

const SearchFindJobsItemInput = styled.input`
  &:focus {
    outline: none;
  }
`;

const SearchFindJobsItemButton = styled.button`
  width: 80px;
  height: 58px;
  background-color: #fff;
  border-radius: 0px 20px 20px 0px;
`;

// JSX 컴포넌트
const FindJobsList = ({ totalData }) => {
  const [searchData, setSearchData] = useState('');

  const onChange = (e) => {
    setSearchData(e.target.value);
  };

  const nav = useNavigate();

  const filteredData = () => {
    if (searchData === '') {
      return totalData;
    } else {
      return totalData.filter((data) =>
        data.name.toLowerCase().includes(searchData.toLowerCase()),
      );
    }
  };

  return (
    <FindJobsLayout>
      <SearchBox>
        <SearchFindJobsItemInput
          onChange={onChange}
          placeholder="검색어를 입력해주세요"
        />
        <SearchFindJobsItemButton>검색</SearchFindJobsItemButton>
      </SearchBox>
      <FilterXFindJobsList>
        <FilterBox>
          <div>필터</div>
          <Filter />
        </FilterBox>
        <FindJobsListBox>
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
        </FindJobsListBox>
      </FilterXFindJobsList>
    </FindJobsLayout>
  );
};

export default FindJobsList;
