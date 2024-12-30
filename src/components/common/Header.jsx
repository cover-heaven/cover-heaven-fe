import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import logoImg from '../../assets/icon/logo_header.svg';
import { instance } from '../../api/instance';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	Border_Secondary,
	Surface_Primary,
	Text_Primary
} from '../../styles/color';
import chatIcon from '../../assets/icon/icon_chat_header2.png';
import profileIcon from '../../assets/icon/icon_profile_header.svg';

const getUserInfo = async () => {
	const headers = {
		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
	};
	try {
		const response = await instance.get(`/users/info`, {
			headers
		});
		if (response.status === 200) {
			return {
				name: response.data.name,
				school: response.data.school,
				profile: response.data.profile
			};
		}
	} catch (err) {
		// alert(err);
		return false;
	}
};

const Header = () => {
	const location = useLocation();
	const nav = useNavigate();
	const [isLogin, setIsLogin] = useState(false);
	const [userInfo, setUserInfo] = useState({
		profile: null,
		name: '',
		school: ''
	});

	useEffect(() => {
		const fetchUserInfo = async () => {
			if (localStorage.getItem('accessToken')) {
				const res = await getUserInfo();
				if (res) {
					setUserInfo(res);
					setIsLogin(true);
				}
			} else {
				setIsLogin(false);
			}
		};

		fetchUserInfo();
	}, [location.pathname]);

	return (
		<div className={`Header ${location.pathname === '/' ? 'IsLanding' : ''}`}>
			<img
				className="Title"
				src={logoImg}
				onClick={() => {
					nav('/');
				}}
			/>
			<div className="NavBar">
				<button
					className={location.pathname === '/findjobslist' ? 'Selected' : ''}
					onClick={() => {
						if (isLogin) {
							nav('/findjobslist');
						} else {
							alert('로그인 후 이용 가능합니다!');
							nav('/login');
						}
					}}
				>
					<p>단기알바 찾기</p>
				</button>
				<button
					className={location.pathname === '/workerslist' ? 'Selected' : ''}
					onClick={() => {
						if (isLogin) {
							nav('/workerslist');
						} else {
							alert('로그인 후 이용 가능합니다!');
							nav('/login');
						}
					}}
				>
					<p>구직자 찾기</p>
				</button>
				<button
					className={location.pathname === '/findjobswriting' ? 'Selected' : ''}
					onClick={() => {
						if (isLogin) {
							nav('/findjobswriting');
						} else {
							alert('로그인 후 이용 가능합니다!');
							nav('/login');
						}
					}}
				>
					<p>공고글쓰기</p>
				</button>
				<button
					className={location.pathname === '/workerswriting' ? 'Selected' : ''}
					onClick={() => {
						if (isLogin) {
							nav('/workerswriting');
						} else {
							alert('로그인 후 이용 가능합니다!');
							nav('/login');
						}
					}}
				>
					<p>구직글쓰기</p>
				</button>
			</div>
			{isLogin ? (
				<UserSection>
					<ProfileWrapper
						onClick={() => {
							nav('/myprofile');
						}}
					>
						<ProfileImg
							src={userInfo.profile ? userInfo.profile : profileIcon}
						/>
						<ProfileText>{`${userInfo.name} | ${userInfo.school.slice(0, -2)}`}</ProfileText>
					</ProfileWrapper>
					<ChatImg
						src={chatIcon}
						onClick={() => {
							nav('/chatlist');
						}}
					/>
				</UserSection>
			) : (
				<LoginBtn
					onClick={() => {
						nav('/login');
					}}
				>
					로그인 / 회원가입
				</LoginBtn>
			)}
		</div>
	);
};

export default Header;

const UserSection = styled.section`
	display: flex;
	gap: calc(27 / 1512 * 100vw);
	align-items: center;
`;

const ProfileWrapper = styled.div`
	display: flex;
	gap: calc(12 / 1512 * 100vw);
	align-items: center;
	cursor: pointer;
`;

const ProfileImg = styled.img`
	width: calc(40 / 1512 * 100vw);
	border-radius: 50%;
	background-image: url(${(props) => props.bgImg});
	object-fit: cover;
`;

const ProfileText = styled.span`
	color: ${Text_Primary};
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	&:hover {
		color: ${Surface_Primary};
	}
`;

const ChatImg = styled.img`
	width: calc(29 / 1512 * 100vw);
	cursor: pointer;
	&:hover {
		filter: brightness(0) saturate(100%) invert(43%) sepia(48%) saturate(2574%)
			hue-rotate(336deg) brightness(98%) contrast(106%);
	}
`;

const LoginBtn = styled.button`
	display: flex;
	width: calc(211 / 1512 * 100vw);
	height: calc(42 / 86 * 100%);
	padding: calc(9 / 1512 * 100vw) 0;
	justify-content: center;
	align-items: center;
	flex-shrink: 0; 
	border-radius: 30px;
	background: ${Surface_Primary};
	color: #fff;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	border: 1px solid ${Surface_Primary};
	transition:
		background 0.2s,
		color 0.2s;
	&:hover {
		background: transparent;
		color: ${Surface_Primary};
	}
`;

// =======
// import styled from 'styled-components';
// import React, { useState, useEffect } from 'react';
// =======
// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// >>>>>>> 98b3212 (Feat: Header  workerswriting workerslist)

// const Header = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
//   const [userData, setUserData] = useState(null); // 사용자 데이터
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 글쓰기 메뉴 드롭다운 상태
//   const nav = useNavigate();

//   // 로그인 상태를 로컬 스토리지에서 확인
//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       setIsLoggedIn(true);
//       fetchUserData();
//     }
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       // API 호출
//       const response = await axios.get("/users/profile", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
//       });
//       setUserData(response.data);
//     } catch (error) {
//       console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
//     }
//   };

//   const handleLogin = async (userId, password) => {
//     try {
//       const response = await axios.post("/users/login", { user_id: userId, password });
//       const { accessToken, refreshToken } = response.data;

//       // 토큰을 localStorage에 저장
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);

//       setIsLoggedIn(true);
//       fetchUserData();
//       nav("/");
//     } catch (error) {
//       console.error("로그인 실패:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setIsLoggedIn(false);
//     setUserData(null);
//     nav("/login");
//   };

//   return (
//     <HeaderContainer
//       onMouseLeave={() => setIsDropdownOpen(false)}
//       isDropdownOpen={isDropdownOpen}
//     >
//       <HeaderContent>
//         <TitleBox>
//           <p>동문서잡</p>
//         </TitleBox>
//         <NavBar>
//           <Button onClick={() => nav("/findjobslist")}>
//             <p>단기알바 찾기</p>
//           </Button>
//           <Button onClick={() => nav("/workerslist")}>
//             <p>구직자 찾기</p>
//           </Button>
//           <Button
//             onMouseEnter={() => setIsDropdownOpen(true)}
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           >
//             <p>글쓰기</p>
//           </Button>
//         </NavBar>
//         <Icon>
//           {isLoggedIn ? (
//             <>
//               <Button onClick={() => nav("/chat")}>채팅</Button>
//               <Button onClick={() => nav("/myprofile")}>프로필</Button>
//               <LoginButton onClick={handleLogout}>
//                 <p>로그아웃</p>
//               </LoginButton>
//             </>
//           ) : (
//             <LoginButton onClick={() => nav("/login")}>
//               <p>로그인/회원가입</p>
//             </LoginButton>
//           )}
//         </Icon>
//       </HeaderContent>
//       {isDropdownOpen && (
//         <DropdownSection>
//           <DropdownItem onClick={() => nav("/findjobswriting")}>
//             대타공고
//           </DropdownItem>
//           <DropdownItem onClick={() => nav("/workerswriting")}>
//             구직글
//           </DropdownItem>
//         </DropdownSection>
//       )}
//     </HeaderContainer>
//   );
// >>>>>>> 7c1e37e (Feat: 헤더 수정)
// };

// // Styled Components
// const HeaderContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   background-color: white;
//   z-index: 1000;
//   border-bottom: 1px solid #c3c3c3;
//   transition: height 0.3s ease;
//   height: ${({ isDropdownOpen }) => (isDropdownOpen ? "225px" : "175px")};
//   overflow: hidden; /* 내용이 넘치지 않도록 */
// `;

// const HeaderContent = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-around;
//   height: 175px; /* 기본 헤더 높이 */
// `;

// const TitleBox = styled.div`
//   color: orange;
//   font-size: 28px;
//   font-style: normal;
//   font-weight: 900;
//   line-height: normal;
// `;

// const NavBar = styled.div`
//   display: flex;
//   gap: 40px;
//   position: relative;
// `;

// const Button = styled.button`
//   font-weight: bolder;
//   cursor: pointer;
//   background-color: transparent;
//   border: none;

//   & > p {
//     font-size: 22px;
//     font-style: normal;
//     font-weight: 900;
//     line-height: normal;
//   }
// `;

// const Icon = styled.div`
//   display: flex;
//   gap: 20px;
// `;

// const LoginButton = styled.button`
//   color: orange;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;

//   & > p {
//     font-size: 22px;
//     font-weight: bold;
//   }
// `;

// const DropdownSection = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: white;
//   height: 50px; /* 헤더 확장 부분의 높이 */
//   border-top: 1px solid #eaeaea;
// `;

// const DropdownItem = styled.div`
//   margin: 0 20px;
//   font-size: 18px;
//   font-weight: bold;
//   color: #333;
//   cursor: pointer;

//   &:hover {
//     color: orange;
//   }
// `;
