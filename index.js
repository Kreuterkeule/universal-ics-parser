module.exports = class IcsParser {
	beautify(arr) {
		if (typeof arr == 'string') {
			return arr;
		}
		let keys = arr.map(e => e[0].split(';')[0]);

		let obj = {};
		keys.forEach(e => obj[e] = []);

		arr.forEach((e, i) => {
			obj[e[0].split(';')[0]].push(this.beautify(e[1]));
		});		
		return obj
	}
	parseString(cs) {
		
	
		let arr = cs.split('\n');
		
		arr = arr.map(e => {let a = e.split(':'); let key = a.shift(); let value = a.join(':'); return [key, value]});
	
		arr = arr.filter(e => JSON.stringify(e) != JSON.stringify(['', ''])); // remove empty lines
	
		let result = this.parseArr(arr);	
		return this.beautify(result);	
	}

	parseArr(arr) {

		let result = []

		for (let line of arr) {

			let resultVar;

			let line = arr.splice(0,1)[0];

			switch(line[0]) {
				case "BEGIN":
					result.push([line[1], this.parseArr(arr)]);
					break;
				case "END":
					return result;
				default:
					result.push([line[0], line[1]]);
			}

		}
		return result;
	}

}
