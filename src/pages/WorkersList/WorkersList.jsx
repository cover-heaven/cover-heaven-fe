import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';
import {
	Border_Primary,
	Surface_Background,
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';
import WorkersItem from '../../components/WorkersList/WorkersItem';
const WorkersList = ({ mockData1 }) => {
	return (
		<>
			<HeadSection>
				<Highlight></Highlight>
				<PageTitle>구직자 찾기</PageTitle>
				<PageSubTitle>믿고 맡길 수 있는 동문 구직자를 찾아보세요!</PageSubTitle>
				<ToggleContainer>
					<ToggleBox>
						<option>나이</option>
						<option>20대</option>
						<option>30대</option>
						<option>40대 이상</option>
					</ToggleBox>
					<ToggleBox>
						<option>성별</option>
						<option>남성</option>
						<option>여성</option>
					</ToggleBox>
					<ToggleBox>
						<option>선호직종</option>
						<option>IT</option>
						<option>교육</option>
						<option>서비스</option>
					</ToggleBox>
				</ToggleContainer>
			</HeadSection>

			<MainSection>
				<RightBox>
					<RightToggleContainer>
						<option>최신순</option>
						<option>온도순</option>
					</RightToggleContainer>
				</RightBox>
				<WorkersContainer>
					{mockData1.map((data, index) => (
						<WorkersItem key={index} data={data} />
					))}
				</WorkersContainer>
			</MainSection>
		</>
	);
};

/// CSS

const HeadSection = styled.section`
	background-color: #fff;
	width: 100vw;
	border: 1px solid ${Border_Primary};
	font-family: Pretendard;
	position: relative;
	padding-top: 200px; /* 위쪽 패딩 */
	margin-top: 150px; /* 전체 섹션을 아래로 이동 */
`;

const PageTitle = styled.h1`
	color: ${Text_Primary};
	font-size: 40px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
	position: absolute;
	left: calc(215 / 1512 * 100%);
	top: 74px;
`;

const PageSubTitle = styled.h2`
	color: ${Text_Secondary};
	font-size: 17px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
	position: absolute;
	left: calc(215 / 1512 * 100%);
	top: 137px;
`;

const ToggleContainer = styled.div`
	display: flex;
	gap: 30px;
	padding-left: 10%;
`;

const Highlight = styled.div`
	background-color: ${Surface_Primary};
	opacity: 70%;
	width: 180px;
	height: 16px;
	position: absolute;
	left: calc(215 / 1512 * 100%);
	top: 109px;
`;

const MainSection = styled.div`
	width: 100vw;
	display: flex;
	flex-direction: column;
	gap: 15px;
	background-color: #f9f9f9;
`;

const RightBox = styled.div`
	display: flex;
	justify-content: right;
	right: calc(214 / 1512 * 100%);
	padding-right: 10%;
	border-radius: 10px;
	background: #;
	padding-top: 10px;
`;
const RightToggleContainer = styled.select`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	font-size: 14px;
	background-color: #fff;
`;

const WorkersContainer = styled.div`
	display: grid;
	border-radius: 20px;
	grid-template-columns: repeat(2, 1fr);
	gap: 18px; /* 상하좌우 요소 간 간격 */
	padding: 18px 215px 18px 215px; /* 상단, 오른쪽, 하단, 왼쪽 순서로 설정 */
`;

const ToggleBox = styled.select`
	width: 150px;
	height: 52px;
	padding: 15px;
	margin-bottom: 27.8px; /* 아래쪽 여백 */
	border-radius: 15px; /* 둥근 모서리 */
	border: 1px solid var(--border-border-primary, #e8e8e8); /* CSS 변수 사용 */
	background: #fff; /* 배경 색상 */
	font-size: 14px; /* 폰트 크기 추가 */
	color: #333; /* 글자 색상 */
`;

export default WorkersList;
