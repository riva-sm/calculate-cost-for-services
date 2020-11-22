// элементы формы
const squareInput = document.querySelector('#square-input');
const squareRange = document.querySelector('#square-range');
const inputs = document.querySelectorAll('input');

// радиокнопки
const typeReconstructionElements = document.querySelectorAll('input[name="type"]');
const typeBuildingElements = document.querySelectorAll('input[name="building"]');
const roomElements = document.querySelectorAll('input[name="rooms"]');

// чекбоксы
const ceilings = document.querySelector('input[name="ceiling"]');
const walls = document.querySelector('input[name="walls"]');
const floor = document.querySelector('input[name="floor"]');

// базовая цена и элемент для вывода стоимости
const basePricePerMeter = 6000;
const totalPriceElement = document.querySelector('#total-price');


// связка range с текстовым полем

squareRange.addEventListener('input', function () {
    squareInput.value = squareRange.value;
});

// связка текстового поля с range
squareInput.addEventListener('input', function(){
    squareRange.value = squareInput.value;
});

// обходим inputs, если есть изменения, запускаем пересчет стоимости
inputs.forEach(function(item){
    item.addEventListener('input', calculate);
    
});

calculate();

// функция calculate для пересчета стоимости
function calculate () {
   // площадь квартиры
   const square = parseInt(squareInput.value);

   // Тип ремонта

   let typeReconstructionCost;
   typeReconstructionElements.forEach(function (item){
        if(item.checked) {
            typeReconstructionCost = parseFloat(item.value);
        }
   });

   // тип дома

   let typeBuildingCost;
   typeBuildingElements.forEach(function(item){
       if(item.checked) {
        typeBuildingCost = parseFloat(item.value);
       }
   });


   // Кол-во комнат

   let roomsCost;
   roomElements.forEach(function(item){
    if(item.checked) {
        roomsCost = parseFloat(item.value);
    }
});


// доп опции
    const ceilingCost = ceilings.checked ? parseFloat(ceilings.value) : 1;
    const wallsCost = walls.checked ? parseFloat(walls.value) : 1;
    const floorCost = floor.checked ? parseFloat(floor.value) : 1;

    // подсчет общей стоимости 

    const totalPrice = basePricePerMeter * square * typeReconstructionCost * typeBuildingCost * roomsCost * 
    ceilingCost * wallsCost * floorCost;

    const formatter = new Intl.NumberFormat('ru');

    totalPriceElement.innerText = formatter.format(totalPrice);

};

