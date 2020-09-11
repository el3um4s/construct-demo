// see https://www.gamasutra.com/blogs/ChristianArellano/20161103/284819/Names_of_Large_Numbers_for_Idle_Games.php
// see https://en.wikipedia.org/wiki/Names_of_large_numbers

function convertNumberToIdleString(x = 0, minimunSize = 100000) {
	let result = 0;
	if ( !isFinite(x) ) {
		result = " ∞";
	} else if (x > minimunSize) {
		const scientificNotation = Number.parseFloat(x).toExponential(6);
		const exponent = scientificNotation.substr(scientificNotation.indexOf("e+") + 2);
		const remainder = parseFloat(exponent) % 3;
		const numberWithoutPoint = scientificNotation.substr(0,scientificNotation.indexOf("e+")).replace(".","").replace(",","")+"000";
		const significandFirst = numberWithoutPoint.substring(0,remainder+1);
		const significandDecimals = numberWithoutPoint.substring(remainder+1,remainder+3);
		result = significandFirst + "." + significandDecimals + getSuffixFromExponent(parseFloat(exponent));
	} else {
		result = Math.round((parseFloat(x)*10))/10;
	}
	return result;
}


function getSuffixFromExponent(exponent) {
	let suffix = "";
	switch (exponent) {
// 		case 0:
// 			suffix = "U";
// 			break;
// 		case 1:
// 			suffix = "D";
// 			break;
// 		case 2:
// 			suffix = "C";
// 			break;
		case 3: case 4: case 5:
			suffix = "K";
			break;
		case 6: case 7: case 8:
			suffix = "M";
			break;
		case 9: case 10: case 11:
			suffix = "G";
			break;
		case 12: case 13: case 14:
			suffix = "T";
			break;
		case 15: case 16: case 17:
			suffix = "P";
			break;
		case 18: case 19: case 20:
			suffix = "E";
			break;
		case 21: case 22: case 23:
			suffix = "Z";
			break;
		case 24: case 25: case 26:
			suffix = "Y";
			break;
		case 27: case 28: case 29:
			suffix = "W";
			break;
		case 30: case 31: case 32:
			suffix = "a";
			break;
		case 33: case 34: case 35:
			suffix = "b";
			break;
		case 36: case 37: case 38:
			suffix = "c";
			break;
		case 39: case 40: case 41:
			suffix = "d";
			break;
		case 42: case 43: case 44:
			suffix = "e";
			break;
		case 45: case 46: case 47:
			suffix = "f";
			break;
		case 48: case 49: case 50:
			suffix = "g";
			break;
		case 51: case 52: case 53:
			suffix = "h";
			break;
		case 54: case 55: case 56:
			suffix = "i";
			break;
		case 57: case 58: case 59:
			suffix = "j";
			break;
		case 60: case 61: case 62:
			suffix = "k";
			break;
		case 63: case 64: case 65:
			suffix = "l";
			break;
		case 66: case 67: case 68:
			suffix = "m";
			break;
		case 69: case 70: case 71:
			suffix = "n";
			break;
		case 72: case 73: case 74:
			suffix = "o";
			break;
		case 75: case 76: case 77:
			suffix = "p";
			break;
		case 78: case 79: case 80:
			suffix = "q";
			break;
		case 81: case 82: case 83:
			suffix = "r";
			break;
		case 84: case 85: case 86:
			suffix = "s";
			break;
		case 87: case 88: case 89:
			suffix = "t";
			break;
		case 90: case 91: case 92:
			suffix = "u";
			break;
		case 93: case 94: case 95:
			suffix = "v";
			break;
		case 96: case 97: case 98:
			suffix = "w";
			break;
		case 99: case 100: case 101:
			suffix = "x";
			break;
		case 102: case 103: case 104:
			suffix = "y";
			break;
		case 105: case 106: case 107:
			suffix = "z";
			break;			
		case 108: case 109: case 110:
			suffix = "aa";
			break;
		case 111: case 112: case 113:
			suffix = "ab";
			break;
		case 114: case 115: case 116:
			suffix = "ac";
			break;
		case 117: case 118: case 119:
			suffix = "ad";
			break;
		case 120: case 121: case 122:
			suffix = "ae";
			break;
		case 123: case 124: case 125:
			suffix = "af";
			break;
		case 126: case 127: case 128:
			suffix = "ag";
			break;
		case 129: case 130: case 131:
			suffix = "ah";
			break;
		case 132: case 133: case 134:
			suffix = "ai";
			break;
		case 135: case 136: case 137:
			suffix = "aj";
			break;
		case 138: case 139: case 140:
			suffix = "ak";
			break;
		case 141: case 142: case 143:
			suffix = "al";
			break;
		case 144: case 145: case 146:
			suffix = "am";
			break;
		case 147: case 148: case 149:
			suffix = "an";
			break;
		case 150: case 151: case 152:
			suffix = "ao";
			break;
		case 153: case 154: case 155:
			suffix = "ap";
			break;
		case 156: case 157: case 158:
			suffix = "aq";
			break;
		case 159: case 160: case 161:
			suffix = "ar";
			break;
		case 162: case 163: case 164:
			suffix = "as";
			break;
		case 165: case 166: case 167:
			suffix = "at";
			break;
		case 168: case 169: case 170:
			suffix = "au";
			break;
		case 171: case 172: case 173:
			suffix = "av";
			break;
		case 174: case 175: case 176:
			suffix = "aw";
			break;
		case 177: case 178: case 179:
			suffix = "ax";
			break;
		case 180: case 181: case 182:
			suffix = "ay";
			break;
		case 183: case 184: case 185:
			suffix = "az";
			break;
		case 186: case 187: case 188:
			suffix = "ba";
			break;
		case 189: case 190: case 191:
			suffix = "bb";
			break;
		case 192: case 193: case 194:
			suffix = "bc";
			break;
		case 195: case 196: case 197:
			suffix = "bd";
			break;
		case 198: case 199: case 200:
			suffix = "be";
			break;
		case 201: case 202: case 203:
			suffix = "bf";
			break;
		case 204: case 205: case 206:
			suffix = "bg";
			break;
		case 207: case 208: case 209:
			suffix = "bh";
			break;
		case 210: case 211: case 212:
			suffix = "bi";
			break;
		case 213: case 214: case 215:
			suffix = "bj";
			break;
		case 216: case 217: case 218:
			suffix = "bk";
			break;
		case 219: case 220: case 221:
			suffix = "bl";
			break;
		case 222: case 223: case 224:
			suffix = "bm";
			break;
		case 225: case 226: case 227:
			suffix = "bn";
			break;
		case 228: case 229: case 230:
			suffix = "bo";
			break;
		case 231: case 232: case 233:
			suffix = "bp";
			break;
		case 234: case 235: case 236:
			suffix = "bq";
			break;
		case 237: case 238: case 239:
			suffix = "br";
			break;
		case 240: case 241: case 242:
			suffix = "bs";
			break;
		case 243: case 244: case 245:
			suffix = "bt";
			break;
		case 246: case 247: case 248:
			suffix = "bu";
			break;
		case 249: case 250: case 251:
			suffix = "bv";
			break;
		case 252: case 253: case 254:
			suffix = "bw";
			break;
		case 255: case 256: case 257:
			suffix = "bx";
			break;
		case 258: case 259: case 260:
			suffix = "by";
			break;
		case 261: case 262: case 263:
			suffix = "bz";
			break;
		case 264: case 265: case 266:
			suffix = "ca";
			break;
		case 267: case 268: case 269:
			suffix = "cb";
			break;
		case 270: case 271: case 272:
			suffix = "cc";
			break;
		case 273: case 274: case 275:
			suffix = "cd";
			break;
		case 276: case 277: case 278:
			suffix = "ce";
			break;
		case 279: case 280: case 281:
			suffix = "cf";
			break;
		case 282: case 283: case 284:
			suffix = "cg";
			break;
		case 285: case 286: case 287:
			suffix = "ch";
			break;
		case 288: case 289: case 290:
			suffix = "ci";
			break;
		case 291: case 292: case 293:
			suffix = "cj";
			break;
		case 294: case 295: case 296:
			suffix = "ck";
			break;
		case 297: case 298: case 299:
			suffix = "cl";
			break;
		case 300: case 301: case 302:
			suffix = "cm";
			break;
		case 303: case 304: case 305:
			suffix = "cn";
			break;
		case 306: case 307: case 308:
			suffix = "co";
			break;
		case 309: case 310: case 311:
			suffix = "cp";
			break;		
		default:
			suffix = "";
	}
	return suffix;
}
