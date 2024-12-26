import styled from 'styled-components';
import React from 'react';
import {
	Border_Primary,
	Surface_Background,
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';

const WorkersWriting = () => {
	return (
		<>
			<HeadSection>
				<Highlight></Highlight>
				<Pagetitle>구직글 작성하기</Pagetitle>
				<PageSubtitle>
					대타 제안을 받기 위한 구직글을 작성해보세요!
				</PageSubtitle>
			</HeadSection>
			<BottomLayout>
				<ProfileCard>
					<MyProfile>나의 프로필</MyProfile>
					<ProfileInfo>
						<ProfileImage />
						<ColumnLayout>
							<Profile>김서강</Profile>
							<div>남자 | 만 24세</div>
							<div>서강대학교 컴퓨터공학과 24학번</div>
						</ColumnLayout>
						<MannerTemperature>82°</MannerTemperature>
					</ProfileInfo>
				</ProfileCard>

				<PreferenceSection>
					<div>
						<h2>선호 직종</h2>
						<p>최대 3개까지 선택 가능합니다.</p>
					</div>
					<CheckboxContainer>
						<label>
							<input type="checkbox" /> 학원
						</label>
						<label>
							<input type="checkbox" /> 과외
						</label>
						<label>
							<input type="checkbox" /> 주점
						</label>
						<label>
							<input type="checkbox" /> 식당
						</label>
						<label>
							<input type="checkbox" /> 카페
						</label>
					</CheckboxContainer>
				</PreferenceSection>
				<IntroductionSection>
					<h2>자기소개서</h2>
					<textarea placeholder="자기소개서를 입력해주세요" />
				</IntroductionSection>
			</BottomLayout>
			<SubmitButton>작성 완료</SubmitButton>
		</>
	);
};

//CSS

const HeadSection = styled.div`
	background-color: #fff;
	width: 100vw;
	font-family: Pretendard;
	position: relative;
	padding-top: 200px; /* 위쪽 패딩 */
	margin-top: 150px; /* 전체 섹션을 아래로 이동 */
	position: relative;
`;

const Pagetitle = styled.h1`
	color: ${Text_Primary};
	font-size: 40px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
	position: absolute;
	left: calc(215 / 1512 * 100%);
	top: 74px;
`;

const Highlight = styled.div`
	background-color: ${Surface_Primary};
	opacity: 70%;
	width: px;
	height: 16px;
	position: absolute;
	left: calc(215 / 1512 * 100%);
	top: 109px;
`;

const BottomLayout = styled.div`
	padding-left: 14%;
`;

const PageSubtitle = styled.div`
	color: ${Text_Secondary};
	font-size: 17px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
	position: absolute;
	left: calc(215 / 1512 * 100%);
	top: 137px;
`;
const Profile = styled.div`
	color: #464646;
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;
const ProfileCard = styled.div`
	padding-top: 30px;
	display: flex;
	width: 50%;
	border-radius: 20px;
	background-color: #fff;
	height: 135px;
	gap: 15%;
`;

const MyProfile = styled.div``;

const ProfileImage = styled.div`
	width: 70px;
	height: 70px;
	border-radius: 50%;
	background-color: #f0f0f0;
	margin-right: 20px;
`;
const ProfileInfo = styled.div`
	display: flex;
	border: 1px solid #eaeaea;

	flex: 1;
	p {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 5px;
	}
	span {
		display: block;
		font-size: 14px;
		color: #888;
	}
`;
const ColumnLayout = styled.div`
	display: flex;
	flex-direction: column;
`;
const MannerTemperature = styled.div`
	font-size: 20px;
	font-weight: bold;
	color: #ff6b6b;
`;
const PreferenceSection = styled.div`
	display: flex;
	gap: 5%;
	margin-bottom: 40px;
	h2 {
		font-size: 18px;
		margin-bottom: 10px;
	}
	p {
		font-size: 14px;
		color: #888;
		margin-bottom: 15px;
	}
`;
const CheckboxContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	label {
		font-size: 16px;
		color: #333;
		display: flex;
		align-items: center;
		input {
			margin-right: 8px;
		}
	}
`;
const IntroductionSection = styled.div`
	margin-bottom: 40px;
	h2 {
		font-size: 18px;
		margin-bottom: 10px;
	}
	textarea {
		width: 100%;
		height: 150px;
		padding: 10px;
		border: 1px solid #eaeaea;
		border-radius: 4px;
		font-size: 16px;
		color: #333;
		resize: none;
		background-color: #f9f9f9;
	}
	textarea::placeholder {
		color: #bbb;
	}
`;
const SubmitButton = styled.button`
	width: 100%;
	padding: 15px;
	font-size: 18px;
	color: #fff;
	background-color: #ff6b6b;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: bold;
	transition: background-color 0.3s;
	&:hover {
		background-color: #e05555;
	}
`;
export default WorkersWriting;
