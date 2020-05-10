window.addEventListener("load",function(event) {
    angular_module.fetchNgTreeGridCount();
    angular_module.fetchAngularTreeGridCount();
    angular_module.fetchAngularFixHeaderGridCount();
});

var angular_module = function() {

    function fetchNgTreeGridCount() {
        var currentDate = Utility.getCurrentDate(),
            url = "https://npm-stat.com/downloads/range/2019-02-11:" + currentDate + "/ngtreegrid";

        Utility.ajax(url, function (response) {
            var total = 0,
                jData = JSON.parse(response);
            jData.downloads.forEach(obj => {
                total += obj.downloads;
            });

            document.getElementById('ngtreegrid_download_count').innerHTML = Utility.formatNumber(total);
        });
    }

    function fetchAngularTreeGridCount() {
        var currentDate = Utility.getCurrentDate(),
            url = "https://npm-stat.com/downloads/range/2019-04-22:" + currentDate + "/angular-tree-grid";

        Utility.ajax(url, function (response) {
            var total = 0,
                jData = JSON.parse(response);
            jData.downloads.forEach(obj => {
                total += obj.downloads;
            });

            document.getElementById('angulartreegrid_download_count').innerHTML = Utility.formatNumber(total);
        });
    }

    function fetchAngularFixHeaderGridCount() {
        var currentDate = Utility.getCurrentDate(),
            url = "https://npm-stat.com/downloads/range/2020-05-10:" + currentDate + "/angular-fix-header-grid";

        Utility.ajax(url, function (response) {
            var total = 0,
                jData = JSON.parse(response);
            jData.downloads.forEach(obj => {
                total += obj.downloads;
            });

            document.getElementById('angularfixheadergrid_download_count').innerHTML = Utility.formatNumber(total);
        });
    }
    return {
        fetchNgTreeGridCount: fetchNgTreeGridCount,
        fetchAngularTreeGridCount: fetchAngularTreeGridCount,
        fetchAngularFixHeaderGridCount: fetchAngularFixHeaderGridCount,
    };
}();