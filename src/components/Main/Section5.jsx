import React from 'react';
import styled from 'styled-components';
import { Surface_Primary } from '../../styles/color';
import loginImg from '../../assets/icon/landing_loginImg.png';
import { useNavigate } from 'react-router-dom';

const Section5 = () => {
	const nav = useNavigate();
	return (
		<SectionWrapper>
			<LoginBox>
				<TextWrapper>
					<MainText>
						학생증 인증 가입 후<br /> 더 많은 서비스를 이용하세요!
					</MainText>
					<LoginBtn
						onClick={() => {
							nav('/login');
						}}
					>
						동문서잡 가입하기
					</LoginBtn>
				</TextWrapper>
				<LoginImg src={loginImg} />
			</LoginBox>
		</SectionWrapper>
	);
};

export default Section5;

const SectionWrapper = styled.div`
	width: 100vw;
	height: 70vh;
	position: relative;
`;

const LoginBox = styled.div`
	width: 100vw;
	height: calc(440 / 982 * 100vh);
	position: absolute;
	bottom: 0;
	background-color: ${Surface_Primary};
	filter: drop-shadow(0px 0px 60px rgba(0, 0, 0, 0.1));
	padding: calc(142 / 1512 * 100vh) calc(109 / 1512 * 100vw);
`;

const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: calc(41 / 982 * 100vh);
`;

const MainText = styled.span`
	color: #fff;
	font-size: 40px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const LoginBtn = styled.button`
	display: flex;
	width: calc(265 / 1512 * 100vw);
	height: calc(88 / 982 * 100vh);
	padding: 9px 0px;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
	background: #fff;
	color: ${Surface_Primary};
	font-size: 24px;
	font-family: Pretendard;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const LoginImg = styled.img`
	position: absolute;
	right: 0;
	bottom: 0;
	height: calc(440 / 982 * 100vh);
	object-fit: cover;
`;
