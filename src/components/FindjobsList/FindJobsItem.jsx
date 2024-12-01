import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Layout = styled.div`
	display: flex;
	padding: 20px;
	cursor: pointer;
	width: 97.5%;
	border-radius: 30px;
	border: 1px solid #e8e8e8;
	background: #fff;
`;

const TitleContainer = styled.div`
	padding-left: 1%;
	width: 33%;
`;

const AddressContainer = styled.div`
	padding-top: 0.8%;
	width: 25%;
`;
const HourlyWageContainer = styled.div`
	padding-top: 0.8%;
	width: 15%;
`;
const TotalWageContainer = styled.div`
	padding-top: 0.8%;
	width: 15%;
`;
const DdayContainer = styled.div`
	padding-top: 0.8%;
`;

const Img = styled.img`
	width: 50px;
	height: 50px;
`;

const FindJobsItem = ({ data }) => {
	const totalWage = data.work_detail.work_hour * data.work_detail.hourly_wage;
	const hourlyWage = data.work_detail.hourly_wage;
	const nav = useNavigate();
	return (
		<Layout onClick={() => nav('/findjobsdetail')}>
			<Img src="icon"></Img>
			<TitleContainer>
				<div>{data.title}</div>
				<div>{data.work_date[1]}</div>
			</TitleContainer>
			<AddressContainer>
				<div>{data.address}</div>
			</AddressContainer>
			<HourlyWageContainer>
				<div>{Number(hourlyWage).toLocaleString()}원</div>
			</HourlyWageContainer>
			<TotalWageContainer>
				<div>{totalWage.toLocaleString()}원</div>
			</TotalWageContainer>
			<DdayContainer>
				<div>{}</div>
			</DdayContainer>
		</Layout>
	);
};

export default FindJobsItem;

// toLocaleSting()은 숫자에만 적용가능. 문자열X. 그래서 Number(문자열).toLocaleString() 이렇게 해야함
