import { useState } from 'react';
import styled from 'styled-components';
import WorkingTime from '../../components/FindJobsWriting/WorkingTime';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 스타일 가져오기

// Styled Components
const TitleBox = styled.div`
	display: flex;
	gap: 3%;
`;
const StoreNameBox = styled.div`
	display: flex;
	gap: 3%;
`;
const JobTypeBox = styled.div`
	display: flex;
	gap: 3%;
`;
const AddressBox = styled.div`
	display: flex;
	gap: 3%;
`;
const WorkConditionBox = styled.div`
	display: flex;
	gap: 3%;
`;
const DetailBox = styled.div`
	display: flex;
	gap: 3%;
`;
const AddressInput = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;
const P = styled.div`
	width: 120px;
	padding-right: 1%;
	margin: 0;
`;
const ButtonLayout = styled.div`
	display: flex;
	justify-content: right;
`;
const Layout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;
	padding-left: 20%;
	padding-right: 20%;
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
	padding: 10px;
`;
const InputBox = styled.input`
	width: 80%;
	height: 49px;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
`;
const DetailInput = styled.textarea`
	width: 100%;
	padding: 10px;
	height: 202px;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
	font-size: 14px;
	line-height: 1.5;
	&::placeholder {
		white-space: pre-line; /* 줄바꿈 허용 */
	}
	&:focus {
		outline: none;
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
	font-size: 40px;
`;
const SubTitle = styled.div`
	font-size: 15px;
`;
const TitleContainter = styled.div`
	display: flex;
	flex-direction: column;
	gap: 25px;
	padding: 9% 0 3% 0;
`;
const AddButtonLayout = styled.div`
	display: flex;
	justify-content: center;
`;
const Tag = styled.div`
	width: 100%;
	display: flex;
`;
const Label = styled.label`
	flex: 1;
`;
const TimeBox = styled.div`
	width: 80%;
`;
const TotalWage = styled.div`
	padding-left: 85.5%;
`;
const DeleteBox = styled.button`
	width: 49px;
	height: 49px;
	border-radius: 15px;
	background: var(--border-border-secondary, #c3c3c3);
`;
const StyledWrapper = styled.div`
	display: flex;
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

// DatePicker에 커스텀 스타일 적용
const StyledDatePicker = styled(DatePicker)`
	width: 260px;
	height: 49px;
	font-size: 16px;
	border: 1px solid #e8e8e8;
	border-radius: 15px;
	text-align: center;

	&:focus {
		outline: none;
	}
`;
const Highlight = styled.div`
	background-color: red;
	opacity: 60%;
	width: 345px;
	height: 16px;
	position: absolute;
	left: calc(310 / 1512 * 100%);
	top: 200px;
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

	const makeWorkDetail = () => {
		setWorkDetail(
			dateTimeInputs.map((input) => ({
				work_date: input.date,
				work_hour: input.timeData,
				hourly_wage: input.hourlyWage
			}))
		);
	};

	// 서버 전송
	const onSubmit = async () => {
		if (!title || !storeName || !address || workDetail.length === 0) {
			alert('모든 필수 정보를 입력해주세요.');
			return;
		}
		try {
			makeWorkDetail();
			await axios.post('/job-offers', {
				title: title,
				store_name: storeName,
				job_tag: selectedTag,
				address: address,
				work_detail: workDetail,
				context: message
			});
		} catch (err) {
			console.log('실패', err);
		}
	};

	const tags = ['학원', '과외', '주점', '식당', '카페'];
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

	return (
		<Layout>
			<TitleContainter>
				<MainTitle>대타 공고 작성하기</MainTitle>
				<Highlight></Highlight>
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
							<input
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
					<Input
						placeholder="상호명으로 주소를 검색하세요."
						onChange={(e) => setAddress(e.target.value)}
					/>
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
								<DeleteBox onClick={() => onDelete(input.id)}>X</DeleteBox>
							</RowLayout>
							<div>
								<TotalWage>
									일급&nbsp;
									{(
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
