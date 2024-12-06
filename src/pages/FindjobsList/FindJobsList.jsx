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
	padding-left: 14.2%;
	padding-right: 14.2%;
	gap: 84px;
`;

const JobsListContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 41px;
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
	gap: 16px;
`;

const SubHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 39px;
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
`;

// Styled-components로 스타일 정의
const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px;

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
	width: 200px;
	height: 40px;
	font-size: 16px;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	text-align: center;

	&:focus {
		border-color: #007bff;
		outline: none;
	}
`;

const mockData = [
	{
		job_offer_id: 3,
		title: '광흥창 투썸 알바 급구',
		store_name: '투썸 플레이스',
		job_tag: '카페',
		address: '서울시 마포구 광흥창역',
		work_detail: {
			work_date: '20241101',
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
			work_date: '20241102',
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
			work_date: '20241102',
			work_hour: '7',
			hourly_wage: '11000'
		},
		work_date: ['11/9', '11/12']
	},
	{
		job_offer_id: 0,
		title: '신촌역 나무카페 알바 급구합니다',
		store_name: '나무카페',
		job_tag: '카페',
		address: '서울시 서대구문구 연세로',
		work_detail: {
			work_date: '20241102',
			work_hour: '7',
			hourly_wage: '9000'
		},
		work_date: ['12/1', '12/2']
	}
];

const FindJobsList = () => {
	const [searchData, setSearchData] = useState('');
	const [selectedJob, setSelectedJob] = useState('');
	const [serverData, setServerData] = useState(null);

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

	const filteredData = () => {
		return mockData // 서버랑 연결되면 mockData -> serverData로 교체
			.filter((data) =>
				searchData
					? data.title.toLowerCase().includes(searchData.toLowerCase())
					: true
			)
			.filter((data) => (selectedJob ? data.job_tag === selectedJob : true))
	};
	const [selectedDate, setSelectedDate] = useState(null);
	const [searchDate, setSearchDate] = useState(null);
	console.log(searchDate);

	return (
		<Layout>
			<SubHeader>
				<TitleContainter>
					<MainTitle>단기알바 찾기</MainTitle>
					<SubTitle>
						단기로 일할 수 있는 아르바이트 공고를 한 눈에 확인해보세요
					</SubTitle>
				</TitleContainter>
				<Filter>
					<Toggle>
						<StyledWrapper>
							<StyledDatePicker
								dateFormat="yyyy-MM-dd"
								selected={selectedDate} // 선택한 날짜 표시
								onChange={(date) => {
									setSelectedDate(date);
									setSearchDate(
										`${date.getFullYear()}` +
											`${date.getMonth() + 1}` +
											`${date.getDate()}`
									);
								}}
								// 날짜 선택 시 상태 업데이트
								placeholderText="2024년 11월 23일 (토)" // 입력창 placeholder
							/>
						</StyledWrapper>
						<ToggleJobs onChange={onChangeJob}>
							<option value="">직종</option>
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
