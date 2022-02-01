const table = [
	1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768,
	65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216,
];
const subnetAdd = {
	8: "255.0.0.0",
	9: "255.128.0.0",
	10: "255.192.0.0",
	11: "255.224.0.0",
	12: "255.240.0.0",
	13: "255.248.0.0",
	14: "255.252.0.0",
	15: "255.254.0.0",
	16: "255.255.0.0",
	17: "255.255.128.0",
	18: "255.255.192.0",
	19: "255.255.224.0",
	20: "255.255.240.0",
	21: "255.255.248.0",
	22: "255.255.252.0",
	23: "255.255.254.0",
	24: "255.255.255.0",
	25: "255.255.255.128",
	26: "255.255.255.192",
	27: "255.255.255.224",
	28: "255.255.255.240",
	29: "255.255.255.248",
	30: "255.255.255.252",
	31: "255.255.255.254",
	32: "255.255.255.255",
};
function validateIP() {
	let ip = document.forms["ipValidationForm"]["ipAddress"].value;
	let a, b, c, d;
	var checkerObject = [];

	//logic
	var ipArray = ip.split(".");
	if (ip == "") {
		document.getElementById("output").innerHTML = "Enter IP Address Please";
	} else {
		if (ipArray.length < 4 || ipArray.length > 4) {
			document.getElementById("output").innerHTML = "Enter correct IP Address";
		} else {
			a = parseInt(ipArray[0]);
			b = parseInt(ipArray[1]);
			c = parseInt(ipArray[2]);
			d = parseInt(ipArray[3]);
			let msg = "";

			if (a < 0 || a > 254) {
				let temp = {};
				temp.first = true;
				checkerObject.push(temp);
			} else {
				if (a == 127) {
					msg = "IP is LoopBack IP";
				} else if (a == 169 && b == 254) {
					msg = "it's APIPA IP";
				}
			}
			if (b < 0 || b > 255) {
				let temp = {};
				temp.second = true;
				checkerObject.push(temp);
			}
			if (c < 0 || c > 255) {
				let temp = {};
				temp.third = true;
				checkerObject.push(temp);
			}
			if (d < 0 || d > 255) {
				let temp = {};
				temp.fourth = true;
				checkerObject.push(temp);
			}
			if (!checkerObject.length) {
				document.getElementById("output").innerHTML = msg
					? msg
					: "This is valid IP Address";
			} else {
				var string = "These octets are wrong : ";
				//es6
				checkerObject.map((el) => {
					string = string + " " + Object.keys(el).toString();
				});
				document.getElementById("output").innerHTML = string;
			}
		}
	}
}

function calSubnet() {
	const num = document.forms["hostForm"]["hostNumbers"].value;
	let msg = undefined;
	let temp = null;

	if (num < 0 || num == null || num == "") {
		msg = "Enter a valid number of Hosts";
	} else {
		for (let i = 0; i < table.length; i++) {
			if (num > table[i]) {
				// console.log(table[i], i);
			} else {
				temp = i;
				break;
			}
		}
		var subnetValue = 32 - temp;

		for (let el in subnetAdd) {
			if (parseInt(el) == subnetValue) {
				msg = el + " : " + subnetAdd[el];
			}
		}
	}
	document.getElementById("output").innerHTML = msg;
}

function subnetRange() {
	const ipAddress = document.forms["subnetRangeForm"]["ipAddress"].value;
	const subnetValue = document.forms["subnetRangeForm"]["subnetValue"].value;
	var checkerObject = [];
	let msg = "";
	let temp = undefined;
	let index = undefined;
	let maxOctval = 0;

	for (let el in subnetAdd) {
		if (parseInt(el) == subnetValue) {
			if (el == 8 || el == 16 || el == 24) {
				maxOctval = 255;
				temp = subnetAdd[el];
				index = el;
			} else {
				temp = subnetAdd[el];
				index = el;
			}
		}
	}

	let ipArray = temp.split(".");
	if (temp == "") {
		document.getElementById("output").innerHTML =
			"Enter valid IP address and Select valid option";
	} else {
		if (ipArray.length < 4 || ipArray.length > 4) {
			document.getElementById("output").innerHTML = "Enter correct IP Address";
		} else {
			a = parseInt(ipArray[0]);
			b = parseInt(ipArray[1]);
			c = parseInt(ipArray[2]);
			d = parseInt(ipArray[3]);
			if (a != 255 && a != 0) {
				let temp = {};
				temp.first = true;
				checkerObject.push(temp);
			}
			if (b != 255 && b != 0) {
				let temp = {};
				temp.second = true;
				checkerObject.push(temp);
			}
			if (c != 255 && c != 0) {
				let temp = {};
				temp.third = true;
				checkerObject.push(temp);
			}
			if (d != 255 && d != 0) {
				let temp = {};
				temp.fourth = true;
				checkerObject.push(temp);
			}
			//es6
			checkerObject.map((el) => {
				if (Object.keys(el).toString() == "first") {
					maxOctval = 255 - a;
				} else if (Object.keys(el).toString() == "second") {
					maxOctval = 255 - b;
				} else if (Object.keys(el).toString() == "third") {
					maxOctval = 255 - c;
				} else if (Object.keys(el).toString() == "fourth") {
					maxOctval = 255 - d;
				}
			});
			document.getElementById("output").innerHTML = maxOctval;
		}
	}
}
