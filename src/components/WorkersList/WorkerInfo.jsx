import styled from 'styled-components';
import logo from '../../assets/icon/Man.png';
import deleteImg from '../../assets/icon/delete.png';
import Temperature from './Temperature';
import Button from '../common/Button';
import { instance } from '../../api/instance';
import { useEffect, useState } from 'react';
import Man from '../../assets/icon/Man.png';
import Woman from '../../assets/icon/Woman.png';

const mockData = {
	job_search_id: 'int',
	search_user_id: 'string',
	search_user_name: 'string',
	profile: 'file',
	gender: '남성',
	uer_name: '김동휘',
	department: '글로벌한국학과',
	student_id: '23학번',
	manner_temperature: '70',
	match_count: '4',
	job_tag: ['과외', '학원'],
	context: '안녕하세요 저는 서강대학교 글로벌한국학과 23학번 김동휘입니다.',
	search_date: 'date'
};
const colorMap = {
	학원: '#A5E09C', // 초록색
	과외: '#9CD2EA', // 파랑색
	카페: '#F49C9C', // 빨강색
	식당: '#B49EE8', // 보라색
	주점: '#FFC65C'
};
const WorkerInfo = ({ close, job_search_id }) => {
	const [serverData, setServerData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			};
			try {
				const response = await instance.get(`/job-searches/${job_search_id}`, {
					headers
				});
				setServerData(response.data);
			} catch (err) {
				console.log('실패', err);
			}
		};
		fetchData();
	}, []);
	return (
		<Overlay>
			<Layout>
				<FixLocation>
					<Delete src={deleteImg} onClick={close} />
				</FixLocation>
				<HeaderContainer>
					<RowLayout1>
						<Img src={serverData?.gender === 'M' ? Man : Woman}></Img>
						<ProfileInfo>
							<RowLayout2>
								<Name>{serverData?.user_name}</Name>
								<Major>({serverData?.department}</Major>
								<StudentId>
									{serverData?.student_id?.substring(2, 4)}학번)
								</StudentId>
							</RowLayout2>
							<JobTags>
								{serverData?.job_tag?.map((tag, index) => (
									<Tag key={index} color={colorMap[tag] || '#CCCCCC'}>
										{tag}
									</Tag>
								))}
							</JobTags>
						</ProfileInfo>
					</RowLayout1>
					<Temperature
						data={Math.round(serverData?.manner_temperature)}
					></Temperature>
				</HeaderContainer>
				<MainContainer>
					<BasicInfo>
						<SubTitle>기본 정보</SubTitle>
						<LayoutForm>
							<RowLayout3>
								<InfoTitle>성별</InfoTitle>
								<div>{serverData?.gender === 'F' ? '여' : '남'}</div>
							</RowLayout3>
							<RowLayout3>
								<InfoTitle>나이</InfoTitle>
								<div>23살</div>
							</RowLayout3>
							<RowLayout3>
								<InfoTitle>매칭횟수</InfoTitle>
								<div>{serverData?.match_count}회</div>
							</RowLayout3>
						</LayoutForm>
					</BasicInfo>
					<SelfIntro>
						<SubTitle>자기소개서</SubTitle>
						<LayoutForm>{serverData?.context}</LayoutForm>
					</SelfIntro>
				</MainContainer>
				{/* <Button
					mode="default"
					textSize="16"
					content="1:1 채팅하기"
					width="100%"
					height="50px"
					fontWeight={400}
					isIcon={false}
				></Button> */}
			</Layout>
		</Overlay>
	);
};

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
		180deg,
		rgba(39, 39, 39, 0.05) 0%,
		rgba(39, 39, 39, 0.2) 100%
	);
	z-index: 999; /* 모달 뒤 배경보다 낮은 z-index */
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Layout = styled.div`
	width: 656px;
	height: auto;
	padding: 50px;
	border-radius: 30px;
	border: 1px solid #e8e8e8;
	background: #fefefe;
	position: fixed; /* 화면에 고정 */
	top: 50%; /* 화면 상단에서 50% 아래로 이동 */
	left: 50%; /* 화면 왼쪽에서 50% 오른쪽으로 이동 */
	transform: translate(-50%, -50%); /* 자신의 크기 기준으로 중앙 정렬 */
	z-index: 1000; /* 다른 요소 위에 표시 */
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* 모달 느낌의 그림자 추가 */
`;
const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 110px;
	padding-bottom: 19px;
	border-bottom: 1px solid #c3c3c3;
`;
const Img = styled.img``;

const FixLocation = styled.div`
	display: flex;
	justify-content: right;
	padding-bottom: 20px;
`;
const Delete = styled.img`
	cursor: pointer;
	width: 20px;
	height: 20px;
`;
const ProfileInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;
const RowLayout1 = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;
const RowLayout2 = styled.div`
	display: flex;
	align-items: center;
	gap: 3px;
`;
const Name = styled.div`
	font-size: 32px;
`;
const Major = styled.div`
	color: #787777;
`;
const StudentId = styled.div`
	color: #787777;
`;
const JobTags = styled.div`
	display: flex;
	gap: 7px;
`;
const Tag = styled.div`
	display: flex;
	width: 50px;
	height: 21.053px;
	padding: 1px 11px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 5px;
	color: #fff;
	background-color: ${(props) => props.color || '#CCCCCC'};
`;

const MainContainer = styled.div`
	padding-top: 40px;
	padding-bottom: 30px;
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

const BasicInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;
const SelfIntro = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;
const SubTitle = styled.div`
	color: #464646;
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 24px; /* 120% */
`;
const LayoutForm = styled.div`
	display: flex;
	padding: 30px 50px;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	align-self: stretch;
	border-radius: 20px;
	border: 1px solid #e8e8e8;
	background: #fff;
`;
const InfoTitle = styled.div`
	width: 100px;
	color: var(--text-text-secondary, #787777);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const RowLayout3 = styled.div`
	display: flex;
	align-items: center;
`;
export default WorkerInfo;
