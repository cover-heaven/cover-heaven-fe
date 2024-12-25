import React from 'react';
import styled from 'styled-components';
import { Border_Primary, Surface_Primary } from '../../styles/color';
import ChatProfile from '../common/ChatProfile';

const ChatListItem = ({ unread_messages, ...data }) => {
	return (
		<>
			<ItemWrapper>
				<ChatProfile {...data}></ChatProfile>
				{Number(unread_messages) === 0 ? (
					<></>
				) : (
					<UnreadWrapper>
						<UnreadNum>{Number(unread_messages)}</UnreadNum>
					</UnreadWrapper>
				)}
			</ItemWrapper>
		</>
	);
};

export default ChatListItem;

const ItemWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 91px;
	padding: 15px 30px;
	justify-content: space-between;
	align-items: center;
	border-radius: 20px;
	border: 1px solid ${Border_Primary};
	background-color: #fff;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	&:hover {
		border: 1px solid ${Surface_Primary};
		scale: 1.01;
		box-shadow: 1px 1px 23.3px 0px rgba(0, 0, 0, 0.11);
	}
`;

const UnreadWrapper = styled.div`
	width: 35px;
	height: 35px;
	border-radius: 15px;
	background-color: ${Surface_Primary};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const UnreadNum = styled.p`
	color: #fff;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
