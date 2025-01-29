import { useState } from 'react';
import styled from 'styled-components';
import WorkingTime from '../../components/FindJobsWriting/WorkingTime';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 스타일 가져오기
import {
	Border_Secondary,
	Surface_Primary,
	Text_Primary,
	Text_Tertiary
} from '../../styles/color';
import deleteBox from '../../assets/icon/deleteBox.png';
import { instance } from '../../api/instance';
import { Navigate, useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import { useRef, useEffect } from 'react';

// Styled Components
const TitleBox = styled.div`
	display: flex;
	gap: 15%;
`;
const StoreNameBox = styled.div`
	display: flex;
	gap: 15%;
`;
const JobTypeBox = styled.div`
	display: flex;
	gap: 15%;
`;
const AddressBox = styled.div`
	display: flex;
	gap: 15%;
`;
const WorkConditionBox = styled.div`
	display: flex;
	gap: 15%;
`;
const DetailBox = styled.div`
	display: flex;
	gap: 15%;
`;
const AddressInput = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;
const P = styled.div`
	width: 130px;
	padding-right: 1%;
	margin-top: 10px;
	color: ${Text_Primary};
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;
const ButtonLayout = styled.div`
	display: flex;
	justify-content: right;
`;
const Layout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;
	padding-top: 74px;
	padding-left: 20%;
	padding-right: 20%;
	padding-bottom: 50px;
`;
const RowLayout = styled.div`
	display: flex;
	width: 100%;
	gap: 10px;
`;
const Input = styled.input`
	width: 100%;
	height: 49px;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
	padding: 10px 20px;
	color: ${Text_Primary};
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	&:focus {
		border: 1px solid ${Surface_Primary};
	}
	&::placeholder {
		color: ${Border_Secondary};
	}
`;
const InputBox = styled.input`
	width: 82%;
	height: 49px;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
	padding: 10px 20px;
	color: ${Text_Primary};
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	&:focus {
		border: 1px solid ${Surface_Primary};
	}
	&::placeholder {
		color: ${Border_Secondary};
	}
`;
const DetailInput = styled.textarea`
	width: 100%;
	height: auto;
	min-height: 240px;
	padding: 10px;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
	font-size: 14px;
	line-height: 1.5;
	padding: 20px 30px;
	color: ${Text_Primary};
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	resize: none;
	&::placeholder {
		white-space: pre-line; /* 줄바꿈 허용 */
		color: ${Border_Secondary};
	}
	&:focus {
		outline: none;
		border: 1px solid ${Surface_Primary};
	}
`;

const Button = styled.button`
	width: 212px;
	height: 49px;
	border-radius: 15px;
	background: var(--surface-surface-primary, #ff5238);
	color: white;
`;
const ColumnLayout = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 10px;
`;
const ItemLayout = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 6px;
`;
const AddButton = styled.button`
	width: 100%;
	height: 49px;
	padding: 15px 168px;
	border-radius: 15px;
	border: 1px solid var(--surface-surface-primary, #ff5238);
	background: #fff;
	color: #ff5238;
`;
const MainTitle = styled.div`
	/* display: flex;
	flex-direction: column; */
`;
const Title = styled.span`
	font-size: 40px;
	position: relative;
`;
const Highlight = styled.div`
	background-color: ${Surface_Primary};
	opacity: 70%;
	height: 16px;
	width: 100%;
	height: 12px;
	position: absolute;
	top: 70%;
`;
const SubTitle = styled.div`
	color: var(--text-text-secondary, #787777);
	font-family: Pretendard;
	font-size: 15px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
`;
const TitleContainter = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 0 0 3% 0;
`;
const AddButtonLayout = styled.div`
	display: flex;
	justify-content: center;
`;
const Tag = styled.div`
	width: 100%;
	display: flex;
	color: ${Text_Primary};
	text-align: left;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	display: flex;
	align-items: center;
`;
const Label = styled.label`
	flex: 1;
`;

const StyledRadio = styled.input`
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
	margin-right: 14px;
`;

const TimeBox = styled.div`
	width: 100%;
`;
const TotalWage = styled.div`
	text-align: right;
	color: ${Text_Primary};
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

const StyledWrapper = styled.div`
	box-sizing: border-box;
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	h1 {
		font-size: 24px;
		margin-bottom: 16px;
		color: #333;
	}
	p {
		margin-top: 12px;
		font-size: 18px;
		color: #555;
	}
`;

const DeleteBox = styled.img`
	cursor: pointer;
	width: 49px;
	height: 49px;
`;

// DatePicker에 커스텀 스타일 적용
const StyledDatePicker = styled(DatePicker)`
	width: 100%;
	height: 49px;
	font-size: 16px;
	border: 1px solid #e8e8e8;
	border-radius: 15px;
	text-align: center;
	&:focus {
		border: 1px solid ${Surface_Primary};
	}
`;

// Main Component
const FindJobsWriting = () => {
	const [dateTimeInputs, setDateTimeInputs] = useState([
		{
			id: 1,
			date: null,
			workTime: '',
			timeString: '',
			timeData: '',
			hourlyWage: '',
			content: false
		}
	]);
	const [title, setTitle] = useState('');
	const [storeName, setStoreName] = useState('');
	const [address, setAddress] = useState('');
	const [message, setMessage] = useState('');
	const [selectedTag, setSelectedTag] = useState('');
	const [workDetail, setWorkDetail] = useState([]);
	const nav = useNavigate();

	// 서버 전송
	const onSubmit = async () => {
		if (
			!title ||
			!storeName ||
			!address ||
			message.length === 0 ||
			dateTimeInputs.length === 0 ||
			(dateTimeInputs.length === 1 && dateTimeInputs[0].timeData === '') ||
			(dateTimeInputs.length === 1 && dateTimeInputs[0].hourlyWage === '') ||
			(dateTimeInputs.length === 1 && dateTimeInputs[0].date === null)
		) {
			alert('모든 필수 정보를 입력해주세요.');
			return;
		}
		const headers = {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		};
		try {
			// makeWorkDetail();
			await instance.post(
				'/job-offers',
				{
					title: title,
					store_name: storeName,
					job_tag: selectedTag,
					address: address,
					work_detail: dateTimeInputs.map((input) => ({
						work_date: input.date
							.toLocaleDateString('ko-KR', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit'
							})
							.replace(/\. /g, '-')
							.replace('.', ''), // ✅ 한국 시간대 적용
						work_hour: input.timeData,
						hourly_wage: input.hourlyWage
					})),
					context: message
				},
				{
					headers
				}
			);
		} catch (err) {
			// console.log('실패', err);
		}
		nav('/findjobslist');
	};

	const tags = ['학원', '과외', '술집', '식당', '카페'];
	// 근무일자 추가
	const onClickAddButton = () => {
		setDateTimeInputs((prev) => [
			...prev,
			{
				id: prev.length + 1,
				date: null,
				workTime: '',
				timeString: '',
				timeData: '',
				hourlyWage: '',
				content: false
			}
		]);
	};

	// 근무일자 삭제
	const onDelete = (id) => {
		setDateTimeInputs((prev) => prev.filter((input) => input.id !== id));
	};

	// 특정 입력 항목 업데이트
	const updateInput = (id, field, value) => {
		setDateTimeInputs((prev) =>
			prev.map((input) =>
				input.id === id ? { ...input, [field]: value } : input
			)
		);
	};

	// WorkingTime 열기
	const openWorkingTime = (id) => {
		setDateTimeInputs((prev) =>
			prev.map((input) =>
				input.id === id ? { ...input, content: true } : input
			)
		);
	};

	// WorkingTime 닫기
	const closeWorkingTime = (id) => {
		setDateTimeInputs((prev) =>
			prev.map((input) =>
				input.id === id ? { ...input, content: false } : input
			)
		);
	};

	// 근무 시간 계산
	const calculateWorkTime = (startHour, startMinute, endHour, endMinute) => {
		const startTimeInMinutes = Number(startHour) * 60 + Number(startMinute);
		const endTimeInMinutes = Number(endHour) * 60 + Number(endMinute);
		const totalMinutes =
			(endTimeInMinutes - startTimeInMinutes + 24 * 60) % (24 * 60);
		return totalMinutes / 60;
	};

	// WorkingTime 데이터를 업데이트
	const upDateWorkingTime = (
		id,
		startHour,
		startMinute,
		endHour,
		endMinute
	) => {
		const timeStr = `${startHour}시 ${startMinute}분 - ${endHour}시 ${endMinute}분`;
		const timeData = `${startHour}:${startMinute}-${endHour}:${endMinute}`;
		updateInput(id, 'timeString', timeStr);
		updateInput(id, 'timeData', timeData);

		const totalHours = calculateWorkTime(
			startHour,
			startMinute,
			endHour,
			endMinute
		);
		updateInput(id, 'workTime', totalHours);
	};

	// 태그 변경
	const handleTagChange = (tag) => {
		setSelectedTag(tag);
	};

	const handleComplete = (data) => {
		setAddress(data.address); // 도로명 주소 저장
	};

	return (
		<Layout>
			<TitleContainter>
				<MainTitle>
					<Title>
						<Highlight />
						대타 공고 작성하기
					</Title>
				</MainTitle>
				<SubTitle>
					구직자들이 읽을 아르바이트 대타 공고를 작성해 주세요.
				</SubTitle>
			</TitleContainter>
			<TitleBox>
				<P>공고 제목</P>
				<Input
					placeholder="공고 제목을 입력해 주세요"
					onChange={(e) => setTitle(e.target.value)}
				/>
			</TitleBox>
			<StoreNameBox>
				<P>근무지명</P>
				<Input
					placeholder="가게 이름을 입력해 주세요"
					onChange={(e) => setStoreName(e.target.value)}
				/>
			</StoreNameBox>
			<JobTypeBox>
				<P>직종</P>
				<Tag>
					{tags.map((tag, index) => (
						<Label key={tag} htmlFor={`tag-${index}`}>
							<StyledRadio
								id={`tag-${index}`}
								type="radio"
								onChange={() => handleTagChange(tag)}
								checked={selectedTag === tag}
							/>
							{tag}
						</Label>
					))}
				</Tag>
			</JobTypeBox>
			<AddressBox>
				<P>주소</P>
				<AddressInput>
					<DaumPostcode
						placeholder="상호명으로 주소를 검색하세요."
						onComplete={handleComplete}
					/>
					{address && <Input value={address}></Input>}
					<Input placeholder="상세 주소를 작성해 주세요." />
				</AddressInput>
			</AddressBox>
			<WorkConditionBox>
				<P>근무 조건</P>
				<ColumnLayout>
					{dateTimeInputs.map((input) => (
						<ItemLayout key={input.id}>
							<RowLayout>
								<StyledWrapper>
									<StyledDatePicker
										dateFormat="yyyy-MM-dd"
										selected={input.date}
										onChange={(date) => updateInput(input.id, 'date', date)}
										placeholderText="2024년 11월 23일 (토)"
									/>
								</StyledWrapper>
								<TimeBox>
									<Input
										onClick={() => openWorkingTime(input.id)}
										placeholder="00시 00분 - 00시 00분"
										value={input.timeString}
									/>
									{input.content && (
										<WorkingTime
											upDateWorkingTime={(
												startHour,
												startMinute,
												endHour,
												endMinute
											) =>
												upDateWorkingTime(
													input.id,
													startHour,
													startMinute,
													endHour,
													endMinute
												)
											}
											setContent={() => closeWorkingTime(input.id)}
										/>
									)}
								</TimeBox>
								<InputBox
									onChange={(e) =>
										updateInput(input.id, 'hourlyWage', e.target.value)
									}
									placeholder="시급 00,000원"
									value={input.hourlyWage}
								/>
								<DeleteBox
									src={deleteBox}
									onClick={() => onDelete(input.id)}
								></DeleteBox>
							</RowLayout>
							<div>
								<TotalWage>
									일급&nbsp;
									{Math.round(
										Number(input.workTime || 0) * Number(input.hourlyWage || 0)
									).toLocaleString()}
									원
								</TotalWage>
							</div>
						</ItemLayout>
					))}
					<AddButtonLayout>
						<AddButton onClick={onClickAddButton}>
							+ 근무 일자 추가하기
						</AddButton>
					</AddButtonLayout>
				</ColumnLayout>
			</WorkConditionBox>
			<DetailBox>
				<P>상세 정보</P>
				<DetailInput
					placeholder={`많은 사람들이 보고 지원할 수 있도록, 공고에 대한 상세 정보를 작성해 주세요.\n\n예) 00직군 경험자 우대합니다. 인근 거주자 우대합니다.`}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</DetailBox>
			<ButtonLayout>
				<Button onClick={onSubmit}>작성 완료</Button>
			</ButtonLayout>
		</Layout>
	);
};

export default FindJobsWriting;
