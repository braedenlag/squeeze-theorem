const doPiApprox = (n) => {
    let sum = 0;

    for(let i = 0; i <= n; i++) {
        if(i % 2 == 0) {
            sum += (1/(2*i +1));
        } else {
            sum -= (1/(2*i +1));
        }
    }

    return 4 * sum;
}

const iForDigit = (n) => {
    return Math.ceil((4 * Math.pow(10, (n + 1)) - 3) / 2);
}

const numAccurateDigit = (n) => {
    if(n == 0) return -1;
    return Math.floor(-1 * Math.log10(((4) / (2*n + 3))) - 1);
}

const main = () => {
    const nValue = document.getElementById("n-value");
    const accurateDigits = document.getElementById("accurate-digits");
    const piResult = document.getElementById("pi-result");
    const displayedDigits = 10;

    updatePi(parseInt(nValue.value), displayedDigits, piResult);

    nValue.oninput = () => {
        //enforce min and max
        nValue.value = Math.min(nValue.value, nValue.max);
        nValue.value = Math.max(nValue.value, nValue.min);
        nValue.value = Math.floor(nValue.value);

        accurateDigits.value = numAccurateDigit(parseInt(nValue.value)) + 1;
        updatePi(parseInt(nValue.value), displayedDigits, piResult);
        
    }
    accurateDigits.oninput = () => {
        //enforce min and max
        accurateDigits.value = Math.min(accurateDigits.value, accurateDigits.max);
        accurateDigits.value = Math.max(accurateDigits.value, accurateDigits.min);
        accurateDigits.value = Math.floor(accurateDigits.value);

        const accValue = accurateDigits.value - 1;

        nValue.value = iForDigit(parseInt(accValue));
        updatePi(iForDigit(parseInt(accValue)), displayedDigits, piResult);
        
    }
}

const updatePi = (n, digits, result) => {
    const accurateDigit = numAccurateDigit(n);
    let approx = truncateDecimals(doPiApprox(n), digits);
    let accurateApprox = truncateDecimals(approx, accurateDigit);
    approx = approx.toString();
    accurateApprox = accurateApprox.toString();
    if(accurateApprox == "0") accurateApprox = "";
    //account for decimal point in string
    if(accurateDigit >= 1) {
        approx = approx.substring(accurateDigit + 2, (accurateDigit + 1 + (digits - (accurateApprox.length - 2))));
    } else {
        approx = approx.substring(accurateDigit + 1, (accurateDigit + (digits - (accurateApprox.length - 2))));
    }

    katex.render(`\\color{#f22844}{${accurateApprox}}\\color{#2a22d7}${approx}`, result);
}

const truncateDecimals = (number, digits) => {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

window.onload = main;