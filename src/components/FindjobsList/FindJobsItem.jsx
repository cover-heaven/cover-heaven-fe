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
	padding: 20px;
	cursor: pointer;
	width: 100%;
	border-radius: 30px;
	border: 1px solid #e8e8e8;
	background: #fff;
	&:hover {
		border: 1px solid ${Surface_Primary};
		scale: 1.01;
		box-shadow: 1px 1px 23.3px 0px rgba(0, 0, 0, 0.11);
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
	padding-top: 6px;
	width: 33%;
	gap: 5px;
	color: ${Text_Primary};
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const AddressContainer = styled.div`
	padding-top: 1.6%;
	width: 21%;
`;
const HourlyWageContainer = styled.div`
	padding-top: 1.6%;
	width: 16%;
`;
const TotalWageContainer = styled.div`
	padding-top: 1.6%;
	width: 16.5%;
`;
const DdayContainer = styled.div`
	padding-top: 0.9%;
`;

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

	const dayLeftCalculator = (time) => {
		const targetDate = new Date(time); // 목표 날짜
		const currentDate = new Date(); // 현재 날짜

		// 밀리초 단위 차이 계산
		const diffInMilliseconds = targetDate - currentDate;

		// 밀리초를 일수로 변환
		const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
		return diffInDays;
	};
	const nav = useNavigate();

	// 아이콘 매칭
	const iconSrc = jobIcons[data.job_tag] || jobIcons.default;

	return (
		<Layout onClick={() => nav(`/findjobsdetail/${data.job_offer_id}`)}>
			<Img src={iconSrc} alt={`${data.job_tag} icon`} />
			<TitleContainer>
				<div>{data.title}</div>
				<RowLayout>
					{data.work_detail?.map((detail, index) => (
						<DateBox key={`${data.job_offer_id}-${index}`}>
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
