<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import './Header.css';
const Header = () => {
	const nav = useNavigate();
	return (
		<div className="Header">
			<div className="Title">
				<div>동문서잡</div>
			</div>
			<div className="NavBar">
				<button
					onClick={() => {
						nav('/findjobslist');
					}}
				>
					<p>단기알바 찾기</p>
				</button>
				<button
					onClick={() => {
						nav('/workerslist');
					}}
				>
					<p>구직자 찾기</p>
				</button>
				<button
					onClick={() => {
						nav('/findjobswriting');
					}}
				>
					<p>글쓰기</p>
				</button>
			</div>
			<div className="Icon">
				<button
					onClick={() => {
						nav('/chatlist');
					}}
				>
					로그인
				</button>
				<button
					onClick={() => {
						nav('/signup');
					}}
				>
					회원가입
				</button>
			</div>
		</div>
	);
=======
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
=======
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
>>>>>>> 98b3212 (Feat: Header  workerswriting workerslist)

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [userData, setUserData] = useState(null); // 사용자 데이터
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 글쓰기 메뉴 드롭다운 상태
  const nav = useNavigate();

  // 로그인 상태를 로컬 스토리지에서 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      // API 호출
      const response = await axios.get("/users/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
    }
  };

  const handleLogin = async (userId, password) => {
    try {
      const response = await axios.post("/users/login", { user_id: userId, password });
      const { accessToken, refreshToken } = response.data;

      // 토큰을 localStorage에 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setIsLoggedIn(true);
      fetchUserData();
      nav("/");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setUserData(null);
    nav("/login");
  };

  return (
    <HeaderContainer
      onMouseLeave={() => setIsDropdownOpen(false)}
      isDropdownOpen={isDropdownOpen}
    >
      <HeaderContent>
        <TitleBox>
          <p>동문서잡</p>
        </TitleBox>
        <NavBar>
          <Button onClick={() => nav("/findjobslist")}>
            <p>단기알바 찾기</p>
          </Button>
          <Button onClick={() => nav("/workerslist")}>
            <p>구직자 찾기</p>
          </Button>
          <Button
            onMouseEnter={() => setIsDropdownOpen(true)}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <p>글쓰기</p>
          </Button>
        </NavBar>
        <Icon>
          {isLoggedIn ? (
            <>
              <Button onClick={() => nav("/chat")}>채팅</Button>
              <Button onClick={() => nav("/myprofile")}>프로필</Button>
              <LoginButton onClick={handleLogout}>
                <p>로그아웃</p>
              </LoginButton>
            </>
          ) : (
            <LoginButton onClick={() => nav("/login")}>
              <p>로그인/회원가입</p>
            </LoginButton>
          )}
        </Icon>
      </HeaderContent>
      {isDropdownOpen && (
        <DropdownSection>
          <DropdownItem onClick={() => nav("/findjobswriting")}>
            대타공고
          </DropdownItem>
          <DropdownItem onClick={() => nav("/workerswriting")}>
            구직글
          </DropdownItem>
        </DropdownSection>
      )}
    </HeaderContainer>
  );
>>>>>>> 7c1e37e (Feat: 헤더 수정)
};

// Styled Components
const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  border-bottom: 1px solid #c3c3c3;
  transition: height 0.3s ease;
  height: ${({ isDropdownOpen }) => (isDropdownOpen ? "225px" : "175px")};
  overflow: hidden; /* 내용이 넘치지 않도록 */
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 175px; /* 기본 헤더 높이 */
`;

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
  position: relative;
`;

const Button = styled.button`
  font-weight: bolder;
  cursor: pointer;
  background-color: transparent;
  border: none;

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

const DropdownSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 50px; /* 헤더 확장 부분의 높이 */
  border-top: 1px solid #eaeaea;
`;

const DropdownItem = styled.div`
  margin: 0 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;

  &:hover {
    color: orange;
  }
`;

export default Header;
