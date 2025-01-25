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
import { instance } from '../../api/instance';
import iconMan from '../../assets/icon/Man.png';
import iconWoman from '../../assets/icon/Woman.png';
import Temperature from '../../components/WorkersList/Temperature';
import coffeeIcon from '../../assets/icon/coffeeIcon.png';
import restaurantIcon from '../../assets/icon/restaurantIcon.png';
import tutor from '../../assets/icon/tutor.png';
import beer from '../../assets/icon/beer.png';
import academy from '../../assets/icon/academy.png';
import WarningModal from '../../components/MyProfile/WarningModal';
import { useNavigate } from 'react-router-dom';

const jobIcons = {
	카페: coffeeIcon,
	과외: tutor,
	식당: restaurantIcon,
	술집: beer,
	학원: academy,
	default: '/images/default-icon.png' // 매칭되지 않을 경우 기본 아이콘
};
const MyProfile = () => {
	const [profileData, setProfileData] = useState(null);
	const [jobOfferData, setJobOfferData] = useState();
	const [jobSearchData, setJobSearchData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(false);
	const nav = useNavigate();

	useEffect(() => {
		const fetchProfileData = async () => {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			};
			try {
				const response = await instance.get('/users/info', {
					headers
				});
				setProfileData(response.data);
				setLoading(false);
			} catch (err) {
				setError('프로필 정보를 불러오는 데 실패했습니다.');
				setLoading(true);
			}
		};

		fetchProfileData();
	}, []);

	useEffect(() => {
		const fetchJobOfferData = async () => {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			};
			try {
				const response = await instance.get('/job-offers/my', {
					headers
				});
				setJobOfferData(response.data);
				console.log(jobOfferData);
				setLoading(false);
			} catch (err) {
				setError('내 구인글 정보를 불러오는 데 실패했습니다.');
				setLoading(true);
			}
		};

		fetchJobOfferData();
	}, []);

	useEffect(() => {
		const fetchJobSearchData = async () => {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			};
			try {
				const response = await instance.get('/job-searches/my', {
					headers
				});
				setJobSearchData(response.data);
				setLoading(false);
			} catch (err) {
				setError('내 구인글글 정보를 불러오는 데 실패했습니다.');
				setLoading(true);
			}
		};

		fetchJobSearchData();
	}, []);
	const onChangeTrue = () => {
		setStatus(true);
		console.log(status);
	};
	const onChangeFalse = () => {
		setStatus(false);
	};

	const logout = () => {
		// 로컬 스토리지 전체 삭제
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		nav('/login');
	};

	// 아이콘 매칭
	const iconSrc = jobIcons[jobOfferData?.job_tag] || jobIcons.default;

	// if (loading) {
	// 	return <div>로딩 중...</div>;
	// }

	// if (error) {
	// 	return <div>{error}</div>;
	// }
	return (
		<MainContainer>
			<HeadSection>
				<PageTitle>
					<Title>마이페이지</Title>
					<Highlight></Highlight>
				</PageTitle>
				<PageSubTitle>
					{profileData?.name} 님의 회원 정보를 확인해보세요.
				</PageSubTitle>
			</HeadSection>
			<MainSection>
				<Section>
					<SectionTitle>나의 프로필</SectionTitle>
					<ProfileBox>
						<ProfileInfo>
							<Avatar src={profileData?.gender === 'M' ? iconMan : iconWoman} />
							<ProfileDetails>
								<ProfileName>{profileData?.name}</ProfileName>
								<ProfileDetail>
									{profileData?.gender === 'M' ? '남자' : '여자'} | 만&nbsp;
									{profileData ? calculateAge(profileData?.birth_date) : 0}세
								</ProfileDetail>
								<ProfileDetail>
									{profileData?.school} {profileData?.department}{' '}
									{profileData?.student_id.substring(2, 4)}학번
								</ProfileDetail>
								<ProfileDetail>
									{profileData?.phone.substring(0, 3)}-
									{profileData?.phone.substring(3, 7)}-
									{profileData?.phone.substring(7, 11)}
								</ProfileDetail>
							</ProfileDetails>
						</ProfileInfo>
						<FixLocation>
							<Temperature
								outerWidth="80px"
								outerHeight="80px"
								innerWidth="65px"
								innerHeight="65px"
								fontSize="22px"
								data={Math.round(profileData?.manner_temperature)}
							/>
						</FixLocation>
						<MatchCount>매칭횟수 {profileData?.match_count} 회</MatchCount>
					</ProfileBox>
				</Section>

				{/* 나의 코인 현황 */}
				<Section>
					<SectionTitle>나의 코인 현황</SectionTitle>
					<CoinBox>
						<CurrentCoin>
							현재 코인 잔액: <strong>{profileData?.coin_balance} P</strong>
						</CurrentCoin>
						<CoinButton onClick={onChangeTrue}>코인 충전하기</CoinButton>
						{status && (
							<WarningModal onChangeFalse={onChangeFalse}></WarningModal>
						)}
					</CoinBox>
				</Section>
				<Section>
					<SectionTitle>나의 구직글</SectionTitle>
					<JobBox>
						<JobItem>
							<ProfileImage
								src={profileData?.gender === 'M' ? iconMan : iconWoman}
								alt="프로필 이미지"
							/>
							<NameAndDepartment>
								<JobName>{profileData?.name}</JobName>
								<JobDepartment>
									({profileData?.department}{' '}
									{profileData?.student_id.substring(2, 4)}학번)
								</JobDepartment>
							</NameAndDepartment>
						</JobItem>
					</JobBox>
				</Section>
				<Section>
					<SectionTitle>나의 공고</SectionTitle>
					<AnnouncementBox>
						{jobOfferData?.map((data) => (
							<AnnouncementItem key={data.job_offer_id}>
								<Img src={jobIcons[data?.job_tag] || jobIcons.default} />
								<RowLayout>
									<span>{data.title}</span>
									<RowLayout2>
										{data.work_detail.map((detail, index) => (
											<Tag key={index}>
												{detail.work_date.slice(5, 7)}/
												{detail.work_date.slice(8, 10)}
											</Tag>
										))}
									</RowLayout2>
								</RowLayout>
							</AnnouncementItem>
						))}
					</AnnouncementBox>
				</Section>
			</MainSection>
			<LogoutButton onClick={logout}>로그아웃</LogoutButton>
		</MainContainer>
	);
};
const Img = styled.img`
	width: 50px;
`;

const LogoutButton = styled.button`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	padding-bottom: 60px;
	font-size: 15px;
	text-decoration: underline;
`;
const RowLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;
const RowLayout2 = styled.div`
	display: flex;
	gap: 8px;
`;
// 나이 계산 함수
const calculateAge = (birthDate) => {
	const today = new Date();
	const birthYear = parseInt(birthDate.substring(0, 4), 10);
	return today.getFullYear() - birthYear;
};

// 스타일 컴포넌트 정의
const MainContainer = styled.div`
	width: 100vw;
	padding-top: 74px;
`;

const FixLocation = styled.div`
	position: absolute;
	left: 86.2%;
	top: 19%;
`;

const HeadSection = styled.div`
	padding-left: calc(300 / 1512 * 100%);
	display: flex;
	flex-direction: column;
	gap: 15px;
	border-bottom: 1px solid var(--border-border-primary, #e8e8e8);
	padding-bottom: 40px;
`;

const PageTitle = styled.div``;
const Title = styled.div`
	font-size: 40px;
`;

const PageSubTitle = styled.div`
	color: var(--text-text-secondary, #787777);
	font-family: Pretendard;
	font-size: 15px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
`;

const Highlight = styled.div`
	background-color: ${Surface_Primary};
	opacity: 70%;
	width: 200px;
	height: 16px;
`;

const MainSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
	padding: 20px;
	padding-left: calc(300 / 1512 * 100%);
	padding-right: calc(301 / 1512 * 100%);
`;

const Section = styled.section`
	display: flex;
	flex-direction: column;
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
	padding-bottom: 5px;
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
	cursor: pointer;
	&:hover {
		scale: 1.01;
		box-shadow: 1px 1px 23.3px 0px rgba(0, 0, 0, 0.11);
	}
`;

const JobItem = styled.div`
	display: flex;
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
	display: flex;
	width: 44px;
	height: 21.053px;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	border: 1px solid #ff5238;
	color: #ff5238;
	font-size: 13px;
	font-weight: 500;
`;

const AnnouncementBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const AnnouncementItem = styled.div`
	border-radius: 20px;
	border: 1px solid #e8e8e8;
	background: #fff;
	padding: 20px;
	display: flex;
	align-items: center;
	gap: 17px;
	cursor: pointer;
	&:hover {
		scale: 1.01;
		box-shadow: 1px 1px 23.3px 0px rgba(0, 0, 0, 0.11);
	}
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
