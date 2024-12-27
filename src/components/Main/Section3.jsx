import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
	Surface_Background,
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';
import filterImg from '../../assets/icon/landing_filter.svg';
import infoImg from '../../assets/icon/landing_info.svg';
import FillImg from '../../assets/icon/landing_fill.svg';
import TheImg from '../../assets/icon/landing_the.svg';
import GapsImg from '../../assets/icon/landing_gaps.svg';
import FillImgUnfill from '../../assets/icon/landing_fill_unfilled.svg';
import TheImgUnfill from '../../assets/icon/landing_the_unfilled.svg';
import GapsImgUnfill from '../../assets/icon/landing_gaps_unfilled.svg';

const Section3 = () => {
	const [textFill, setTextFill] = useState([false, false, false]);

	useEffect(() => {
		const handleScroll = () => {
			// if (window.scrollY > window.innerHeight * 2.0) {
			// 	setTextFill([true, true, true]);
			// } else if (window.scrollY > window.innerHeight * 1.85) {
			// 	setTextFill([true, true, false]);
			// } else if (window.scrollY > window.innerHeight * 1.7) {
			// 	setTextFill([true, false, false]);
			// }
			setTextFill([
				window.scrollY > window.innerHeight * 1.55,
				window.scrollY > window.innerHeight * 1.7,
				window.scrollY > window.innerHeight * 1.87
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
						<TitleText>구직과 구인, 서로의 니즈를 간편하게 </TitleText>
						<HightLightWrapper>
							<span> 채우세요.</span>
							<Highlight />
						</HightLightWrapper>
					</TitleWrapper>
					<SubText>
						동문서잡은 구인자의 <Focus>근무 공백</Focus>과 구직자의{' '}
						<Focus>급전</Focus>을 간편하게 채울 수 있는 FIT한 정보를 제공합니다.
					</SubText>
				</TextWrapper>
				<FunctionWrapper>
					<FunctionBox>
						<FilterImg src={filterImg} />
						<SubText>구직자가 FIT한 일자리를 찾기 위한</SubText>
						<BoldSubText>근무일자 및 직종 필터링 </BoldSubText>
					</FunctionBox>
					<FunctionBox>
						<InfoImg src={infoImg} />
						<SubText>구인자가 FIT한 근무자를 찾기 위한</SubText>
						<BoldSubText>동문 유저 이력서 </BoldSubText>
					</FunctionBox>
				</FunctionWrapper>
			</ContentBox>
			{/* <BigText1 className={`${textFill[0] ? 'fill' : ''}`}>FILL</BigText1>
			<BigText2>THE</BigText2>
			<BigText3>GAPS</BigText3> */}
			{/* <TextImg1 src={FillImgUnfill} />
			<TextImg2 src={TheImgUnfill} />
			<TextImg3 src={GapsImgUnfill} /> */}
			{textFill[0] ? (
				<Text1In src={FillImg} />
			) : (
				<Text1Out src={FillImg}></Text1Out>
			)}
			{textFill[1] ? (
				<Text2In src={TheImg} />
			) : (
				<Text2Out src={TheImg}></Text2Out>
			)}
			{textFill[2] ? (
				<Text3In src={GapsImg} />
			) : (
				<Text3Out src={GapsImg}></Text3Out>
			)}
		</SectionWrapper>
	);
};

export default Section3;

const SectionWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	position: relative;
`;

const ContentBox = styled.div`
	width: calc(1119 / 1512 * 100%);
	height: calc(717 / 982 * 100%);
	flex-shrink: 0;
	background-color: ${Surface_Background};
	filter: drop-shadow(0px 0px 60px rgba(0, 0, 0, 0.1));
	position: absolute;
	right: 0;
	top: 15%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: calc(66 / 1512 * 100%) calc(72 / 1512 * 100%);
	gap: calc(80 / 1512 * 100%);
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

const Focus = styled.span`
	color: ${Surface_Primary};
`;

const TitleWrapper = styled.div`
	display: flex;
	gap: 10px;
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
	height: 16px;
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

const FilterImg = styled.img`
	height: 60%;
	object-fit: cover;
`;

const InfoImg = styled.img`
	/* padding-bottom: 20px; */
	height: 60%;
	object-fit: cover;
`;

const BigText1 = styled.span`
	/* color: rgba(255, 255, 255, 0); */
	-webkit-text-stroke: 3px ${Surface_Primary};
	font-size: 150px;
	font-style: normal;
	font-weight: 900;
	position: absolute;
	left: 0;
	top: calc(15% + 56px);
	background: linear-gradient(to top, #ff5238, transparent);
	background-size: 100% 200%;
	-webkit-background-clip: text;
	color: transparent;
	.fill {
	}
`;

const textShow = keyframes`
    0%{
        transform:translateX(-100%);
    }
    100%{
		transform:translateX(0);
    }
`;
const textHide = keyframes`
    0%{
        transform:translateX(0);
    }
    100%{
		transform:translateX(-100%);
    }
`;

const TextImg1 = styled.img`
	position: absolute;
	left: 0;
	top: calc(15% + 56px);
`;

const TextImg2 = styled(TextImg1)`
	top: calc(15% + 212px);
`;
const TextImg3 = styled(TextImg1)`
	top: calc(15% + 368px);
`;

const Text1In = styled(TextImg1)`
	top: calc(15% + 56px);
	transform: translateX(-100%);
	animation: ${textShow} 1s ease-in-out forwards;
`;

const Text2In = styled(TextImg1)`
	top: calc(15% + 212px);
	transform: translateX(-100%);
	animation: ${textShow} 1s ease-in-out forwards;
`;
const Text3In = styled(TextImg1)`
	top: calc(15% + 368px);
	transform: translateX(-100%);
	animation: ${textShow} 1s ease-in-out forwards;
`;

const Text1Out = styled(TextImg1)`
	top: calc(15% + 56px);
	animation: ${textHide} 1s ease-in-out forwards;
`;
const Text2Out = styled(TextImg1)`
	top: calc(15% + 212px);
	animation: ${textHide} 1s ease-in-out forwards;
`;
const Text3Out = styled(TextImg1)`
	top: calc(15% + 368px);
	animation: ${textHide} 1s ease-in-out forwards;
`;
