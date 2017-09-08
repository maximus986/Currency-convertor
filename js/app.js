(function IIFE() {

    var eurToRsd = 119.559;
    var eurToUsd = 1.19270;
    var rsdToEur = 0.00836;
    var rsdToUsd = 0.00998;
    var usdToRsd = 100.242;
    var usdToEur = 0.83843;
    var convertedValue = document.getElementById("converted-value");
    var slct1 = document.getElementById("slct1");
    var slct2 = document.getElementById("slct2");


    makeRequest();

    initWidges();

    function initWidges() {
        var valueToConvert = document.getElementById("value-to-convert");
        valueToConvert.value = 1;
        updateValue(convertedValue, "eur", "rsd", eurToRsd);
    }

    function updateValue(convertedValue, currencyFrom, currencyTo, currencyValue) {
        if (slct1.value === currencyFrom && slct2.value === currencyTo) {
            convertedValue.value = currencyValue.toFixed(2);
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        slct2.onchange = updateCurrency;
    }, false);

    function updateCurrency(event) {
        if (event.target.value === "usd") {
            updateValue(convertedValue, "eur", "usd", eurToUsd);
            updateValue(convertedValue, "rsd", "usd", rsdToUsd);
        } else if (event.target.value === "rsd") {
            updateValue(convertedValue, "eur", "rsd", eurToRsd);
            updateValue(convertedValue, "usd", "rsd", usdToRsd);
        } else if (event.target.value === "eur") {
            updateValue(convertedValue, "rsd", "eur", rsdToEur);
            updateValue(convertedValue, "usd", "eur", usdToEur);
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        slct1.onchange = currencyToConvert;
    }, false);

    function currencyToConvert(event) {
        if (event.target.value === "rsd") {
            updateValue(convertedValue, "rsd", "eur", rsdToEur);
            updateValue(convertedValue, "eur", "rsd", eurToRsd);
            updateValue(convertedValue, "rsd", "usd", rsdToUsd);
        } else if (event.target.value === "usd") {
            updateValue(convertedValue, "usd", "eur", usdToEur);
            updateValue(convertedValue, "eur", "usd", eurToUsd);
            updateValue(convertedValue, "usd", "rsd", usdToRsd);
        } else if (event.target.value === "eur") {
            updateValue(convertedValue, "rsd", "eur", rsdToEur);
            updateValue(convertedValue, "eur", "rsd", eurToRsd);
            updateValue(convertedValue, "eur", "usd", eurToUsd);

        }
    }

    function makeRequest() {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('GET', '/kursna-lista');
        httpRequest.send();
    }

    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                data = JSON.parse(httpRequest.responseText).result;


                /*objekat obuhvatiti promenljivom, onda property na result daje vrednost valuta. Genericki pravim select, oba! Valute brisem dodavanjem css klase sa display: none! */
            } else {
                alert('Something went wrong');
            }
        }

    }
})();