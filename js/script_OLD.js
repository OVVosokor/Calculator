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

let operation = ''; 
let first_part = '';
let operation_part = '';
let second_part = '';
let equalResult = 0;
// функция для ловли ошибок
let error = function(theObject) {
	return console.log(theObject);
}

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
	operation = ''; 
    first_part = '';
    operation_part = '';
	second_part = '';
}

// функция сброса маленького экрана
function cancel_small_screen(theObject) {
	theObject.textContent = '';
	operation = ''; 
    first_part = '';
    operation_part = '';
	second_part = '';
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
let myString = '1-2-(2-8*2)+4';
let stringForDo = myString.split('');





//расчет умножений
let calculateMultiplicationAndDivision = function(string) {
	//вначале ищем * или / и расчитываем
		//блок поиска индексов * ---начало---
		let beginIndex;
		let lastIndex;
		let symbolIndex;
		//console.log(string);
		//console.log(isOperandMultyplyDivisionLast(string));
	if ( isOperandMultyplyDivisionLast(string) === false || isOperandMultyplyDivisionLast(string) === undefined ) {
		//console.log( 'flag = false: ' + isOperandMultyplyDivisionLast(string))
		//если * или / НЕ последний начало
		// поиск первого *
		for ( let i = 0; symbolIndex == undefined; i++) {
			if ( ( string[i] === '*' || string[i] === '/' ) && symbolIndex === undefined) {
				symbolIndex = i;
				//error( 'symbolIndex ' + symbolIndex);
			}
		}
		//error(lastIndex)
		//поиск следующего *
		for ( let i = symbolIndex + 1; lastIndex == undefined; i++) {
			if ( ( string[i] === '*' || string[i] === '/' || string[i] === '+' || string[i] === '-' ) && lastIndex === undefined) {
				lastIndex = i;
				//error( 'lastIndex ' + lastIndex);
			}
		}
		//поиск предыдущего оператора * / - + 
		for ( let i = symbolIndex - 1; beginIndex == undefined; i--) {
			if ( ( string[i] === '*' || string[i] === '/' || string[i] === '+' || string[i] === '-' ) && beginIndex === undefined) {
				beginIndex = i;
				//error( 'beginIndex ' + beginIndex);
			}
		}
			//если * или / НЕ последний конец
			//блок поиска индексов * ---конец---
		//---массив для расчета ----
		let changingStrings = string.slice(beginIndex + 1, lastIndex);
		let firstOperand;
		let secondOperand;

		//ищем индекс * или /
		if ( changingStrings.includes('*') ) {
			symbolIndex = changingStrings.indexOf('*');
			firstOperand = changingStrings.slice(0, symbolIndex).join('');
			secondOperand = changingStrings.slice(symbolIndex + 1).join('');
		//error( '*symbolIndex ' + symbolIndex);
		error('*firstOperand ' + firstOperand);
		error('*secondOperand ' + secondOperand);
			let result = Number(firstOperand) * Number(secondOperand);
		//console.log(result)
			string.splice(beginIndex + 1, ((lastIndex - beginIndex) - 1), result)
		}
		if ( changingStrings.includes('/') ) {
			symbolIndex = changingStrings.indexOf('/');
			firstOperand = changingStrings.slice(0, symbolIndex).join('');
			secondOperand = changingStrings.slice(symbolIndex + 1).join('');
		//error( '/symbolIndex ' + symbolIndex);
		error('/firstOperand ' + firstOperand);
		error('/secondOperand ' + secondOperand);
			let result = Number(firstOperand) / Number(secondOperand);

			string.splice(beginIndex + 1, ((lastIndex - beginIndex) - 1), result)

		}
		//error(changingStrings)
		//error(string)
	
	//-----

	}else{
		//console.log( 'flag = true: ' + isOperandMultyplyDivisionLast(string))

		
		//если * или / последний
		//последний шаг расчета
		for ( let i = 0; symbolIndex == undefined; i++) {
			if ( ( string[i] === '*' || string[i] === '/' ) && symbolIndex === undefined) {
				symbolIndex = i;
				//error( 'symbolIndex ' + symbolIndex);
			}
		}
		//поиск следующего * или /
		lastIndex = string.length ;
		//error( 'lastIndex ' + lastIndex);
		//поиск предыдущего оператора * / - + 
		for ( let i = symbolIndex - 1; beginIndex == undefined; i--) {
			if ( ( string[i] === '*' || string[i] === '/' || string[i] === '+' || string[i] === '-' ) && beginIndex === undefined) {
				beginIndex = i;
				//error( 'beginIndex ' + beginIndex);
			}
		}
		//блок поиска индексов * /  ---конец---
		let changingStrings = string.slice(beginIndex + 1, lastIndex);
		let firstOperand;
		let secondOperand;

		//ищем индекс * или /
		if ( changingStrings.includes('*') ) {
			symbolIndex = changingStrings.indexOf('*');
			firstOperand = changingStrings.slice(0, symbolIndex).join('');
			secondOperand = changingStrings.slice(symbolIndex + 1).join('');
		//error( '*symbolIndex ' + symbolIndex);
		error('246 *firstOperand ' + firstOperand);
		error('247 *secondOperand ' + secondOperand);
			let result = Number(firstOperand) * Number(secondOperand);
		//console.log(result)
			string.splice(beginIndex + 1, ((lastIndex - beginIndex) - 1), result)
		}
		if ( changingStrings.includes('/') ) {
			symbolIndex = changingStrings.indexOf('/');
			firstOperand = changingStrings.slice(0, symbolIndex).join('');
			secondOperand = changingStrings.slice(symbolIndex + 1).join('');
		//error( '/symbolIndex ' + symbolIndex);
		//error('/firstOperand ' + firstOperand);
		//error('/secondOperand ' + secondOperand);
			let result = Number(firstOperand) / Number(secondOperand);

			string.splice(beginIndex + 1, ((lastIndex - beginIndex) - 1), result)

		}

		error(changingStrings)
		//error(string)

	}
	


	if( string.includes('*') || string.includes('/') ) {
		console.log(string);

		return calculateMultiplicationAndDivision(string);
	}else{
		console.log(string);

		return string;
	}
}

// функция расчета в скобках
let calculateBrackets = function(string) {
		//повторять / делать или нет
	if ( string.includes('(') || string.includes(')') ) {

		//блок поиска индексов скобок ---начало---
		let beginIndex;
		let lastIndex;
		//console.log(string);

		for ( let i = 0; lastIndex == undefined; i++) {
			if(string[i] === '(' )  {
				beginIndex = i;
				//error(beginIndex);
			}
			if(string[i] === ')' && lastIndex === undefined) {
				lastIndex = string.indexOf(string[i]);
				//error(lastIndex);
			}
		}
		//блок поиска индексов скобок ---конец---

		let changingStrings = string.slice(beginIndex + 1, lastIndex);
		let firstOperand;
		let secondOperand;
		//error(changingStrings)
		console.log(changingStrings)

		//console.log(changingStrings.includes('-'));
		//console.log(changingStrings.includes('*'));
		//console.log(changingStrings.includes('/'));

		//если есть только * или / 
		if ( (changingStrings.includes('*') || changingStrings.includes('/')) && !(changingStrings.includes('-') || changingStrings.includes('+') ) ) {
			//console.log('есть * или / и нет - и + : ' + changingStrings);
					//если операнды умножения или деления
			//if ( changingStrings.includes('*') || changingStrings.includes('/') ) {
			//let changingStrings = string.slice(beginIndex + 1, lastIndex);
			//let firstOperand;
			//let secondOperand;
		
			//ищем индекс * или /
			if ( changingStrings.includes('*') ) {
				symbolIndex = changingStrings.indexOf('*');
				firstOperand = changingStrings.slice(0, symbolIndex).join('');
				secondOperand = changingStrings.slice(symbolIndex + 1).join('');
			//error( 'symbolIndex ' + symbolIndex);
			//error('firstOperand ' + firstOperand);
			//error('secondOperand ' + secondOperand);
				let result = Number(firstOperand) * Number(secondOperand);
				string.splice(beginIndex  , ((lastIndex - beginIndex) +1), result);
			}
			if ( changingStrings.includes('/') ) {
				symbolIndex = changingStrings.indexOf('/');
				firstOperand = changingStrings.slice(0, symbolIndex).join('');
				secondOperand = changingStrings.slice(symbolIndex + 1).join('');
			error( 'symbolIndex ' + symbolIndex);
			error('firstOperand ' + firstOperand);
			error('secondOperand ' + secondOperand);
				let result = Number(firstOperand) / Number(secondOperand);
				string.splice(beginIndex , ((lastIndex - beginIndex) + 1), result);
			}
			//console.log(string);
			//}
		}
		//else{
		//если содержит только + или -
		if ( !(changingStrings.includes('*') || changingStrings.includes('/')) && (changingStrings.includes('-') || changingStrings.includes('+') ) ) {
			console.log('есть только - или + : ' + changingStrings);


			//if ( changingStrings.includes('-') && (!changingStrings.includes('*') || !changingStrings.includes('/') )) {
				if ( changingStrings.includes('-') ) {
					//если - первый символ и больше нет его

						
					if ( ((changingStrings.indexOf('-') === 0) && ( changingStrings.indexOf('-', 1) < 0 && changingStrings.indexOf('+') < 0 && changingStrings.indexOf('*') < 0 && changingStrings.indexOf('/') < 0 ) ) ) {

						firstOperand = changingStrings.join('')
						secondOperand = 0;

						let result = Number(firstOperand);
						console.log(result)

						//error(result);
						string.splice(beginIndex, ((lastIndex - beginIndex) + 1), result );
						console.log(string)

						}else{
								let indexSymbol = changingStrings.indexOf('-',1);
								//error(indexSymbol)
								firstOperand = changingStrings.slice(0, indexSymbol).join('');
								secondOperand = changingStrings.slice(indexSymbol + 1).join('');

								//проверить условие!!!
								/*
								if ( changingStrings[indexSymbol] === '-' ) {
									//changingStrings[changingStrings.length-1] = changingStrings[changingStrings.length-1] ; //* - 1
									if ( changingStrings[changingStrings.length-1] < 0 ) {
									changingStrings.splice(indexSymbol,1);
									}
									//changingStrings[indexSymbol] = '-';
									secondOperand = changingStrings.slice(indexSymbol).join('');

									}
								*/
									error('368 firstOperand ' + firstOperand)
									error('369 secondOperand ' + secondOperand)
									//проблема в минусе если один из операторов число
									console.log(secondOperand)

									let result = Number(firstOperand) - Number(secondOperand);
									//error(result);
									string.splice(beginIndex, ((lastIndex - beginIndex) + 1), result );

							}
					}
					/*
					else{
						firstOperand = changingStrings.join('')
						secondOperand = 0;
					}
					*/
				if ( changingStrings.includes('+') ) {
					let indexSymbol = changingStrings.indexOf('+');
					firstOperand = changingStrings.slice(0, indexSymbol).join('');
					secondOperand = changingStrings.slice(indexSymbol + 1).join('');

					/*
					if ( changingStrings[indexSymbol] === '+' ) {
						//changingStrings[changingStrings.length-1] = changingStrings[changingStrings.length-1] ; // * -1
						changingStrings.splice(indexSymbol,1)
						//changingStrings[indexSymbol] = '+';
						secondOperand = changingStrings.slice(indexSymbol).join('');
						}
					*/
						error('392 firstOperand ' + firstOperand)
						error('393 secondOperand ' + secondOperand)
						let result = Number(firstOperand) + Number(secondOperand);
						error(result);
						string.splice(beginIndex, ((lastIndex - beginIndex) + 1), result );


				}
				console.log(string);
			//}
		}

		//}
		//если есть и * или / и -
		if (changingStrings.includes('-') && (changingStrings.includes('/') || changingStrings.includes('*'))) {
			console.log('есть и * или / и -')
			console.log(changingStrings)
			
					//ищем индекс * или /
			if ( changingStrings.includes('*') ) {
				symbolIndex = changingStrings.indexOf('*');
				firstOperand = changingStrings.slice(0, symbolIndex).join('');
				secondOperand = changingStrings.slice(symbolIndex + 1).join('');
			error( '451 symbolIndex ' + symbolIndex);
			error('452 firstOperand ' + firstOperand);
			error('453 secondOperand ' + secondOperand);
				let result = Number(firstOperand) * Number(secondOperand);
				string.splice(beginIndex  , ((lastIndex - beginIndex) +1), result);
			}
			if ( changingStrings.includes('/') ) {
				symbolIndex = changingStrings.indexOf('/');
				firstOperand = changingStrings.slice(0, symbolIndex).join('');
				secondOperand = changingStrings.slice(symbolIndex + 1).join('');
			error( '461 symbolIndex ' + symbolIndex);
			error('461 firstOperand ' + firstOperand);
			error('461 secondOperand ' + secondOperand);
				let result = Number(firstOperand) / Number(secondOperand);
				string.splice(beginIndex , ((lastIndex - beginIndex) + 1), result);
			}
		}else{
			//если нет  никаких + - * /
			if ( !( changingStrings.includes('-') || changingStrings.includes('+') || changingStrings.includes('*') ||changingStrings.includes('/') )  ) {
				
				firstOperand = changingStrings.join('')
				secondOperand = 0;

				let result = Number(firstOperand);
				console.log(result)

				//error(result);
				string.splice(beginIndex, ((lastIndex - beginIndex) + 1), result );
				//console.log(string)

			}

		}
			console.log(string);

			return calculateBrackets(string);
	}else{
		console.log(string);
	return string;
	}
}

let calculateAdditionAndSubtraction = function(string) {
	let beginIndex;
	let lastIndex;
	let symbolIndex;
	let isSymbolStart;
	
	//проверяем есть ли в начале знак 
	if ( ( string[0] === '-' ) && isSymbolStart === undefined) {
			isSymbolStart = true;
			//error( 'symbolIndex ' + isSymbolStart);
	}
	//если есть то ищем след-й операнд и возвращаем число
	if ( isSymbolStart === true ) {
		for ( let i = 1; lastIndex == undefined; i++) {
			if ( ( string[i] === '-' || string[i] === '+' ) && lastIndex === undefined) {
				lastIndex = i;
				//error( 'lastIndex ' + lastIndex);
			}
		}
		beginIndex = 0;
		let changingStrings = string.slice(beginIndex, lastIndex).join('');
		//error(changingStrings);
		let result = Number(changingStrings);
		string.splice(beginIndex, (lastIndex - beginIndex) , result );
		//error(string)
	}
//--------------------------
	beginIndex = undefined;
	lastIndex = undefined;
	symbolIndex = undefined;
	//последний расчет?
	//console.log(isOperandPlusMinusLast(string))
	if (isOperandPlusMinusLast(string) === false || isOperandPlusMinusLast(string) === undefined) {
		//ищем + или -, затем находим предыдущий и следущий, возвращаем строку для расчета
		// поиск первого + или -
		for ( let i = 0; symbolIndex == undefined; i++) {
			if ( ( string[i] === '+' || string[i] === '-' ) && symbolIndex === undefined) {
				symbolIndex = i;
				//error( 'symbolIndex ' + symbolIndex);
			}
		}
		//error(lastIndex)
		//поиск следующего + или -
			for ( let i = symbolIndex + 1; lastIndex == undefined ; i++) {
				if ( ( string[i] === '+' || string[i] === '-' ) && lastIndex === undefined) {
					lastIndex = i;
					//error( 'lastIndex ' + lastIndex);
				}
			}
		//поиск предыдущего оператора - + 
		beginIndex = 0;
			//error( 'beginIndex ' + beginIndex);
		//блок поиска индексов + - ---конец---
		//если первый элемент ЧИСЛО или НЕ ЧИСЛО, то выполняем условие
		if ( typeof string[beginIndex] === 'number' || typeof string[beginIndex] !== 'number' ) {
			let changingStrings = string.slice(beginIndex, lastIndex);
			let firstOperand;
			let secondOperand;
		
			if ( changingStrings.includes('+') ) {
				symbolIndex = changingStrings.indexOf('+');
				firstOperand = changingStrings.slice(0, symbolIndex).join('');
				secondOperand = changingStrings.slice(symbolIndex + 1).join('');
			//error( 'symbolIndex ' + symbolIndex);
			//error('firstOperand ' + firstOperand);
			//error('secondOperand ' + secondOperand);
				let result = Number(firstOperand) + Number(secondOperand);
				//error(string)
					//нужна проверка: один ли операнд остался
		//if (flag !== true) {
			string.splice(beginIndex , ((lastIndex - beginIndex) ), result)

		//}

			}

			if ( changingStrings.includes('-') ) {
				symbolIndex = changingStrings.indexOf('-');
				firstOperand = changingStrings.slice(0, symbolIndex).join('');
				secondOperand = changingStrings.slice(symbolIndex + 1).join('');
			//error( 'symbolIndex ' + symbolIndex);
			//error('firstOperand ' + firstOperand);
			//error('secondOperand ' + secondOperand);
				let result = Number(firstOperand) - Number(secondOperand);
				//error(string)
				//error(lastIndex)

				string.splice(beginIndex , ((lastIndex - beginIndex) ), result)
			}
			//error(changingStrings)
		}
		//error('string ' + string)
	}else{
		//последний шаг расчета
		for ( let i = 0; symbolIndex == undefined; i++) {
			if ( ( string[i] === '+' || string[i] === '-' ) && symbolIndex === undefined) {
				symbolIndex = i;
				//error( 'symbolIndex ' + symbolIndex);
			}
		}
		//поиск следующего + или -
		lastIndex = string.length  ;
		//error( 'lastIndex ' + lastIndex);
		//поиск предыдущего оператора - + 
		beginIndex = 0;
			//error( 'beginIndex ' + beginIndex);
		//блок поиска индексов + - ---конец---
		//если первый элемент ЧИСЛО или НЕ ЧИСЛО, то выполняем условие
		if ( typeof string[beginIndex] === 'number' || typeof string[beginIndex] !== 'number' ) {
			let changingStrings = string.slice(beginIndex, lastIndex);
			let firstOperand;
			let secondOperand;
		
			if ( changingStrings.includes('+') ) {
				symbolIndex = changingStrings.indexOf('+');
				firstOperand = changingStrings.slice(0, symbolIndex).join('');
				secondOperand = changingStrings.slice(symbolIndex + 1).join('');
			//error( 'symbolIndex ' + symbolIndex);
			//error('firstOperand ' + firstOperand);
			//error('secondOperand ' + secondOperand);
				let result = Number(firstOperand) + Number(secondOperand);
				//error(string)
					//нужна проверка: один ли операнд остался
			//if (flag !== true) {
			string.splice(beginIndex , ((lastIndex - beginIndex) ), result)

			//}

			}

			if ( changingStrings.includes('-') ) {
				symbolIndex = changingStrings.indexOf('-');
				firstOperand = changingStrings.slice(0, symbolIndex).join('');
				secondOperand = changingStrings.slice(symbolIndex + 1).join('');
			//error( 'symbolIndex ' + symbolIndex);
			//error('firstOperand ' + firstOperand);
			//error('secondOperand ' + secondOperand);
				let result = Number(firstOperand) - Number(secondOperand);
				//error(string)
				//error(lastIndex)

				string.splice(beginIndex , ((lastIndex - beginIndex) ), result)
			}
			//error(changingStrings)
		}




	}
	//console.log('isOperandPlusMinusLast: ' + isOperandPlusMinusLast( string));

	if ( string.includes('-') || string.includes('+') ) {
		console.log(string)

	return calculateAdditionAndSubtraction(string);
	}else{

		console.log(string)

	return string;
	}
	

}

//тестовый расчет
let resultBrackets = calculateBrackets(stringForDo)
//let resultMultyDivision = calculateMultiplicationAndDivision(resultBrackets);
let resultingCalc = calculateAdditionAndSubtraction(resultBrackets);
console.log('Результат: ' + resultingCalc)





//функция расчета
function calculate(theStringToCalculate) {
	let resultBrackets = 0;
	let resultMultyDivision = 0;
	let resultingCalc = 0;

	//console.log(theStringToCalculate);

	let stringForDo = theStringToCalculate.split('');
	console.log(stringForDo)

	small_screen.textContent = theStringToCalculate;
	console.log(small_screen.textContent)
	
	//блок вычислений
	//расчет скобок
	if ( stringForDo.includes('(') || stringForDo.includes(')') ) {
		resultBrackets = calculateBrackets(stringForDo);
	}
		//расчет умножений и/или  делений
		resultMultyDivision = calculateMultiplicationAndDivision(resultBrackets);
		//расчет сложений и/или вычитаний
		resultingCalc = calculateAdditionAndSubtraction(resultMultyDivision);
		//error(theStringToCalculate);
	big_screen.textContent = resultingCalc;

	return resultingCalc;
}
// функция проверки: последний символ - знак операции?
let isLastIndexOperationSymbol = function(symbol) {
	if ( big_screen.textContent.lastIndexOf(symbol) === big_screen.textContent.length-1 ) {
		return true;
	}else{
		return false;
	}
}
//слушатели событий
multiply.onclick = function() {
	if ( isLastIndexOperationSymbol('*') === false ) {
	press_button(multiply, '*');
	}
}

equal.onclick = function() {
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
/*
let str = '2044';
let changStr = str.split('');
console.log(changStr);
console.log( '* : ' + changStr.includes('*'));
console.log( '/ : ' + changStr.includes('/'));
console.log( '- : ' + changStr.includes('-'));
console.log( '+ : ' + changStr.includes('+'));
if ((changStr.includes('-') || changStr.includes('+') ) && !(changStr.includes('*') || changStr.includes('/') )) {
	//console.log(!changStr.includes('-') && (changStr.includes('*') || changStr.includes('/')))
	console.log('true!!')
}else{
	console.log('false!!!')
}

console.log('first -: ' + changStr.indexOf('-') )
console.log('last -: ' + changStr.lastIndexOf('-') )
//console.log(( changStr.indexOf('-') === 0 && (changStr.lastIndexOf('-')   === changStr.indexOf('-') === 0 )))

if ( ((changStr.indexOf('-') === 0) && ( changStr.indexOf('-', 1) < 0 && changStr.indexOf('+') < 0 && changStr.indexOf('*') < 0 && changStr.indexOf('/') < 0 ) 
|| !( changStr.includes('-') || changStr.includes('+') || changStr.includes('*') ||changStr.includes('/') ) ) ) {
	console.log('true!: ' + changStr.indexOf('-'))
}else{
	console.log('false!: ' + changStr.indexOf('-'))
}
/*
//--------------первый вариант реализации--НАЧАЛО----------

function operation_multiply(theObject) {
	press_button(multiply);

}

multiply.onclick = function() {
	let str_big_screen = big_screen.textContent;
	let str_small_screen = small_screen.textContent;

	if (str_big_screen.indexOf('*') < 0 && (str_small_screen.indexOf('*') < 0)) {
	operation_multiply(multiply);
	chose_first_part(big_screen, small_screen);
	
	operation_part = '*';

	}
	//console.log(first_part);
}
//функция задания первого слагаемого
function chose_first_part(theObject, theObject_2) {
	 if (first_part == '')	{first_part = theObject.textContent; //текст из бигскрина в переменную first_part
	theObject.textContent = '0';
	theObject_2.textContent = first_part;
	}
}
//функция задания второго слагаемого
function chose_second_part(theObject) {       
	second_part = theObject.textContent;
}

function calculate(theFirstPart, theSecondPart) {
	if (operation_part == '*') {
		console.log(theFirstPart);
		console.log(theSecondPart);
		result = Number(theFirstPart.slice(0,-1)) * Number(theSecondPart);
	return result;
	}
}

equal.onclick = function() {
	second_part = big_screen.textContent;
	small_screen.textContent += big_screen.textContent;
	calculate(first_part, second_part);
	big_screen.textContent = result;
}

//--------------первый вариант реализации--КОНЕЦ----------
let calculateBrackets = function(string) {
	let splits = string.split('');
	let beginIndex;
	let lastIndex;
	console.log(splits);

	for ( let i = 0; lastIndex == undefined; i++) {
		if(splits[i] === '(' )  {
			//error('first ' + splits.indexOf('('))
			beginIndex = i;
			//error(beginIndex);
		}
		if(splits[i] === ')' && lastIndex === undefined) {
			lastIndex = splits.indexOf(splits[i]);
			//error(lastIndex);
		}
	}

	let changingStrings = splits.slice(beginIndex + 1, lastIndex);
	let firstOperand;
	let secondOperand;
	if ( changingStrings.includes('-') ) {
		let indexSymbol = changingStrings.indexOf('-');
		firstOperand = changingStrings.slice(0, indexSymbol).join('');
		secondOperand = changingStrings.slice(indexSymbol).join('');
	}else{
		let indexSymbol = changingStrings.indexOf('+');
		firstOperand = changingStrings.slice(0, indexSymbol).join('');
		secondOperand = changingStrings.slice(indexSymbol).join('');
	}
	let result = Number(firstOperand) + Number(secondOperand);
	error(result);
	splits.splice(beginIndex, ((lastIndex - beginIndex) + 1), result );
	console.log(splits);

	return splits;

}
*/
/*
// функция расчета в скобках
let calculateBrackets = function(string) {
	//блок поиска индексов скобок ---начало---
	let beginIndex;
	let lastIndex;
	//console.log(string);

	for ( let i = 0; lastIndex == undefined; i++) {
		if(string[i] === '(' )  {
			beginIndex = i;
			//error(beginIndex);
		}
		if(string[i] === ')' && lastIndex === undefined) {
			lastIndex = string.indexOf(string[i]);
			//error(lastIndex);
		}
	}
	//блок поиска индексов скобок ---конец---
	let changingStrings = string.slice(beginIndex + 1, lastIndex);
	let firstOperand;
	let secondOperand;
	//error(changingStrings)
	//console.log(changingStrings.includes('-'));
	//console.log(changingStrings.includes('*'));
	//console.log(changingStrings.includes('/'));
	
	//если есть * или / и нету -
	if ( (changingStrings.includes('*') || changingStrings.includes('/')) && !changingStrings.includes('-') ) {
		console.log('есть * или / и нет - : ' + changingStrings);
				//если операнды умножения или деления
		if ( changingStrings.includes('*') || changingStrings.includes('/') ) {
		//let changingStrings = string.slice(beginIndex + 1, lastIndex);
		//let firstOperand;
		//let secondOperand;
	
		//ищем индекс * или /
		if ( changingStrings.includes('*') ) {
			symbolIndex = changingStrings.indexOf('*');
			firstOperand = changingStrings.slice(0, symbolIndex).join('');
			secondOperand = changingStrings.slice(symbolIndex + 1).join('');
		//error( 'symbolIndex ' + symbolIndex);
		//error('firstOperand ' + firstOperand);
		//error('secondOperand ' + secondOperand);
			let result = Number(firstOperand) * Number(secondOperand);
			string.splice(beginIndex  , ((lastIndex - beginIndex) +1), result);
		}
		if ( changingStrings.includes('/') ) {
			symbolIndex = changingStrings.indexOf('/');
			firstOperand = changingStrings.slice(0, symbolIndex).join('');
			secondOperand = changingStrings.slice(symbolIndex + 1).join('');
		error( 'symbolIndex ' + symbolIndex);
		error('firstOperand ' + firstOperand);
		error('secondOperand ' + secondOperand);
			let result = Number(firstOperand) / Number(secondOperand);
			string.splice(beginIndex , ((lastIndex - beginIndex) + 1), result);
			
		}
		//console.log(string);
		}
	//если содержит + или -
	}else{
		if ( changingStrings.includes('-') || changingStrings.includes('+')) {
			console.log('есть -: ' + changingStrings);
			console.log( '/: ' + changingStrings.includes('/'));

			console.log(' sum: ' + changingStrings.includes('-') && (changingStrings.includes('*') || changingStrings.includes('/') ));

			if ( changingStrings.includes('-') && (!changingStrings.includes('*') || !changingStrings.includes('/') )) {
				console.log('ccccc')
				if ( changingStrings.includes('-') ) {
					if ( changingStrings.indexOf('-') === 0 && changingStrings.indexOf('-',1) < 0 ) {
						firstOperand = changingStrings.join('')
						secondOperand = 0;
					}else{
							let indexSymbol = changingStrings.indexOf('-',1);
							//error(indexSymbol)
							firstOperand = changingStrings.slice(0, indexSymbol).join('');
							//проверить условие!!!
							if ( changingStrings[indexSymbol] === '-' ) {
								//changingStrings[changingStrings.length-1] = changingStrings[changingStrings.length-1] ; //* - 1
								if ( changingStrings[changingStrings.length-1] < 0 ) {
								changingStrings.splice(indexSymbol,1)
								}
								//changingStrings[indexSymbol] = '-';
								secondOperand = changingStrings.slice(indexSymbol).join('');
								}
								error('368 firstOperand ' + firstOperand)
								error('369 secondOperand ' + secondOperand)
					
						}
					}else{
						firstOperand = changingStrings.join('')
						secondOperand = 0;
					}
				if ( changingStrings.includes('+') ) {
					let indexSymbol = changingStrings.indexOf('+');
					firstOperand = changingStrings.slice(0, indexSymbol).join('');
					if ( changingStrings[indexSymbol] === '+' ) {
						//changingStrings[changingStrings.length-1] = changingStrings[changingStrings.length-1] ; // * -1
						changingStrings.splice(indexSymbol,1)
						//changingStrings[indexSymbol] = '+';
						secondOperand = changingStrings.slice(indexSymbol).join('');
						}
						error('firstOperand ' + firstOperand)
						error('secondOperand ' + secondOperand)
				}
				let result = Number(firstOperand) + Number(secondOperand);
				error(result);
				string.splice(beginIndex, ((lastIndex - beginIndex) + 1), result );
				console.log(string);
			}else{
				//если есть и * или / и -
				if (changingStrings.includes('-') && (changingStrings.includes('/') || changingStrings.includes('*'))) {
					console.log('- / * есть')
				}
			}
		}
	}
	if ( string.includes('(') || string.includes(')') ) {
		console.log(string);

		return calculateBrackets(string);
	}else{
		console.log(string);
	return string;
	}
}

*/