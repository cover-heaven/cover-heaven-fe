import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import WorkersItem from '../../components/WorkersList/WorkersItem';

const WorkersList = ({ mockData1 }) => {
  return (
    <Container>
      <TitleBox>
        <p>구직자 찾기</p>
        <div>믿고 맡길 수 있는 동문 구직자를 찾아보세요!</div>
      </TitleBox>
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
      <WorkersContainer>
        {mockData1.map((data) => {
          return <WorkersItem data={data}></WorkersItem>;
        })}
      </WorkersContainer>
    </Container>
  );
};

/// CSS
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToggleBox = styled.select`
  padding: 5px;
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Container = styled.div`
  padding-top: 175px;
`;

const WorkersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;
export default WorkersList;
