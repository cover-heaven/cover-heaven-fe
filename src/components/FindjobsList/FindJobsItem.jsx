import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Surface_Primary } from '../../styles/color';
import coffeeIcon from '../../assets/icon/coffeeIcon.png';
import restaurantIcon from '../../assets/icon/restaurantIcon.png';
import tutor from '../../assets/icon/tutor.png';
import beer from '../../assets/icon/beer.png';

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
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 2%;
	padding-top: 6px;
	width: 33%;
	gap: 5px;
`;

const AddressContainer = styled.div`
	padding-top: 1.6%;
	width: 20%;
`;
const HourlyWageContainer = styled.div`
	padding-top: 1.6%;
	width: 15%;
`;
const TotalWageContainer = styled.div`
	padding-top: 1.6%;
	width: 15%;
`;
const DdayContainer = styled.div`
	padding-top: 1.6%;
`;

const Img = styled.img`
	width: 50px;
	height: 50px;
`;

const DateBox = styled.div`
	display: flex;
	padding-left: 4px;
	padding-bottom: 1px;
	width: 44px;
	height: 21.053px;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	border: 1px solid #ff5238;
	color: #ff5238;
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
	default: '/images/default-icon.png' // 매칭되지 않을 경우 기본 아이콘
};
const FindJobsItem = ({ data }) => {
	const totalWage = data.work_detail.work_hour * data.work_detail.hourly_wage;
	const hourlyWage = data.work_detail.hourly_wage;
	const nav = useNavigate();

	// job_tag에 따라 아이콘 경로 선택
	const iconSrc = jobIcons[data.job_tag] || jobIcons.default;

	return (
		<Layout key={data.job_offer_id} onClick={() => nav('/findjobsdetail')}>
			<Img src={iconSrc} alt={`${data.job_tag} icon`} />
			<TitleContainer>
				<div>{data.title}</div>
				<RowLayout>
					{data.work_date.map((date) => (
						<DateBox key={`${data.job_offer_id}-${date}`}>{date}&nbsp;</DateBox>
					))}
				</RowLayout>
			</TitleContainer>
			<AddressContainer>
				<div>{data.address}</div>
			</AddressContainer>
			<HourlyWageContainer>
				<div>시급 {Number(hourlyWage).toLocaleString()}원</div>
			</HourlyWageContainer>
			<TotalWageContainer>
				<div>총 {totalWage.toLocaleString()}원</div>
			</TotalWageContainer>
			<DdayContainer>
				<div>{/* D-day 로직 추가 가능 */}</div>
			</DdayContainer>
		</Layout>
	);
};

export default FindJobsItem;
// toLocaleSting()은 숫자에만 적용가능. 문자열X. 그래서 Number(문자열).toLocaleString() 이렇게 해야함
