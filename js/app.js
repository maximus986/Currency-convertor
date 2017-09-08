(function IIFE() {

    var widgetFrom = document.querySelector(".widget-from");
    var widgetTo = document.querySelector(".widget-to");

    makeRequest();

    function initWidgets(data) {

        var selectFrom = document.createElement("select");
        selectFrom.id = "slct1";
        selectFrom.setAttribute("name", "slct1");

        // Option Eur
        var optionEur = document.createElement("option");
        optionEur.setAttribute("value", "eur");
        optionEur.setAttribute("selected", true);
        var optionEurText = document.createTextNode("EUR");
        optionEur.appendChild(optionEurText);

        //Option RSD
        var optionRsd = document.createElement("option");
        optionRsd.setAttribute("value", "rsd");
        var optionRsdText = document.createTextNode("RSD");
        optionRsd.appendChild(optionRsdText);

        //Option USD
        var optionUsd = document.createElement("option");
        optionUsd.setAttribute("value", "usd");
        var optionUsdText = document.createTextNode("USD");
        optionUsd.appendChild(optionUsdText);

        selectFrom.append(optionEur, optionRsd, optionUsd);
        widgetFrom.appendChild(selectFrom);

        //input
        var valueToConvert = document.createElement("input");
        valueToConvert.id = "value-to-convert";
        valueToConvert.setAttribute("type", "number");
        widgetFrom.appendChild(valueToConvert);

        //Widget rsd to convert to
        var selectTo = document.createElement("select");
        selectTo.id = "slct2";
        selectTo.setAttribute("name", "slct2");

        //Option RSD
        var optionRsd = document.createElement("option");
        optionRsd.setAttribute("value", "rsd");
        optionRsd.setAttribute("selected", true);
        var optionRsdText = document.createTextNode("RSD");
        optionRsd.appendChild(optionRsdText);

        // Option Eur
        var optionEur = document.createElement("option");
        optionEur.setAttribute("value", "eur");
        var optionEurText = document.createTextNode("EUR");
        optionEur.appendChild(optionEurText);

        //Option USD
        var optionUsd = document.createElement("option");
        optionUsd.setAttribute("value", "usd");
        var optionUsdText = document.createTextNode("USD");
        optionUsd.appendChild(optionUsdText);

        selectTo.append(optionRsd, optionEur, optionUsd);
        widgetTo.appendChild(selectTo);

        var convertedValue = document.createElement("input");
        convertedValue.id = "converted-value";
        convertedValue.setAttribute("type", "number");
        widgetTo.appendChild(convertedValue);

        // Initial value of both widgets
        valueToConvert.value = 1;
        convertedValue.value = parseFloat(data.eur.pro).toFixed(2);

        slct1.querySelector('option[value="rsd"]').classList.add("deleted");
        slct2.querySelector('option[value="eur"]').classList.add("deleted");


        document.addEventListener("DOMContentLoaded", function() {
            slct1.onchange = currencyToConvert;
        }, false);

        function currencyToConvert(event) {
            if (event.target.value === "rsd") {
                updateValue(convertedValue, "rsd", "eur", parseFloat(1 / data.eur.pro).toFixed(2));
                updateValue(convertedValue, "eur", "rsd", parseFloat(data.eur.pro).toFixed(2));
                updateValue(convertedValue, "rsd", "usd", parseFloat(1 / data.usd.pro).toFixed(2));
                slct2.querySelector('option[value="rsd"]').classList.add("deleted");
                slct2.querySelector('option[value="eur"]').classList.remove("deleted");
            } else if (event.target.value === "usd") {
                updateValue(convertedValue, "usd", "eur", parseFloat(data.usd.pro / data.eur.pro).toFixed(2));
                updateValue(convertedValue, "eur", "usd", parseFloat(data.eur.pro / data.usd.pro).toFixed(2));
                updateValue(convertedValue, "usd", "rsd", parseFloat(data.usd.pro).toFixed(2));
                slct2.querySelector('option[value="usd"]').classList.add("deleted");
                slct2.querySelector('option[value="rsd"]').classList.remove("deleted");
                slct2.querySelector('option[value="eur"]').classList.remove("deleted");
            } else if (event.target.value === "eur") {
                updateValue(convertedValue, "rsd", "eur", parseFloat(1 / data.eur.pro).toFixed(2));
                updateValue(convertedValue, "eur", "rsd", parseFloat(data.eur.pro).toFixed(2));
                updateValue(convertedValue, "eur", "usd", parseFloat(data.eur.pro / data.usd.pro).toFixed(2));
                slct2.querySelector('option[value="eur"]').classList.add("deleted");
                slct2.querySelector('option[value="usd"]').classList.remove("deleted");
                slct2.querySelector('option[value="rsd"]').classList.remove("deleted");
            }
        }

        document.addEventListener("DOMContentLoaded", function() {
            slct2.onchange = updateCurrency;
        }, false);

        function updateCurrency(event) {
            if (event.target.value === "usd") {
                updateValue(convertedValue, "eur", "usd", parseFloat(data.eur.pro / data.usd.pro).toFixed(2));
                updateValue(convertedValue, "rsd", "usd", parseFloat(data.usd.pro).toFixed(2));
                slct1.querySelector('option[value="usd"]').classList.add("deleted");
                slct1.querySelector('option[value="rsd"]').classList.remove("deleted");
                slct1.querySelector('option[value="eur"]').classList.remove("deleted");
            } else if (event.target.value === "rsd") {
                updateValue(convertedValue, "eur", "rsd", parseFloat(data.eur.pro).toFixed(2));
                updateValue(convertedValue, "usd", "rsd", parseFloat(data.usd.pro).toFixed(2));
                slct1.querySelector('option[value="rsd"]').classList.add("deleted");
                slct1.querySelector('option[value="eur"]').classList.remove("deleted");
                slct1.querySelector('option[value="usd"]').classList.remove("deleted");
            } else if (event.target.value === "eur") {
                updateValue(convertedValue, "rsd", "eur", parseFloat(1 / data.eur.pro).toFixed(2));
                updateValue(convertedValue, "usd", "eur", parseFloat(data.usd.pro / data.eur.pro).toFixed(2));
                slct1.querySelector('option[value="eur"]').classList.add("deleted");
                slct1.querySelector('option[value="usd"]').classList.remove("deleted");
                slct1.querySelector('option[value="rsd"]').classList.remove("deleted");
            }
        }
    }

    function updateValue(convertedValue, currencyFrom, currencyTo, currencyValue) {
        if (slct1.value === currencyFrom && slct2.value === currencyTo) {
            convertedValue.value = currencyValue;
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
                var data = JSON.parse(httpRequest.responseText).result;
                initWidgets(data);
            } else {
                alert('Something went wrong');
            }
        }

    }
})();