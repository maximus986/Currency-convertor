(function IIFE() {

    var widgetFrom = document.querySelector(".widget-from");
    var widgetTo = document.querySelector(".widget-to");
    var selectFrom = document.getElementById("currency-from");
    var selectTo = document.getElementById("currency-to");
    var ammountFrom = document.getElementById("ammount-from");
    var ammountTo = document.getElementById("ammount-to");
    var reset = document.getElementById("reset-btn");
    var errorMessage = widgetFrom.querySelector("p");
    var completeServerData;
    var serverData = {};


    makeRequest();

    selectFrom.onchange = handleInputChange;
    selectTo.onchange = handleInputChange;
    ammountFrom.addEventListener("keyup", function() {
        handleInputChange();
    });
    reset.addEventListener("click", setInitialState);

    function handleInputChange() {
        var currencyFrom = selectFrom.options[selectFrom.selectedIndex].value;
        var currencyTo = selectTo.options[selectTo.selectedIndex].value;
        var ammount = ammountFrom.value;
        if (!ammount) {
            ammount = 1;
        }

        if ((parseInt(ammount) + '') !== ammount && ammount.length > 0) {
            ammount = 1;
            errorMessage.classList.remove("deleted");
            ammountFrom.classList.add("warning");
        } else {
            errorMessage.classList.add("deleted");
            ammountFrom.classList.remove("warning");
        }

        ammountTo.value = convertCurrency(currencyFrom, currencyTo, ammount);

        excludeCurrencies(currencyFrom, currencyTo);
    }

    function convertCurrency(currencyFrom, currencyTo, ammount) {
        if (currencyTo === "rsd") {
            var convertedCurrency = serverData[currencyFrom].sre * ammount;

            return convertedCurrency.toFixed(2);
        }

        if (currencyFrom === "rsd") {
            var convertedCurrency = ammount * (1 / serverData[currencyTo].sre);

            return convertedCurrency.toFixed(2);
        }

        var convertedCurrency = ammount * (serverData[currencyFrom].sre / serverData[currencyTo].sre);

        return convertedCurrency.toFixed(2);
    }

    function setInitialState() {
        ammountFrom.value = 1;
        selectFrom.selectedIndex = 2;
        selectTo.selectedIndex = 0;
        handleInputChange();
    }

    function initWidgets() {
        serverData.rsd = {};
        serverData.usd = completeServerData["usd"];
        serverData.eur = completeServerData["eur"];

        for (var currency in serverData) {
            if (serverData.hasOwnProperty(currency)) {
                selectFrom.appendChild(createOption(currency));
                selectTo.appendChild(createOption(currency));
            }
        }

        function createOption(currency) {
            var option = document.createElement("option");
            var optionText = document.createTextNode(currency);
            option.setAttribute("value", currency);
            option.appendChild(optionText);

            return option;
        }

        setInitialState();
    }

    function excludeCurrencies(currencyFrom, currencyTo) {
        var selectToDeleted = selectTo.querySelectorAll(".deleted");
        for (var i = 0; i < selectToDeleted.length; i++) {
            selectToDeleted[i].classList.remove("deleted");
        }

        selectTo.querySelector('option[value="' + currencyFrom + '"]').classList.add("deleted");

        var selectFromDeleted = selectFrom.querySelectorAll(".deleted");
        for (var i = 0; i < selectFromDeleted.length; i++) {
            selectFromDeleted[i].classList.remove("deleted");
        }

        selectFrom.querySelector('option[value="' + currencyTo + '"]').classList.add("deleted");
    }

    function makeRequest() {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = parseData;
        httpRequest.open('GET', '/kursna-lista');
        httpRequest.send();
    }

    function parseData() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                completeServerData = JSON.parse(httpRequest.responseText).result;
                initWidgets();
            } else {
                alert('Something went wrong');
            }
        }

    }
})();