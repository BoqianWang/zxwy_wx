/**
 * 优惠活动计算模块
 * author     wzh
 * created    2018-6-6 15:24
 */


/**
 * 计算适合的满减活动
 * @param  {[type]} currentMoney 输入金额
 * @param  {[type]} moneyOffArr  满减集合数组
 * @return {[type]}              [description]
 */
export function canUserMoneyOff(currentMoney, moneyOffArr) {
	let moneyOff = {
		discount: 0
	};
	if(moneyOffArr) {
		for(let item of moneyOffArr) {
			if(currentMoney >= item.fullMoney) {
				if(moneyOff.discount) {
					if(moneyOff.discount < item.discount) {
						moneyOff = item;
					}
				} else {
					moneyOff = item;
				}
			}
		}
	}
	return moneyOff;
}

/**
 * 计算随机减
 * @param  {[type]} suerPayMoney 实付金额
 * @param  {[type]} randmonCut   随机减
 * @return {[type]}              [description]
 */
export function calculateRandomCut(surePayMoney, randmonCut) {
	let random = 0,
		sureMoney = surePayMoney;
	if(surePayMoney < randmonCut) {
		random = surePayMoney;
		sureMoney = 0;
	} else {
		random = randmonCut;
		sureMoney -= randmonCut;
	}
	return {
		random: random,
		surePayMoney: sureMoney
	}
}


/**
 * 监听适合能用的代金券
 * @param  {[type]} currentMoney 输入金额
 * @param  {[type]} voucherList  满减集合数组
 * @param  {[type]} suerPayMoney 实付
 * @return {[type]}              [description]
 */
export function canUserVoucherList(currentMoney, voucherList, shopInfo) {
	let voucherArr = [],
		canUserNumber = 0;

		voucherList = JSON.parse(JSON.stringify(voucherList))
	
	for(let item of voucherList) {
		if(currentMoney >= item.fullMoney) {
			//等级为5, 店铺别代金券
			if(item.activityLevel == 5) {
				for(let info of item['districtCodeVOs']) {
					if(shopInfo['bizId'] == info['districtCode']) {
						item['isUserful'] = 1;
						break;
					}
				}	
			}
			//等级为4, 商券级别代金券
			else if(item.activityLevel == 4) {
				for(let info of item['districtCodeVOs']) {
					if(info['districtCode'] == shopInfo['businessCode']) {
						item['isUserful'] = 1;
						break;
					}
				}
			}
			//等级为0, 全平台别代金券
			else if(item.activityLevel == 0) {
				item['isUserful'] = 1;
			}

		} else {
			item['isUserful'] = 0;
		}
	}
	for(let item of voucherList) {
		if(item['isUserful'] == 1) {
			canUserNumber++;
			voucherArr.unshift(item);
		} else {
			voucherArr.push(item)
		}
	};
	// voucherArr = voucherArr.sort((a, b) => a['discount'] - b['discount']);
	return {
		list: voucherArr,
		count: canUserNumber
	}
}

/**
 * 计算清风费
 * @param  {[type]} integralDiscount 使用的积分
 * @param  {[type]} vocherDiscount   使用的代金券
 * @param  {[type]} shopInfo         店铺信息
 * @return {[type]}                  [description]
 */
export function calculateServerMoney(integralDiscount, vocherDiscount, shopInfo) {
	    vocherDiscount = vocherDiscount || 0;
		let serverMoney = integralDiscount + vocherDiscount,
		qffFree = 0;
	if(shopInfo['serviceFeeObject'] == 0 && serverMoney >= shopInfo['standardFee']) {
		if(shopInfo['marketType'] == 0) {
			qffFree = parseFloat(shopInfo['serviceRate']);
		} 
		else if(shopInfo['marketType'] == 1) {
			qffFree = Tools.ToCurrency(shopInfo['serviceRate'] * serverMoney);
		}
	}
	return qffFree;
}

/**
 * 计算使用的积分
 * @param  {[type]} intergral    [description]
 * @param  {[type]} surePayMoney [description]
 * @return {[type]}              [description]
 */
export function calculateIntegral(intergral, surePayMoney) {
	let intergralDiscount = 0;
	if(intergral > 0 && surePayMoney > 0) {
		if(surePayMoney >= intergral) {
			surePayMoney -= intergral;
			intergralDiscount = intergral;
		} else {
			intergralDiscount = surePayMoney;
			surePayMoney = 0;
		}
	}

	return {
		surePayMoney: surePayMoney,
		intergralDiscount: Tools.ToCurrency(intergralDiscount, 2)
	}
}

/**
 * 计算减免的配送费
 * @param  {[type]} surePayMoney [description]
 * @param  {[type]} expressFree  [description]
 * @param  {[type]} activityItem [description]
 * @return {[type]}              [description]
 */
export function calculateExpressFree(surePayMoney, expressFree, activityItem) {
	let expressFreeDiscount = 0,
		activitys = {};
	if(Object.keys(activityItem).length && surePayMoney >= activityItem['activitys'][0]['fullMoney']) {
		activitys = activityItem['activitys'][0];
		expressFreeDiscount = activitys['discount'];
		surePayMoney -= expressFreeDiscount;
	};
	return {
		sureMoney: surePayMoney,
		dispatchDiscount: activitys,
		expressFreeDiscount: expressFreeDiscount
	}
}

