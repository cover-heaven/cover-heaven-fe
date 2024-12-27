import React from 'react';
import styled from 'styled-components';
import {
	Surface_Background,
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';
import mannerTemp from '../../assets/icon/landing_mannertemp.svg';
import faceInfo from '../../assets/icon/landing_faceinfo.svg';
import billTransfer from '../../assets/icon/landing_billtransfer.svg';
import lockUnfill from '../../assets/icon/landing_lockunfill.svg';
import lockFill from '../../assets/icon/landing_lockfill.svg';

const Section4 = () => {
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
			<LockFillImg src={lockFill} />
			<LockUnfillImg src={lockUnfill} />
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
