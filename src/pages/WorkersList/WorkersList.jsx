import styled from 'styled-components';
import React from 'react';
import WorkersItem from '../../components/WorkersList/WorkersItem';
import { useState } from 'react';

const WorkersList = ({ mockData1 }) => {
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');
	const [job, setJob] = useState('');

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
		return mockData1
			.filter((data) => (gender ? data.gender === gender : true))
			.filter((data) => (job ? data.job_tag.includes(job) : true));
	};
	return (
		<Layout>
			<HeadSection>
				<TitleContainer>
					<PageTitle>구직자 찾기</PageTitle>
					<Highlight></Highlight>
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
						<WorkersItem key={index} data={data} />
					))}
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
	font-size: 40px;
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

const Highlight = styled.div`
	background-color: red;
	opacity: 60%;
	width: 210px;
	height: 16px;
	position: absolute;
	left: calc(223 / 1512 * 100%);
	top: 194px;
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
