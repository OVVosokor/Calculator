//элемент большой экран ввода и вывода результата
const BIG_SCREEN = document.querySelector('.screen--big');
//элемент маленький экран вывода истории ввода на большом экране
const SMALL_SCREEN = document.querySelector('.screen--small');
// кнопка СЕ
const CE = document.querySelector('.CE');
//кнопка С
const CANCEL = document.querySelector('.cancel');
//кнопки чисел
const ONE = document.querySelector('.one');
const TWO = document.querySelector('.two');
const THREE = document.querySelector('.three');
const FOUR = document.querySelector('.four');
const FIVE = document.querySelector('.five');
const SIX = document.querySelector('.six');
const SEVEN = document.querySelector('.seven');
const EIGHT = document.querySelector('.eight');
const NINE = document.querySelector('.nine');
const REMOVE = document.querySelector('.remove');
const ZERO = document.querySelector('.zero');
//кнопка точки
const POINT = document.querySelector('.point');
//кнопка равно
const EQUAL = document.querySelector('.equal');
//кнопка умножения
const MULTIPLY = document.querySelector('.multiply');
//кнопка деления
const DIVISION = document.querySelector('.divide');
//кнопка сложения
const ADDITION = document.querySelector('.addition');
//кнопка вычитания
const SUBTRACTION =  document.querySelector('.subtraction');
//кнопка Х в квадрате
const TWOSQUARED = document.querySelector('.two-squared');
//кнопка один делить на Х
const ONE_DIVIDE_X = document.querySelector('.one-divide-x');
//кнопка квадратного корня
const SQUAREROOT = document.querySelector('.square-root');
//кнопка процентов
const PERCENT = document.querySelector('.percent');
//кнопка минус/плюс
const NEGATE = document.querySelector('.negate');
//кнопка скобка левая
const BRACKETS_LEFT = document.querySelector('.bracket-left');
//кнопка скобка левая
const BRACKETS_RIGHT = document.querySelector('.bracket-right');
//кнопки переключения точности
const ONE_DIGIT_PRECISION = document.getElementById('oneDigitPrecision');
const TWO_DIGIT_PRECISION = document.getElementById('twoDigitPrecision');
const THREE_DIGIT_PRECISION = document.getElementById('threeDigitPrecision');
const FOUR_DIGIT_PRECISION = document.getElementById('fourDigitPrecision');
//индикатор переполнения ввода/вывода
const OVERFLOW_INDICATOR = document.querySelector('.screen--big__indicate');

// переменная наличия установки Negate и индекс её
let isNegate = false;
let indexNegate;
let digitPrecision = 1;
let overflowIndicator = false;
let digitOfScreen = 21; //количество разрядов на экране 
/*------------БЛОК TOGGLEBUTTON----начало--------*/

ONE_DIGIT_PRECISION.onclick = function() {
	toggleRadio(this)
}
TWO_DIGIT_PRECISION.onclick = function() {
	toggleRadio(this)
}
THREE_DIGIT_PRECISION.onclick = function() {
	toggleRadio(this)
}
FOUR_DIGIT_PRECISION.onclick = function() {
	toggleRadio(this)
}

//функция переключения радио-кнопки
let toggleRadio = function( theObject ) {
	if ( theObject ) {
		if ( theObject.checked ) {
			digitPrecision = theObject.value;
			console.log( 'digitPrecision: ' + digitPrecision )
		}
	}else{
		console.log( 'неверный элемент' )
	}
}

/*------------БЛОК TOGGLEBUTTON----конец--------*/

//функция: если ли скобки
let isThereBrackets = function(string) {
	if ( string.indexOf('(') > 0 || string.indexOf(')') > 0 ) {
		return true;
	}else{
		return false;
	}
}

// функция проверки: последний символ - знак операции?
let isLastIndexOperationSymbol = function( symbol ) {
	if ( BIG_SCREEN.textContent.lastIndexOf( symbol ) === BIG_SCREEN.textContent.length - 1 ) {
		return true;
	}else{
		return false;
	}
}

//функция проверки: один ли операнд + или - (последний или нет)
let isOperandPlusMinusLast = function(string) {
	if ( string.includes('+') === true &&  string.includes('-') === false) {
		if ( string.indexOf('+') === string.lastIndexOf('+')) {
			//console.log( string + ' + the one ' + string.indexOf('+') + ' -- ' + string.lastIndexOf('+'));
			return true;
		}
	}
	if ( string.includes('-') === true &&  string.includes('+') === false) {
		if ( string.indexOf('-') === string.lastIndexOf('-')) {
			//console.log( string + ' - the one ' + string.indexOf('-') + ' -- ' + string.lastIndexOf('-'));
			return true;
		}
	}else{
		return false;
	}
}

//функция проверки: один ли операнд * или / (последний или нет)
let isOperandMultyplyDivisionLast = function(string) {
	if ( string.includes('*') === true &&  string.includes('/') === false) {
		if (( string.indexOf('*') === string.lastIndexOf('*')) && !( string.lastIndexOf('+') || string.lastIndexOf('-') || string.lastIndexOf('/') ) ) {
			//console.log( string + ' + the one ' + string.indexOf('+') + ' -- ' + string.lastIndexOf('+'));
			return true;
		}
	}
	if ( string.includes('/') === true &&  string.includes('*') === false) {
		if ( (string.indexOf('/') === string.lastIndexOf('/')) && !( string.lastIndexOf('+') || string.lastIndexOf('-') || string.lastIndexOf('*') ) ) {
			//console.log( string + ' - the one ' + string.indexOf('-') + ' -- ' + string.lastIndexOf('-'));
			return true;
		}
	}else{
		return false;
	}
}

//функция проверки переполнения вывода
let isOverflow = function( string ) {
	if ( string ) {
		if ( string.length >= digitOfScreen && overflowIndicator !== true ) {
			console.log( 'overflowIndicator:' + overflowIndicator + ' string.length ' + string.length )
			return overflowIndicator = true;
		}else{
			if ( overflowIndicator === true && string.length < digitOfScreen ) {
			console.log( 'overflowIndicator:' + overflowIndicator + ' string.length ' +  string.length )
			return overflowIndicator = false;
			}
		}
	}else{
		console.log( 'нет аргументов' );
	}
}

//функция включения индикатора
let enableOverflowIndicator = function( theObject ) {
	if ( theObject ) {
		if ( overflowIndicator === true ) {
			theObject.textContent = 'E';
		}else{
			theObject.textContent = '';
		}
	}else{
		console.log( 'нет аргументов' );
	}
}

//функция isOverflow обнуление
let overflowIndicatorToDefault = function() {
	overflowIndicator = false;
	OVERFLOW_INDICATOR.textContent = '';
	console.log( 'OVERFLOW_INDICATOR сброшен' )
}

//функция обрезки строки при выводе расчета большего чем есть разрядов на экране
let sliceString = function( string ) {
	if ( string ) {
		if ( string.length >= digitOfScreen ) {
			return string.substring( 0, digitOfScreen ); //от начала строки до digitOfScreen
		}
	}else{
		console.log( 'нет строки' );
	}
}

//обнуление isNegate и indexNegate если были установлены
let negateToDefault = function() {
	if ( isNegate === true && indexNegate !== undefined ) {
		isNegate = false;
		indexNegate = undefined;
		//console.log( isNegate )
		//console.log( indexNegate )
		console.log( 'Negate сброшен' )
	}
}

// функция сброса
function cancel( theObject ) {
	theObject.textContent = '0';
	negateToDefault() //обнуление isNegate и indexNegate если были установлены
	overflowIndicatorToDefault();
}

// функция сброса маленького экрана
function cancel_small_screen( theObject ) {
	theObject.textContent = '';
}

// функция удаления по-символьно
function erase( theObject ) {
	let string = theObject.textContent;
	//если overflowIndicator включен, то удалить его
	if ( overflowIndicator === true ) {
		overflowIndicator = false;
		enableOverflowIndicator( OVERFLOW_INDICATOR ); //индикатор переполнения
	}

	if ( findLetters( string ) === true ) {
		cancel( theObject );
	}else{
		switch ( isNegate ) {
			case true:
				if ( string.length !== indexNegate + 3 ) {
					console.log( string.length )
					console.log( indexNegate + 3 )
					theObject.textContent = string.slice(0, -1);
					
				}else{
					console.log( 'длина текста = индексу indexNegate + 3' );
					theObject.textContent = string.slice(0, -2);
					isNegate = false;
					indexNegate = undefined;
				}
				break;
			case false:
				if ( string !== '' && string !== '0' && string.length !== 1 ) {
					theObject.textContent = string.slice(0, -1);
					}
				else { BIG_SCREEN.textContent = '0'; }
				break;
		}
	}

}

//функция проверки наличия букв в строке на экране
let findLetters = function( string ) {
	let found;
	if ( string ) {
		let searchLetter = /[a-zа-я]/gi; //поиск всех букв английского и русского алфавита (заглавные и прописные)
		found = string.match(searchLetter);
		console.log(found)
		if ( found !== null ) {
			return true; //true если нашли
		}else{
			return false;
		}
	}else{
		console.log( 'строки нет' );
	}
}

//тестовая часть
//+(-1/2)*(10-(-5554/40))-2*20 -(1-2)
/*
let myString = '-159*8-(-547*788+(14-5425)*-6+894)+8';
   //myString = '5794+(-15*-1546-145*-87-2/20*8)+8974';
   //myString = '-125*-84/-46488';
  // myString = '-154*-46488/2154*21447';
  // myString = '-159*8-(547*788+(14-5425)*-6+894)+(-8)*(-457-35*5)-44518';
    //myString = '-8458+5445--5477+-14879';
	 //myString = '25/5*6';
	myString = '85-4456';


console.log('исходная строка: ' + myString);
let stringTest = myString.split('');
console.log('исходная строка для перебора: ');
console.log(stringTest);
*/

//---------------------------------
//функция изменения числа на отрицательное
let numberToNegate = function( string ) {
	if ( string ) {
		//преобразование строки в массив
		string = toPreparationString( string );
		//console.log( isNegate )
		if ( isNegate !== true ) {
			//выбор последнего символа, кроме + - * /
			let lastSymbol = string[ string.length - 1 ];
			switch ( lastSymbol ) {
				case '*':
				case '/':
				case '-':
				case '+':
					console.log( 'последний символ - знак операции' );

					return string.join('');
				default:
					let negate = {};
					negate = insertNegateToString( string );
					string = negate.string;
					//console.log(negate)
					isNegate = negate.isNegate;
					indexNegate = negate.indexNegate;
					console.log( isNegate )
					console.log( indexNegate )

				return string.join('');
			}
		}else{
			console.log( indexNegate )

			//удаляем установленый Negate
			if ( indexNegate === '0' ) {
				console.log( 'isNegate = true' );
				string.splice( indexNegate , 1 )
				isNegate = false;
				indexNegate = undefined;
	
				return string.join('');
	
			}else{
				console.log( 'isNegate = true' );
				string.splice( indexNegate + 1, 1 )
				isNegate = false;
				indexNegate = undefined;

				return string.join('');
				}
		}
	}else{
		console.log( 'строки нет' );
	}
}

//функция поиска первого с конца знака операции
let findFirstOperationFromEnd = function( string ) {
	if ( string ) {
		let indexOperation;
		for ( let i = string.length - 1; i >= 0; i-- ) {
			switch ( string[i] ) {
				case '-':
					indexOperation = i;
					return indexOperation;
					//break;
				case '+':
					indexOperation = i;
					return indexOperation;
				case '*':
					indexOperation = i;
					return indexOperation;
				case '/':
					indexOperation = i;
					return indexOperation;
			}
			if ( indexOperation !== undefined ) {
				break;
			}
		}
		//console.log( indexOperation );
		return indexOperation = '0';
	}else{
		console.log( 'нет строки' );
	}
}

//функция поиска с конца и вставки индекса знака операции 
let insertNegateToString = function( string ) {
	if ( string ) {
		let indexOperation;
		let firstOperationFromEnd = {};

		indexOperation = findFirstOperationFromEnd( string ); //ищем индекс знака операции
		console.log( indexOperation );
		if ( indexOperation === '0') {
			string.splice( indexOperation + 0, 0, '-' ); //вставляем знак операции в строку
		}else{
			string.splice( indexOperation + 1, 0, '-' ); //вставляем знак операции в строку
		}
		console.log( string );
		//записываем в объект
		firstOperationFromEnd.indexNegate = indexOperation;
		firstOperationFromEnd.isNegate = true;
		firstOperationFromEnd.string = string;
		//выводим из функции
		return firstOperationFromEnd;
	}else{
		console.log( 'нет строки или знака операции' );
	}
}

//функция поиска индекса операнда от начала строки
let findIndexOfOperation = function( string, operation ) {
	let indexOperation;

	if ( operation === '' || !operation ) { return console.log( 'не указан операнд в функции' ); }

	switch ( operation ) {
		case operation:
			if ( string.indexOf( operation ) >= 0 ) {
				if ( string.indexOf('-') === 0 || string.indexOf('+') === 0 ) {
					indexOperation = string.indexOf( operation, 1 );
					console.log( 'indexOperand ' + operation + ' : ' + indexOperation );
					return indexOperation;
	
				}else{
				indexOperation = string.indexOf( operation );
				console.log( 'indexOperand ' + operation + ' : ' + indexOperation );
				return indexOperation;
				}
			}else{
				console.log( 'операнда ' + operation + ' нет: ' );
			}
			break;
		
}
}

//функция поиска следующего операнда
let findNextIndexOfOperation = function( string, indexOperation ) {
	let indexNextOperation;

	if ( indexOperation === '' || !indexOperation ) { return console.log( 'не указан startIndex в функции' );}

	if ( string.includes('+') ||string.includes('-')  || string.includes('/') || string.includes('*') ) {
		//поиск следующего знака операции
		for ( let i = indexOperation + 1; i < string.length ; i++ ) {
			//console.log(string)
			if ( ( string[i] === '+' || string[i] === '-' || string[i] === '*' || string[i] === '/' ) ) {
				if ( ( string[i] === '-' && ( i - indexOperation ) === 1 ) || ( string[i] === '+' && ( i - indexOperation ) === 1 ) ) {
					continue;
				}else{
					console.log( 'indexNextOperand: ' + indexNextOperation )
					indexNextOperation = i - 1;
					break;
				}
			}
			//console.log('indexNextOperand: ' + indexNextOperation)
			indexNextOperation = i;
		}
	//console.log( 'indexNextOperand: ' + indexNextOperation);
	return indexNextOperation;
	}
}

//функция поиска предыдущего операнда
let findPreviousIndexOfOperation = function( string, indexOperation ) {
	let previousIndexOfOperation;

	if ( indexOperation === '' || !indexOperation ) { return console.log( 'не указан startIndex в функции' ); }

	if ( string.includes('+') ||string.includes('-')  || string.includes('/') || string.includes('*') ) {
		//поиск предыдущего + или - * /
		for ( let i = indexOperation - 1; i >= 0 ; i-- ) {
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
let getStringInBrackets = function( string ) {

	if ( string )  {
		if ( string.includes( '(' ) || string.includes( ')' ) ) {
			//блок поиска индексов скобок ---начало---
			let beginIndex;
			let lastIndex;
			//console.log(string);
			for ( let i = 0; lastIndex == undefined; i++ ) {
				if( string[i] === '(' )  {
					beginIndex = i;
					//console.log(beginIndex);
				}
				if( string[i] === ')' && lastIndex === undefined ) {
					lastIndex = string.indexOf( string[i] );
					//console.log(lastIndex);
				}
			}
			//блок поиска индексов скобок ---конец---
			console.log( 'beginIndex: '+ beginIndex + ' ; lastIndex: ' + lastIndex );
			//достаем содержимое скобок
			let changingStrings = string.slice( beginIndex + 1, lastIndex );
			console.log( changingStrings );
			return changingStrings;
		}else{
			console.log( 'исходная строка без изменений: ' + string );
			return string;
		}
	}else{
		console.log( 'нет строки для разбора' )
	}
}

//функция поиска индексов скобок 
let findIndexOfBracket = function( string ) {

	if ( string )  {
		if ( string.includes( '(') || string.includes(')') ) {
			//блок поиска индексов скобок ---начало---
			let beginIndex;
			let lastIndex;
			let indexes = {};
			//console.log(string);

			for ( let i = 0; lastIndex == undefined; i++ ) {
				if( string[i] === '(' )  {
					beginIndex = i;
					//console.log(beginIndex);
				}
				if( string[i] === ')' && lastIndex === undefined ) {
					lastIndex = string.indexOf(string[i]);
					//console.log(lastIndex);
				}
			}
			//блок поиска индексов скобок ---конец---
			console.log( 'beginIndex: '+ beginIndex + ' ; lastIndex: ' + lastIndex );
			indexes.beginIndex = beginIndex; //начало скобок
			indexes.lastIndex = lastIndex; //конец скобок
			console.log( indexes );
			return indexes;
		}else{
			console.log( 'исходная строка без изменений (скобок нет!): ' + string );
			return string;
		}
	}else{
		console.log( 'нет строки для разбора' )
	}
}

//функция подготовки строки для обработки (при выходе из bigScreen)
let toPreparationString = function( string ) {
	return string.split( '' );
}

//функция окончания итераций - возможна не нужна
let isOperationLast = function( string ) {
	//error(string.includes('-'))
	if ( string.includes( '+' ) === true &&  string.includes( '-' ) === false ) {
		if ( string.indexOf( '+' ) === string.lastIndexOf( '+' ) ) {
			//console.log( string + ' + the one ' + string.indexOf('+') + ' -- ' + string.lastIndexOf('+'));
			//console.log('+ ' +string )
			return true;
		}
	}
	if ( string.includes( '-' ) === true &&  string.includes( '+' ) === false ) {
		if ( string.indexOf( '-' ) === string.lastIndexOf( '-' ) ) {
			//console.log( string + ' - the one ' + string.indexOf('-') + ' -- ' + string.lastIndexOf('-'));
			//console.log('- ' +string )
			return true;
		}
	}else{
		return false;
	}
}

//функция поиска индексов
let findIndexes = function( string, operation ) {
	if ( string || operation ) {
		//поиск индексов
		let indexSymbol = findIndexOfOperation( string, operation );
		let beginIndex = findPreviousIndexOfOperation( string, indexSymbol );
		let lastIndex = findNextIndexOfOperation( string, indexSymbol );
		//console.log('indexSymbol: ' + indexSymbol + ' beginIndex: ' + beginIndex + ' lastIndex: ' + lastIndex);
		let indexes = {};
		indexes.indexSymbol = indexSymbol;
		indexes.beginIndex = beginIndex;
		indexes.lastIndex = lastIndex;
		return indexes;
	}else{
		console.log( 'строки или операции нет' );
	}
}

//функция выбора операндов -обходного случая нет
let operandSelection = function( indexes,string ) {
	if ( indexes ) {
		let firstOperand = string.slice( indexes.beginIndex, indexes.indexSymbol ).join('');
		//console.log( firstOperand );
		let secondOperand = string.slice(indexes.indexSymbol + 1, indexes.lastIndex + 1).join('');
		//console.log( secondOperand );
		let operands = {};

		operands.firstOperand = firstOperand;
		operands.secondOperand = secondOperand;

		return operands;
	}else{
		console.log('нет индексов');
	}
}

//функция перемножение/деления
let getMultiplicationAndDivision = function( string, operation ) {
	//поиск индексов
	/*
	let indexSymbol = findIndexOfOperation( string, operation );
	let beginIndex = findPreviousIndexOfOperation( string, indexSymbol );
	let lastIndex = findNextIndexOfOperation( string, indexSymbol );

	console.log( 'indexSymbol: ' + indexSymbol + ' beginIndex: ' + beginIndex + ' lastIndex: ' + lastIndex );
	let firstOperand = string.slice( beginIndex, indexSymbol ).join( '' );
	console.log(firstOperand);
	let secondOperand = string.slice( indexSymbol + 1, lastIndex + 1 ).join( '' );
	console.log( secondOperand );
	*/

	let indexes = findIndexes(string, operation);
	let operands = operandSelection(indexes, string);
	let result = 0;

	if ( operation === '*' ) {
		result = Number( operands.firstOperand ) * Number( operands.secondOperand );
	}else{
		if ( Number( operands.secondOperand ) !== 0 ) {
			result = Number( operands.firstOperand ) / Number( operands.secondOperand );
			}else{
				result = "Can't divide by zero";

				return ( String( result ) ).split( '' );
			}
		}
		result = result.toFixedSpecial( digitPrecision ); //перевод из научного вида с нужным количеством знаков после запятой
		console.log( 'result: ' + result );
	//если result положительное число, то добавляем +
	if ( result >= 0 ) {
		result = ( String( result ) ).split( '' );
		result.splice(0, 0, '+')
	}else{
		result = ( String( result ) ).split( '' );
	}
	console.log( result );
	//console.log(string);
	let leftPartOfString = string.slice( 0, indexes.beginIndex ); //	let leftPartOfString = string.slice(string[0]-1, beginIndex);
	//console.log(leftPartOfString)
	let rightPartOfString = string.slice( indexes.lastIndex + 1, string.length );
	//console.log(rightPartOfString)
	//собираем левую и правую часть строки и между ними вставляем результат расчета
	string = ( leftPartOfString.concat( result ) ).concat( rightPartOfString );
	console.log( string );
	return string;
}

//функция сложения/вычитания
let getAdditionAndSubtraction = function(string, operation) {
	//поиск индексов
	/*
	let indexSymbol = findIndexOfOperation(string, operation);
	let beginIndex = findPreviousIndexOfOperation(string, indexSymbol);
	let lastIndex = findNextIndexOfOperation(string, indexSymbol);
	console.log('indexSymbol: ' + indexSymbol + ' beginIndex: ' + beginIndex + ' lastIndex: ' + lastIndex);

	
	let firstOperand = string.slice(indexes.beginIndex, indexes.indexSymbol).join('');
	console.log(firstOperand);
	let secondOperand = string.slice(indexes.indexSymbol + 1, indexes.lastIndex + 1).join('');
	console.log(secondOperand);
	*/

	let indexes = findIndexes(string, operation);
	let operands = operandSelection(indexes, string);

	let result = 0;

	if ( operation === '+') {
		result = Number(operands.firstOperand) + Number(operands.secondOperand);
	}else{
		result = Number(operands.firstOperand) - Number(operands.secondOperand);
		}
	result = result.toFixedSpecial(digitPrecision); //перевод из научного вида с нужным количеством знаков после запятой
	console.log('result: ' + result);
	//если result положительное число, то добавляем +
	if ( result >= 0 ) {
		result = (String(result)).split('');
		result.splice(0, 0, '+')
	}else{
		result = (String(result)).split('');
	}
	console.log(result);
	//console.log(string);
	let leftPartOfString = string.slice(0, indexes.beginIndex); //	let leftPartOfString = string.slice(string[0]-1, beginIndex);
	//console.log(leftPartOfString)
	let rightPartOfString = string.slice(indexes.lastIndex+1, string.length);
	//console.log(rightPartOfString)
	//собираем левую и правую часть строки и между ними вставляем результат расчета
	string = (leftPartOfString.concat(result)).concat(rightPartOfString);
	console.log(string);
	return string;
}

//функция изменяющая научное отображение числа на обычное
Number.prototype.toFixedSpecial = function(n) {
    let str = this.toFixed(n);
    if (str.indexOf('e+') < 0)
        return str;

    // if number is in scientific notation, pick (b)ase and (p)ower
    return str.replace('.', '').split('e+').reduce(function(p, b) {
        return p + Array(b - p.length + 2).join(0);
    }) + '.' + Array(n + 1).join(0);
	/*
	1e21.toFixedSpecial(2);       // "1000000000000000000000.00"
	2.1e24.toFixedSpecial(0);     // "2100000000000000000000000"
	1234567..toFixedSpecial(1);   // "1234567.0"
	1234567.89.toFixedSpecial(3); // "1234567.890"
	*/
};

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

//функция расчета процента
let calculatePercent = function(string) {
	string = toPreparationString(string);
	//console.log(string)
	let operation;
	let result;

	if ( string.includes('*') ) {
		operation = '*';
	}else if ( string.includes('/') ) {
		operation = '/';
	}else if ( string.includes('-') ) {
		operation = '-';
	}else if ( string.includes('+') ) {
		operation = '+';
	}
	let indexes = findIndexes(string, operation);
	let operands = operandSelection(indexes, string);

	switch (operation) {
		case '*':
			result = Number(operands.firstOperand) * ((Number(operands.secondOperand) / 100));
			//console.log(result);
			return result;
		case '/':
			result = Number(operands.firstOperand) / ((Number(operands.secondOperand) / 100));
			//console.log(result);
			return result;
		case '-':
			result = Number(operands.firstOperand) - Number(operands.firstOperand) * ((Number(operands.secondOperand) / 100));
			//console.log(result);
			return result;
		case '+':
			result = Number(operands.firstOperand) + Number(operands.firstOperand) * ((Number(operands.secondOperand) / 100));
			//console.log(result);
			return result;
		}

}

let calculateSquared = function( number, degree ) {
	return Math.pow( number, degree ).toFixedSpecial( digitPrecision );
}

//функция расчета 1 / х
let calculateOneDivideX = function( number ) {
	return ( 1 / number ).toFixedSpecial( digitPrecision );
}

//функция расчета квадратного корня
let calculateSquareRoot = function(number) {
	return Math.sqrt( number ).toFixedSpecial( digitPrecision );
}

//функция расчета умножения и деления (операнды высшего приоритета)
let calculateMultiplicationAndDivision = function(string) {
	if( string ) {
		if( string.includes('*') || string.includes('/') ) {
			//выбор операнда
			let operation;
			for ( let i = 0; i < string.length; i++ ) {
				if ( string[i] === '/' ) {
					operation = '/';
					console.log(operation);
					break;
				}else if ( string[i] === '*' ) {
					operation = '*';
					console.log(operation);
					break;
				}
			}
			string = getMultiplicationAndDivision(string, operation);
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
		if ( string.includes('+', 1) || string.includes('-', 1) ) { //изменил: было string.includes('+') || string.includes('-')
			//debugger;
			if ( string.includes('+', 1)  ) {
				string = getAdditionAndSubtraction(string, '+')
				console.log(string);
				return string;
			}
			if ( string.includes('-', 1)  ) {
				string = getAdditionAndSubtraction(string, '-')
				console.log(string);
				return string;
			}
		}else{
			//debugger;
			console.log(string);
			return string;
		} 
	}else{
		console.log('нету строки');
	}
	//debugger;	//проблема была при установке доп. минуса к минусу, вылетала сюда
}

//расчет всех операций
let calculateOperations = function( string ) {
	if ( string ) {
		let result = string;
		//если есть деление или умножение
		if ( string.includes('*') || string.includes('/') ) {
			result = calculateMultiplicationAndDivision(getStringInBrackets( string ));
			//console.log(result);
			return calculateOperations( result );
		}else{
				//если есть сложение или деление
			if ( string.includes('-', 1) || string.includes('+', 1) ) {
				result = calculateAdditionAndSubtraction( getStringInBrackets( string ) );
				console.log(result);
				return calculateOperations( result );
			}
				//иначе - когда нет чего расчитывать, надо вычисленную подстроку вставить в изначальную, откуда взяли
				console.log( result );
				return result;
		}
	}else{
		console.log('нету строки!');
	}
}

//функция итерации - вначале умножение/деление, потом сложение/вычитание
let iteration = function(string) {
	console.log(string);

	if ( string ) {
		//если есть скобки, ищем индексы и достаем строку внутри скобок - расчитываем - вставляем в исходную строку результат расчета подстроки - повторяем пока есть скобки
		if ( isThereBrackets( string ) ) {
			let indexes = findIndexOfBracket( string );
			let beginIndex = indexes.beginIndex;
			let lastIndex = indexes.lastIndex;
			let stringForCalculate = getStringInBrackets( string );
			let calculateString = calculateOperations( stringForCalculate );

			console.log( string );
			console.log( string[0] );
			//сборка строки ----начало---- как в getMultiplicationAndDivision и getAdditionAndSubtraction
			let leftPartOfString = string.slice( 0, beginIndex );
			console.log( 'leftPartOfString: ' + leftPartOfString );
			let rightPartOfString = string.slice( lastIndex + 1, string.length );
			console.log( 'rightPartOfString: ' + rightPartOfString);
			//собираем левую и правую часть строки и между ними вставляем результат расчета
			string = ( leftPartOfString.concat( calculateString )).concat( rightPartOfString );
			//сборка строки ----конец----
			console.log( string );
			return iteration( string );
		}else{
			//когда скобки кончатся, то рассчитываем конечную строку
			console.log( 'нет больше скобок!' );
			console.log( string );
			let finalResult = calculateOperations( string );
			if ( finalResult[0] === '+' ) {
				finalResult.splice(0, 1);
				return finalResult;
			}else{
			return finalResult;
			}
		}
	}else{
		console.log( 'нету строки!' );
	}
}

//функция расчета
function calculate(stringFromBigScreen, kindOfOperation) {
	negateToDefault() //обнуление isNegate и indexNegate если были установлены
	let preparedString = toPreparationString( stringFromBigScreen );
	console.log( 'исходная строка для перебора: ' + preparedString );
	let resultingString; 
	if ( kindOfOperation ) {
		switch ( kindOfOperation ) {

			case 'squared':
				resultingString = iteration( preparedString ).join('');
				resultingString = calculateSquared( resultingString, 2 ); //вычисление числа во второй степени
				//перевод в локальный вид строки
				resultingString = stringToLocalString(resultingString);

				//проверяем и если надо устанавливаем знак переполнения
				if ( isOverflow( resultingString ) === true ) {
					console.log( 'isOverflow = true' );
					enableOverflowIndicator( OVERFLOW_INDICATOR ); //индикатор переполнения
					resultingString = sliceString( resultingString );
				}

				SMALL_SCREEN.textContent = 'sqr( ' + stringFromBigScreen + ' )';
				BIG_SCREEN.textContent = resultingString;
				break;

			case 'oneDivideX':
				resultingString = iteration(preparedString).join('');
				resultingString = calculateOneDivideX(resultingString);
				//перевод в локальный вид строки
				resultingString = stringToLocalString(resultingString);

				SMALL_SCREEN.textContent = '1/(' + stringFromBigScreen + ')';
				BIG_SCREEN.textContent = resultingString;
				break;

			case 'square':
				let string = BIG_SCREEN.textContent;
				let lastSymbol = getLastSymbol( string );

				if ( lastSymbol === '*' || lastSymbol === '/' ||  lastSymbol === '-' || lastSymbol === '+' ) {
					console.log( 'последний символ - знак операции' );
					break;
				}else{
					//расчет корня
					resultingString = iteration( preparedString ).join('');
					//квадратный корень из отрицательного числа - невозможен
					if ( resultingString < 0 ) {
						BIG_SCREEN.textContent = 'Неверный ввод';
						break;
					}else{
						
						resultingString = calculateSquareRoot( resultingString );
						//перевод в локальный вид строки
						resultingString = stringToLocalString(resultingString);

						let symbolOfSquare = String.fromCharCode(8730);

						SMALL_SCREEN.textContent = symbolOfSquare + '(' + stringFromBigScreen + ')';
						BIG_SCREEN.textContent = resultingString;
						break;
					}
				}

			case 'percent':
				
				resultingString = calculatePercent( BIG_SCREEN.textContent );
				//console.log( resultingString )

				resultingString = resultingString.toFixedSpecial( digitPrecision );

				SMALL_SCREEN.textContent = stringFromBigScreen + '%';
				BIG_SCREEN.textContent = resultingString;
				break;
		}
	}else{
		resultingString = iteration( preparedString ).join('');
		//проверяем и если надо устанавливаем знак переполнения
		if ( isOverflow( resultingString ) === true ) {
			console.log( 'isOverflow = true' );
			enableOverflowIndicator( OVERFLOW_INDICATOR ); //индикатор переполнения
			resultingString = sliceString( resultingString );
		}
		//перевод в локальный вид строки
		resultingString = stringToLocalString(resultingString);

		SMALL_SCREEN.textContent = stringFromBigScreen;
		BIG_SCREEN.textContent = resultingString;
	}
}

//функция перевода строки в локальный вид
let stringToLocalString = function( string ) {
	string = Number(string);
	return string.toLocaleString();
}

// функция нажатия кнопки
function press_button( theObject, symbol ) {
	let string = BIG_SCREEN.textContent;
	isOverflow( string );
	enableOverflowIndicator( OVERFLOW_INDICATOR );


	if ( overflowIndicator !== true ) {
		//console.log( string );
		if ( symbol === '*' || symbol === '/' || symbol === '+' || symbol === '-' ) {
			negateToDefault(); 	//обнуление isNegate и indexNegate если были установлены
			BIG_SCREEN.textContent += theObject.dataset.operation;
			string = BIG_SCREEN.textContent;


		}else{
			if ( symbol === 'negate' && BIG_SCREEN.textContent !== '0' ) {
				//console.log( string );
				BIG_SCREEN.textContent = numberToNegate( string );
			}else{
				if ( symbol === 'negate' && BIG_SCREEN.textContent === '0' ) {
					console.log('ничего не делаем, хотя можно сделать BIG_SCREEN.textContent=0 ')
				}else{
					//выводим цифры
					BIG_SCREEN.textContent += theObject.dataset.number; 
					string = BIG_SCREEN.textContent;

					if ( string.indexOf('0') === 0 && string.length === 2 ) {
						string = string.slice(1);
						BIG_SCREEN.textContent = string;
					}
				}
			}
		}
		if ( symbol === '.' && !BIG_SCREEN.textContent.includes( symbol ) ) {
			BIG_SCREEN.textContent += theObject.dataset.number;
		}
		
	}else{
		console.log( 'overflowIndicator: ' + overflowIndicator );
	}
}

//функция проверяет закрыты ли все скобки
//как вариант: проверка парности - если норм, то любое действие на вычисление должно работать
let isPairOfBrackets = function( string ) {
	if ( string ) {
		let quantityLeftBracket = 0;
		let quantityRightBracket = 0;

		for ( let i = 0; i < string.length; i++ ) {
			if ( string[i] === '(' ) {
				quantityLeftBracket++;
			}else if ( string[i] === ')' ) {
				quantityRightBracket++
			}
		}
		if ( quantityLeftBracket === quantityRightBracket ) {
			return true;
		}else{
			return false;
		}
	}else{
		console.log( 'строки нет' );
	}
}


//---------тест в консоли начало--------
//тестовый запуск
  // console.log(iteration(stringTest));

//console.log(calculateAdditionAndSubtraction(stringTest))
//console.log(calculateMultiplicationAndDivision(stringTest))
//let number = '14455*67';
//BIG_SCREEN.textContent = number.toLocaleString()
//BIG_SCREEN.textContent = number.toString()

//-------------тест в консоли конец----------

//слушатели событий
NEGATE.onclick = function() {
	press_button(NEGATE, 'negate');
}
PERCENT.onclick = function() {
	calculate(BIG_SCREEN.textContent, 'percent');
}
SQUAREROOT.onclick = function() {
	calculate(BIG_SCREEN.textContent, 'square');
}

ONE_DIVIDE_X.onclick = function() {
	calculate(BIG_SCREEN.textContent, 'oneDivideX');
}

TWOSQUARED.onclick = function() {
	calculate(BIG_SCREEN.textContent, 'squared');
}

SUBTRACTION.onclick = function() {
	if ( isLastIndexOperationSymbol('*') === false && isLastIndexOperationSymbol('/') === false &&
	isLastIndexOperationSymbol('+') === false && isLastIndexOperationSymbol('-') === false ) {
	press_button(SUBTRACTION, '-');
	}
}

ADDITION.onclick = function() {
	if ( isLastIndexOperationSymbol('*') === false && isLastIndexOperationSymbol('/') === false &&
		isLastIndexOperationSymbol('+') === false && isLastIndexOperationSymbol('-') === false ) {
		press_button(ADDITION, '+');
	}
}

DIVISION.onclick = function() {
	if ( isLastIndexOperationSymbol('*') === false && isLastIndexOperationSymbol('/') === false &&
		isLastIndexOperationSymbol('+') === false && isLastIndexOperationSymbol('-') === false ) {
		press_button(DIVISION, '/');
	}
}

MULTIPLY.onclick = function() {
	if ( isLastIndexOperationSymbol('*') === false && isLastIndexOperationSymbol('/') === false &&
		isLastIndexOperationSymbol('+') === false && isLastIndexOperationSymbol('-') === false ) {
		press_button(MULTIPLY, '*');
	}
}

EQUAL.onclick = function() {
	let string = BIG_SCREEN.textContent;
	let lastSymbol = getLastSymbol( string );
	
	if ( isPairOfBrackets( string ) === true ) {
		console.log( 'pair of brackets' );

		switch ( lastSymbol ) {
			case '*':
			case '/':
			case '-':
			case '+':
				console.log( 'последний символ - знак операции' );
				break;
			default:
			calculate( string );
		}
	
	}else{
		console.log( 'скобки не парные' )
	}
}

BRACKETS_LEFT.onclick = function() {
	let string = BIG_SCREEN.textContent;
	let lastSymbol = getLastSymbol( string );

	if ( (string.length === 1 && lastSymbol === '0') || lastSymbol === '(' ) {
		press_button(this, '(');
	}else{

		switch ( lastSymbol ) {
			case '*':
			case '/':
			case '-':
			case '+':
				press_button(this, '(');
				break;
			default:
			console.log( 'последний символ - цифра'  )
		}
	}

}

BRACKETS_RIGHT.onclick = function() { 
	let string = BIG_SCREEN.textContent;
	if ( isPairOfBrackets( string ) !== true ) {
		let lastSymbol = getLastSymbol( string );

		switch ( lastSymbol ) {
			case '*':
			case '/':
			case '-':
			case '+':
				BIG_SCREEN.textContent += '0';
				press_button(this, ')'); 
				break;
			default:
				press_button(this, ')'); 
			break;
		}
	

	}else{
		console.log( 'скобки ( непарной нет' );
	}
}
//получить последний символ строки
let getLastSymbol = function( string ) {
	return string[ string.length - 1 ];
}

POINT.onclick = function() {
	press_button(POINT, '.');
}

ONE.onclick = function() {
	press_button(ONE);
}

TWO.onclick = function() {
	press_button(TWO);
}

THREE.onclick = function() {
	press_button(THREE);
}

FOUR.onclick = function() {
	press_button(FOUR);
}

FIVE.onclick = function() {
	press_button(FIVE);
}

SIX.onclick = function() {
	press_button(SIX);
}

SEVEN.onclick = function() {
	press_button(SEVEN);
}

EIGHT.onclick= function() {
	press_button(EIGHT);
}

NINE.onclick = function() {
	press_button(NINE);
}

ZERO.onclick = function() {
	press_button(ZERO);
}

CANCEL.onclick = function() {
	cancel(BIG_SCREEN);
	cancel_small_screen(SMALL_SCREEN);
}

REMOVE.onclick = function() {
	erase(BIG_SCREEN);
}

