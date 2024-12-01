import styled from 'styled-components';
import {
	Border_Primary,
	Surface_Background,
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';
import ChatListItem from '../../components/ChatList/ChatListItem';

const ChatList = () => {
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
					<ChatListItem></ChatListItem>
					<ChatListItem></ChatListItem>
					<ChatListItem></ChatListItem>
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
