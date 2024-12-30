import styled from 'styled-components';
import iconMan from '../../assets/icon/icon_man.svg';
import iconWoman from '../../assets/icon/icon_woman.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import temperature from '../../assets/icon/temperature.png';
import { Surface_Primary, Text_Tertiary } from '../../styles/color';
import Temperature from '../../components/WorkersList/Temperature';
import { instance } from '../../api/instance';
import { calculateAge } from '../WorkersList/WorkersList';
import { useNavigate } from 'react-router-dom';

const WorkersWriting = () => {
	const [selectedTags, setSelectedTags] = useState([]);
	const [message, setMessage] = useState();
	const [serverData, setServerData] = useState(null);
	const nav = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			};
			try {
				const response = await axios.get(
					'https://3.131.18.121.nip.io/alumni_job/users/info',
					{
						headers
					}
				);
				setServerData(response.data);
			} catch (err) {
				// console.log('실패');
			}
		};
		fetchData();
	}, []);
	const handleTagChange = (job) => {
		if (selectedTags.includes(job)) {
			setSelectedTags(selectedTags.filter((tag) => tag !== job));
		} else if (selectedTags.length < 3) {
			setSelectedTags([...selectedTags, job]);
		} else {
			alert('최대 3개까지만 선택 가능합니다.');
		}
	};
	const Jobs = ['학원', '과외', '술집', '식당', '카페'];

	const onSubmit = async () => {
		if (!selectedTags || !message) {
			alert('모든 필수 정보를 입력해주세요.');
			return;
		}
		const headers = {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		};
		try {
			await instance.post(
				'/job-searches',
				{
					job_tag: selectedTags,
					context: message
				},
				{
					headers
				}
			);
		} catch (err) {
			// console.log('실패', err);
		}
		nav('/workerslist');
	};

	return (
		<Layout>
			<InnerLayout>
				<Header>
					<MainTitle>
						<Title>
							<Highlight />
							구직글 작성하기
						</Title>
					</MainTitle>
					<P>대타 제안을 받기 위한 구직글을 작성해 보세요!</P>
				</Header>
				<Body>
					<Profile>
						<SubTitle>나의 프로필</SubTitle>
						<ProfileBox>
							<Img src={serverData?.gender === 'M' ? iconMan : iconWoman}></Img>
							<PersonInfo>
								<SubTitle>{serverData?.name}</SubTitle>
								<SubInfo>
									<SubP>
										{serverData?.gender === 'M' ? '남자' : '여자'}&nbsp;|&nbsp;
										{serverData?.birth_date
											? calculateAge(Number(serverData.birth_date))
											: '알 수 없음'}
										세
									</SubP>
									<SubP>
										{serverData?.school}&nbsp;{serverData?.department}
										&nbsp;{serverData?.student_id.substring(2, 4)}학번
									</SubP>
								</SubInfo>
							</PersonInfo>
							<FixLocation>
								<Temperature
									data={Math.round(serverData?.manner_temperature)}
								></Temperature>
							</FixLocation>
						</ProfileBox>
					</Profile>
					<FavoriteJob>
						<Explain>
							<SubTitle>선호 직종</SubTitle>
							<SubP>최대 3개까지 선택 가능합니다.</SubP>
						</Explain>
						<RowLayout>
							{Jobs.map((job, index) => (
								<Toggle key={index}>
									<StyledRadio
										type="checkbox"
										onChange={() => handleTagChange(job)}
										checked={selectedTags.includes(job)}
									/>
									<span>{job}</span>
								</Toggle>
							))}
						</RowLayout>
					</FavoriteJob>
					<Introduction>
						<SelfIntro>
							<SubTitle>자기소개서</SubTitle>
							<InputBox
								placeholder="자기소개서를 입력해주세요."
								onChange={(e) => setMessage(e.target.value)}
							></InputBox>
						</SelfIntro>
						<Location>
							<Button onClick={onSubmit}>작성 완료</Button>
						</Location>
					</Introduction>
				</Body>
			</InnerLayout>
		</Layout>
	);
};

export default WorkersWriting;
const FixLocation = styled.div`
	padding-top: 10px;
	padding-left: 150px;
`;

const Layout = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 74px;
`;

const InnerLayout = styled.div`
	width: 912;
`;

const MainTitle = styled.div`
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

const SubTitle = styled.div`
	color: #464646;
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

const P = styled.div`
	color: var(--text-text-secondary, #787777);
	font-family: Pretendard;
	font-size: 15px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
`;

const SubP = styled.div`
	color: var(--text-text-secondary, #787777);
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	width: 250px;
`;

const Explain = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding-bottom: 60px;
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	gap: 50px;
	width: 950px;
	padding-bottom: 50px;
`;

const Profile = styled.div`
	display: flex;
	/* gap: 16.3%; */
	justify-content: space-between;
`;

const Img = styled.img`
	width: 80px;
	height: 80px;
`;

const PersonInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 9px;
`;

const SubInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const ProfileBox = styled.div`
	display: flex;
	width: 679px;
	height: 135px;
	border: 1px solid #e8e8e8;
	border-radius: 20px;
	padding: 27px 39px;
	gap: 3%;
`;

const FavoriteJob = styled.div`
	display: flex;
	/* gap: 3%; */
	justify-content: space-between;
`;

const Toggle = styled.div`
	flex: 1;
	color: #464646;
	text-align: center;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	display: flex;
	align-items: center;
`;

const StyledRadio = styled.input`
	vertical-align: middle;
	appearance: none;
	border: 2px solid ${Text_Tertiary};
	border-radius: 50%;
	width: 18px;
	height: 18px;
	transition: border 0.1s ease-in-out;
	&:checked {
		border: 6px solid ${Surface_Primary};
	}
	&:focus {
		outline: 2px dotted ${Surface_Primary};
		outline-offset: 2px;
	}
	margin-right: 14px;
`;

const SelfIntro = styled.div`
	display: flex;
	/* gap: 17%; */
	justify-content: space-between;
`;
const Introduction = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

const InputBox = styled.textarea`
	width: 679px;
	height: 346px;
	border: 1px solid #e8e8e8;
	border-radius: 20px;
	padding: 20px;
	font-size: 14px;
	line-height: 1.5;
	color: #464646;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	resize: none;
	&:focus {
		outline: none;
		border: 1px solid ${Surface_Primary};
	}
`;

const Button = styled.button`
	width: 212px;
	height: 49px;
	border-radius: 15px;
	background: #ff5238;
	color: #fff;
`;

const RowLayout = styled.div`
	display: flex;
	width: 679px;
	justify-content: space-between;
`;

const Location = styled.div`
	display: flex;
	justify-content: right;
`;
