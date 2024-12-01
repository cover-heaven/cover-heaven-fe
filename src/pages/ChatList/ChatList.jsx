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

const dummyData = [
	{
		chatting_id: '1',
		search_user_id: 'id1',
		offer_user_id: 'id2',
		job_offer_id: '1',
		user_name: '김서강',
		department: '컴퓨터공학과',
		student_id: '20190000',
		last_message: '안녕하세요 대화 가능할까요?',
		last_message_send_date: 'date',
		unread_messages: '3',
		gender: 'male'
	},
	{
		chatting_id: '2',
		search_user_id: 'id1',
		offer_user_id: 'id2',
		job_offer_id: '1',
		user_name: '김강강',
		department: '미국문화학과',
		student_id: '20190000',
		last_message: '안녕하세요 안녕하세요?',
		last_message_send_date: 'date',
		unread_messages: '1',
		gender: 'female'
	},
	{
		chatting_id: '3',
		search_user_id: 'id1',
		offer_user_id: 'id2',
		job_offer_id: '1',
		user_name: '김공공',
		department: '미국문화학과',
		student_id: '20190000',
		last_message: '굿굿입니다',
		last_message_send_date: 'date',
		unread_messages: '0',
		gender: 'male'
	}
];

const ChatList = () => {
	const [listData, setListData] = useState(dummyData);
	// useEffect(() => {
	// 	const fetchListData = async () => {
	// 		const headers = {
	// 			Authorization: `Bearer ${localStorage.getItem('accessToken')}`
	// 		};
	// 		try {
	// 			const response = await instance.get('/chatting/list', { headers });
	// 			if (response.status === 200) {
	// 				setListData(response.data);
	// 			}
	// 		} catch (err) {
	// 			alert(err);
	// 		}
	// 	};
	// 	fetchListData();
	// }, []);

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
						<ChatListItem key={data.chatting_id} {...data}></ChatListItem>
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
