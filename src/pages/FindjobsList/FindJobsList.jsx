import FindJobsItem from '../../components/FindjobsList/FindJobsItem';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css'; // 캘린더 스타일 적용
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 스타일 가져오기
import ko from 'date-fns/locale/ko';
import { useEffect, useState } from 'react';
import { instance } from '../../api/instance';

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 74px;
	padding-bottom: 50px;
	gap: 45px;
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
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 40px;
`;

const Highlight = styled.div`
	background-color: red;
	opacity: 60%;
	width: 250px;
	height: 16px;
`;

const SubTitle = styled.div`
	font-size: 15px;
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
`;

const TitleContainter = styled.div`
	display: flex;
	flex-direction: column;
	gap: 25px;
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

	useEffect(() => {
		const fetchData = async () => {
			const headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			};
			try {
				const response = await axios.get(
					'https://3.131.18.121.nip.io/alumni_job/job-offers',
					{
						headers
					}
				);
				setServerData(response.data);
				// console.log(response.data);
			} catch (err) {
				// console.log('실패');
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
	const dayLeftCalculator = (time) => {
		const targetDate = new Date(time); // 목표 날짜
		const currentDate = new Date(); // 현재 날짜

		// 밀리초 단위 차이 계산
		const diffInMilliseconds = targetDate - currentDate;

		// 밀리초를 일수로 변환
		const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
		return diffInDays;
	};

	// 필터링 함수 수정
	const filteredData = () => {
		return serverData
			? serverData
					.filter((data) =>
						searchData
							? data.title.toLowerCase().includes(searchData.toLowerCase())
							: true
					)
					.filter((data) => (selectedJob ? data.job_tag === selectedJob : true))
					.filter((data) => {
						if (!selectedDates.length) return true; // 선택된 날짜가 없으면 모든 데이터를 반환
						return selectedDates.some((selectedDate) =>
							data.work_date.includes(selectedDate)
						);
					})
					.filter((data) => {
						if (!urgentFilter) return true; // 급구 필터가 활성화되지 않았으면 모든 데이터 반환
						return data.work_detail.some(
							(detail) => dayLeftCalculator(detail.work_date) <= 3
						); // 공고일까지 3일 이하인 데이터만 반환
					})
			: [];
	};

	const sortedPosts = filteredData().sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	return (
		<Layout>
			<SubHeader>
				<TitleContainter>
					<MainTitle>
						<Title>단기알바 찾기</Title>
						<Highlight></Highlight>
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
							<option value="주점">주점</option>
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
					<EntireItem onClick={() => setUrgentFilter(false)}>전체</EntireItem>
					<div>&nbsp;|&nbsp;</div>
					<UrgentItem onClick={() => setUrgentFilter(true)}>급구</UrgentItem>
				</PageDivided>
				<ItemList>
					{sortedPosts.map((data) => (
						<FindJobsItem data={data} key={data.job_offer_id} />
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
`;
const UrgentItem = styled.div`
	cursor: pointer;
`;
