//элемент большой экран ввода и вывода результата
const big_screen = document.querySelector('.big-screen');
//элемент маленький экран вывода истории ввода на большом экране
const small_screen = document.querySelector('.small-screen');
// кнопка СЕ
const ce = document.querySelector('.CE');
//кнопка С
const c = document.querySelector('.C');
//кнопка один делить на Х
const oneDivideX = document.querySelector('.one-divide-x');
//кнопки чисел
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const four = document.querySelector('.four');
const five = document.querySelector('.five');
const six = document.querySelector('.six');
const seven = document.querySelector('.seven');
const eight = document.querySelector('.eight');
const nine = document.querySelector('.nine');
const remove = document.querySelector('.remove');
const zero = document.querySelector('.zero');
/*let buttons = document.querySelectorAll('.button');*/
/*let button = document.querySelector('.button');*/
//кнопка точки
const point = document.querySelector('.point');
//кнопка равно
const equal = document.querySelector('.equal');
//кнопка умножения
const multiply = document.querySelector('.multiply');

//let operation = ''; 
//let first_part = '';
//let operation_part = '';
//let second_part = '';
//let equalResult = 0;

//функция: если ли скобки
let isThereBrackets = function(string) {
	if ( string.indexOf('(') > 0 || string.indexOf(')') > 0 ) {
		return true;
	}else{
		return false;
	}
}
//функция проверки: один ли операнд + или - (последний или нет)
let isOperandPlusMinusLast = function(string) {
	//error(string.includes('-'))
	if ( string.includes('+') === true &&  string.includes('-') === false) {
		if ( string.indexOf('+') === string.lastIndexOf('+')) {
			//console.log( string + ' + the one ' + string.indexOf('+') + ' -- ' + string.lastIndexOf('+'));
			//error('+ ' +string )
			return true;
		}
	}
	if ( string.includes('-') === true &&  string.includes('+') === false) {
		if ( string.indexOf('-') === string.lastIndexOf('-')) {
			//console.log( string + ' - the one ' + string.indexOf('-') + ' -- ' + string.lastIndexOf('-'));
			//error('- ' +string )
			return true;
		}
	}else{
		return false;
	}
}
//функция проверки: один ли операнд * или / (последний или нет)
let isOperandMultyplyDivisionLast = function(string) {
	//error(string.includes('-'))
	if ( string.includes('*') === true &&  string.includes('/') === false) {
		if (( string.indexOf('*') === string.lastIndexOf('*')) && !( string.lastIndexOf('+') || string.lastIndexOf('-') || string.lastIndexOf('/') ) ) {
			//console.log( string + ' + the one ' + string.indexOf('+') + ' -- ' + string.lastIndexOf('+'));
			//error('* ' +string )
			return true;
		}
	}
	if ( string.includes('/') === true &&  string.includes('*') === false) {
		if ( (string.indexOf('/') === string.lastIndexOf('/')) && !( string.lastIndexOf('+') || string.lastIndexOf('-') || string.lastIndexOf('*') ) ) {
			//console.log( string + ' - the one ' + string.indexOf('-') + ' -- ' + string.lastIndexOf('-'));
			//error('/ ' +string )
			return true;
		}
	}else{
		return false;
	}
}

// функция нажатия кнопки
function press_button(theObject, symbol) {
	let str = big_screen.textContent;

	if ( symbol === '*' || symbol === '/'|| symbol === '+'|| symbol === '-' ) {
		big_screen.textContent += theObject.dataset.number;
		str = big_screen.textContent;
	}else{
		big_screen.textContent += theObject.dataset.number;
		str = big_screen.textContent;
		if (str.indexOf('0') === 0 && str.length === 2) {
			str = str.slice(1);
			big_screen.textContent = str;
		}
	}
	if ( symbol === '.' && !big_screen.textContent.includes(symbol)) {
		big_screen.textContent += theObject.dataset.number;
}
}

// функция сброса
function cancel(theObject) {
	theObject.textContent = '0';
	//operation = ''; 
    //first_part = '';
    //operation_part = '';
	//second_part = '';
}

// функция сброса маленького экрана
function cancel_small_screen(theObject) {
	theObject.textContent = '';
	//operation = ''; 
    //first_part = '';
    //operation_part = '';
	//second_part = '';
}

// функция удаления по-символьно
function erase(theObject) {
	let text = theObject.textContent;
	//console.log(text);
	if (text !== '' && text !== '0' && text.length !== 1) {
		let text2 = text.slice(0, -1);
		theObject.textContent = text2;
		}
	else { big_screen.textContent = '0';}
}



/*-------------------------*/
//тестовая часть
//+(-1/2)*(10-(-5554/40))-2*20 -(1-2)
/*
let myString = '-159*8-(-547*788+(14-5425)*-6+894)+8';
   //myString = '5794+(-15*-1546-145*-87-2/20*8)+8974'
   //myString = '-125*-84/-46488'
  // myString = '-154*-46488/2154*21447'
  // myString = '-159*8-(547*788+(14-5425)*-6+894)+(-8)*(-457-35*5)-44518';
  // myString = '8458+5445-5477+14879'

console.log('исходная строка: ' + myString);
let stringTest = myString.split('');
console.log('исходная строка для перебора: ');
console.log(stringTest);
*/
//функция поиска индекса операнда
let findIndexOfOperation = function(string, operation) {
	let indexOperation;

	if ( operation === '' || !operation ) { return console.log('не указан операнд в функции');}

	switch (operation) {
		case operation:
			if ( string.indexOf(operation) >= 0 ) {
				if ( string.indexOf('-') === 0 || string.indexOf('+') === 0 ) {
					indexOperation = string.indexOf(operation, 1);
					console.log( 'indexOperand ' + operation + ' : ' + indexOperation);
					return indexOperation;
	
				}else{
				indexOperation = string.indexOf(operation);
				console.log( 'indexOperand ' + operation + ' : ' + indexOperation);
				return indexOperation;
				}
			}else{
				console.log('операнда ' + operation + ' нет: ');
			}
			break;
		
}
}
//функция поиска следующего операнда
let findNextIndexOfOperation = function(string, indexOperation ) {
	let indexNextOperation;

	if ( indexOperation === '' || !indexOperation ) { return console.log('не указан startIndex в функции');}

	if ( string.includes('+') ||string.includes('-')  || string.includes('/') || string.includes('*')   ) {
		//поиск следующего + или -
		for ( let i = indexOperation + 1; i < string.length ; i++) {
			//console.log(string)
			if ( ( string[i] === '+' || string[i] === '-' || string[i] === '*' || string[i] === '/' ) ) {
				if ( (string[i] === '-' && (i - indexOperation) === 1) || (string[i] === '+' && (i - indexOperation) === 1) ) {
					continue;
				}else{
					console.log('indexNextOperand: ' + indexNextOperation)
					indexNextOperation = i - 1;
					break;
				}
			}
			//console.log('indexNextOperand: ' + indexNextOperation)
			indexNextOperation = i;
			//break;

		}
	//console.log( 'indexNextOperand: ' + indexNextOperation);
	return indexNextOperation;
	}
}
//функция поиска предыдущего операнда
let findPreviousIndexOfOperation = function(string, indexOperation) {
	let previousIndexOfOperation;

	if ( indexOperation === '' || !indexOperation ) { return console.log('не указан startIndex в функции');}

	if ( string.includes('+') ||string.includes('-')  || string.includes('/') || string.includes('*')   ) {
		//поиск предыдущего + или - * /
		for ( let i = indexOperation - 1; i >= 0 ; i--) {
			if ( ( string[i] === '+' || string[i] === '-' || string[i] === '*' || string[i] === '/' ) ) {
				previousIndexOfOperation = i;
				break;
			}else{
				previousIndexOfOperation = 0;
			}
		}
	console.log( 'previousIndexOfOperand: ' + previousIndexOfOperation);
	return previousIndexOfOperation;
	}
}
//функция поиска скобок - возвращает строку внутри скобок
let findBrackets = function(string) {

	if ( string )  {
		if (string.includes('(') || string.includes(')')) {
			//блок поиска индексов скобок ---начало---
			let beginIndex;
			let lastIndex;
			//console.log(string);

			for ( let i = 0; lastIndex == undefined; i++) {
				if(string[i] === '(' )  {
					beginIndex = i;
					//console.log(beginIndex);
				}
				if(string[i] === ')' && lastIndex === undefined) {
					lastIndex = string.indexOf(string[i]);
					//console.log(lastIndex);
				}
			}
			//блок поиска индексов скобок ---конец---
			console.log('beginIndex: '+ beginIndex + ' ; lastIndex: ' + lastIndex );
			//достаем содержимое скобок
			let changingStrings = string.slice(beginIndex + 1, lastIndex);
			console.log(changingStrings);

			return changingStrings;
		}else{
			console.log( 'исходная строка без изменений: ' + string);
			return string;
		}
	}else{
		console.log('нет строки для разбора')
	}
}
//функция поиска индексов скобок 
let findIndexOfBracket = function(string) {

	if ( string )  {
		if (string.includes('(') || string.includes(')')) {
			//блок поиска индексов скобок ---начало---
			let beginIndex;
			let lastIndex;
			let indexes = {};
			//console.log(string);

			for ( let i = 0; lastIndex == undefined; i++) {
				if(string[i] === '(' )  {
					beginIndex = i;
					//console.log(beginIndex);
				}
				if(string[i] === ')' && lastIndex === undefined) {
					lastIndex = string.indexOf(string[i]);
					//console.log(lastIndex);
				}
			}
			//блок поиска индексов скобок ---конец---
			console.log('beginIndex: '+ beginIndex + ' ; lastIndex: ' + lastIndex );
			indexes.beginIndex = beginIndex; //начало скобок
			indexes.lastIndex = lastIndex; //конец скобок
			console.log(indexes);
			return indexes;
		}else{
			console.log( 'исходная строка без изменений (скобок нет!): ' + string);
			return string;
		}
	}else{
		console.log('нет строки для разбора')
	}
}
//функция подготовки строки для обработки (при выходе из bigScreen)
let toPreparationString = function(string) {
	return string.split('');
}
//функция окончания итераций - возможна не нужна
let isOperationLast = function(string) {
	//error(string.includes('-'))
	if ( string.includes('+') === true &&  string.includes('-') === false) {
		if ( string.indexOf('+') === string.lastIndexOf('+')) {
			//console.log( string + ' + the one ' + string.indexOf('+') + ' -- ' + string.lastIndexOf('+'));
			//console.log('+ ' +string )
			return true;
		}
	}
	if ( string.includes('-') === true &&  string.includes('+') === false) {
		if ( string.indexOf('-') === string.lastIndexOf('-')) {
			//console.log( string + ' - the one ' + string.indexOf('-') + ' -- ' + string.lastIndexOf('-'));
			//console.log('- ' +string )
			return true;
		}
	}else{
		return false;
	}
}
//функция перемножение/деления
let getMultiplicationAndDivision = function(string, operation) {
	//поиск индексов
	let indexSymbol = findIndexOfOperation(string, operation);
	let beginIndex = findPreviousIndexOfOperation(string, indexSymbol);
	let lastIndex = findNextIndexOfOperation(string, indexSymbol);
	let result = 0;
	console.log('indexSymbol: ' + indexSymbol + ' beginIndex: ' + beginIndex + ' lastIndex: ' + lastIndex);
	let firstOperand = string.slice(beginIndex, indexSymbol).join('');
	console.log(firstOperand);
	let secondOperand = string.slice(indexSymbol + 1, lastIndex + 1).join('');
	console.log(secondOperand);
	if ( operation === '*') {
		result = Number(firstOperand) * Number(secondOperand);
	}else{
		result = Number(firstOperand) / Number(secondOperand);
		}
		console.log('result: ' + result);
	//если result положительное число, то добавляем +
	if ( result >= 0 ) {
		result = (String(result)).split('');
		result.splice(0, 0, '+')
	}else{
		result = (String(result)).split('')
	}
	console.log(result);
	//console.log(string);
	let leftPartOfString = string.slice(string[0]-1, beginIndex);
	//console.log(leftPartOfString)
	let rightPartOfString = string.slice(lastIndex+1, string.length);
	//console.log(rightPartOfString)
	//собираем левую и правую часть строки и между ними вставляем результат расчета
	string = (leftPartOfString.concat(result)).concat(rightPartOfString);
	console.log(string);
	return string;
}
//функция сложения/вычитания
let getAdditionAndSubtraction = function(string, operation) {
	//поиск индексов
	let indexSymbol = findIndexOfOperation(string, operation);
	let beginIndex = findPreviousIndexOfOperation(string, indexSymbol);
	let lastIndex = findNextIndexOfOperation(string, indexSymbol);
	let result = 0;
	console.log('indexSymbol: ' + indexSymbol + ' beginIndex: ' + beginIndex + ' lastIndex: ' + lastIndex);
	let firstOperand = string.slice(beginIndex, indexSymbol).join('');
	console.log(firstOperand);
	let secondOperand = string.slice(indexSymbol + 1, lastIndex + 1).join('');
	console.log(secondOperand);
	if ( operation === '+') {
		result = Number(firstOperand) + Number(secondOperand);
	}else{
		result = Number(firstOperand) - Number(secondOperand);
		}
		console.log('result: ' + result);
	//если result положительное число, то добавляем +
	if ( result >= 0 ) {
		result = (String(result)).split('');
		result.splice(0, 0, '+')
	}else{
		result = (String(result)).split('')
	}
	console.log(result);
	//console.log(string);
	let leftPartOfString = string.slice(string[0]-1, beginIndex);
	//console.log(leftPartOfString)
	let rightPartOfString = string.slice(lastIndex+1, string.length);
	//console.log(rightPartOfString)
	//собираем левую и правую часть строки и между ними вставляем результат расчета
	string = (leftPartOfString.concat(result)).concat(rightPartOfString);
	console.log(string);
	return string;
}
//функция сведения плюсов и минусов
let convergenceOfOperationSigns = function(string) {
	if ( string ) {
		let result;
		for ( let i = 0; i < string.length; i++ ){
			if ( (string[i] === '-' || string[i] === '+') && (string[i+1] === '-' || string[i+1] === '+') ) {
				//console.log(string[i] + ' : ' + string[i+1]);
				let operationForConverdence = string.slice(i, i + 1 + 1).join('');
				//console.log(operationForConverdence)
				switch (operationForConverdence) {
					case '-+':
					case '+-':
						result = '-';
						string.splice(i,2, result);
						//console.log(string)
						break;
					case '++':
					case '--':
						result = '+';
						string.splice(i,2, result);
						//console.log(string)
						break;
				}
			}
		}
		console.log(string);
		return string;
	}else{
		console.log('нету строки');
	}
}
//функция расчета
function calculate(stringFromScreen) {

	let preparedString = toPreparationString(stringFromScreen);
	console.log('исходная строка для перебора: ' + preparedString);
	let resultingString = iteration(preparedString).join('');
	console.log(resultingString);
	small_screen.textContent = stringFromScreen;
	big_screen.textContent = resultingString;
}
//функция расчета умножения и деления (операнды высшего приоритета)
let calculateMultiplicationAndDivision = function(string) {
	if( string ) {
		if( string.includes('*') || string.includes('/') ) {
			//выбор операнда
			if( string.includes('*') ) {
				//функция умножения
				string = getMultiplicationAndDivision(string, '*');
			}
			if( string.includes('/') ) {
				//функция деления
				string = getMultiplicationAndDivision(string, '/');
			}
			console.log(string)
			return string;
		}else{
			console.log(string)
			return string;
		}
	}else{
		console.log('нету строки')
	}
}
//функция расчета сложения и вычитания
let calculateAdditionAndSubtraction = function(string) {
	if ( string ) {
		string = convergenceOfOperationSigns(string); //убираем лишние плюсы и/или минусы
		console.log(string);
		if ( string.includes('+') || string.includes('-') ) {
			if ( string.includes('+',1)  ) {
				string = getAdditionAndSubtraction(string, '+')
				console.log(string);
				return string;
			}
			if ( string.includes('-',1)  ) {
				string = getAdditionAndSubtraction(string, '-')
				console.log(string);
				return string;
			}
		}else{
			console.log(string);
			return string;
		} 
	}else{
		console.log('нету строки');
	}
}
//расчет всех операций
let calculateOperations = function(string) {
	if ( string ) {
		let result = string;
		//если есть деление или умножение
		if ( string.includes('*') || string.includes('/') ) {
			result = calculateMultiplicationAndDivision(findBrackets(string));
			//console.log(result);
			return calculateOperations(result);
		}else{
				//если есть сложение или деление
			if ( string.includes('-', 1) || string.includes('+', 1) ) {
				result = calculateAdditionAndSubtraction(findBrackets(string));
				//console.log(result);
				return calculateOperations(result);
			}
				//иначе - когда нет чего расчитывать, надо вычисленную подстроку вставить в изначальную, откуда взяли
				console.log(result);
				return result;
		}
	}else{
		console.log('нету строки!');
	}
}
//функция итерации - вначале умножение/деление, потом сложение/вычитание
let iteration = function(string) {
	if ( string ) {
		//если есть скобки, ищем индексы и достаем строку внутри скобок - расчитываем - вставляем в исходную строку результат расчета подстроки - повторяем пока есть скобки
		if ( isThereBrackets(string) ) {
			let indexes = findIndexOfBracket(string);
			let beginIndex = indexes.beginIndex;
			let lastIndex = indexes.lastIndex;

			let stringForCalculate = findBrackets(string);
			let calculateString = calculateOperations(stringForCalculate);
			console.log(string)
			console.log(string[0])
			//сборка строки ----начало---- как в getMultiplicationAndDivision и getAdditionAndSubtraction
			let leftPartOfString = string.slice(0, beginIndex);
			console.log( 'leftPartOfString: ' + leftPartOfString)
			let rightPartOfString = string.slice(lastIndex+1, string.length);
			console.log( 'rightPartOfString: ' + rightPartOfString)
			//собираем левую и правую часть строки и между ними вставляем результат расчета
			string = (leftPartOfString.concat(calculateString)).concat(rightPartOfString);
			//сборка строки ----конец----
			console.log(string);
			return iteration(string);
		}else{
			//когда скобки кончатся, то рассчитываем конечную строку
			console.log('нет больше скобок!');
			console.log(string);
			let endResult = calculateOperations(string);
			if ( endResult[0] === '+' ) {
				endResult.splice(0, 1);
				return endResult;
			}else{
			return endResult;
			}
		}
	}else{
		console.log('нету строки!');
	}
}
// функция проверки: последний символ - знак операции?
let isLastIndexOperationSymbol = function(symbol) {
	if ( big_screen.textContent.lastIndexOf(symbol) === big_screen.textContent.length-1 ) {
		return true;
	}else{
		return false;
	}
}
//---------тест в консоли начало--------
//тестовый запуск
  // console.log(iteration(stringTest));

//console.log(calculateAdditionAndSubtraction(stringTest))




//-------------тест в консоли конец----------

//слушатели событий
multiply.onclick = function() {
	if ( isLastIndexOperationSymbol('*') === false ) {
	press_button(multiply, '*');
	}
}

equal.onclick = function() {
	//calculate(myString);
	calculate(big_screen.textContent);
}
/*
oneDivideX.onclick=function() {
	console.log("oneDivideX");
}
*/

point.onclick = function() {
	press_button(point, '.');
}

one.onclick = function() {
	press_button(one);
}

two.onclick = function() {
	press_button(two);
}

three.onclick = function() {
	press_button(three);
}

four.onclick = function() {
	press_button(four);
}

five.onclick = function() {
	press_button(five);
}

six.onclick = function() {
	press_button(six);
}

seven.onclick = function() {
	press_button(seven);
}

eight.onclick= function() {
	press_button(eight);
}

nine.onclick = function() {
	press_button(nine);
}

zero.onclick = function() {
	press_button(zero);
}

c.onclick = function() {
	cancel(big_screen);
	cancel_small_screen(small_screen);
}

remove.onclick = function() {
	erase(big_screen);
}
