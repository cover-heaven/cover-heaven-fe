import styled from 'styled-components';
import {
	Border_Primary,
	Surface_Background,
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';
import ChatListItem from '../../components/ChatList/ChatListItem';
import { useEffect, useState } from 'react';
import { instance } from '../../api/instance';
import { useNavigate } from 'react-router-dom';

const dummyData = [
	{
		chatting_id: '1',
		job_offer_id: '999',
		opponent_user_name: '김서강',
		opponent_user_gender: 'male',
		opponent_user_student_id: '19',
		opponent_department: '경제학과',
		opponent_profile: null,
		last_message: '안녕하세요^^~',
		unread_messages: '3'
	},
	{
		chatting_id: '2',
		job_offer_id: '999',
		opponent_user_name: '김스깡',
		opponent_user_gender: 'male',
		opponent_user_student_id: '21',
		opponent_department: '물리학과',
		opponent_profile: null,
		last_message: '안녕하세요 안녕하세요~',
		unread_messages: '1'
	},
	{
		chatting_id: '3',
		job_offer_id: '999',
		opponent_user_name: '김성강',
		opponent_user_gender: 'female',
		opponent_user_student_id: '22',
		opponent_department: '화학과',
		opponent_profile: null,
		last_message: '단기 알바 관심있어요',
		unread_messages: '0'
	}
];

const ChatList = () => {
	const [listData, setListData] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchListData = async () => {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			};
			try {
				const response = await instance.get('/chatting/list', { headers });
				if (response.status === 200) {
					setListData(response.data);
				}
			} catch (err) {
				alert(err);
			}
		};
		fetchListData();
	}, []);

	const handleItemClick = (data) => {
		navigate('/chat', {
			state: {
				chatting_id: data.chatting_id,
				job_offer_id: data.job_offer_id,
				opponent_user_name: data.opponent_user_name,
				opponent_user_gender: data.opponent_user_gender,
				opponent_user_student_id: data.opponent_user_student_id,
				opponent_department: data.opponent_department,
				opponent_profile: data.opponent_profile
			}
		});
	};

	return (
		<>
			<HeadSection>
				<Highlight></Highlight>

				<PageTitle>채팅 목록</PageTitle>
				<PageSubTitle>
					채팅을 통해 동문들과 자유롭게 대화하고 대타 멤버를 매칭하세요.
				</PageSubTitle>
			</HeadSection>
			<MainSection>
				<ListWrapper>
					<ListText>나의 채팅 목록 </ListText>
					{listData.map((data) => (
						<div
							key={data.chatting_id}
							onClick={() => {
								handleItemClick(data);
							}}
						>
							<ChatListItem
								subText={data.last_message}
								{...data}
							></ChatListItem>
						</div>
					))}
				</ListWrapper>
			</MainSection>
		</>
	);
};

export default ChatList;

const HeadSection = styled.section`
	background-color: #fff;
	width: 100vw;
	height: 230px;
	border: 1px solid ${Border_Primary};
	font-family: Pretendard;
	position: relative;
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
	font-size: 15px;
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
	width: 148px;
	height: 16px;
	position: absolute;
	left: calc(300 / 1512 * 100%);
	top: 109px;
`;

const MainSection = styled.section`
	background-color: ${Surface_Background};
	width: 100vw;
	min-height: 100vh;
	border: 1px solid ${Border_Primary};
	font-family: Pretendard;
	padding-top: 59px;
	display: flex;
	justify-content: center;
`;

const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: calc(913 / 1512 * 100%);
`;

const ListText = styled.p`
	width: 100%;
	color: ${Text_Primary};
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
