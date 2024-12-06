export const formattedTime = (date) => {
	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
};

export const formattedDate = (date) => {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const days = ['일', '월', '화', '수', '목', '금', '토'];
	const dayName = days[date.getDay()];

	return `${year}.${month}.${day}(${dayName})`;
};

export const formattedPay = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formattedWorkDay = (data) => {
	let workDayList = '';
	data.forEach((item) => {
		workDayList += `${formattedDate(item.work_date)} ${item.work_hour}\n`;
	});
	return workDayList;
};
