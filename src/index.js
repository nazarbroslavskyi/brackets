module.exports = function check(str, bracketsConfig) {
	let indexSubstrEnd;
	let check = 0;
	let indexSubstrStart;
	let indexReverse;
	let lengthOfSubstring;
	let opositeElem;
	let newStr;
	let obj = {
		'(': [0, 'open'],
		'{': [0, 'open'],
		'[': [0, 'open'],
		'|': [0, 'both', '|'],
		')': [0, 'close', '('],
		'}': [0, 'close', '{'],
		']': [0, 'close', '['],
		'1': [0, 'open'],
		'2': [0, 'close', '1'],
		'3': [0, 'open'],
		'4': [0, 'close', '3'],
		'5': [0, 'open'],
		'6': [0, 'close', '5'],
		'7': [0, 'open'],
		'7': [0, 'close', '7'],
		'8': [0, 'open'],
		'8': [0, 'close', '8'],
	}

	for(let i = 0; i < str.length; ++i) {

		if(+str[i]  || str[i] == '|') {
			str = str.replace(/77|\|\||88/g, '');
			str = str.replace(/77|88/g, '');
		}
		if(str.length == 0) return true;

		if(obj[str[i]][1] == 'close') {

			opositeElem = obj[str[i]][2];

			for(let j = i; j >= 0; j--) {

				if(str[j] == opositeElem) {
					indexSubstrStart = j;
					indexSubstrEnd = i;
					newStr = str.slice(indexSubstrStart, indexSubstrEnd + 1);

					for(let i = 0; i < newStr.length; i++) {
						if(obj[newStr[i]][1] == "open") {
							obj[newStr[i]][0]++;
						} else if(obj[newStr[i]][1] == "close") {
							obj[obj[newStr[i]][2]][0]--;
						} else if (newStr[i] == '|') {
							return false;
						}

					}

					for(let key in obj) {
						if(obj[key][0]) {
						check = 1;
						}
						if(check) {
							return false;
						}
					}

					str = str.replace(newStr, '');
					
					if(str.match(/77|\|\||88/) == "||") {
						str = str.replace(/77|\|\||88/g, '');
						i = i - 1;
					}
					
					if(newStr.length == 0 ) {return true;}
					i = i - (newStr.length);
					break;
				} else if (str[j] !== opositeElem && j == 0) {
					return false;
				}
				
			}

		} else {

			for(let i = 0; i < str.length; i++) {
				if(obj[str[i]][1] == "open") {
					obj[str[i]][0]++;
				} else if(obj[str[i]][1] == "close") {
					obj[obj[str[i]][2]][0]--;
				}
			}

		}
	}


for(let key in obj) {

	if(obj[key][0]) {
	check = 1;
	}

	if(check) {
		return false;
	} else {
		return true;
	}
}

}
