import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
	Surface_Background,
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';
import mannerTemp from '../../assets/icon/landing_mannertemp.svg';
import faceInfo from '../../assets/icon/landing_faceinfo.svg';
import billTransfer from '../../assets/icon/landing_billtransfer.svg';
// import lockUnfill from '../../assets/icon/landing_lockunfill.svg';
// import lockFill from '../../assets/icon/landing_lockfill.svg';
import lockLeftBottomFill from '../../assets/icon/landing_lockLeftBottomFill.svg';
import lockLeftBottomUnfill from '../../assets/icon/landing_lockLeftBottomUnfill.svg';
import lockLeftTopFill from '../../assets/icon/landing_lockLeftTopFill.svg';
import lockLeftTopUnfill from '../../assets/icon/landing_lockLeftTopUnfill.svg';
import lockRightBottomFill from '../../assets/icon/landing_lockRightBottomFill.svg';
import lockRightBottomUnfill from '../../assets/icon/landing_lockRightBottomUnfill.svg';
import lockRightTopFill from '../../assets/icon/landing_lockRightTopFill.svg';
import lockRightTopUnfill from '../../assets/icon/landing_lockRightTopUnfill.svg';

const Section4 = () => {
	const [isLock, setIsLock] = useState([false, false]);

	useEffect(() => {
		const handleScroll = () => {
			setIsLock([
				window.scrollY > window.innerHeight * 3,
				window.scrollY > window.innerHeight * 2.8
			]);
		};
		window.addEventListener('scroll', handleScroll);

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<SectionWrapper>
			<ContentBox>
				<TextWrapper>
					<TitleWrapper>
						<TitleText>신뢰를 바탕으로 강력한 </TitleText>
						<HightLightWrapper>
							<span> 연결고리</span>
							<Highlight />
						</HightLightWrapper>
						<TitleText>를 제공해 드릴게요.</TitleText>
					</TitleWrapper>
					<SubText>
						동문서잡만의 체계적인 기능들로 구인구직 과정을 안심하고 믿을 수 있게
						관리해드립니다.
					</SubText>
				</TextWrapper>
				<FunctionWrapper>
					<FunctionBox>
						<IconImg src={mannerTemp} />
						<SubText>유저의 근무 태도를 반영한</SubText>
						<BoldSubText>유저 매너온도</BoldSubText>
					</FunctionBox>
					<FunctionBox>
						<IconImg src={faceInfo} />
						<SubText>근무가 매칭된 유저 간의</SubText>
						<BoldSubText>상호 신상공개 </BoldSubText>
					</FunctionBox>
					<FunctionBox>
						<IconImg src={billTransfer} />
						<SubText>근무 직후 급여를 받을 수 있는</SubText>
						<BoldSubText>자동 급여 송금</BoldSubText>
					</FunctionBox>
				</FunctionWrapper>
			</ContentBox>
			{isLock[0] ? (
				<>
					<LockLeftTopUnfillIn src={lockLeftTopUnfill} />
					<LockLeftTopFill src={lockLeftTopFill} />
					<LockLeftBottomFill src={lockLeftBottomFill} />
				</>
			) : (
				<LockLeftTopUnfillOut src={lockLeftTopUnfill} />
			)}
			{isLock[1] ? (
				<>
					<LockRightTopUnfillIn src={lockRightTopUnfill} />
					<LockRightTopFill src={lockRightTopFill} />
					<LockRightBottomFill src={lockRightBottomFill} />
				</>
			) : (
				<LockRightTopUnfillOut src={lockRightTopUnfill} />
			)}
			<LockLeftBottomUnfill src={lockLeftBottomUnfill} />
			<LockRightBottomUnfill src={lockRightBottomUnfill} />
			{/* <LockFillImg src={lockFill} /> */}
			{/* <LockUnfillImg src={lockUnfill} /> */}
		</SectionWrapper>
	);
};

export default Section4;

const SectionWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	position: relative;
`;

const ContentBox = styled.div`
	width: calc(1050 / 1512 * 100%);
	height: calc(652 / 982 * 100%);
	flex-shrink: 0;
	background-color: ${Surface_Background};
	filter: drop-shadow(0px 0px 60px rgba(0, 0, 0, 0.1));
	position: absolute;
	left: calc(232 / 1512 * 100%);
	top: 15%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: calc(63 / 1512 * 100%) 0;
	gap: calc(180 / 1512 * 100%);
	border-radius: 30px;
	z-index: 9;
`;

const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
`;

const TitleText = styled.span`
	color: ${Text_Primary};
	font-size: 40px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const SubText = styled(TitleText)`
	color: ${Text_Secondary};
	font-size: 24px;
	font-weight: 600;
	line-height: 150%; /* 36px */
`;

const TitleWrapper = styled.div`
	display: flex;
	/* gap: 10px; */
`;

const HightLightWrapper = styled(TitleText)`
	/* display: flex;
	flex-direction: column; */
	position: relative;
	margin-left: 10px;
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

const FunctionWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
`;

const FunctionBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const BoldSubText = styled(SubText)`
	font-weight: 700;
	color: ${Text_Primary};
`;

const IconImg = styled.img`
	height: 50%;
	object-fit: cover;
	margin-bottom: 20px;
`;

const LockFillImg = styled.img`
	position: absolute;
	left: 0;
	top: 45%;
`;

const LockUnfillImg = styled.img`
	position: absolute;
	right: 0;
	top: 5%;
`;

const lockDown = keyframes`
	0%{
		transform:translateY(0);
	}
	100%{
		transform:translateY(30%);
	}
`;

const lockUp = keyframes`
	0%{
		transform:translateY(30%);
	}
	100%{
		transform:translateY();
	}
`;

const fadeIn = keyframes`
	0%{
		opacity:0;
	}
	100%{
		opacity:1;
	}
`;

const LockLeftTopFill = styled.img`
	position: absolute;
	left: 0;
	top: 37%;
	transform: translateY(30%);
	opacity: 0;
	animation: ${fadeIn} 0.3s 0.3s ease-in-out forwards;
`;
const LockLeftTopUnfillIn = styled.img`
	position: absolute;
	left: 0;
	top: 37%;
	animation: ${lockDown} 0.3s ease-in-out forwards;
`;
const LockLeftTopUnfillOut = styled.img`
	position: absolute;
	left: 0;
	top: 37%;
	animation: ${lockUp} 0.3s ease-in-out forwards;
`;
const LockLeftBottomUnfill = styled.img`
	position: absolute;
	left: 0;
	top: 60%;
`;

const LockLeftBottomFill = styled(LockLeftBottomUnfill)`
	opacity: 0;
	animation: ${fadeIn} 0.3s 0.3s ease-in-out forwards;
`;

const LockRightTopFill = styled.img`
	position: absolute;
	right: 0;
	top: 10%;
	transform: translateY(30%);
	opacity: 0;
	animation: ${fadeIn} 0.3s 0.3s ease-in-out forwards;
`;
const LockRightTopUnfillIn = styled.img`
	position: absolute;
	right: 0;
	top: 10%;
	animation: ${lockDown} 0.3s ease-in-out forwards;
`;
const LockRightTopUnfillOut = styled.img`
	position: absolute;
	right: 0;
	top: 10%;
	animation: ${lockUp} 0.3s ease-in-out forwards;
`;
const LockRightBottomUnfill = styled.img`
	position: absolute;
	right: 0;
	top: 33%;
`;

const LockRightBottomFill = styled(LockRightBottomUnfill)`
	opacity: 0;
	animation: ${fadeIn} 0.3s 0.3s ease-in-out forwards;
`;
