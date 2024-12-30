import styled from 'styled-components';
import React, { useEffect } from 'react';
import WorkersItem from '../../components/WorkersList/WorkersItem';
import { useState } from 'react';
import WorkerInfo from '../../components/WorkersList/WorkerInfo';
import axios from 'axios';
import { instance } from '../../api/instance';
import { Surface_Background, Surface_Primary } from '../../styles/color';

export const calculateAge = (birthDate) => {
	const today = new Date();

	// birthDate가 숫자인 경우 문자열로 변환
	const birthDateString = birthDate.toString();

	// YYYYMMDD 형식의 문자열을 YYYY-MM-DD로 변환
	const formattedBirthDate = birthDateString.replace(
		/^(\d{4})(\d{2})(\d{2})$/,
		'$1-$2-$3'
	);

	const birth = new Date(formattedBirthDate);
	let age = today.getFullYear() - birth.getFullYear();
	const monthDiff = today.getMonth() - birth.getMonth();

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
		age--; // 생일이 아직 안 지났다면 한 살 빼기
	}

	return age;
};

const mockData1 = [
	{
		job_search_id: '1',
		profile: '글로벌한국학과 23',
		gender: '남성',
		uer_name: '김동휘',
		department: '글로벌한국학과',
		student_id: '23학번',
		birth_date: '1998-12-02',
		manner_temperature: '55',
		job_tag: ['학원', '과외', '카페']
	},
	{
		job_search_id: '2',
		profile: '경영학과 23',
		gender: '남성',
		uer_name: '이형빈',
		department: '경영학과',
		student_id: '24학번',
		birth_date: '1992-12-02',
		manner_temperature: '40',
		job_tag: ['식당', '주점', '카페']
	},
	{
		job_search_id: '3',
		profile: '미국문화학과 19',
		gender: '여성',
		uer_name: '유민우',
		department: '미국문화학과',
		student_id: '19학번',
		birth_date: '1995-12-02',
		manner_temperature: '81',
		job_tag: ['식당', '주점', '편의점']
	},
	{
		job_search_id: '4',
		profile: '컴퓨터공학과 24',
		gender: '남성',
		uer_name: '김현승',
		department: '컴퓨터공학과',
		student_id: '24학번',
		birth_date: '2003-12-02',
		manner_temperature: '42',
		job_tag: ['식당', '편의점', '카페']
	},
	{
		job_search_id: '5',
		profile: '사진',
		gender: '여성',
		uer_name: '유서강',
		department: '유럽문화학과',
		student_id: '24학번',
		birth_date: '2001-12-02',
		manner_temperature: '90',
		job_tag: ['식당', '주점', '카페']
	}
];
const WorkersList = () => {
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');
	const [job, setJob] = useState('');
	const [serverData, setServerData] = useState(null);
	const [modal, setModal] = useState({ isOpen: false, id: null });

	const openModal = (jobid) => {
		setModal({ isOpen: true, id: jobid });
	};

	const closeModal = () => {
		setModal({ isOpen: false, id: null });
	};
	useEffect(() => {
		const fetchData = async () => {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			};
			try {
				const response = await instance.get('/job-searches', {
					headers
				});
				setServerData(response.data);
			} catch (err) {
				// console.log('실패');
			}
		};
		fetchData();
	}, []);

	const onChangeGender = (e) => {
		setGender(e.target.value);
	};
	const onChangeJob = (e) => {
		setJob(e.target.value);
	};
	const onChangeAge = (e) => {
		setAge(e.target.value); // 선택된 나이 범위를 설정
	};

	const filteredData = () => {
		return serverData
			? serverData // api 연결 후 serverData로 수정.
					.filter((data) => (gender ? data?.gender === gender : true)) // 성별 필터
					.filter((data) => (job ? data.job_tag.includes(job) : true)) // 직업 필터
					.filter((data) => {
						if (!age) return true; // 나이 필터가 선택되지 않은 경우 모든 데이터를 반환
						const userAge = calculateAge(Number(data.birth_date)); // 생년월일로 나이 계산

						if (age === '20-25') return userAge >= 20 && userAge <= 25;
						if (age === '26-29') return userAge >= 26 && userAge <= 29;
						if (age === '30+') return userAge >= 30;
						return true;
					})
			: [];
	};

	return (
		<Layout>
			<HeadSection>
				<TitleContainer>
					<PageTitle>
						<Title>
							<Highlight />
							구직자 찾기
						</Title>
					</PageTitle>
					<PageSubTitle>
						믿고 맡길 수 있는 동문 구직자를 찾아보세요!
					</PageSubTitle>
				</TitleContainer>
				<ToggleContainer>
					<ToggleBox onChange={onChangeAge}>
						<option value="">나이</option>
						<option value="20-25">20세~25세</option>
						<option value="26-29">26세~29세</option>
						<option value="30+">30세 이상</option>
					</ToggleBox>

					<ToggleBox onChange={onChangeGender}>
						<option value="">성별</option>
						<option value="M">남성</option>
						<option value="F">여성</option>
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
					{filteredData().map((_, index, original) => (
						<WorkersItem
							openModal={() =>
								openModal(original[original.length - 1 - index].job_search_id)
							}
							key={index}
							data={original[original.length - 1 - index]}
						/>
					))}
					{modal.isOpen && (
						<WorkerInfo
							job_search_id={modal.id}
							close={closeModal}
						></WorkerInfo>
					)}
				</WorkersContainer>
			</MainSection>
		</Layout>
	);
};

const Layout = styled.div`
	width: 100vw;

	display: flex;
	flex-direction: column;
	gap: 45px;
	background-color: ${Surface_Background};
`;
const HeadSection = styled.div`
	padding-bottom: 1.5%;
	border-bottom: 1px solid #c3c3c3;
	display: flex;
	flex-direction: column;
	gap: 25px;
	padding-top: 74px;
	background-color: #fff;
`;
const TitleContainer = styled.div`
	padding-left: 14.2%;
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const PageTitle = styled.div`
	/* display: flex;
	flex-direction: column; */
`;

const Title = styled.span`
	font-size: 40px;
	position: relative;
`;

const Highlight = styled.div`
	background-color: ${Surface_Primary};
	opacity: 70%;
	width: 100%;
	height: 12px;
	position: absolute;
	top: 70%;
`;

const PageSubTitle = styled.div`
	color: var(--text-text-secondary, #787777);
	font-family: Pretendard;
	font-size: 15px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
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
