import dayjs from 'dayjs'
export const formatTime = (time)=>{
	let oldTime = new Date(time*1000)
	let newTime = new Date()
	
	let Y = oldTime.getFullYear()
	let M = oldTime.getMonth()	
	let D = oldTime.getDate()
	
	let nY = newTime.getFullYear()
	let nM = newTime.getMonth()	
	let nD = newTime.getDate()

	if(D===nD && M === nM && Y===nY){
		//当天
		return dayjs(time*1000).format('HH:mm')		
	}else if(M === nM && Y===nY && D===nD-1){
		//昨天
		return '昨天 ' + dayjs(time*1000).format('HH:mm')
	}else if(M === nM && Y===nY && D>=nD-7){
		//本周内
		let week = dayjs(time*1000).day()
		const weekObj = {
			0:'星期日',
			1:'星期一',
			2:'星期二',
			3:'星期三',
			4:'星期四',
			5:'星期五',
			6:'星期六',
		}
		return weekObj[week]
	}else if(Y!==nY){
		return dayjs(time*1000).format('YYYY-MM-DD HH:mm')
	}else{
		return dayjs(time*1000).format('M月D日')
	}
}