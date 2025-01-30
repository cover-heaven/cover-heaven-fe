import FindJobsItem from '../../components/FindjobsList/FindJobsItem';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css'; // 캘린더 스타일 적용
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 스타일 가져오기
import ko from 'date-fns/locale/ko';
import { useEffect, useState } from 'react';
import { instance } from '../../api/instance';
import { Surface_Background, Surface_Primary } from '../../styles/color';

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 50px;
	gap: 45px;
	background-color: ${Surface_Background};
`;

const JobsListContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 41px;
	padding-left: 14.2%;
	padding-right: 14.2%;
`;

const ItemList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
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

const ToggleJobs = styled.select`
	width: 40%;
	height: 52px; /* 전체 높이 */
	flex-shrink: 0;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
	padding: 8px; /* 내부 여백 */
	font-size: 16px;
	color: #333;
	option {
		font-size: 14px; /* 옵션 글꼴 크기 */
		padding: 10px; /* 옵션 간격 */
		background-color: #f9f9f9; /* 옵션 배경색 */
	}
`;

const Filter = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
`;

const Toggle = styled.div`
	display: flex;
	gap: 15px;
`;

const SubHeader = styled.div`
	display: flex;
	padding-left: 14.2%;
	padding-right: 14.2%;
	flex-direction: column;
	gap: 20px;
	border-bottom: 1px solid #c3c3c3;
	padding-bottom: 1.5%;
	background-color: #fff;
	padding-top: 74px;
`;

const TitleContainter = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const SearchInput = styled.input`
	width: 29%;
	height: 52px;
	flex-shrink: 0;
	border-radius: 15px;
	border: 1px solid #ede6e6;
	background: #fff;
	padding: 10px;
`;

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative; /* 캘린더 위치를 부모 기준으로 고정하기 위해 추가 */
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

const StyledDatePickerWrapper = styled.div`
	.react-datepicker {
		width: 260px !important; /* 달력 전체 너비 */
		font-size: 16px !important; /* 텍스트 크기 */
		padding-bottom: 5px;
		border: 1px solid #e8e8e8;
	}

	.react-datepicker__month-container {
		width: 100% !important; /* 월 컨테이너 크기 */
	}

	.react-datepicker__day,
	.react-datepicker__day-name {
		width: 2rem !important; /* 날짜 셀 너비 */
		height: 2rem !important; /* 날짜 셀 높이 */
		line-height: 2rem !important;
		font-size: 14px !important;
	}

	.react-datepicker__header {
		font-size: 14px !important;
		background-color: white;
	}

	.react-datepicker__current-month {
		font-size: 20px !important;
		color: #333;
	}
`;

const SelectedDate = styled.div`
	width: 260px;
	height: auto;
	min-height: 53px;
	border: 1px solid #ede6e6;
	border-radius: 15px;
	padding: 10px;
	position: relative;
	cursor: pointer;

	&:empty::before {
		content: attr(data-placeholder);
		color: #aaa;
		pointer-events: none;
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
	}
`;

// const mockData = [
// 	{
// 		job_offer_id: 4,
// 		title: '광흥창 투썸 알바 급구',
// 		store_name: '투썸 플레이스',
// 		job_tag: '술집',
// 		address: '서울시 마포구 광흥창역',
// 		work_detail: [
// 			{
// 				work_date: '2025-01-09',
// 				work_hour: '10:00-18:00',
// 				hourly_wage: 15000
// 			},
// 			{
// 				work_date: '2025-01-10',
// 				work_hour: '10:00-18:00',
// 				hourly_wage: 15000
// 			}
// 		],
// 		work_date: ['2024-12-09', '2024-12-10']
// 	},
// 	{
// 		job_offer_id: 3,
// 		title: '광흥창 투썸 알바 급구',
// 		store_name: '투썸 플레이스',
// 		job_tag: '카페',
// 		address: '서울시 마포구 광흥창역',
// 		work_detail: [
// 			{
// 				work_date: '2025-01-07',
// 				work_hour: '10:00-18:00',
// 				hourly_wage: 12000
// 			},
// 			{
// 				work_date: '2025-01-08',
// 				work_hour: '10:00-18:00',
// 				hourly_wage: 12000
// 			}
// 		],
// 		work_date: ['2024-12-07', '2024-12-08']
// 	},
// 	{
// 		job_offer_id: 2,
// 		title: '수학 과외 알바 급구합니다',
// 		store_name: '수학과외',
// 		job_tag: '과외',
// 		address: '서울시 서대구문구 연세로',
// 		work_detail: [
// 			{
// 				work_date: '2025-01-05',
// 				work_hour: '10:00-18:00',
// 				hourly_wage: 12000
// 			},
// 			{
// 				work_date: '2025-01-06',
// 				work_hour: '10:00-18:00',
// 				hourly_wage: 12000
// 			}
// 		],
// 		work_date: ['2024-12-05', '2024-12-06']
// 	},
// 	{
// 		job_offer_id: 1,
// 		title: '고밥 알바 급구합니다',
// 		store_name: '고기마니밥마니',
// 		job_tag: '식당',
// 		address: '서울시 마포구 백범로',
// 		work_detail: [
// 			{
// 				work_date: '2025-01-03',
// 				work_hour: '10:00-18:00',
// 				hourly_wage: 12000
// 			},
// 			{
// 				work_date: '2025-01-04',
// 				work_hour: '10:00-18:00',
// 				hourly_wage: 12000
// 			}
// 		],
// 		work_date: ['2024-12-03', '2024-12-04']
// 	},
// 	{
// 		job_offer_id: 0,
// 		title: '신촌역 나무카페 알바 급구합니다',
// 		store_name: '나무카페',
// 		job_tag: '카페',
// 		address: '서울시 서대구문구 연세로',
// 		work_detail: [
// 			{
// 				work_date: '2025-01-01',
// 				work_hour: '10:00-18:00',
// 				hourly_wage: 12000
// 			},
// 			{
// 				work_date: '2025-01-02',
// 				work_hour: '10:00-18:00',
// 				hourly_wage: 12000
// 			}
// 		],
// 		work_date: ['2024-12-01', '2024-12-02']
// 	}
// ];

const formatDate = (dateString) => {
	const year = dateString.slice(2, 4); // 앞 두 자리 연도
	const month = dateString.slice(4, 6); // 월
	const day = dateString.slice(6); // 일
	return `${year}.${month}.${day}`;
};

// 상단에 추가
const FindJobsList = () => {
	const [searchData, setSearchData] = useState('');
	const [selectedJob, setSelectedJob] = useState('');
	const [serverData, setServerData] = useState(null);
	const [selectedDates, setSelectedDates] = useState([]);
	const [showCalendar, setShowCalendar] = useState(false);
	const [urgentFilter, setUrgentFilter] = useState(false); // 급구 필터 상태 추가
	const [selectedFilter, setSelectedFilter] = useState('전체'); // 전체 or 급구 필터 상태 추가
	useEffect(() => {
		const fetchData = async () => {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			};
			try {
				const response = await instance.get('/job-offers', {
					headers
				});
				setServerData(response.data);
			} catch (err) {
				console.log('실패');
			}
		};
		fetchData();
	}, []);

	const onChangeSearch = (e) => {
		setSearchData(e.target.value);
	};

	const onChangeJob = (e) => {
		setSelectedJob(e.target.value);
	};

	const toggleDate = (date) => {
		const formattedDate = `${date.getFullYear()}${String(
			date.getMonth() + 1
		).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
		if (selectedDates.includes(formattedDate)) {
			setSelectedDates(selectedDates.filter((d) => d !== formattedDate));
		} else {
			setSelectedDates([...selectedDates, formattedDate]);
		}
	};

	// 공고일까지 남은 날짜 계산 함수
	const dayLeftCalculator = (dateString) => {
		// 입력된 날짜를 한국 시간(UTC+9) 기준으로 변환
		const targetDate = new Date(dateString);

		// 현재 날짜를 한국 시간으로 설정
		const currentDate = new Date();
		const koreaTimeOffset = 9 * 60; // 한국 시간대 (UTC+9)

		// 한국 시간 기준으로 날짜 보정
		const currentUTC =
			currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
		const koreaCurrentDate = new Date(currentUTC + koreaTimeOffset * 60000);

		// 차이 계산
		const diffInMilliseconds = targetDate - koreaCurrentDate;
		const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)); // 일수 변환

		return diffInDays;
	};

	// 필터링 함수 수정
	const filteredData = () => {
		return serverData
			? serverData
					.filter((data) =>
						data.work_detail.some(
							(data) => dayLeftCalculator(data.work_date) >= 0
						)
					)
					.filter((data) =>
						searchData
							? data.title.toLowerCase().includes(searchData.toLowerCase())
							: true
					)
					.filter((data) => (selectedJob ? data.job_tag === selectedJob : true))
					.filter((data) => {
						if (!selectedDates.length) return true;
						const formattedWorkDates = data.work_date.map((date) =>
							date.replace(/-/g, '')
						);
						return selectedDates.some((selectedDate) =>
							formattedWorkDates.includes(selectedDate)
						);
					})
					.filter((data) => {
						if (!urgentFilter) return true; // 급구 필터가 활성화되지 않았으면 모든 데이터 반환

						// work_detail의 각 날짜를 순회하며 확인
						return data.work_detail.some((detail) => {
							const daysLeft = dayLeftCalculator(detail.work_date); // 남은 일수 계산
							return daysLeft <= 3; // 남은 일수가 3일 이하
						});
					})
			: [];
	};

	return (
		<Layout>
			<SubHeader>
				<TitleContainter>
					<MainTitle>
						<Title>
							<Highlight />
							단기알바 찾기
						</Title>
					</MainTitle>
					<SubTitle>
						단기로 일할 수 있는 아르바이트 공고를 한눈에 확인해 보세요
					</SubTitle>
				</TitleContainter>
				<Filter>
					<Toggle>
						<StyledWrapper>
							<SelectedDate
								data-placeholder="원하는 근무 일자를 선택하세요."
								onClick={() => setShowCalendar(!showCalendar)}
							>
								{selectedDates.map(formatDate).join(', ')}
							</SelectedDate>
							{showCalendar && (
								<StyledDatePickerWrapper>
									<DatePicker
										dateFormat="yyyy-MM-dd"
										locale={ko}
										selected={null}
										onChange={toggleDate}
										placeholderText="날짜를 선택하세요"
										inline
										isClearable={false}
									/>
								</StyledDatePickerWrapper>
							)}
						</StyledWrapper>
						<ToggleJobs onChange={onChangeJob}>
							<option value="">전체</option>
							<option value="과외">과외</option>
							<option value="술집">주점</option>
							<option value="식당">식당</option>
							<option value="카페">카페</option>
							<option value="학원">학원</option>
							<option value="기타">기타</option>
						</ToggleJobs>
					</Toggle>
					<SearchInput
						onChange={onChangeSearch}
						placeholder="검색어를 입력해 주세요"
					/>
				</Filter>
			</SubHeader>
			<JobsListContainer>
				<PageDivided>
					<EntireItem
						isSelected={selectedFilter === '전체'}
						onClick={() => {
							setUrgentFilter(false);
							setSelectedFilter('전체');
						}}
					>
						전체
					</EntireItem>
					<DivideLine>&nbsp;&nbsp;|&nbsp;&nbsp;</DivideLine>
					<UrgentItem
						isSelected={selectedFilter === '급구'}
						onClick={() => {
							setUrgentFilter(true);
							setSelectedFilter('급구');
						}}
					>
						급구
					</UrgentItem>
				</PageDivided>
				<ItemList>
					{filteredData().map((_, index, original) => (
						<FindJobsItem
							data={original[original.length - 1 - index]}
							key={original[original.length - 1 - index].job_offer_id}
						/>
					))}
				</ItemList>
			</JobsListContainer>
		</Layout>
	);
};

export default FindJobsList;

const PageDivided = styled.div`
	display: flex;
`;
const EntireItem = styled.div`
	cursor: pointer;
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	color: ${(props) => (props.isSelected ? 'black' : '#989898')};
`;

const UrgentItem = styled(EntireItem)``;
const DivideLine = styled.div`
	color: var(--text-text-tertiary, #989898);
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
