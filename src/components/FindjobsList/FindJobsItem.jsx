import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Layout = styled.div`
	display: flex;
	padding: 20px;
	cursor: pointer;
	width: 100%;
	border-radius: 30px;
	border: 1px solid #e8e8e8;
	background: #fff;
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
	width: 25%;
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

const FindJobsItem = ({ data }) => {
	const totalWage = data.work_detail.work_hour * data.work_detail.hourly_wage;
	const hourlyWage = data.work_detail.hourly_wage;
	const nav = useNavigate();
	return (
		<Layout key={data.job_offer_id} onClick={() => nav('/findjobsdetail')}>
			<Img src="icon"></Img>
			<TitleContainer>
				<div>{data.title}</div>
				<RowLayout>
					{data.work_date.map((date) => (
						<DateBox key={data.job_offer_id}>{date}&nbsp;</DateBox>
					))}
				</RowLayout>
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
