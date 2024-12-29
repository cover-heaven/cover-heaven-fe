import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	Surface_Background,
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';
import userListImg from '../../assets/icon/landing_userList.svg';
import checkImg from '../../assets/icon/landing_check.svg';

const calculateAngle = (x1, y1, x2, y2) => {
	const deltaY = y2 - y1;
	const deltaX = x2 - x1;
	const radians = Math.atan2(deltaY, deltaX);
	const degrees = radians * (180 / Math.PI);
	const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // 거리 계산
	return { deg: degrees, dist: distance }; // 각도와 거리 반환
};

const calculateLineEndpoints = (length, angleDeg) => {
	const angleRad = (angleDeg * Math.PI) / 180; // 각도를 라디안으로 변환

	// 기울기 전 (수평 상태에서의 좌표)
	const left_x = -length / 2;
	const left_y = 0;

	// 기울기 후 (기울어진 상태에서의 좌표)
	const left_x_rotated = (length / 2) * Math.cos(angleRad) * -1; // 왼쪽 끝
	const left_y_rotated = (length / 2) * Math.sin(angleRad) * -1;

	return { xDif: left_x - left_x_rotated, yDif: left_y - left_y_rotated };
};

const Section2 = () => {
	const [dotPos, setDotPos] = useState([
		{
			x: (706 / 1512) * window.innerWidth,
			y: (315 / 1512) * window.innerHeight
		},
		{
			x: (1131 / 1512) * window.innerWidth,
			y: (400 / 1512) * window.innerHeight
		},
		{
			x: (1046 / 1512) * window.innerWidth,
			y: (1160 / 1512) * window.innerHeight
		}
	]);
	const [lineProps, setLineProps] = useState([
		calculateAngle(dotPos[0].x, dotPos[0].y, dotPos[1].x, dotPos[1].y),
		calculateAngle(dotPos[1].x, dotPos[1].y, dotPos[2].x, dotPos[2].y)
	]);

	useEffect(() => {
		const handleScroll = () => {
			setDotPos([
				{
					x: (706 / 1512) * window.innerWidth,
					y:
						(315 / 1512) * window.innerHeight +
						Math.sin((window.scrollY * Math.PI) / 720) * 30
				},
				{
					x:
						(1131 / 1512) * window.innerWidth +
						Math.sin((window.scrollY * Math.PI) / 720) * 30,
					y: (400 / 1512) * window.innerHeight
				},
				{
					x: (1046 / 1512) * window.innerWidth,
					y:
						(1160 / 1512) * window.innerHeight +
						Math.sin(-(window.scrollY * Math.PI) / 720) * 30
				}
			]);
		};
		window.addEventListener('scroll', handleScroll);

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const deg1 = calculateAngle(
			dotPos[0].x,
			dotPos[0].y,
			dotPos[1].x,
			dotPos[1].y
		);
		const deg2 = calculateAngle(
			dotPos[1].x,
			dotPos[1].y,
			dotPos[2].x,
			dotPos[2].y
		);
		setLineProps([deg1, deg2]);
	}, [dotPos]);
	return (
		<SectionWrapper>
			<ContentBox>
				<TextWrapper>
					<TitleWrapper>
						<TitleText>동문 간의 신뢰를 기반으로</TitleText>
						<HightLightWrapper>
							<span> 연결해요.</span>
							<Highlight />
						</HightLightWrapper>
					</TitleWrapper>
					<SubText>
						동문서잡은 같은 학교 동문이라는 특별한 커넥션을 기반으로 신뢰할 수
						있는 일자리를 제공합니다. <Focus>학생증 인증</Focus>으로 엄선된
						동문만을 이어주니 안심하세요!
					</SubText>
				</TextWrapper>
				<ImgWrapper>
					<Gradation />
					<Img1 src={userListImg} />
					<Img2 src={checkImg} />
				</ImgWrapper>
			</ContentBox>
			<Dot1 x={dotPos[0].x} y={dotPos[0].y} />
			<Dot2 x={dotPos[1].x} y={dotPos[1].y} />
			<Dot3 x={dotPos[2].x} y={dotPos[2].y} />
			<Line1
				deg={lineProps[0].deg}
				dist={lineProps[0].dist}
				x={dotPos[0].x}
				y={dotPos[0].y}
				dif={calculateLineEndpoints(lineProps[0].dist, lineProps[0].deg)}
			/>
			<Line2
				deg={lineProps[1].deg}
				dist={lineProps[1].dist}
				x={dotPos[1].x}
				y={dotPos[1].y}
				dif={calculateLineEndpoints(lineProps[1].dist, lineProps[1].deg)}
			/>
			<BigText1 x={dotPos[0].x} y={dotPos[0].y}>
				CONNECT
			</BigText1>
			<BigText2 x={dotPos[1].x} y={dotPos[1].y}>
				THE
			</BigText2>
			<BigText3 x={dotPos[2].x} y={dotPos[2].y}>
				DOTS
			</BigText3>
		</SectionWrapper>
	);
};

export default Section2;

const SectionWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	position: relative;
`;

const ContentBox = styled.div`
	width: calc(1279 / 1512 * 100%);
	height: calc(397 / 982 * 100%);
	flex-shrink: 0;
	background-color: ${Surface_Background};
	filter: drop-shadow(0px 0px 60px rgba(0, 0, 0, 0.1));
	position: absolute;
	left: 0;
	top: 30%;
	display: flex;
	align-items: center;
	padding: 0 calc(50 / 1512 * 100%);
	gap: calc(80 / 1512 * 100%);
	border-radius: 30px;
	z-index: 9;
`;

const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const TitleText = styled.span`
	color: ${Text_Primary};
	font-size: 40px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const TitleWrapper = styled.div`
	display: flex;
	gap: 10px;
`;

const SubText = styled(TitleText)`
	margin-top: 10px;
	color: ${Text_Secondary};
	font-size: 24px;
	font-weight: 600;
	line-height: 150%; /* 36px */
`;

const Focus = styled.span`
	color: ${Surface_Primary};
`;

const HightLightWrapper = styled(TitleText)`
	/* display: flex;
	flex-direction: column; */
	position: relative;
`;

const Highlight = styled.div`
	background-color: red;
	opacity: 60%;
	width: 100%;
	height: 12px;
	margin-top: -15px;
	position: absolute;
	top: 50px;
`;

const ImgWrapper = styled.div`
	position: relative;
	width: 80%;
	height: 100%;
`;

const Gradation = styled.div`
	width: 80%;
	height: 100%;
	flex-shrink: 0;
	border-radius: 392px;
	opacity: 0.16;
	background: radial-gradient(
		50% 50% at 50% 50%,
		#ff5238 0%,
		rgba(255, 82, 56, 0) 100%
	);
	position: absolute;
	z-index: 0;
	/* left: 0;
	top: 0; */
`;

const Img1 = styled.img`
	position: absolute;
	width: 90%;
	height: 110%;
	flex-shrink: 0;
	z-index: 1;
`;

const Img2 = styled(Img1)`
	z-index: 2;
	width: 20%;
	height: 30%;
	flex-shrink: 0;
	left: 70%;
	top: 15%;
`;

const Dot1 = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	position: absolute;
	left: ${(props) => `${props.x}px`};
	top: ${(props) => `${props.y}px`};
	background-color: ${Surface_Primary};
`;

const Dot2 = styled(Dot1)`
	left: ${(props) => `${props.x}px`};
	top: ${(props) => `${props.y}px`};
`;

const Dot3 = styled(Dot1)`
	left: ${(props) => `${props.x}px`};
	top: ${(props) => `${props.y}px`};
`;

const Line1 = styled.div`
	width: ${(props) => `${props.dist}px`};
	border-bottom: 1px solid ${Surface_Primary};
	position: absolute;
	left: ${(props) => `${props.x + props.dif.xDif + 5}px`};
	top: ${(props) => `${props.y + props.dif.yDif + 5}px`};
	transform: rotate(${(props) => `${props.deg}deg`});
`;

const Line2 = styled(Line1)`
	width: ${(props) => `${props.dist}px`};
	left: ${(props) => `${props.x + props.dif.xDif + 5}px`};
	top: ${(props) => `${props.y + props.dif.yDif + 5}px`};
	transform: rotate(${(props) => `${props.deg}deg`});
`;

const BigText1 = styled.span`
	color: #fff;
	-webkit-text-stroke: 3px ${Surface_Primary};
	font-size: 150px;
	font-style: normal;
	font-weight: 900;
	position: absolute;
	left: ${(props) => `${props.x - 741}px`};
	top: ${(props) => `${props.y - 129}px`};
`;

const BigText2 = styled(BigText1)`
	left: ${(props) => `${props.x}px`};
	top: ${(props) => `${props.y - 119}px`};
`;

const BigText3 = styled(BigText1)`
	left: ${(props) => `${props.x + 30}px`};
	top: ${(props) => `${props.y - 20}px`};
`;
