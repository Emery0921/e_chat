export const getPosition = () => {
	const options = {
		//可增加的4个配置参数
		enableHighAccuracy: true, //高精度
		timeout: 5000, //超时时间,以ms为单位
		maximumAge: 24 * 60 * 60 * 1000, //位置缓存时间,以ms为单位
	}
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
	} else {
		alert('无法获取地理位置')
	}
}

function onSuccess(position) {
	console.log(position.coords, '位置')
	// 返回用户位置
	// 经度
	var longitude = position.coords.longitude;
	// 纬度
	var latitude = position.coords.latitude;
	alert('您的当前地址的经纬度：经度' + longitude + '，纬度' + latitude);
	// 根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(longitude, latitude);
	var gc = new BMap.Geocoder();
	gc.getLocation(point, function(rs) {
		var addComp = rs.addressComponents;
		alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " +
			addComp.streetNumber);
	});
	// 这里后面可以写你的后续操作了
	handleData(longitude, latitude);
}

function onError(error) {
	switch (error.code) {
		case 1:
			alert("位置服务被拒绝！");
			break;
		case 2:
			alert("暂时获取不到位置信息！");
			break;
		case 3:
			alert("获取信息超时！");
			break;
		case 4:
			alert("未知错误！");
			break;
	}
	// 这里后面可以写你的后续操作了，下面的经纬度是天安门的具体位置
	// 经度
	var longitude = 39.9151;
	// 纬度
	var latitude = 116.4041;
	handleData(longitude, latitude);
}
