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
import Button from '../common/Button';
import deleteIcon from '../../assets/icon/icon_delete.svg';

const calculateWorkTime = (work_hour) => {
	const newStartHour = work_hour.slice(0, 2);
	const newStartMinute = work_hour.slice(3, 5);
	const newEndHour = work_hour.slice(6, 8);
	const newEndMinute = work_hour.slice(9, 11);

	// 2. 시작 시간과 종료 시간 계산
	const start = parseInt(newStartHour, 10) * 60 + parseInt(newStartMinute, 10);
	const end = parseInt(newEndHour, 10) * 60 + parseInt(newEndMinute, 10);

	// 3. 하루를 넘기는 경우 처리
	const totalMinutes =
		end >= start
			? end - start // 같은 날
			: 1440 - start + end; // 다음 날

	// 4. 시간 및 분 계산
	const calculatedHours = Math.floor(totalMinutes / 60); // 시간
	const calculatedMinutes = totalMinutes % 60; // 분

	// 5. 상태 업데이트
	return calculatedHours + calculatedMinutes / 60; // 소수점 포함 시간
};

const MatchingModal = ({
	handleCloseMatch,
	handleRequestMatch,
	workDay,
	formattedDate,
	formattedPay
}) => {
	const [totalPay, setTotalPay] = useState(0);
	const [tempWorkDay, setTempWorkDay] = useState(workDay);

	useEffect(() => {
		const calculateTotalPay = () => {
			let totalSum = 0;
			tempWorkDay.forEach(
				(item) =>
					(totalSum += calculateWorkTime(item.work_hour) * item.hourly_wage)
			);
			setTotalPay(totalSum);
		};
		calculateTotalPay();
	}, [tempWorkDay]);

	const handleChargeCoin = () => {
		alert('현재 서비스 개발 중입니다.');
	};

	// const handleAddWorkDay = () => {
	// 	setTempWorkDay((prev) => [...prev, prev[prev.length - 1]]);
	// };

	const handleDeleteWorkDay = (index) => {
		setTempWorkDay((prev) => prev.filter((_, i) => i !== index));
	};

	const onMatchClicked = () => {
		if (tempWorkDay.length === 0) {
			alert('근무일자가 존재하지 않습니다.');
			return;
		}
		handleRequestMatch(tempWorkDay, totalPay);
	};

	return (
		<ModalBox>
			<ExitImg src={exitIcon} onClick={handleCloseMatch}></ExitImg>
			<SubSection>
				<SectionTitle>
					<TitleText>1. 근무조건 입력하기 </TitleText>
					<SubText>매칭 상대가 실제로 근무할 일자와 급여를 입력하세요.</SubText>
				</SectionTitle>
				<WorkInputSection>
					{tempWorkDay.map((item, index) => (
						<WorkInputWrapper key={index}>
							<WorkInputRow>
								<WorkInputBox
									// type="date"
									name="date"
									placeholder={formattedDate(item.work_date)}
									value={formattedDate(item.work_date)}
								></WorkInputBox>
								<WorkInputBox
									name="time"
									placeholder={item.work_hour}
									value={item.work_hour}
								></WorkInputBox>
								<WorkInputBox
									name="hourPay"
									value={`시급 ${formattedPay(item.hourly_wage)}원`}
									placeholder={`시급 ${formattedPay(item.hourly_wage)}원`}
								></WorkInputBox>
								{/* <HourPayInputBox>
									<span style={{ textAlign: 'left' }}>시급</span>
									<HourPayInput
										name="hourPay"
										value={item.hourly_wage}
										onChange={handleInput}
									></HourPayInput>
									<span style={{ textAlign: 'right' }}>원</span>
								</HourPayInputBox> */}
								<Button
									mode="grayBtn"
									content={deleteIcon}
									width="49px"
									isIcon={true}
									iconW="26px"
									iconH="24px"
									onClick={() => {
										handleDeleteWorkDay(index);
									}}
								></Button>
							</WorkInputRow>
							<DailyPay>
								일급{' '}
								{formattedPay(
									calculateWorkTime(item.work_hour) * item.hourly_wage
								)}
								원
							</DailyPay>
						</WorkInputWrapper>
					))}
				</WorkInputSection>
				{/* <Button
					mode="addBtn"
					content="+ 근무일자 추가하기"
					width="100%"
					height="49px"
					isIcon={false}
					textSize="16"
					onClick={handleAddWorkDay}
				></Button> */}
				<TotalPay>총 급여 {formattedPay(totalPay)}원</TotalPay>
			</SubSection>
			<SubSection>
				<SectionTitle>
					<TitleText>2. 코인 송금하기</TitleText>
					<SubText>
						매칭 시 총 급여만큼의 코인을 매칭 상대에게 송금해요.
					</SubText>
				</SectionTitle>
				<CurrentCoinRow>
					<CurrentCoinText>현재 코인 잔액</CurrentCoinText>
					<CurrentCoin>120,000 P</CurrentCoin>
					<Button
						mode="default"
						content="코인 충전"
						width="115px"
						height="54px"
						isIcon={false}
						textSize="16"
						onClick={handleChargeCoin}
					></Button>
				</CurrentCoinRow>
			</SubSection>
			<Button
				mode="default"
				content="매칭 신청하기"
				width="100%"
				height="54px"
				isIcon={false}
				textSize="20"
				onClick={onMatchClicked}
			></Button>
		</ModalBox>
	);
};

export default MatchingModal;

const ModalBox = styled.div`
	width: calc(556 / 1512 * 100%);
	min-width: 556px;
	min-height: 670px;
	box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.1);
	border-radius: 40px;
	border: 1px solid ${Border_Primary};
	background: #fff;
	display: flex;
	flex-direction: column;
	padding: 60px 40px;
	align-items: center;
	gap: 50px;
	position: relative;
`;

const ExitImg = styled.img`
	position: absolute;
	top: 34px;
	right: 42px;
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

const WorkInputSection = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin-bottom: 15px;
`;

const WorkInputWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const WorkInputRow = styled.div`
	width: 100%;
	height: 49px;
	display: flex;
	gap: 12px;
`;

const WorkInputBox = styled.input`
	/* flex: 1; */
	width: calc((100% - 49px - 12px * 3) / 3);
	border-radius: 10px;
	border: 1px solid ${Border_Primary};
	background: #fff;
	color: ${Text_Primary};
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	text-align: center;
	&::placeholder {
		color: ${Text_Secondary};
	}
	&:valid {
		color: ${Text_Secondary};
	}
`;

const HourPayInputBox = styled.div`
	width: calc((100% - 49px - 12px * 3) / 3);
	border-radius: 10px;
	border: 1px solid ${Border_Primary};
	background: #fff;
	color: ${Text_Primary};
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	padding: 15px;
	display: flex;
	align-items: center;
	gap: 2px;
	/* position: relative; */
`;

const HourPayInput = styled(WorkInputBox)`
	width: calc((100% - 49px - 12px * 3) / 3 * 0.3);
	/* position: absolute;
	left: 30%; */
	border: none;
	flex: 1;
	text-align: right;
`;

const DailyPay = styled.div`
	width: 100%;
	color: ${Text_Primary};
	text-align: right;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

const TotalPay = styled(DailyPay)`
	color: ${Surface_Primary};
	font-size: 20px;
	padding-top: 15px;
	margin-top: 10px;
	border-top: 1px solid ${Border_Primary};
`;

const CurrentCoinRow = styled(WorkInputRow)`
	align-items: center;
	gap: 0px;
`;

const CurrentCoinText = styled.p`
	color: ${Text_Secondary};
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	margin-right: 23px;
`;

const CurrentCoin = styled.div`
	/* width: calc(100% - 91px - 115px -23px -15px); */
	flex-grow: 1;
	flex-shrink: 1;
	border-radius: 15px;
	border: 1px solid ${Border_Primary};
	background: #fff;
	padding: 15px 18px;
	color: ${Text_Secondary};
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	display: flex;
	align-items: center;
	justify-content: right;
	margin-right: 10px;
`;
