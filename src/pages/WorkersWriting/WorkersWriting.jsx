import styled from 'styled-components';
import React from 'react';
const WorkersWriting = () => {
  return (
    <Container>
      <TitleBox>
        <h1>구직글 작성하기</h1>
        <p>매타 제안을 받기 위한 구직글을 작성해보세요!</p>
      </TitleBox>

      <ProfileSection>
        <ProfileCard>
          <ProfileImage />
          <ProfileInfo>
            <p>김서강</p>
            <span>남자 | 만 24세</span>
            <span>서강대학교 컴퓨터공학과 24학번</span>
          </ProfileInfo>
          <MannerTemperature>82°</MannerTemperature>
        </ProfileCard>
      </ProfileSection>

      <PreferenceSection>
        <h2>선호 직종</h2>
        <p>최대 3개까지 선택 가능합니다.</p>
        <CheckboxContainer>
          <label>
            <input type="checkbox" /> 학원
          </label>
          <label>
            <input type="checkbox" /> 과외
          </label>
          <label>
            <input type="checkbox" /> 주점
          </label>
          <label>
            <input type="checkbox" /> 식당
          </label>
          <label>
            <input type="checkbox" /> 카페
          </label>
        </CheckboxContainer>
      </PreferenceSection>

      <IntroductionSection>
        <h2>자기소개서</h2>
        <textarea placeholder="자기소개서를 입력해주세요" />
      </IntroductionSection>

      <SubmitButton>작성 완료</SubmitButton>
    </Container>
  );
};

//CSS
const Container = styled.div`
  padding: 50px;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 175px; /* Header의 height와 동일하게 설정 */
`;

const TitleBox = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 32px;
    font-weight: bold;
    position: relative;
    display: inline-block;
    margin-bottom: 10px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 100%;
      height: 10px;
      background-color: rgba(255, 69, 0, 0.5);
    }
  }

  p {
    font-size: 16px;
    color: #888;
  }
`;


const ProfileSection = styled.div`
  margin-bottom: 40px;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ProfileImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  flex: 1;

  p {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  span {
    display: block;
    font-size: 14px;
    color: #888;
  }
`;

const MannerTemperature = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #ff6b6b;
`;

const PreferenceSection = styled.div`
  margin-bottom: 40px;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #888;
    margin-bottom: 15px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  label {
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;

    input {
      margin-right: 8px;
    }
  }
`;

const IntroductionSection = styled.div`
  margin-bottom: 40px;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    resize: none;
    background-color: #f9f9f9;
  }

  textarea::placeholder {
    color: #bbb;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  color: #fff;
  background-color: #ff6b6b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e05555;
  }
`;

export default WorkersWriting;
