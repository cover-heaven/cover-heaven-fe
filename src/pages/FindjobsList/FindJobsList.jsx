import FindJobsItem from '../../components/FindjobsList/FindJobsItem';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css'; // 캘린더 스타일 적용
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 스타일 가져오기

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

const ListArray = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ItemList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const MainTitle = styled.div`
	font-size: 40px;
`;

const SubTitle = styled.div`
	font-size: 15px;
`;

const ToggleJobs = styled.select`
	width: 40%;
	height: 52px;
	flex-shrink: 0;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Toggle = styled.div`
	display: flex;
	align-items: center;
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
`;

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px 20px 20px 0px;
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

const StyledDatePicker = styled(DatePicker)`
	width: 200px;
	height: 40px;
	font-size: 16px;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	text-align: center;
	position: absolute; /* 다른 요소에 영향을 주지 않도록 */
	top: 60px; /* 원하는 위치로 조정 */
	left: 0;

	&:focus {
		border-color: #007bff;
		outline: none;
	}
`;

const SelectedDate = styled.div`
	width: 259px;
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

const Highlight = styled.div`
	background-color: red;
	opacity: 60%;
	width: 250px;
	height: 16px;
	position: absolute;
	left: calc(223 / 1512 * 100%);
	top: 194px;
`;

const mockData = [
	{
		job_offer_id: 4,
		title: '광흥창 투썸 알바 급구',
		store_name: '투썸 플레이스',
		job_tag: '술집',
		address: '서울시 마포구 광흥창역',
		work_detail: {
			work_date: '20241211',
			work_hour: '4',
			hourly_wage: '10000'
		},
		work_date: ['11/1', '11/2']
	},
	{
		job_offer_id: 3,
		title: '광흥창 투썸 알바 급구',
		store_name: '투썸 플레이스',
		job_tag: '카페',
		address: '서울시 마포구 광흥창역',
		work_detail: {
			work_date: '20241211',
			work_hour: '4',
			hourly_wage: '10000'
		},
		work_date: ['11/1', '11/2']
	},
	{
		job_offer_id: 2,
		title: '수학 과외 알바 급구합니다',
		store_name: '수학과외',
		job_tag: '과외',
		address: '서울시 서대구문구 연세로',
		work_detail: {
			work_date: '20241212',
			work_hour: '2',
			hourly_wage: '30000'
		},
		work_date: ['11/4', '11/6']
	},
	{
		job_offer_id: 1,
		title: '고밥 알바 급구합니다',
		store_name: '고기마니밥마니',
		job_tag: '식당',
		address: '서울시 마포구 백범로',
		work_detail: {
			work_date: '20241213',
			work_hour: '7',
			hourly_wage: '11000'
		},
		work_date: ['12/13', '12/15']
	},
	{
		job_offer_id: 0,
		title: '신촌역 나무카페 알바 급구합니다',
		store_name: '나무카페',
		job_tag: '카페',
		address: '서울시 서대구문구 연세로',
		work_detail: {
			work_date: '20241201',
			work_hour: '7',
			hourly_wage: '9000'
		},
		work_date: ['12/1', '12/2', '12/4']
	}
];

const formatDate = (dateString) => {
	const year = dateString.slice(2, 4); // 앞 두 자리 연도
	const month = dateString.slice(4, 6); // 월
	const day = dateString.slice(6); // 일
	return `${year}.${month}.${day}`;
};

const FindJobsList = () => {
	const [searchData, setSearchData] = useState('');
	const [selectedJob, setSelectedJob] = useState('');
	const [serverData, setServerData] = useState(null);
	const [selectedDates, setSelectedDates] = useState([]);
	const [showCalendar, setShowCalendar] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('/job-offers');
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

	const filteredData = () => {
		return mockData
			.filter((data) =>
				searchData
					? data.title.toLowerCase().includes(searchData.toLowerCase())
					: true
			)
			.filter((data) => (selectedJob ? data.job_tag === selectedJob : true))
			.filter((data) =>
				selectedDates.length
					? selectedDates.some((date) =>
							data.work_date.includes(`${date.slice(4, 6)}/${date.slice(6)}`)
						)
					: true
			);
	};

	return (
		<Layout>
			<SubHeader>
				<TitleContainter>
					<div>
						<MainTitle>단기알바 찾기</MainTitle>
						<Highlight></Highlight>
					</div>
					<SubTitle>
						단기로 일할 수 있는 아르바이트 공고를 한 눈에 확인해보세요
					</SubTitle>
				</TitleContainter>
				<Filter>
					<Toggle>
						<StyledWrapper>
							<SelectedDate
								data-placeholder="원하는 근무일자를 선택하세요."
								onClick={() => setShowCalendar(!showCalendar)}
							>
								{selectedDates.map(formatDate).join(', ')}
							</SelectedDate>
							{showCalendar && (
								<StyledDatePicker
									dateFormat="yyyy-MM-dd"
									selected={null}
									onChange={toggleDate}
									placeholderText="날짜를 선택하세요"
									inline
									isClearable={false}
								/>
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
						placeholder="검색어를 입력해주세요"
					/>
				</Filter>
			</SubHeader>
			<JobsListContainer>
				<ListArray>
					<div>
						<button onClick={() => setSelectedJob('')}>전체</button>
						<span>|</span>
						<button onClick={() => alert('급구 필터를 선택했습니다.')}>
							급구
						</button>
					</div>
					<div>
						<select>
							<option>최신순</option>
							<option>총급여순</option>
							<option>시급높은순</option>
						</select>
					</div>
				</ListArray>
				<ItemList>
					{filteredData().map((data) => (
						<FindJobsItem data={data} key={data.id} />
					))}
				</ItemList>
			</JobsListContainer>
		</Layout>
	);
};

export default FindJobsList;
