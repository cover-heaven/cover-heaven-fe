export const formattedTime = (date) => {
	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
};

export const formattedDate = (date) => {
	const newDate = new Date(date);
	const year = newDate.getFullYear();
	const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
	const day = newDate.getDate().toString().padStart(2, '0');
	const days = ['일', '월', '화', '수', '목', '금', '토'];
	const dayName = days[newDate.getDay()];

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
