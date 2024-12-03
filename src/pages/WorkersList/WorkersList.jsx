import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';
import WorkersItem from '../../components/WorkersList/WorkersItem';

const WorkersList = ({ mockData1 }) => {
  return (
    <Container>
      {/* 제목 섹션 */}
      <TitleBox>
        <p>구직자 찾기</p>
        <div>믿고 맡길 수 있는 동문 구직자를 찾아보세요!</div>
      </TitleBox>

      {/* 필터 섹션 */}
      <FilterContainer>
        <ToggleContainer>
          <ToggleBox>
            <option>나이</option>
            <option>20대</option>
            <option>30대</option>
            <option>40대 이상</option>
          </ToggleBox>
          <ToggleBox>
            <option>성별</option>
            <option>남성</option>
            <option>여성</option>
          </ToggleBox>
          <ToggleBox>
            <option>선호직종</option>
            <option>IT</option>
            <option>교육</option>
            <option>서비스</option>
          </ToggleBox>
        </ToggleContainer>
        <RightToggleContainer>
          <option>최신순</option>
          <option>온도순</option>
        </RightToggleContainer>
      </FilterContainer>

      {/* 구직자 리스트 */}
      <WorkersContainer>
        {mockData1.map((data, index) => (
          <WorkersItem key={index} data={data} />
        ))}
      </WorkersContainer>
    </Container>
  );
};

/// CSS

const Container = styled.div`
  padding-top: 175px;
`;

const TitleBox = styled.div`
  background-color: #fff;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & > p {
    font-size: 40px;
    margin-left: 3%;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 5px;
      width: 100%;
      height: 12px;
      background-color: rgba(255, 69, 0, 0.5);
    }
  }
  & > div {
    margin-left: 3%;
    margin-top: 10px;
    font-size: 16px;
    color: #888;
  }
`;

const FilterContainer = styled.div`
  background-color: #f7f7f7;
  padding: 15px 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ToggleBox = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: #fff;
`;

const RightToggleContainer = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: #fff;
`;

const WorkersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px 2%;
  background-color: #f9f9f9;
`;

export default WorkersList;
