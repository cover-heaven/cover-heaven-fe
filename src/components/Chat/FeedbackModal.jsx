import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	Border_Primary,
	Surface_Primary,
	Text_Primary,
	Text_Secondary,
	Text_Tertiary
} from '../../styles/color';
import exitIcon from '../../assets/icon/icon_close_modal.svg';
import badIcon from '../../assets/icon/icon_face_bad.svg';
import sosoIcon from '../../assets/icon/icon_face_soso.svg';
import goodIcon from '../../assets/icon/icon_face_good.svg';
import { formattedPay } from './utils';
import Button from '../common/Button';

const matchedDayDummy = [
	{
		work_date: '2024.11.23(토)',
		daily_wage: 10000
	},
	{
		work_date: '2024.11.23(토)',
		daily_wage: 10000
	},
	{
		work_date: '2024.11.23(토)',
		daily_wage: 10000
	}
];

const FeedbackModal = ({ handleCloseFeedback }) => {
	const [matchedDate, setMatchedDate] = useState(matchedDayDummy);
	const [selectedDate, setSelectedDate] = useState([]);
	const [totalPay, setTotalPay] = useState(0);
	const [selectedFace, setSelectedFace] = useState(null);
	const [isOptionSelected, setIsOptionSelected] = useState(true);

	useEffect(() => {
		if (selectedFace !== null) {
			setIsOptionSelected(true);
		}
	}, [selectedFace]);

	useEffect(() => {
		const calculateTotalPay = () => {
			let totalSum = 0;
			selectedDate.forEach((item) => (totalSum += item.daily_wage));
			setTotalPay(totalSum);
		};
		calculateTotalPay();
	}, [selectedDate]);

	const onSelectDate = (index) => {
		if (selectedDate.includes(matchedDate[index])) {
			setSelectedDate(
				selectedDate.filter((item) => item !== matchedDate[index])
			);
		} else {
			setSelectedDate((prev) => [...prev, matchedDate[index]]);
		}
	};

	const onSelectFace = (type) => {
		setSelectedFace(type);
	};

	const onFeedbackSubmit = () => {
		if (selectedFace === null) {
			setIsOptionSelected(false);
			return;
		}
		// 평가하기 api 새로 만들어야할듯?
		// 안그러면 매칭온도 get - 매칭온도 patch 두번 api call 해야함
		handleCloseFeedback(true);
	};
	return (
		<ModalBox>
			<ExitImg
				src={exitIcon}
				onClick={() => {
					handleCloseFeedback(false);
				}}
			></ExitImg>
			<SubSection>
				<SectionTitle>
					<TitleText>1. 근무 일자 선택</TitleText>
					<SubText>매칭 상대가 실제로 근무한 일자를 선택해주세요.</SubText>
				</SectionTitle>
				<WorkSelectSection>
					{matchedDate.map((item, index) => {
						return (
							<SelectBox
								key={index}
								onClick={() => {
									onSelectDate(index);
								}}
								isSelected={selectedDate.includes(matchedDate[index])}
							>
								{item.work_date}
								<br />
								{`일급 ${formattedPay(item.daily_wage)}원`}
							</SelectBox>
						);
					})}
				</WorkSelectSection>
				<TotalPay>총 급여 {formattedPay(totalPay)}원</TotalPay>
			</SubSection>
			<SubSection>
				<SectionTitle>
					<TextWrapper>
						<TitleText>2. 구직자 평가하기</TitleText>
						{isOptionSelected ? (
							<OptionSelectText></OptionSelectText>
						) : (
							<OptionSelectText>신고 사유를 선택해주세요.</OptionSelectText>
						)}
					</TextWrapper>
					<SubText>평가는 매칭 상대의 매너온도에 반영됩니다.</SubText>
				</SectionTitle>
				<FaceSelectSection>
					<FaceWrapper>
						<FaceImg
							src={badIcon}
							onClick={() => {
								onSelectFace('bad');
							}}
							isSelected={'bad' === selectedFace}
						></FaceImg>
						<FaceText>아쉬웠어요</FaceText>
					</FaceWrapper>
					<FaceWrapper>
						<FaceImg
							src={sosoIcon}
							onClick={() => {
								onSelectFace('soso');
							}}
							isSelected={'soso' === selectedFace}
						></FaceImg>
						<FaceText>그저 그랬어요</FaceText>
					</FaceWrapper>
					<FaceWrapper>
						<FaceImg
							src={goodIcon}
							onClick={() => {
								onSelectFace('good');
							}}
							isSelected={'good' === selectedFace}
						></FaceImg>
						<FaceText>만족했어요</FaceText>
					</FaceWrapper>
				</FaceSelectSection>
			</SubSection>
			<Button
				mode="default"
				content="평가 완료"
				width="100%"
				height="54px"
				isIcon={false}
				textSize="20"
				onClick={onFeedbackSubmit}
			></Button>
		</ModalBox>
	);
};

export default FeedbackModal;

const ModalBox = styled.div`
	width: 556px;
	min-width: 556px;
	/* min-height: 545px; */
	height: 0%;
	box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.1);
	border-radius: 40px;
	border: 1px solid ${Border_Primary};
	background: #fff;
	display: flex;
	flex-direction: column;
	padding: 76px 60px 42px 60px;
	align-items: center;
	position: relative;
	justify-content: flex-start;
	gap: 50px;
`;

const ExitImg = styled.img`
	position: absolute;
	top: 54px;
	right: 54px;
	width: 18px;
	height: 18px;
	cursor: pointer;
`;

const SubSection = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const SectionTitle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin-bottom: 30px;
`;

const TitleText = styled.p`
	color: ${Text_Primary};
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 24px; /* 120% */
`;

const SubText = styled.p`
	color: ${Text_Tertiary};
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const WorkSelectSection = styled.section`
	width: 100%;
	height: 63px;
	display: flex;
	gap: 15px;
	margin-bottom: 15px;
`;

const SelectBox = styled.div`
	flex: 1;
	height: 100%;
	padding: 10px 20px;
	border-radius: 10px;
	border: 1px solid
		${(props) => (props.isSelected ? Surface_Primary : Border_Primary)};
	background: #fff;
	color: ${Text_Secondary};
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 1.5;
	text-align: center;
	cursor: pointer;
	&:hover {
		border: 1px solid ${Surface_Primary};
	}
`;

const TotalPay = styled.div`
	width: 100%;
	text-align: right;
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	color: ${Surface_Primary};
	font-size: 20px;
`;

const FaceSelectSection = styled.section`
	width: 100%;
	height: 84px;
	display: flex;
	justify-content: space-between;
	padding: 0 50px;
`;

const FaceWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	align-items: center;
`;

const FaceImg = styled.img`
	width: 50px;
	height: 50px;
	filter: ${(props) => (props.isSelected ? 'none' : 'grayscale(100%)')};
	transition: filter 0.1s ease-in-out;
	cursor: pointer;
	&:hover {
		filter: none;
	}
`;

const FaceText = styled.span`
	color: ${Text_Primary};
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

const OptionSelectText = styled.span`
	color: ${Surface_Primary};
	font-size: 12px;
	font-weight: 600px;
`;

const TextWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
`;
