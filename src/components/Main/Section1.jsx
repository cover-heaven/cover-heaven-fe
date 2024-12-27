import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Surface_Primary, Text_Primary } from '../../styles/color';
import { ReactComponent as L1 } from './LogoLine/line1.svg';
import { ReactComponent as L2 } from './LogoLine/line2.svg';
import { ReactComponent as L3 } from './LogoLine/line3.svg';
import { ReactComponent as L4 } from './LogoLine/line4.svg';
import { ReactComponent as L5 } from './LogoLine/line5.svg';
import { ReactComponent as L6 } from './LogoLine/line6.svg';
import { ReactComponent as L7 } from './LogoLine/line7.svg';
import { ReactComponent as L8 } from './LogoLine/line8.svg';
import { ReactComponent as L9 } from './LogoLine/line9.svg';
import { ReactComponent as L10 } from './LogoLine/line10.svg';
import { ReactComponent as L11 } from './LogoLine/line11.svg';
import { ReactComponent as L12 } from './LogoLine/line12.svg';

const Section1 = () => {
	return (
		<SectionWrapper>
			<LogoWrapper>
				<StyledLine1 />
				<StyledLine2 />
				<StyledLine3 />
				<StyledLine4 />
				<StyledLine5 />
				<StyledLine6 />
				<StyledLine7 />
				<StyledLine8 />
				<StyledLine9 />
				<StyledLine10 />
				<StyledLine11 />
				<StyledLine12 />
			</LogoWrapper>
			<SubText>동문에서 JOB을 찾다, 동문에서 답을 찾다.</SubText>
			<TitleText>
				대학 동문 단기알바 플랫폼<FocusText> 동문서잡</FocusText>
			</TitleText>
		</SectionWrapper>
	);
};

export default Section1;

const SectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	height: 100vh;
	position: relative;
	/* top: 66px; */
	z-index: 1;
`;

const LogoWrapper = styled.div`
	margin-top: 46px;
	position: relative;
	width: 382px;
	height: 389px;
`;

const drawLeftOrDown = keyframes`
     from {
    stroke-dashoffset: -135; /* 시작: 선이 숨겨진 상태 */
  }
  to {
    stroke-dashoffset: 0; /* 끝: 선이 완전히 나타남 */
  }
`;

const drawRightOrUp = keyframes`
     from {
    stroke-dashoffset: 135; /* 시작: 선이 숨겨진 상태 */
  }
  to {
    stroke-dashoffset: 0; /* 끝: 선이 완전히 나타남 */
  }
`;

const drawDiagonal = keyframes`
     from {
    stroke-dashoffset: 189; /* 시작: 선이 숨겨진 상태 */
  }
  to {
    stroke-dashoffset: 0; /* 끝: 선이 완전히 나타남 */
  }
`;

const StyledLine1 = styled(L1)`
	left: 0;
	top: 0;
	position: absolute;
	stroke-dasharray: 135; /* 총 길이 */
	stroke-dashoffset: 135; /* 처음에 선을 숨김 */
	animation: ${drawLeftOrDown} 0.4s 1.5s ease-in forwards;
`;

const StyledLine2 = styled(L2)`
	left: 0;
	top: 0;
	position: absolute;
	stroke-dasharray: 135; /* 총 길이 */
	stroke-dashoffset: 135; /* 처음에 선을 숨김 */
	animation: ${drawLeftOrDown} 0.4s 1.9s linear forwards;
`;

const StyledLine3 = styled(L3)`
	top: 134px;
	left: 0;
	position: absolute;
	stroke-dasharray: 135; /* 총 길이 */
	stroke-dashoffset: 135; /* 처음에 선을 숨김 */
	animation: ${drawRightOrUp} 0.5s 2.3s ease-out forwards;
`;

const StyledLine4 = styled(L4)`
	left: 197px;
	position: absolute;
	stroke-dasharray: 135; /* 총 길이 */
	stroke-dashoffset: 135; /* 처음에 선을 숨김 */
	animation: ${drawLeftOrDown} 0.4s 1.9s ease-in forwards;
`;

const StyledLine5 = styled(L5)`
	left: 197px;
	position: absolute;
	stroke-dasharray: 135; /* 총 길이 */
	stroke-dashoffset: 135; /* 처음에 선을 숨김 */
	animation: ${drawLeftOrDown} 0.4s 2.3s linear forwards;
`;

const StyledLine6 = styled(L6)`
	left: 197px;
	top: 134px;
	position: absolute;
	stroke-dasharray: 135; /* 총 길이 */
	stroke-dashoffset: 135; /* 처음에 선을 숨김 */
	animation: ${drawRightOrUp} 0.4s 2.7s linear forwards;
`;

const StyledLine7 = styled(L7)`
	left: 332px;
	/* top: 134px; */
	position: absolute;
	stroke-dasharray: 135; /* 총 길이 */
	stroke-dashoffset: 135; /* 처음에 선을 숨김 */
	animation: ${drawRightOrUp} 0.5s 3s ease-out forwards;
`;

const StyledLine8 = styled(L8)`
	left: -3px;
	top: 204px;
	position: absolute;
	stroke-dasharray: 189; /* 총 길이 */
	stroke-dashoffset: 189; /* 처음에 선을 숨김 */
	animation: ${drawDiagonal} 0.5s 2.3s ease-in forwards;
`;

const StyledLine9 = styled(L9)`
	left: 134px;
	top: 204px;
	position: absolute;
	stroke-dasharray: 135; /* 총 길이 */
	stroke-dashoffset: 135; /* 처음에 선을 숨김 */
	animation: ${drawLeftOrDown} 0.5s 2.8s ease-out forwards;
`;

const StyledLine10 = styled(L10)`
	left: 197px;
	top: 204px;
	position: absolute;
	stroke-dasharray: 135; /* 총 길이 */
	stroke-dashoffset: 135; /* 처음에 선을 숨김 */
	animation: ${drawLeftOrDown} 0.4s 2.8s ease-out forwards;
`;

const StyledLine11 = styled(L11)`
	left: 193px;
	top: 204px;
	position: absolute;
	stroke-dasharray: 189; /* 총 길이 */
	stroke-dashoffset: 189; /* 처음에 선을 숨김 */
	animation: ${drawDiagonal} 0.5s 3.2s ease-out forwards;
`;
const StyledLine12 = styled(L12)`
	left: 332px;
	top: 204px;
	position: absolute;
	stroke-dasharray: 135; /* 총 길이 */
	stroke-dashoffset: 135; /* 처음에 선을 숨김 */
	animation: ${drawLeftOrDown} 0.5s 3.7s ease-out forwards;
`;

const fadeInSub = keyframes`
     from {
    top: 520px;
    opacity:0%;
  }
  to {
    top:460px;
    opacity:100%;
  }
`;

const fadeInTitle = keyframes`
     from {
    top: 560px;
    opacity:0%;
  }
  to {
    top:500px;
    opacity:100%;
  }
`;

const SubText = styled.span`
	color: ${Text_Primary};
	font-family: Pretendard;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	top: 520px;
	opacity: 0%;
	position: absolute;
	animation: ${fadeInSub} 0.8s 4.3s ease-in-out forwards;
`;

const TitleText = styled(SubText)`
	font-size: 48px;
	top: 560px;
	opacity: 0%;
	position: absolute;
	animation: ${fadeInTitle} 0.8s 4.3s ease-in-out forwards;
`;

const FocusText = styled.span`
	color: ${Surface_Primary};
`;
