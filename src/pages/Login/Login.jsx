import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import { Surface_Primary } from '../../styles/color';

const Login = () => {
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [isPendingRequest, setIsPedingRequest] = useState(false);
	const inputRef = useRef();
	const nav = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		// e.target.name -> input의 name 값
		if (name === 'id') {
			setId(value);
		} else {
			setPw(value);
		}
	};
	const postLoginData = async () => {
		if (isPendingRequest) return; // 중복 방지
		const body = {
			user_id: id,
			password: pw
		};
		try {
			setIsPedingRequest(true); // true일 때, 함수 실행이 안되기 때문에 중복 방지
			const res = await instance.post('/users/login', body);
			if (res.status === 200) {
				// 로그인 성공
				localStorage.setItem('accessToken', res.data.accessToken);
				localStorage.setItem('refreshToken', res.data.refreshToken);
				nav('/');
			} else {
				// 로그인 실패
				alert('아이디나 비번이 틀림.');
			}
		} catch (err) {
			// 네트워크 연결 오류
			alert('네트워크 오류');
		} finally {
			setIsPedingRequest(false);
		}
	};
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<Layout>
			<TitleContainer>
				<Title>동문서잡에 오신 것을 환영해요!</Title>
				<SubTitle>로그인 후 더 많은 서비스를 체험하세요</SubTitle>
			</TitleContainer>
			<InputContainer>
				<Input
					name="id"
					ref={inputRef}
					value={id}
					placeholder="아이디를 입력해주세요"
					onChange={handleInputChange}
				/>
				<Input
					name="pw"
					value={pw}
					placeholder="비밀번호를 입력해주세요"
					onChange={handleInputChange}
				/>
				<Button onClick={postLoginData}>로그인</Button>
			</InputContainer>
			<Bottom>
				<div>아직 계정이 없다면?</div>
				<button onClick={() => nav('/signup')}>학생증 인증 가입하기</button>
			</Bottom>
		</Layout>
	);
};

const Layout = styled.div`
	/* position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column; */
	width: 100vw;
	height: calc(100vh - 2 * 86px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding-bottom: 50px;
`;
const Title = styled.div`
	color: #ff5238;
	text-align: center;
	font-family: Pretendard;
	font-size: 40px;
	font-style: normal;
	font-weight: 900;
	line-height: normal;
`;
const SubTitle = styled.div`
	color: var(--text-text-primary, #464646);
	text-align: center;
	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
`;
const Input = styled.input`
	padding: 10px;
	border: 1px solid black;
	width: 396px;
	height: 49px;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
	&:hover {
		border: 1px solid ${Surface_Primary};
		scale: 1.01;
		box-shadow: 1px 1px 23.3px 0px rgba(0, 0, 0, 0.11);
	}
`;
const Button = styled.button`
	border-radius: 15px;
	background: #ff5238;
	width: 398px;
	height: 49px;
	color: #fff;
`;
const Bottom = styled.div`
	padding-top: 70px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;

	& > button {
		color: #ff5238;
		font-family: Pretendard;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		text-decoration-line: underline;
		text-decoration-style: solid;
		text-decoration-skip-ink: auto;
		text-decoration-thickness: auto;
		text-underline-offset: auto;
		text-underline-position: from-font;
	}
`;

export default Login;
