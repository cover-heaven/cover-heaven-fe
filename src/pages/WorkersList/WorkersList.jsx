import styled from 'styled-components';
import React, { useEffect } from 'react';
import WorkersItem from '../../components/WorkersList/WorkersItem';
import { useState } from 'react';
import axios from 'axios';
import WorkerInfo from '../../components/WorkersList/WorkerInfo';

const mockData1 = [
	{
		job_search_id: '1',
		profile: '글로벌한국학과 23',
		gender: '남성',
		uer_name: '김동휘',
		department: '글로벌한국학과',
		student_id: '23학번',
		manner_temperature: '39도',
		job_tag: ['학원', '과외', '카페']
	},
	{
		job_search_id: '2',
		profile: '경영학과 23',
		gender: '남성',
		uer_name: '이형빈',
		department: '경영학과',
		student_id: '24학번',
		manner_temperature: '40도',
		job_tag: ['식당', '주점', '카페']
	},
	{
		job_search_id: '3',
		profile: '미국문화학과 19',
		gender: '여성',
		uer_name: '유민우',
		department: '미국문화학과',
		student_id: '19학번',
		manner_temperature: '41도',
		job_tag: ['식당', '주점', '편의점']
	},
	{
		job_search_id: '4',
		profile: '컴퓨터공학과 24',
		gender: '남성',
		uer_name: '김현승',
		department: '컴퓨터공학과',
		student_id: '24학번',
		manner_temperature: '42도',
		job_tag: ['식당', '편의점', '카페']
	},
	{
		job_search_id: '5',
		profile: '사진',
		gender: '여성',
		uer_name: '유서강',
		department: '유럽문화학과',
		student_id: '24학번',
		manner_temperature: '43도',
		job_tag: ['식당', '주점', '카페']
	},
	{
		job_search_id: '6',
		profile: '사진',
		gender: '여성',
		uer_name: '서서강',
		department: '글로벌한국학과',
		student_id: '23학번',
		manner_temperature: 'double',
		job_tag: ['string']
	}
];
const WorkersList = () => {
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');
	const [job, setJob] = useState('');
	const [serverData, setServerData] = useState(null);
	const [modal, setModal] = useState(false);

	const openModal = () => {
		setModal(true);
	};

	const closeModal = () => {
		setModal(false);
	};
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				'http://3.131.18.121/alumni_job/job-searches'
	// 			);
	// 			setServerData(response.data);
	// 		} catch (err) {
	// 			console.log('실패');
	// 		}
	// 	};
	// 	fetchData();
	// }, []);

	const onChangeAge = (e) => {
		setAge(e.target.value);
	};
	const onChangeGender = (e) => {
		setGender(e.target.value);
	};
	const onChangeJob = (e) => {
		setJob(e.target.value);
	};
	const filteredData = () => {
		return mockData1 //api 연결 후 serverData로 수정.
			.filter((data) => (gender ? data.gender === gender : true))
			.filter((data) => (job ? data.job_tag.includes(job) : true));
	};
	return (
		<Layout>
			<HeadSection>
				<TitleContainer>
					<PageTitle>
						<Title>구직자 찾기</Title>
						<Highlight></Highlight>
					</PageTitle>
					<PageSubTitle>
						믿고 맡길 수 있는 동문 구직자를 찾아보세요!
					</PageSubTitle>
				</TitleContainer>
				<ToggleContainer>
					<ToggleBox onChange={onChangeAge}>
						<option value="">나이</option>
						<option>20세~25세</option>
						<option>26세~29세</option>
						<option>30세 이상</option>
					</ToggleBox>
					<ToggleBox onChange={onChangeGender}>
						<option value="">성별</option>
						<option value="남성">남성</option>
						<option value="여성">여성</option>
					</ToggleBox>
					<ToggleBox onChange={onChangeJob}>
						<option value="">전체</option>
						<option value="과외">과외</option>
						<option value="주점">주점</option>
						<option value="식당">식당</option>
						<option value="카페">카페</option>
						<option value="학원">학원</option>
						<option value="기타">기타</option>
					</ToggleBox>
				</ToggleContainer>
			</HeadSection>
			<MainSection>
				<WorkersContainer>
					{filteredData().map((data, index) => (
						<WorkersItem openModal={openModal} key={index} data={data} />
					))}
					{modal && <WorkerInfo close={closeModal}></WorkerInfo>}
				</WorkersContainer>
			</MainSection>
		</Layout>
	);
};

const Layout = styled.div`
	width: 100vw;
	padding-top: 74px;
	display: flex;
	flex-direction: column;
	gap: 45px;
`;
const HeadSection = styled.div`
	padding-bottom: 1.5%;
	border-bottom: 1px solid #c3c3c3;
	display: flex;
	flex-direction: column;
	gap: 25px;
`;
const TitleContainer = styled.div`
	padding-left: 14.2%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const PageTitle = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 40px;
`;

const Highlight = styled.div`
	background-color: red;
	opacity: 60%;
	width: 210px;
	height: 16px;
`;

const PageSubTitle = styled.div`
	font-size: 15px;
`;

const ToggleContainer = styled.div`
	display: flex;
	gap: 30px;
	padding-left: 14.2%;
	height: 52px; /* 전체 높이 */
`;

const MainSection = styled.div`
	width: 100%;
	padding-bottom: 20px;
`;

const WorkersContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 18px;
	border-radius: 20px;
	padding-left: 14.2%;
`;

const ToggleBox = styled.select`
	width: 150px;
	height: auto;
	min-height: 53px;
	border: 1px solid #ede6e6;
	border-radius: 15px;
	padding: 10px;
	position: relative;
	cursor: pointer;
`;

export default WorkersList;
