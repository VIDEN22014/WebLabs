(function (global) {
    var ns = {};

    var categoriesHtml = "snippets/category-snippet.html";
    var categoryItemHtml = "snippets/item-snippet.html";
    var allCategoriesUrl = "db/categories.json";
    var categoryItemUrl = "db/categories/";

    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='WebLabs/Lab9/db/categories/loading.png' alt='loading'></div>";
        insertHtml(selector, html);
        insertHtml("#mainCaption", "Loading...");
    };

    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
            .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    //on page load
    document.addEventListener("DOMContentLoaded", function (event) {
        showLoading("#main-content");
        ns.loadCategories();
    });

    ns.loadCategories = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            allCategoriesUrl,
            buildCategoriesHTML);
    }

    ns.loadCategoryItems = function (categotyShortName, categoryName) {
        showLoading("#main-content");
        ns.categoryName = categoryName;
        ns.categotyShortName = categotyShortName;
        if (categoryName == "Specials") {
            $ajaxUtils.sendGetRequest(
                allCategoriesUrl,
                function (categories) {
                    var randomIndex = Math.floor(Math.random() * (categories.length - 1));
                    ns.loadCategoryItems(categories[randomIndex].shortnameCategory, categories[randomIndex].name);
                });
        } else {
            $ajaxUtils.sendGetRequest(
                categoryItemUrl + categotyShortName + "/" + categotyShortName + ".json",
                buildItemsHTML);
        }

    }

    function buildCategoriesHTML(categories) {
        insertHtml("#mainCaption", "Categories");
        $ajaxUtils.sendGetRequest(
            categoriesHtml,
            function (responseText) {
                var html = "";
                var htmlSample = responseText;

                for (let i = 0; i < categories.length; i++) {
                    var htmlPart = insertProperty(htmlSample, "name", categories[i].name);
                    htmlPart = insertProperty(htmlPart, "id", categories[i].id);
                    htmlPart = insertProperty(htmlPart, "shortnameCategory", categories[i].shortnameCategory);
                    htmlPart = insertProperty(htmlPart, "notes", categories[i].notes);
                    html += htmlPart;
                }
                insertHtml("#main-content", html);
            },
            false);
    }

    function buildItemsHTML(categoryItems) {
        insertHtml("#mainCaption", ns.categoryName);
        $ajaxUtils.sendGetRequest(
            categoryItemHtml,
            function (responseText) {
                var html = "";
                var htmlSample = responseText;
                for (let i = 0; i < categoryItems.length; i++) {
                    var htmlPart = insertProperty(htmlSample, "name", categoryItems[i].name);
                    htmlPart = insertProperty(htmlPart, "shortname", categoryItems[i].shortname);
                    htmlPart = insertProperty(htmlPart, "categoryShortname", ns.categotyShortName);
                    htmlPart = insertProperty(htmlPart, "price", categoryItems[i].price);
                    htmlPart = insertProperty(htmlPart, "notes", categoryItems[i].notes);
                    htmlPart = insertProperty(htmlPart, "description", categoryItems[i].description);
                    html += htmlPart;
                }
                insertHtml("#main-content", html);
            },
            false);
    }

    global.$ns = ns;

})(window)