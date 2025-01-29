import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';
import coffeeIcon from '../../assets/icon/coffeeIcon.png';
import restaurantIcon from '../../assets/icon/restaurantIcon.png';
import tutor from '../../assets/icon/tutor.png';
import beer from '../../assets/icon/beer.png';
import academy from '../../assets/icon/academy.png';

const Layout = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
	cursor: pointer;
	width: 100%;
	border-radius: 30px;
	border: 1px solid #e8e8e8;
	background: #fff;
	transition: all 0.2s ease-in-out;
	&:hover {
		scale: 1.01;
		box-shadow: 1px 1px 23.3px 0px rgba(0, 0, 0, 0.11);
		/* border: 1px solid ${Surface_Primary}; */
	}
	color: ${Text_Secondary};
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 2%;
	width: 33%;
	gap: 3px;
	color: ${Text_Primary};
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const AddressContainer = styled.div`
	width: 21%;
`;
const HourlyWageContainer = styled.div`
	width: 16%;
`;
const TotalWageContainer = styled.div`
	width: 16.5%;
`;
const DdayContainer = styled.div``;

const Img = styled.img`
	width: 50px;
	height: 50px;
`;

const DateBox = styled.div`
	display: flex;
	width: 44px;
	height: 21.053px;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	border: 1px solid #ff5238;
	color: #ff5238;
	font-size: 13px;
	font-weight: 500;
`;
const RowLayout = styled.div`
	display: flex;
	gap: 5px;
`;
const jobIcons = {
	카페: coffeeIcon,
	과외: tutor,
	식당: restaurantIcon,
	술집: beer,
	학원: academy,
	default: '/images/default-icon.png' // 매칭되지 않을 경우 기본 아이콘
};

const FindJobsItem = ({ data }) => {
	// 근무 시간을 계산하는 함수
	const calculateWorkTime = (workHour) => {
		if (!workHour) return 0;
		const [start, end] = workHour.split('-');
		const [startHour, startMinute] = start.split(':').map(Number);
		const [endHour, endMinute] = end.split(':').map(Number);

		const startInMinutes = startHour * 60 + startMinute;
		const endInMinutes = endHour * 60 + endMinute;

		// 24시간을 기준으로 차이를 계산 (야간 근무 고려)
		const totalMinutes = (endInMinutes - startInMinutes + 24 * 60) % (24 * 60);
		return totalMinutes / 60; // 시간으로 변환
	};

	// 총 급여 계산
	const totalSalary = data.work_detail.reduce((acc, job) => {
		const workTime = calculateWorkTime(job.work_hour);
		return acc + workTime * job.hourly_wage;
	}, 0);

	// 공고일까지 남은 날짜 계산 함수
	const dayLeftCalculator = (dateString) => {
		// 입력된 날짜를 한국 시간(UTC+9) 기준으로 변환
		const targetDate = new Date(dateString);

		// 현재 날짜를 한국 시간으로 설정
		const currentDate = new Date();
		const koreaTimeOffset = 9 * 60; // 한국 시간대 (UTC+9)

		// 한국 시간 기준으로 날짜 보정
		const currentUTC =
			currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
		const koreaCurrentDate = new Date(currentUTC + koreaTimeOffset * 60000);

		// 차이 계산
		const diffInMilliseconds = targetDate - koreaCurrentDate;
		const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)); // 일수 변환

		return diffInDays;
	};

	const nav = useNavigate();

	const iconSrc = jobIcons[data.job_tag] || jobIcons.default;

	return (
		<Layout onClick={() => nav(`/findjobsdetail/${data.job_offer_id}`)}>
			<Img src={iconSrc} alt={`${data.job_tag} icon`} />
			<TitleContainer>
				<div>{data.title}</div>
				<RowLayout>
					{data.work_detail?.map((detail, index) => (
						<DateBox key={index}>
							{detail.work_date.slice(5, 7)}/{detail.work_date.slice(8, 10)}
						</DateBox>
					))}
				</RowLayout>
			</TitleContainer>
			<AddressContainer>
				<div>{data.address}</div>
			</AddressContainer>
			<HourlyWageContainer>
				<div>
					시급 {Number(data.work_detail[0]?.hourly_wage).toLocaleString()}원
				</div>
			</HourlyWageContainer>
			<TotalWageContainer>
				<div>총 {totalSalary.toLocaleString()}원</div>
			</TotalWageContainer>
			<DdayContainer>
				<DdayText>
					D - {dayLeftCalculator(data.work_detail[0]?.work_date)}
				</DdayText>
			</DdayContainer>
		</Layout>
	);
};

export default FindJobsItem;

const DdayText = styled.div`
	color: var(--surface-surface-primary, #ff5238);
	text-align: center;
	font-family: Pretendard;
	font-size: 22px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
`;
