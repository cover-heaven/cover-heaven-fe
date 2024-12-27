import styled from 'styled-components';
import iconMan from '../../assets/icon/icon_man.svg';
import { useState } from 'react';
import axios from 'axios';

const WorkersWriting = () => {
	const [selectedTags, setSelectedTags] = useState([]);
	const [message, setMessage] = useState();

	const handleTagChange = (job) => {
		if (selectedTags.includes(job)) {
			setSelectedTags(selectedTags.filter((tag) => tag !== job));
		} else if (selectedTags.length < 3) {
			setSelectedTags([...selectedTags, job]);
		} else {
			alert('최대 3개까지만 선택 가능합니다.');
		}
	};
	const Jobs = ['학원', '과외', '주점', '식당', '카페'];

	const onSubmit = async () => {
		if (!selectedTags || !message) {
			alert('모든 필수 정보를 입력해주세요.');
			return;
		}
		try {
			await axios.post('http://3.131.18.121/alumni_job/job-searches', {
				job_tag: selectedTags,
				context: message
			});
		} catch (err) {
			console.log('실패', err);
		}
	};
	return (
		<Layout>
			<Header>
				<MainTitle>
					<Title>구직글 작성하기</Title>
					<Highlight></Highlight>
				</MainTitle>
				<P>대타 제안을 받기 위한 구직글을 작성해 보세요!</P>
			</Header>
			<Body>
				<Profile>
					<SubTitle>나의 프로필</SubTitle>
					<ProfileBox>
						<Img src={iconMan}></Img>
						<PersonInfo>
							<SubTitle>김서강</SubTitle>
							<SubInfo>
								<SubP>남자 | 만 24세</SubP>
								<SubP>서강대학교 컴퓨터공학과 24학번</SubP>
							</SubInfo>
						</PersonInfo>
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
								<input
									type="checkbox"
									onChange={() => handleTagChange(job)}
									checked={selectedTags.includes(job)}
								/>
								{job}
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
		</Layout>
	);
};

export default WorkersWriting;

const Layout = styled.div`
	padding-top: 148px;
	padding-left: 19%;
`;

const MainTitle = styled.div`
	display: flex;
	flex-direction: column;
`;
const Title = styled.div`
	font-size: 40px;
`;
const Highlight = styled.div`
	background-color: red;
	opacity: 60%;
	width: 290px;
	height: 16px;
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
	gap: 30px;
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
	gap: 17%;
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
	gap: 4%;
	width: 679px;
	height: 135px;
	border: 1px solid #e8e8e8;
	border-radius: 20px;
	padding: 27px 39px;
`;

const FavoriteJob = styled.div`
	display: flex;
	gap: 3%;
`;

const Toggle = styled.div`
	flex: 1;
`;
const SelfIntro = styled.div`
	display: flex;
	gap: 17%;
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
	&:focus {
		outline: none;
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
	width: 100%;
`;

const Location = styled.div`
	display: flex;
	justify-content: right;
`;
