import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	Border_Primary,
	Border_Secondary,
	Surface_Background,
	Surface_Lightgray,
	Surface_Primary,
	Text_Primary,
	Text_Secondary,
	Text_Tertiary
} from '../../styles/color';
import arrowIcon from '../../assets/icon/icon_arrow_before.svg';
import ChatProfile from '../../components/common/ChatProfile';
import { useEffect, useRef, useState } from 'react';
import { instance } from '../../api/instance';
import Button from '../../components/common/Button';
import reportIcon from '../../assets/icon/icon_report.svg';
import MatchingModal from '../../components/Chat/MatchingModal';
import {
	formattedDate,
	formattedPay,
	formattedTime,
	formattedWorkDay
} from '../../components/Chat/utils';
import {
	getChatData,
	getWorkData,
	patchJobPost,
	postMatchStatus
} from '../../components/Chat/api';

const chatDataDummy = {
	status: '매칭하기',
	opponent_user_name: '김서강',
	opponent_user_student_id: '20190000',
	opponent_user_gender: 'male',
	opponent_phone: '01013241234',
	oppenent_department: '미국문화학과',
	opponent_profile: null,
	messages: [
		{
			context: '안녕하세요~',
			is_mine: false,
			send_date: new Date('2024-12/05 10:14:10')
		},
		{
			context: '안녕하세요 반가워요ddddddddddddddddddddddfdffdfddddddd\n하하!',
			is_mine: true,
			send_date: new Date('2024/12/05 10:18:20')
		},
		{
			context: '알바 관심있습니다!',
			is_mine: false,
			send_date: new Date('2024/12/05 10:22:20')
		}
	]
};

const workDayDummy = [
	{
		work_date: new Date('2024-12/05'),
		work_hour: '16:00-20:30',
		hourly_wage: '10000'
	},
	{
		work_date: new Date('2024-12/06'),
		work_hour: '12:00-20:30',
		hourly_wage: '20000'
	},
	{
		work_date: new Date('2024-12/07'),
		work_hour: '17:00-20:00',
		hourly_wage: '10000'
	}
];

const Chat = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const defaultData = { ...location.state };
	const [matchStatus, setMatchStatus] = useState('before');
	const [openMatch, setOpenMatch] = useState(false);
	const [workDay, setWorkDay] = useState(workDayDummy);
	const [jobPostData, setJobPostData] = useState({});
	const [matchData, setMatchData] = useState({});
	const [chatData, setChatData] = useState(
		// 	{
		// 	opponent_user_phone: '01012341234',
		// 	opponent_user_student_id: 20190000
		// }
		defaultData
	);
	const [message, setMessage] = useState('');
	const [profileProps, setProfileProps] = useState({});
	const inputRef = useRef(null);

	// console.log(defaultData);

	useEffect(() => {
		// const chatRes = getChatData(chatData.chatting_id);
		// if (chatRes !== null) {
		// 	setMatchStatus(chatRes.data.status);
		// 	setChatData((prev) => {
		// 		return {
		// 			...prev,
		// 			status: chatRes.data.status,
		// 			opponent_user_student_id: chatRes.data.opponent_user_student_id,
		// 			opponent_phone: chatRes.data.opponent_phone,
		// 			messages: chatRes.data.messages
		// 		};
		// 	});
		// }
		// const workRes = getWorkData(chatData.job_offer_id);
		// if (workRes !== null) {
		// 	setJobPostData(workRes.data);
		// 	setWorkDay(workRes.data.work_detail);
		// }
		setChatData((prev) => {
			return {
				...prev,
				...chatDataDummy
			};
		}); //api 연동 후 해당 구문 삭제
	}, []);

	useEffect(() => {
		setProfileProps((prev) => ({
			...prev,
			opponent_user_gender: chatData.opponent_user_gender,
			opponent_user_name: chatData.opponent_user_name,
			oppenent_department: chatData.oppenent_department,
			opponent_user_student_id: chatData.opponent_user_student_id.slice(2, 4),
			opponent_profile: chatData.opponent_profile
		}));
	}, [chatData]);

	useEffect(() => {
		if (matchStatus === 'before' || matchStatus === 'processing') {
			setProfileProps((prev) => ({
				...prev,
				subText: '학번 및 전화번호는 매칭 확정 시 공개됩니다.'
			})); //채팅 입장 시 매칭 중일 경우 백에서부터 매칭 요청된 근무일자 정보를 받자!!!
		} else if (matchStatus === 'accepted') {
			setProfileProps((prev) => ({
				...prev,
				subText: `학번 : ${chatData.opponent_user_student_id} | 전화번호 : ${chatData.opponent_user_phone.slice(0, 3)}-${chatData.opponent_user_phone.slice(3, 7)}-${chatData.opponent_user_phone.slice(7, 11)}`
			}));
		}
	}, [matchStatus]);

	const handleBackClick = () => {
		navigate('/chatlist');
	};

	const handleInput = (e) => {
		setMessage(e.target.value);
	};
	const handleSubmitMsg = (msgText, msgType = 'normal') => {
		//백엔드 배포 후 개발 예정
		if (msgType === 'normal') {
			if (msgText.trim() === '') {
				inputRef.current.focus();
				return;
			}
		} else if (msgType === 'matchRequest') {
			//object를 stringfy해서 제목, 근무일자, 총급여 저장 후 매칭정보 전송
			//emit 사용해서 매칭하기 이벤트 설정
		}
		const msgList = chatData.messages;
		const msgItem = {
			context: msgText,
			is_mine: true,
			send_date: new Date()
		};
		msgList.push(msgItem);
		setChatData((prev) => {
			return { ...prev, messages: msgList };
		});
		setMessage('');
	};

	const handleReceiveMsg = (msgText, msgType = 'normal') => {
		//emit에서 매칭 신청 메시지일 경우 text를 object로 변환 후 저장
		//매칭 수락 및 거절 메세지일 경우 status가 바뀌었을 수 있으니 해당 경우 처리
		//매칭 신청 메세지일 경우 수신인 입장에서 status가 매칭 전에서 머무를 수 있으니 업데이트
		const msgList = chatData.messages;
		const msgItem = {
			context: msgText,
			is_mine: false,
			send_date: new Date()
		};
		msgList.push(msgItem);
		setChatData((prev) => {
			return { ...prev, messages: msgList };
		});
		if (msgType == 'matchRequest') {
			setMatchStatus('processing');
			setMatchData({ workDay: msgText.workDay, totalPay: msgText.totalPay });
			//매칭된 근무일자 배열을 저장, 이후 매칭 시 공고와 겹치는 근무일자 소거
		} else if (msgType == 'matchFailed') {
			setMatchStatus('before');
		} else if (msgType == 'matchAccepted') {
			setMatchStatus('accepted');
		}
	};

	const handleOpenMatch = () => {
		setOpenMatch(true);
	};
	const handleCloseMatch = () => {
		setOpenMatch(false);
	};

	const handleRequestMatch = (tempWorkDay, totalPay) => {
		setOpenMatch(false);
		// postMatchStatus(chatData.chatting_id, 'processing');
		setMatchStatus('processing');

		const msgText = {
			setButton: true,
			isRedTitle: false,
			title: `${chatData.opponent_user_name}님께 매칭 신청을 보냈습니다.`,
			description: '',
			workDay: tempWorkDay, // 추후 공고글 수정 위해 근무일자 정보 담은 배열로 설정
			totalPay: `총 급여 : ${formattedPay(totalPay)}원`
		};
		handleSubmitMsg(msgText, 'matchRequest');
	};

	const handleResponseMatch = (response) => {
		if (matchStatus === 'accepted' || matchStatus === 'before') {
			alert('유효하지 않은 매칭 신청입니다.');
			return;
		}
		if (response === 'reject') {
			// postMatchStatus(chatData.chatting_id, 'before');
			setMatchStatus('before');
			const msgText = {
				isRedTitle: false,
				title: `매칭이 성사되지 않았습니다.`,
				description:
					'구직자 측에서 매칭을 거절하였습니다.\n조건을 합의한 후 다시 매칭을 신청해주세요.',
				workDay: matchData.workDay,
				totalPay: `총 급여 : ${formattedPay(matchData.totalPay)}원`
			};
			handleSubmitMsg(msgText); //매칭 성사 메세지 전송
		} else {
			//매칭하기 수락 시 매칭된 근무일자를 공고 내 근무일자에서 제거
			// postMatchStatus(chatData.chatting_id, 'accepted');
			setMatchStatus('accepted');
			const matchWorkDaySet = new Set(matchData.matchWorkDay);
			const updatedWorkDay = workDay.filter(
				(item) => !matchWorkDaySet.has(item)
			);
			const updatedChatData = {
				title: jobPostData.title,
				store_name: jobPostData.store_name,
				job_tag: jobPostData.job_tag,
				address: jobPostData.address,
				work_detail: updatedWorkDay,
				context: jobPostData.context
			};
			patchJobPost(chatData.job_offer_id, updatedChatData);
			const msgText = {
				setButton: false,
				isRedTitle: true,
				title: `매칭이 성사되었습니다!`,
				description:
					'매칭된 구직자분은 등록된 근무일자에 알바를 진행해 주세요.\n근무일 마지막 날 자정 이후 공고 작성자가 구직자 평가를 완료해야 구직자에게 급여가 송금됩니다.',
				workDay: matchData.workDay,
				totalPay: `총 급여 : ${formattedPay(matchData.totalPay)}원`
			};
			handleSubmitMsg(msgText); //매칭 성사 메세지 전송
		}
	};

	return (
		<>
			<Background>
				<MainSectionWrapper>
					<BackWrapper
						onClick={() => {
							handleBackClick();
						}}
					>
						<BackIcon src={arrowIcon}></BackIcon>
						<BackText>채팅 목록으로 돌아가기</BackText>
					</BackWrapper>
					<ChatSection>
						<TopWrapper>
							<ProfileWrapper>
								<ChatProfile {...profileProps}></ChatProfile>
								<ButtonWrapper key={matchStatus}>
									{matchStatus === 'before' ? (
										<Button
											mode="default"
											textSize="16"
											content="매칭하기"
											width="116px"
											fontWeight="600"
											isIcon={false}
											onClick={handleOpenMatch}
										></Button>
									) : matchStatus === 'processing' ? (
										<Button
											mode="deactivated"
											textSize="16"
											content="매칭 중"
											width="116px"
											fontWeight="600"
											isIcon={false}
										></Button>
									) : (
										<Button
											mode="activated"
											textSize="16"
											content="매칭완료"
											width="116px"
											fontWeight="600"
											isIcon={false}
										></Button>
									)}
									<Button
										mode="grayBtn"
										content={reportIcon}
										width="49px"
										isIcon={true}
										iconW="26px"
										iconH="24px"
									></Button>
								</ButtonWrapper>
							</ProfileWrapper>
							<HorizBar></HorizBar>
						</TopWrapper>
						<MiddleWrapper>
							{chatData.messages?.map((item) =>
								item.is_mine === true ? (
									<MessageBoxWrapper
										key={item.send_date}
										is_mine={item.is_mine}
									>
										<MessageDate>{formattedTime(item.send_date)}</MessageDate>
										{typeof item.context === 'string' ? (
											<MesssageBox>{item.context}</MesssageBox>
										) : (
											<MatchMsgBox>
												<MatchMsgMain>{item.context.title}</MatchMsgMain>
												{item.context.description === '' ? (
													<></>
												) : (
													<MatchMsgDescription>
														{item.context.description}
													</MatchMsgDescription>
												)}
												<MatchMsgSub>
													{formattedWorkDay(item.context.workDay)}
												</MatchMsgSub>
												<MatchMsgSub>{item.context.totalPay}</MatchMsgSub>
											</MatchMsgBox>
										)}
									</MessageBoxWrapper>
								) : (
									<MessageBoxWrapper
										key={item.send_date}
										is_mine={item.is_mine}
									>
										{typeof item.context === 'string' ? (
											<MesssageBox>{item.context}</MesssageBox>
										) : (
											<MatchMsgBox>
												<MatchMsgMain isRedTitle={item.context.isRedTitle}>
													{item.context.title}
												</MatchMsgMain>
												{item.context.description === '' ? (
													<></>
												) : (
													<MatchMsgDescription>
														{item.context.description}
													</MatchMsgDescription>
												)}
												<MatchMsgSub>
													{formattedWorkDay(item.context.workDay)}
												</MatchMsgSub>
												<MatchMsgSub>{item.context.totalPay}</MatchMsgSub>
												{item.context.setButton ? (
													<MatchBtnWrapper>
														<Button
															mode="default"
															textSize="16"
															content="매칭 수락"
															width="100%"
															height="35px"
															fontWeight="600"
															isIcon={false}
															onClick={() => {
																handleResponseMatch('accept');
															}}
														></Button>
														<Button
															mode="grayBtn"
															textSize="16"
															content="매칭 거절"
															width="100%"
															height="35px"
															fontWeight="600"
															isIcon={false}
															onClick={() => {
																handleResponseMatch('reject');
															}}
														></Button>
													</MatchBtnWrapper>
												) : (
													<></>
												)}
											</MatchMsgBox>
										)}
										<MessageDate>{formattedTime(item.send_date)}</MessageDate>
									</MessageBoxWrapper>
								)
							)}
						</MiddleWrapper>
						<BottomWrapper>
							<InputBox
								placeholder="메세지를 입력해주세요"
								ref={inputRef}
								value={message}
								onChange={handleInput}
							></InputBox>
							<Button
								mode="default"
								textSize="16"
								content="전송"
								width="114px"
								fontWeight="600"
								isIcon={false}
								onClick={() => {
									handleSubmitMsg(message);
								}}
							></Button>
						</BottomWrapper>
					</ChatSection>
				</MainSectionWrapper>
			</Background>
			{openMatch === true ? (
				<ModalWrapper>
					<MatchingModal
						handleCloseMatch={handleCloseMatch}
						handleRequestMatch={handleRequestMatch}
						formattedDate={formattedDate}
						formattedPay={formattedPay}
						workDay={workDay}
					></MatchingModal>
				</ModalWrapper>
			) : (
				<></>
			)}
		</>
	);
};

export default Chat;

const Background = styled.div`
	background-color: ${Surface_Background};
	width: 100vw;
	height: calc(100vh - 86px);
	padding: 2% calc(300 / 1512 * 100%); //상하 패딩을 2%로 축소
	position: relative;
`;

const ModalWrapper = styled.div`
	position: absolute;
	background: linear-gradient(
		180deg,
		rgba(39, 39, 39, 0.05) 0%,
		rgba(39, 39, 39, 0.2) 100%
	);
	width: 100vw;
	min-height: calc(100vh - 86px);
	top: 86px;
	left: 0;
	display: flex;
	justify-content: center;
	padding: 20px 0;
`;

const MainSectionWrapper = styled.section`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
	height: 100%;
`;
const BackWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	gap: 10px;
	align-items: center;
	width: 100%;
	cursor: pointer;
`;

const BackIcon = styled.img`
	width: 6.81px;
	height: 9.93px;
`;

const BackText = styled.p`
	width: 100%;
	color: ${Text_Secondary};
	font-size: 16px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
`;

const ChatSection = styled.section`
	width: 100%;
	height: 100%;
	background-color: #fff;
	border-radius: 30px;
	border: 1px solid ${Border_Primary};
	padding: 28px 46px 28px 46px;
	display: flex;
	flex-direction: column;
`;

const TopWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const ProfileWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ButtonWrapper = styled.div`
	display: flex;
	gap: 10px;
	height: 49px;
`;

const HorizBar = styled.div`
	width: 100%;
	height: 12px;
	border-bottom: 1px solid ${Border_Secondary};
`;

const MiddleWrapper = styled.div`
	flex: 1;
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 30px 0px;
`;

const BottomWrapper = styled.div`
	display: flex;
	gap: 10px;
	height: 49px;
	width: 100%;
`;

const InputBox = styled.input`
	width: 100%;
	border-radius: 15px;
	border: 1px solid ${Border_Primary};
	background-color: #fff;
	padding: 15px 25px;
	color: ${Text_Primary};
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	&::placeholder {
		font-size: 16px;
		font-weight: 400;
		color: ${Text_Tertiary};
	}
	&:focus {
		border: 1px solid ${Surface_Primary};
	}
`;

const MessageBoxWrapper = styled.div`
	/* position: relative; */
	/* height: auto; */
	display: flex;
	justify-content: ${(props) => (props.is_mine ? 'flex-end' : 'flex-start')};
	align-items: flex-end;
	gap: 10px;
`;

const MesssageBox = styled.p`
	max-width: 40%;
	min-height: 46px;
	display: flex;
	padding: 10px 24px;
	justify-content: center;
	align-items: center;
	/* position: absolute; */
	/* left: ${(props) => (props.is_mine === true ? 'auto' : '0')};
	right: ${(props) => (props.is_mine === true ? '0' : 'auto')}; */
	border-radius: 20px;
	background: ${Surface_Lightgray};
	color: var(--text-text-primary, #464646);
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	word-break: break-all;
`;

const MessageDate = styled.p`
	color: ${Text_Tertiary};
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const MatchMsgBox = styled(MesssageBox)`
	border-radius: 20px;
	border: 1px solid ${Border_Primary};
	background: #fff;
	display: flex;
	padding: 23px 41px;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	word-break: keep-all;
`;

const MatchMsgMain = styled.p`
	color: ${(props) => (props.isRedTitle ? Surface_Primary : Text_Primary)};
	font-size: 20px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
	margin-bottom: 8px;
`;

const MatchMsgSub = styled.p`
	color: ${Text_Secondary};
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%; /* 24px */
	white-space: pre-line;
`;

const MatchMsgDescription = styled(MatchMsgSub)`
	color: ${Text_Tertiary};
	font-size: 14px;
	font-weight: 500;
	line-height: 120%;
	margin-top: 5px;
`;

const MatchBtnWrapper = styled.div`
	width: 100%;
	display: flex;
	gap: 15px;
	margin-top: 20px;
`;
