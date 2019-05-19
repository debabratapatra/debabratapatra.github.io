var Utility = function() {
    function ajax(url, success) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                success(this.responseText);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function getCurrentDate() {
        var date = new Date();

        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    function formatNumber(value) {
        return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    return {
        ajax: ajax,
        getCurrentDate: getCurrentDate,
        formatNumber: formatNumber
    }
}();