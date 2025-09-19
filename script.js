async function getCurrency() {
    try {
        const url = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_8TLszRXs2YhAPuiRkYyr9W8BNoOEPtkOErEW1QZi';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        renderList(result.data);
    } catch (error) {
        console.error('Error fetching currency data:', error);
    }
}

function renderList(data) {
    const fromA = document.getElementById('fromA');
    const toA = document.getElementById('toA');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const input = document.getElementById('input');
    const result = document.getElementById('result');

    fromA.innerHTML = '';
    toA.innerHTML = '';

    for (const key in data) {
        const flagCode = key.slice(0, 2).toLowerCase();
        const img = `https://flagcdn.com/24x18/${flagCode}.png`;

        // Create 'From' dropdown item
        const liFrom = document.createElement('li');
        liFrom.innerHTML = `<div class="flex items-center gap-2"><img src="${img}" alt="${key} flag"> <p>${key}</p></div>`;
        liFrom.classList.add('cursor-pointer', 'hover:bg-gray-200', 'p-2');
        liFrom.addEventListener('click', () => {
            fromCurrency.textContent = key;
            convertCurrency(data);
        });
        fromA.appendChild(liFrom);

        // Create 'To' dropdown item
        const liTo = document.createElement('li');
        liTo.innerHTML = `<div class="flex items-center gap-2"><img src="${img}" alt="${key} flag"> <p>${key}</p></div>`;
        liTo.classList.add('cursor-pointer', 'hover:bg-gray-200', 'p-2');
        liTo.addEventListener('click', () => {
            toCurrency.textContent = key;
            convertCurrency(data);
        });
        toA.appendChild(liTo);
    }

    // Add input event listener for real-time conversion
    input.addEventListener('input', () => convertCurrency(data));
}

function convertCurrency(data) {
    const input = document.getElementById('input');
    const fromCurrency = document.getElementById('fromCurrency').textContent;
    const toCurrency = document.getElementById('toCurrency').textContent;
    const result = document.getElementById('result');

    const amount = parseFloat(input.value) || 0;
    const fromRate = data[fromCurrency]?.value || 1;
    const toRate = data[toCurrency]?.value || 1;

    const convertedAmount = (amount / fromRate) * toRate;
    result.textContent = `Result: ${convertedAmount.toFixed(2)} ${toCurrency}`;
}

getCurrency();