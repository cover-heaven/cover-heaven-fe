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
					<SubTitle>첫 근무까지 D-7</SubTitle>
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
						<div>
							<span>근무지명</span>
							<span>투썸플레이스 광흥창역점</span>
						</div>
						<div>
							<span>상세주소</span>
							<span>서울 마포구 신수로 8길 16</span>
						</div>
					</InfoBox>
				</WorkingPlaceInfo>
				<WorkingDateWage>
					<div>근무일자 및 급여</div>
					<InfoBox2>
						<InfoTitle>
							<Menu>근무일자</Menu>
							<Menu>근무시간</Menu>
							<Menu>시급</Menu>
							<Menu>일급</Menu>
						</InfoTitle>
						<WorkingDetail>
							<Menu>2024년 11월 25일 (화)</Menu>
							<Menu>00:00 ~ 00:00</Menu>
							<Menu>00,000원</Menu>
							<Menu>00,000원</Menu>
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
	padding: 4% 20% 3% 20%;
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
const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const Menu = styled.div`
	width: 180px;
`;
const TitleBox = styled.div`
	display: flex;
	align-items: center;
`;
const SubTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
const InfoTitle = styled.div`
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
const SubTitle = styled.div``;
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
`;
const WriitenDate = styled.div``;
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
	padding: 1.5% 20%;
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
