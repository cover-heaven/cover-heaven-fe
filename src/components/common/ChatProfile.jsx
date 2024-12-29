import React from 'react';
import styled from 'styled-components';
import { Text_Primary, Text_Secondary } from '../../styles/color';
import IconMan from '../../assets/icon/icon_man.svg';
import IconWoman from '../../assets/icon/icon_woman.svg';

const ChatProfile = ({
	opponent_user_gender,
	opponent_user_name,
	opponent_department,
	opponent_user_student_id,
	opponent_profile,
	subText
}) => {
	return (
		<InfoWrapper>
			<ProfileImg
				src={
					opponent_profile
						? opponent_profile
						: opponent_user_gender === 'M'
							? IconMan
							: IconWoman
				}
			></ProfileImg>
			<ProfileTextWrapper>
				<NameWrapper>
					<Name>{opponent_user_name}</Name>
					<SubInfo>{`(${opponent_department} ${opponent_user_student_id ? opponent_user_student_id.slice(2, 4) : ''}학번)`}</SubInfo>
				</NameWrapper>
				<MessageText>{subText ? subText : '대화 내역이 없습니다.'}</MessageText>
			</ProfileTextWrapper>
		</InfoWrapper>
	);
};

export default ChatProfile;

const InfoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

const ProfileImg = styled.img`
	/* height: calc(56 / 91 * 100%); */
	height: 56px;
	border-radius: 50%;
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
