import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Border_Primary,
	Surface_Background,
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';

const MyProfile = () => {
	const [profileData, setProfileData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const token = localStorage.getItem('accessToken');
				const response = await axios.get('/users/info', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setProfileData(response.data.data);
				setLoading(false);
			} catch (err) {
				setError('프로필 정보를 불러오는 데 실패했습니다.');
				setLoading(false);
			}
		};

		fetchProfileData();
	}, []);

	if (loading) {
		return <div>로딩 중...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<MainContainer>
			<HeadSection>
				<Highlight></Highlight>
				<PageTitle>마이페이지</PageTitle>
				<PageSubTitle>
					{profileData.name} 님의 회원 정보를 확인해보세요.
				</PageSubTitle>
			</HeadSection>
			<MainSection>
				{/* 나의 프로필 */}
				<Section>
					<SectionTitle>나의 프로필</SectionTitle>
					<ProfileBox>
						<ProfileInfo>
							<Avatar src={profileData.profile || '/default-avatar.png'} />
							<ProfileDetails>
								<ProfileName>{profileData.name}</ProfileName>
								<ProfileDetail>
									{profileData.gender} | 만{' '}
									{calculateAge(profileData.birth_date)}세
								</ProfileDetail>
								<ProfileDetail>
									{profileData.school} {profileData.department}{' '}
									{profileData.student_id}학번
								</ProfileDetail>
								<ProfileDetail>{profileData.phone}</ProfileDetail>
							</ProfileDetails>
						</ProfileInfo>
						<MatchCount>매칭횟수 {profileData.match_count} 회</MatchCount>
					</ProfileBox>
				</Section>

				{/* 나의 코인 현황 */}
				<Section>
					<SectionTitle>나의 코인 현황</SectionTitle>
					<CoinBox>
						<CurrentCoin>
							현재 코인 잔액: <strong>{profileData.coin_balance} P</strong>
						</CurrentCoin>
						<CoinButton>코인 충전하기</CoinButton>
					</CoinBox>
				</Section>

				{/* 나의 구직글 */}
				<Section>
					<SectionTitle>나의 구직글</SectionTitle>
					<JobBox>
						<JobItem>
							<ProfileImage
								src={profileData.profile || '/default-avatar.png'}
								alt="프로필 이미지"
							/>
							<NameAndDepartment>
								<JobName>{profileData.name}</JobName>
								<JobDepartment>
									({profileData.department} {profileData.student_id}학번)
								</JobDepartment>
							</NameAndDepartment>
							<TagWrapper>
								<Tag>현재</Tag>
								<Tag>과외</Tag>
								<Tag>개발</Tag>
							</TagWrapper>
						</JobItem>
					</JobBox>
				</Section>

				{/* 나의 공고 */}
				<Section>
					<SectionTitle>나의 공고</SectionTitle>
					<AnnouncementBox>
						<AnnouncementItem>
							<span>광흥창 투썸 알바 급구</span>
							<DateWrapper>
								<Tag>11/23</Tag>
								<Tag>11/23</Tag>
							</DateWrapper>
							<Status>매칭완료</Status>
						</AnnouncementItem>
					</AnnouncementBox>
				</Section>
			</MainSection>
		</MainContainer>
	);
};

// 나이 계산 함수
const calculateAge = (birthDate) => {
	const today = new Date();
	const birthYear = parseInt(birthDate.substring(0, 4), 10);
	return today.getFullYear() - birthYear;
};

// 스타일 컴포넌트 정의
const MainContainer = styled.div`
	background-color: ${Surface_Background};
	padding: 20px;
`;

const HeadSection = styled.section`
	background-color: #fff;
	width: 100vw;
	border: 1px solid ${Border_Primary};
	font-family: Pretendard;
	position: relative;
	padding-top: 200px;
	margin-top: 150px;
`;

const PageTitle = styled.h1`
	color: ${Text_Primary};
	font-size: 40px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
	position: absolute;
	left: calc(300 / 1512 * 100%);
	top: 74px;
`;

const PageSubTitle = styled.h2`
	color: ${Text_Secondary};
	font-size: 17px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
	position: absolute;
	left: calc(300 / 1512 * 100%);
	top: 137px;
`;

const Highlight = styled.div`
	background-color: ${Surface_Primary};
	opacity: 70%;
	width: 180px;
	height: 16px;
	position: absolute;
	left: calc(300 / 1512 * 100%);
	top: 109px;
`;

const MainSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
	padding: 20px;
	padding-left: calc(300 / 1512 * 100%);
	padding-right: calc(301 / 1512 * 100%);
	background-color: ${Surface_Background};
`;

const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin: 20px 0;
`;

const SectionTitle = styled.h3`
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 20px;
`;

const ProfileBox = styled.div`
	display: flex;
	position: relative;
	border-radius: 20px;
	border: 1px solid #e8e8e8;
	background: #fff;
	padding: 46px 50px;
	align-items: flex-start;
	margin-bottom: 20px;
	height: 223px;
	gap: 10px;
`;

const ProfileInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

const Avatar = styled.img`
	width: 120px;
	height: 120px;
	border-radius: 50%;
	background: ${Surface_Primary};
	object-fit: cover;
`;

const ProfileDetails = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	color: ${Text_Primary};
`;

const ProfileName = styled.div`
	font-size: 28px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const ProfileDetail = styled.div`
	color: var(--text-text-secondary, #787777);
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: 120%;
`;

const MatchCount = styled.div`
	color: ${Text_Secondary};
	position: absolute;
	right: 50px;
	bottom: 46px;
	font-size: 16px;
	font-weight: 800;
`;

const CoinBox = styled.div`
	border-radius: 20px;
	border: 1px solid #e8e8e8;
	background: #fff;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const CurrentCoin = styled.div`
	color: var(--text-text-secondary, #787777);
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
	left: 50px;
	position: relative;
	border-bottom: 3px solid var(--border-border-secondary, #c3c3c3);
`;

const CoinButton = styled.button`
	background: ${Surface_Primary};
	color: #fff;
	border-radius: 20px;
	border: none;
	display: inline-flex;
	height: 54px;
	padding: 13px 30px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
`;

const JobBox = styled.div`
	position: relative;
	display: flex;
	padding: 23px 50px;
	border-radius: 20px;
	border: 1px solid #e8e8e8;
	background: #fff;
	padding: 20px;
`;

const JobItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const ProfileImage = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const NameAndDepartment = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`;

const JobName = styled.div`
	color: var(--text-text-primary, #464646);
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const JobDepartment = styled.div`
	color: var(--text-text-secondary, #787777);
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const TagWrapper = styled.div`
	padding: 5px 10px;
	color: #fff;
	border-radius: 4px;
	font-size: 14px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Tag = styled.span`
	background: ${Surface_Primary};
	color: #fff;
	padding: 5px 10px;
	border-radius: 5px;
	font-size: 12px;
`;

const AnnouncementBox = styled.div`
	border-radius: 20px;
	border: 1px solid #e8e8e8;
	background: #fff;
	padding: 20px;
`;

const AnnouncementItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const DateWrapper = styled.div`
	display: flex;
	gap: 5px;
`;

const Status = styled.span`
	color: red;
	font-weight: bold;
`;

export default MyProfile;
