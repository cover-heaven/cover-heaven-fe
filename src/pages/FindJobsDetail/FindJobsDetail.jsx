import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FindJobsDetail = () => {
	const [serverData, setServerData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('/job-offers/:job_offer_id');
				setServerData(response.data);
			} catch (err) {
				console.log('잘못 받아왔습니다');
			}
		};
		fetchData();
	}, []);

	return (
		<Layout>
			<Header>
				<TitleContainer>
					<TitleBox>
						<Title>광흥창 투썸 알바 급구</Title>
						<JobTag>카페</JobTag>
					</TitleBox>
					<DdayContainer>
						<SubTitle>첫 근무까지</SubTitle>
						<Dday>D-7</Dday>
					</DdayContainer>
				</TitleContainer>
				<SubTitleContainer>
					<WriitenDate>2024.11.25 12시 49분에 작성된 글입니다</WriitenDate>
					<Inquiry>1:1 문의하기</Inquiry>
				</SubTitleContainer>
			</Header>
			<Detail>
				<WorkingPlaceInfo>
					<div>근무지 정보</div>
					<InfoBox>
						<InnerInfoBox>
							<InfoTitle>근무지명</InfoTitle>
							<Place>투썸플레이스 광흥창역점</Place>
						</InnerInfoBox>
						<InnerInfoBox>
							<InfoTitle>상세주소</InfoTitle>
							<Place>서울 마포구 신수로 8길 16</Place>
						</InnerInfoBox>
					</InfoBox>
				</WorkingPlaceInfo>
				<WorkingDateWage>
					<div>근무일자 및 급여</div>
					<InfoBox2>
						<MenuTitle>
							<Menu1>근무일자</Menu1>
							<Menu1>근무시간</Menu1>
							<Menu1>시급</Menu1>
							<Menu1>일급</Menu1>
						</MenuTitle>
						<WorkingDetail>
							<Menu2>2024년 11월 25일 (화)</Menu2>
							<Menu2>00:00 ~ 00:00</Menu2>
							<Menu2>00,000원</Menu2>
							<Menu2>00,000원</Menu2>
						</WorkingDetail>
						<TotalWage>
							<div>총 급여 00,000원</div>
						</TotalWage>
					</InfoBox2>
				</WorkingDateWage>
				<DetailContent>
					<div>상세 모집내용</div>
					<InfoBox>
						안녕하세요, 서강대학교 글로벌한국학&컴퓨터공학 전공 23학번
						김동휘입니다.
					</InfoBox>
				</DetailContent>
			</Detail>
		</Layout>
	);
};
const Layout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100vw;
`;
const Header = styled.div`
	padding: 4% 18% 3% 18%;
	display: flex;
	flex-direction: column;
	gap: 30px;
	border-bottom: 1px solid black;
`;
const Title = styled.div`
	color: var(--text-text-primary, #464646);
	font-family: Pretendard;
	font-size: 40px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
`;
const Place = styled.div`
	color: var(--text-text-primary, #464646);
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;
const InnerInfoBox = styled.div`
	display: flex;
	gap: 25px;
`;
const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const InfoTitle = styled.div`
	color: var(--text-text-secondary, #787777);
	font-size: 20px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;
const Menu1 = styled.div`
	width: 250px;
	color: var(--text-text-secondary, #787777);
	text-align: center;
	font-size: 20px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;
const Menu2 = styled.div`
	width: 250px;
	color: var(--text-text-primary, #464646);
	text-align: center;
	font-size: 20px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;
const TitleBox = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;
const SubTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
const MenuTitle = styled.div`
	display: flex;
`;
const JobTag = styled.div`
	display: flex;
	width: 71.732px;
	height: 31px;
	padding: 1px 11px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 5px;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.7) 0%,
			rgba(255, 255, 255, 0.7) 100%
		),
		var(--icon-, #a5e09c);
`;
const SubTitle = styled.div`
	color: #787777;
	font-family: Inter;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
const Dday = styled.div`
	color: #ff5238;
	font-family: Inter;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
const DdayContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 9px;
`;
const WorkingDetail = styled.div`
	display: flex;
	padding-bottom: 13px;
	border-bottom: 1px solid black;
`;
const InfoBox = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	border-radius: 10px;
	padding: 3%;
	gap: 15px;
	width: 100%;
`;
const InfoBox2 = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	border-radius: 10px;
	padding: 3%;
	gap: 15px;
	width: 100%;
`;
const TotalWage = styled.div`
	display: flex;
	justify-content: right;
	padding: 5px;
	color: var(--surface-surface-primary, #ff5238);
	text-align: right;
	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
const WriitenDate = styled.div`
	color: var(--text-text-tertiary, #989898);
	text-align: center;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
const Inquiry = styled.button`
	width: 200px;
	padding: 10px;
	border-radius: 15px;
	background: #ff5238;
	color: #fff;
	text-align: center;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
const Detail = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
	padding: 1.5% 18%;
`;
const WorkingPlaceInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 13px;
`;
const WorkingDateWage = styled.div`
	display: flex;
	flex-direction: column;
	gap: 13px;
`;
const DetailContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 13px;
`;

export default FindJobsDetail;
