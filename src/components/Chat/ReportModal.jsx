import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
	Border_Primary,
	Surface_Primary,
	Text_Primary,
	Text_Secondary,
	Text_Tertiary
} from '../../styles/color';
import exitIcon from '../../assets/icon/icon_close_modal.svg';
import Button from '../common/Button';
import { postChatReport } from './api';

const ReportModal = ({ handleCloseReport, chatting_id }) => {
	const [option, setOption] = useState('');
	const [reason, setReason] = useState('');
	const [isOptionSelected, setIsOptionSelected] = useState(true);
	const optionRef = useRef(null);
	const reasonRef = useRef(null);

	useEffect(() => {
		if (option !== '') {
			setIsOptionSelected(true);
		}
	}, [option]);

	const handleSubmitReport = () => {
		if (option === '') {
			setIsOptionSelected(false);
			return;
		}
		if (reason.trim() === '') {
			reasonRef.current?.focus();
			return;
		}
		const content = { report_tag: option, context: reason };
		// postChatReport(chatting_id, content);
		handleCloseReport(true);
	};
	const handleOptionInput = (e) => {
		setOption(e.target.value);
	};
	const handleReasonInput = (e) => {
		setReason(e.target.value);
	};
	return (
		<ModalBox>
			<ExitImg
				src={exitIcon}
				onClick={() => {
					handleCloseReport(false);
				}}
			></ExitImg>
			<TitleText>해당 사용자를 신고하시겠습니까?</TitleText>
			<OptionWrapper>
				<OptionLabel>
					<OptionRadio
						type="radio"
						name="option"
						value="attitude"
						onChange={handleOptionInput}
						ref={optionRef}
					></OptionRadio>
					<OptionText>근무 태도(노쇼, 근무태만)</OptionText>
				</OptionLabel>
				<OptionLabel>
					<OptionRadio
						type="radio"
						name="option"
						value="chatting"
						onChange={handleOptionInput}
					></OptionRadio>
					<OptionText>채팅(늦은 응답, 부적절한 언행)</OptionText>
				</OptionLabel>
				<OptionLabel>
					<OptionRadio
						type="radio"
						name="option"
						value="deceit"
						onChange={handleOptionInput}
					></OptionRadio>
					<OptionText>거짓 정보(공고 내용 불일치, 신상 불일치)</OptionText>
				</OptionLabel>
				<OptionLabel>
					<OptionRadio
						type="radio"
						name="option"
						value="etc"
						onChange={handleOptionInput}
					></OptionRadio>
					<OptionText>기타</OptionText>
				</OptionLabel>
			</OptionWrapper>
			{isOptionSelected ? (
				<OptionSelectText></OptionSelectText>
			) : (
				<OptionSelectText>신고 사유를 선택해주세요.</OptionSelectText>
			)}
			<TextInput
				placeholder="신고사유를 입력해주세요"
				onChange={handleReasonInput}
				ref={reasonRef}
			></TextInput>
			<Button
				mode="default"
				textSize="16"
				content="신고 완료"
				width="100%"
				height="40px "
				fontWeight="700"
				isIcon={false}
				onClick={handleSubmitReport}
			></Button>
			<AdviseText>
				해당 신고내역은 추후 매너온도에 반영될 예정이며,
				<br /> 활동 정지로 이어질 수 있습니다.
			</AdviseText>
		</ModalBox>
	);
};

export default ReportModal;

const ModalBox = styled.div`
	width: calc(556 / 1512 * 100%);
	min-width: 556px;
	/* min-height: 545px; */
	box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.1);
	border-radius: 40px;
	border: 1px solid ${Border_Primary};
	background: #fff;
	display: flex;
	flex-direction: column;
	padding: 76px 80px 42px 80px;
	align-items: center;
	position: relative;
	justify-content: flex-start;
`;

const ExitImg = styled.img`
	position: absolute;
	top: 54px;
	right: 54px;
	width: 18px;
	height: 18px;
	cursor: pointer;
`;

const TitleText = styled.p`
	width: 100%;
	color: ${Text_Primary};
	text-align: center;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-bottom: 40px;
`;

const OptionWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const OptionSelectText = styled.p`
	width: 100%;
	height: 30px;
	color: ${Surface_Primary};
	font-size: 12px;
	font-weight: 600px;
	padding: 10px 0;
`;

const OptionLabel = styled.label`
	width: 100%;
`;
const OptionRadio = styled.input`
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
`;
const OptionText = styled.span`
	color: ${Text_Secondary};
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	vertical-align: middle;
	margin-left: 17px;
`;

const TextInput = styled.textarea`
	width: 100%;
	min-height: 120px;
	border-radius: 14px;
	background: #f5f5f5;
	border: none;
	padding: 22px 29px;
	color: ${Text_Primary};
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	resize: none;
	margin-bottom: 40px;
	&::placeholder {
		color: ${Text_Secondary};
	}
	&:focus-visible {
		outline: 2px solid ${Surface_Primary};
	}
`;

const AdviseText = styled.p`
	margin-top: 23px;
	color: ${Text_Secondary};
	text-align: center;
	font-size: 10px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;
