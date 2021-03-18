// Значения из текстовых инпутов

const totalCost = document.getElementById('total-cost'),
    anInitialFee = document.getElementById('an-initial-fee'),
    creditTerm = document.getElementById('credit-term');

// Значения из скрольных инпутов

const totalCostRange = document.getElementById('total-cost-range'),
    anInitialFeeRange = document.getElementById('an-initial-fee-range'),
    creditTermRange = document.getElementById('credit-term-range');


// Значения итоговые

const totalAmountCredit = document.getElementById('amount-of-credit'),
    totalMountlyPayment = document.getElementById('monthly-payment'),
    totalRecomendedIncome = document.getElementById('recommended-income');


// Все range скроллы

const iputsRange = document.querySelectorAll('.input-range');

// Все кнопки банков

const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;

}

assignValue();

const banks = [

    {
        name: 'techno',
        precents: 9.99
    }

]

let currentPrecent = banks[0].precents;

// Переключение кнопок 

for (let bank of bankBtns) {
    bank.addEventListener('click', () => {
        for (let item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
    })
}

const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataAttrValue);
    currentPrecent = currentPrecent.precents;
    caclulation(totalCost.value, anInitialFee.value, creditTerm.value);

}

for (let input of iputsRange) {
    input.addEventListener('input', () => {
        assignValue();
        caclulation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

const caclulation = (totalCost = 0, anInitialFee = 10000, creditTerm = 3) => {
    /*
    ЕП- ежемесячный платеж
    РК - размер кредита
    ПС - процентная ставка
    КМ - количество месяцев

    ЕП = (РК + (((РК / 100) * ПС) * КМ) / КМ;
    */

    let monthlyPAyment; //Ежемесячный платеж
    let lounAmount = totalCost - anInitialFee; //Размер кредита
    let interestRate = currentPrecent; //Процентная ставка
    let numberOfYears = creditTerm //Количество лет
    let numberOfMonth = 12 * numberOfYears //количесвто месяцев

    monthlyPAyment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonth) / numberOfMonth;
    const monthlyPAymentArrounded = Math.round(monthlyPAyment);

    if (monthlyPAymentArrounded < 0) {
        return false;
    } else {
        totalAmountCredit.innerHTML = `${lounAmount} Br`;
        totalMountlyPayment.innerHTML = `${monthlyPAymentArrounded} Br`;
        totalRecomendedIncome.innerHTML = `${monthlyPAymentArrounded + ((monthlyPAymentArrounded / 100) * 35)} Br`
    }
}