import React from 'react';
import styled from 'styled-components';
import {
	Border_Primary,
	Surface_Primary,
	Text_Primary,
	Text_Secondary
} from '../../styles/color';
import IconMan from '../../assets/icon/icon_man.svg';
import IconWoman from '../../assets/icon/icon_woman.svg';

const ChatListItem = () => {
	return (
		<>
			<ItemWrapper>
				<InfoWrapper>
					<ProfileImg src={IconMan}></ProfileImg>
					<ProfileTextWrapper>
						<NameWrapper>
							<Name>김서강</Name>
							<SubInfo>(컴퓨터공학과 24학번)</SubInfo>
						</NameWrapper>
						<MessageText>안녕하세요. 대화 가능할까요?</MessageText>
					</ProfileTextWrapper>
				</InfoWrapper>
				<UnreadWrapper>
					<UnreadNum>2</UnreadNum>
				</UnreadWrapper>
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
	transition: all 0.15 s ease-in-out;
	&:hover {
		border: 1px solid ${Surface_Primary};
		scale: 1.01;
		box-shadow: 1px 1px 23.3px 0px rgba(0, 0, 0, 0.11);
	}
`;

const InfoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

const ProfileImg = styled.img`
	/* height: calc(56 / 91 * 100%); */
	height: 56px;
`;

const ProfileTextWrapper = styled.div`
	display: flex;
	/* width: 236px; */
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 7px;
`;

const NameWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
`;

const Name = styled.p`
	color: ${Text_Primary};
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const SubInfo = styled.p`
	color: ${Text_Secondary};
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const MessageText = styled.p`
	color: ${Text_Secondary};
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
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
