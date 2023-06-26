const parameters = {
    'Velikost svazku': {
      options: ['12*50', '16*50'],
      image: 'images/cylinders.svg',
    },
    'Druh plynu': {
      options: ['vodík (H2)', 'stl. zemní plyn (CNG)', 'kyslík (O2)', 'stlačený vzduch', 'helium (He)', 'dusík (N2)', 'argon (Ar)', 'plyn stl. J.N. UN1956', 'oxid uhličitý (CO2)'],
      image: 'images/black_cylinder.svg',
    },
    'Pracovní tlak PW a velikost koncovky': {
      options: ['200 bar, W21,7x1/14“',
      '200 bar, W21,8x1/14“ ',
      '200 bar, W24,32x1/14“', 
      '200 bar, G3/4“',
      '200 bar, G5/8“',
      '200 bar, 0,965“-14NGO RH',
      '300 bar, W30x2 15,2 / 20,8 LH',
      '300 bar, W30x2 15,9 / 20,1 RH',
      '300 bar, W30x2 16,6 / 19,4 RH',
      '300 bar, W30x2 17,3 / 18,7 RH'
      ],
      image: 'images/yellow_cylinder.svg',
    },
    'Počet výstupu a vybavení': {
      options: [' počet výstupů-1, vybavení - láhvová zátka, výstup ventil, bez pojistného ventilu',
      'počet výstupů-1, vybavení - láhvová zátka, výstup ventil s tlakovou pojistkou',
      'počet výstupů-2, vybavení - láhvová zátka, výstup ventil, bez pojistného ventilu',
      'počet výstupů-2, vybavení - láhvová zátka, výstup ventil s tlakovou pojistkou',
      'počet výstupů-2, vybavení - láhvová zátka, výstup ventil, pojistný ventil (PVS)* '
      ],
      image: 'images/vstupy.png',
    },
    'Doplňkové služby': {
      options: ['Přeprava', 'Systémy redukce tlaku integrované do svazku (převodovky, bezpečnostní armatury)', 'Změna barvy rámu a dekorativních ochranných prvků','Bez výběru'],
      image: 'images/services.png',
      multiple: true, // Добавляем параметр multiple для позволяющего выбирать несколько опций
    },
  };
  
  // Объект для хранения выбранных опций
  let selectedOptions = {};
  
  // Текущий выбранный параметр
  let currentParameter = 'Velikost svazku';
  
  // Флаг для отслеживания открытой сводки
  let isSummaryOpen = false;
  
  // Функция для выбора параметра
  function selectParameter(parameter) {
    // Если сводка открыта, ничего не делаем
    if (isSummaryOpen) return;
  
    // Получаем элементы DOM
    const selectedParameterOptions = document.getElementById('selected-parameter-options');
    const selectedParameterTitle = document.getElementById('selected-parameter-title');
  
    // Проверяем, был ли выбран предыдущий параметр, и добавляем его в выбранные опции
    selectedOptions[currentParameter] = selectedOptions[currentParameter] || null;
  
    // Обновляем заголовок выбранного параметра и очищаем опции
    selectedParameterTitle.textContent = parameter;
    selectedParameterOptions.innerHTML = '';
  
    // Получаем варианты выбора для текущего параметра
    const options = parameters[parameter].options;
  
    // Создаем кнопки для каждой опции
    options.forEach((option) => {
      const optionButton = document.createElement('button');
      optionButton.textContent = option;
      optionButton.onclick = () => selectOption(parameter, option);
      selectedParameterOptions.appendChild(optionButton);
  
      // Добавляем класс "selected", если опция уже выбрана
      if (selectedOptions[parameter] && selectedOptions[parameter].includes(option)) {
        optionButton.classList.add('selected');
      }
    });
  
    // Обновляем изображение для выбранного параметра
    const selectedImage = document.getElementById('selected-image');
    selectedImage.src = parameters[parameter].image;
  
    // Отображаем контейнер с изображением
    const imageContainer = document.querySelector('.image-container');
    imageContainer.style.display = 'block';
  
    // Обновляем текущий параметр
    currentParameter = parameter;
  
    // Выделяем кнопку текущего параметра
    const parameterButtons = document.querySelectorAll('.parameters-column button');
    parameterButtons.forEach((button) => {
      const buttonParameter = button.textContent;
      if (buttonParameter === parameter) {
        button.classList.add('selected-blue');
      } else {
        button.classList.remove('selected-blue');
      }
    });

    updateAvailableOptions();
  }
  
  // Функция для выбора опции
 // Функция для выбора опции
function selectOption(parameter, option) {
    updateAvailableOptions();
    // Проверяем, поддерживает ли параметр множественный выбор
    if (parameters[parameter].multiple) {
      // Проверяем, была ли опция уже выбрана
      if (selectedOptions[parameter] && selectedOptions[parameter].includes(option)) {
        // Опция уже выбрана, удаляем ее из списка выбранных опций
        selectedOptions[parameter] = selectedOptions[parameter].filter((selectedOption) => selectedOption !== option);
      } else {
        // Опция не выбрана, добавляем ее в список выбранных опций
        selectedOptions[parameter] = selectedOptions[parameter] || [];
        selectedOptions[parameter].push(option);
      }
    } else {
      // Обновляем выбранную опцию для параметра
      selectedOptions[parameter] = option;
    }
  
    // Обновляем состояние выбора для кнопки параметра
    const parameterButtons = document.querySelectorAll('.parameters-column button');
    parameterButtons.forEach((button) => {
      const buttonParameter = button.textContent;
      if (buttonParameter === parameter) {
        if (selectedOptions.hasOwnProperty(parameter)) {
          button.classList.add('selected');
        } else {
          button.classList.remove('selected');
        }
      }
    });
    updateAvailableOptions();
  
    // Обновляем выделение для кнопок опций
    const selectedOptionsButtons = document.querySelectorAll('#selected-parameter-options button');
    selectedOptionsButtons.forEach((button) => {
      const selectedOption = button.textContent;
      if (selectedOptions[parameter] && selectedOptions[parameter].includes(selectedOption)) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });

  
    // Обновляем изображение для выбранного параметра
    const selectedImage = document.getElementById('selected-image');
    selectedImage.src = parameters[parameter].image;
  
    // Останавливаем всплытие события клика
    event.stopPropagation();
  
    // Проверяем и обновляем доступные опции в зависимости от выбранных значений
    updateAvailableOptions();
  }
  
  // Функция для проверки и обновления доступных опций в зависимости от выбранных значений
  function updateAvailableOptions() {
    const selectedGasType = selectedOptions['Druh plynu'];
  
    // Определение доступных опций для параметра 'Pracovní tlak PW a velikost koncovky' в зависимости от выбранного газа
    const pressureOptions = document.querySelectorAll('.parameters-column button')[2];
    const pressureButtons = document.querySelectorAll('#selected-parameter-options button');
    const allPressureOptions = parameters['Pracovní tlak PW a velikost koncovky'].options;
  
    // Первоначально сделаем все опции доступными
    pressureButtons.forEach((button) => {
      button.disabled = false;
    });
  
    if (selectedGasType === 'vodík (H2)' || selectedGasType === 'stl. zemní plyn (CNG)') {
        // Определение недоступных опций для выбранного газа
        const unavailablePressureOptions = [ ,'200 bar, W21,7x1/14“',
        '200 bar, W24,32x1/14“', 
        '200 bar, G3/4“',
        '200 bar, G5/8“',
        '200 bar, 0,965“-14NGO RH',
        '300 bar, W30x2 15,9 / 20,1 RH',
        '300 bar, W30x2 16,6 / 19,4 RH',
        '300 bar, W30x2 17,3 / 18,7 RH'];
      
        // Отключаем недоступные опции
        pressureButtons.forEach((button) => {
          const option = button.textContent;
          if (unavailablePressureOptions.includes(option)) {
            button.disabled = true;
          }
        });
      }
      if (selectedGasType === 'kyslík (O2)' ) {
        // Определение недоступных опций для выбранного газа
        const unavailablePressureOptions = ['200 bar, W21,7x1/14“',
        '200 bar, W21, 8x1/14“',
        '200 bar, W24,32x1/14“', 
        '200 bar, G5/8“',
        '200 bar, 0,965“-14NGO RH',
        '300 bar, W30x2 15,2 / 20,8 LH',
        '300 bar, W30x2 15,9 / 20,1 RH',
        '300 bar, W30x2 16,6 / 19,4 RH'];
        pressureButtons.forEach((button) => {
          const option = button.textContent;
          if (unavailablePressureOptions.includes(option)) {
            button.disabled = true;
          }
        });
      }

      if (selectedGasType === 'stlačený vzduch' ) {
        const unavailablePressureOptions = ['200 bar, W21,7x1/14“',
        '200 bar, W21, 8x1/14“',
        '200 bar, W24,32x1/14“', 
        '200 bar, G3/4“',
        '200 bar, 0,965“-14NGO RH',
        '300 bar, W30x2 15,2 / 20,8 LH',
        '300 bar, W30x2 15,9 / 20,1 RH',
        '300 bar, W30x2 17,3 / 18,7 RH'
        ];
        pressureButtons.forEach((button) => {
          const option = button.textContent;
          if (unavailablePressureOptions.includes(option)) {
            button.disabled = true;
          }
        });
      }
      if (selectedGasType === 'helium (He)' ) {
        const unavailablePressureOptions = ['200 bar, W21,7x1/14“',
 
        '200 bar, W24,32x1/14“', 
        '200 bar, G3/4“',
        '200 bar, G5/8“',
        '300 bar, W30x2 15,2 / 20,8 LH',
        '300 bar, W30x2 16,6 / 19,4 RH',
        '300 bar, W30x2 17,3 / 18,7 RH'
        ];
        pressureButtons.forEach((button) => {
          const option = button.textContent;
          if (unavailablePressureOptions.includes(option)) {
            button.disabled = true;
          }
        });
      } if (selectedGasType === 'dusík (N2)' ) {
        const unavailablePressureOptions = ['200 bar, W21, 8x1/14“',
        '200 bar, G3/4“',
        '200 bar, W21, 8x1/14“',
        '200 bar, G5/8“',
        '300 bar, W30x2 15,2 / 20,8 LH',
        '300 bar, W30x2 16,6 / 19,4 RH',
        '300 bar, W30x2 17,3 / 18,7 RH'
        ];
        pressureButtons.forEach((button) => {
          const option = button.textContent;
          if (unavailablePressureOptions.includes(option)) {
            button.disabled = true;
          }
        });
      } if (selectedGasType === 'argon (Ar)' ) {
        // Определение недоступных опций для выбранного газа
        const unavailablePressureOptions = ['200 bar, W21,7x1/14“',
        '200 bar, W24,32x1/14“', 
        '200 bar, G3/4“',
        '200 bar, G5/8“',
        '300 bar, W30x2 15,2 / 20,8 LH',
        '300 bar, W30x2 16,6 / 19,4 RH',
        '300 bar, W30x2 17,3 / 18,7 RH'
        ];
        pressureButtons.forEach((button) => {
          const option = button.textContent;
          if (unavailablePressureOptions.includes(option)) {
            button.disabled = true;
          }
        });
      } if (selectedGasType === 'plyn stl. J.N. UN1956' ) {
        // Определение недоступных опций для выбранного газа
        const unavailablePressureOptions = ['200 bar, W21,7x1/14“',
        '200 bar, W24,32x1/14“', 
        '200 bar, G3/4“',
        '200 bar, G5/8“',
        '200 bar, 0,965“-14NGO RH',
        '300 bar, W30x2 15,2 / 20,8 LH',
        '300 bar, W30x2 16,6 / 19,4 RH',
        '300 bar, W30x2 17,3 / 18,7 RH'
        ];
        pressureButtons.forEach((button) => {
          const option = button.textContent;
          if (unavailablePressureOptions.includes(option)) {
            button.disabled = true;
          }
        });
      } if (selectedGasType === 'oxid uhličitý (CO2)' ) {
        // Определение недоступных опций для выбранного газа
        const unavailablePressureOptions = ['200 bar, W21,7x1/14“',
        '200 bar, W24,32x1/14“', 
        '200 bar, G5/8“',
        '200 bar, 0,965“-14NGO RH',
        '300 bar, W30x2 15,2 / 20,8 LH',
        '300 bar, W30x2 15,9 / 20,1 RH',
        '300 bar, W30x2 16,6 / 19,4 RH',
        '300 bar, W30x2 17,3 / 18,7 RH'
        ];
        pressureButtons.forEach((button) => {
          const option = button.textContent;
          if (unavailablePressureOptions.includes(option)) {
            button.disabled = true;
          }
        });
      }
    }
  
  
  // Функция для подтверждения выбора опции
  function confirmParameter() {
    // Если сводка открыта, ничего не делаем
    if (isSummaryOpen) return;
  
    // Получаем текущий индекс параметра в общем списке параметров
    const currentIndex = Object.keys(parameters).indexOf(currentParameter);
  
    // Если есть следующий параметр, выбираем его
    if (currentIndex < Object.keys(parameters).length - 1) {
      const nextParameter = Object.keys(parameters)[currentIndex + 1];
      selectParameter(nextParameter);
    } else {
      // Если все параметры выбраны, отображаем сводку
      showSummary();
    }
  }
  
  // Функция для отображения сводки
  function showSummary() {
    // Получаем элемент сводки
    const summary = document.getElementById('summary');
    summary.innerHTML = '';
  
    // Создаем элементы списка для каждого выбранного параметра
    for (const parameter in selectedOptions) {
      const selectedOption = selectedOptions[parameter];
      const listItem = document.createElement('li');
  
      // Проверяем, поддерживает ли параметр множественный выбор
      if (Array.isArray(selectedOption)) {
        // Если да, преобразуем список выбранных опций в строку
        const optionString = selectedOption.join(', ');
        listItem.textContent = `${parameter}: ${optionString || 'neni vybran'}`;
      } else {
        listItem.textContent = `${parameter}: ${selectedOption || 'neni vybran'}`;
      }
  
      summary.appendChild(listItem);
    }
  
    // Если ни одна опция не была выбрана, отображаем соответствующее сообщение
    if (Object.keys(selectedOptions).length === 0) {
      const listItem = document.createElement('li');
      listItem.textContent = 'Žádné parametry nejsou vybrány.';
      summary.appendChild(listItem);
    }
  
    // Создаем кнопку "Назад" и назначаем ей обработчик события
    const backButton = document.createElement('button');
    backButton.textContent = 'Zpět';
    backButton.id='backButton';
    backButton.onclick = goBack;
    summary.appendChild(backButton);
  
    // Очищаем колонку с опциями
    const optionsColumn = document.querySelector('.options-column');
    optionsColumn.innerHTML = '';
  
    // Отображаем колонку со сводкой
    const summaryColumn = document.querySelector('.summary-column');
    summaryColumn.style.display = 'block';
  
    // Обновляем флаг открытой сводки
    isSummaryOpen = true;
  
    // Скрываем контейнер с изображением
    const imageContainer = document.querySelector('.image-container');
    imageContainer.style.display = 'none';

    const parametersColumn = document.querySelector('.parameters-column');
  parametersColumn.classList.add('hidden');
  }
  
  // Функция для возврата к выбору опций
  function goBack() {
    // Очищаем колонку с опциями и добавляем нужные элементы
    const optionsColumn = document.querySelector('.options-column');
    optionsColumn.innerHTML = `
      <div class="options">
        <h2 id="selected-parameter-title"></h2>
        <ul id="selected-parameter-options"></ul>
        <button id="confirm-button" onclick="confirmParameter()">Potvrdit</button>
      </div>
    `;
    const parametersColumn = document.querySelector('.parameters-column');
    parametersColumn.classList.remove('hidden');
    // Скрываем колонку со сводкой
    const summaryColumn = document.querySelector('.summary-column');
    summaryColumn.style.display = 'none';
  
    // Обновляем состояние кнопок параметров
    const parameterButtons = document.querySelectorAll('.parameters-column button');
    parameterButtons.forEach((button) => {
      const buttonParameter = button.textContent;
      if (selectedOptions.hasOwnProperty(buttonParameter)) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  
    // Обновляем флаг открытой сводки
    isSummaryOpen = false;
  
    // Выбираем параметр "Velikost svazku" по умолчанию
    selectParameter('Velikost svazku');
  }
  
  // Выбираем параметр "Velikost svazku" по умолчанию
  selectParameter('Velikost svazku');
  