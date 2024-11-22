import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [userData, setUserData] = useState(null); // 사용자 데이터
  const nav = useNavigate();

  // 로그인 상태를 로컬 스토리지에서 확인
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      // 로그인된 상태라면 사용자 정보를 가져오는 로직 실행
      fetchUserData();
    }
  }, []);

  const fetchUserData = () => {
    // 사용자 데이터를 가져오는 예제 로직
    setUserData({ name: 'John Doe', email: 'john@example.com' });
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserData(null);
    nav('/login');
  };

  return (
    <HeaderContainer>
      <TitleBox>
        <p>동문서잡</p>
      </TitleBox>
      <NavBar>
        <Button onClick={() => nav('/findjobslist')}>
          <p>단기알바 찾기</p>
        </Button>
        <Button onClick={() => nav('/workerslist')}>
          <p>구직자 찾기</p>
        </Button>
        <Button onClick={() => nav('/findjobswriting')}>
          <p>글쓰기</p>
        </Button>
      </NavBar>
      <Icon>
        {isLoggedIn ? (
          <>
            <Button onClick={() => nav('/chat')}>채팅</Button>
            <Button onClick={() => nav('/myprofile')}>프로필</Button>
            <LoginButton onClick={handleLogout}>
              <p>로그아웃</p>
            </LoginButton>
          </>
        ) : (
          <LoginButton onClick={() => nav('/login')}>
            <p>로그인/회원가입</p>
          </LoginButton>
        )}
      </Icon>
    </HeaderContainer>
  );
};

// Styled Components
const TitleBox = styled.div`
  color: orange;
  font-size: 28px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const NavBar = styled.div`
  display: flex;
  gap: 40px;
`;

const Button = styled.button`
  font-weight: bolder;
  cursor: pointer;
  background-color: transparent;
  border-color: transparent;

  & > p {
    font-size: 22px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
  }
`;

const Icon = styled.div`
  display: flex;
  gap: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #c3c3c3;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 175px;
  background-color: white;
`;

const LoginButton = styled.button`
  color: orange;
  background-color: transparent;
  border: none;
  cursor: pointer;

  & > p {
    font-size: 22px;
    font-weight: bold;
  }
`;

export default Header;
