/** Add any JavaScript you need to this file. */
(function() {
    let products = {
        all: window.products,
        getByType: function(type) {
            return this.all.filter(elem => {
                return elem["type"] === type;
            })
        },
    };

    let divCreator = {
        clearBody: function(id) {
            document.getElementById(id).classList.add("displayNone");
        },
        clearShop: function() {
            var shop = document.getElementById("shop-return");
            while (shop.hasChildNodes()) shop.removeChild(shop.lastChild);
        },
        removeDisplayNone: function(id) {
            if (document.getElementById(id).classList.contains("displayNone")) {
                document.getElementById(id).classList.remove("displayNone");
            }
        },
        setHeader: function(type) {
            var heading1 = document.createElement("h1");
            switch(type){
                case "ps-console":
                    heading1.appendChild(document.createTextNode("PlayStations"));
                    break;
                case "xbox-console":
                    heading1.appendChild(document.createTextNode("Xbox"));
                    break;
                case "switch-console":
                    heading1.appendChild(document.createTextNode("Nintendo"));
                    break;
                case "accessories":
                    heading1.appendChild(document.createTextNode("Accessories"));
                    break;
                case "game":
                    heading1.appendChild(document.createTextNode("Games"));
                    break;
            }
            heading1.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
            heading1.style.textAlign = "left";
            heading1.style.fontSize = "30px";
            heading1.style.marginLeft = "30px";
            return heading1;
        },
        setProductContainer: function(product) {
            var container = document.createElement("div");
            container.classList.add("product");
            var img_container = document.createElement("div");
            img_container.style.background = "url(" + product["src"] + ") center no-repeat";
            img_container.style.backgroundSize = "cover";
            img_container.style.height = "300px";
            var productName = document.createElement("h4");
            productName.appendChild(document.createTextNode(product["name"]));
            container.appendChild(img_container);
            container.appendChild(productName);
            if (product["stock"] != 0) {
                if (product["memory"] != '') {
                    var memory = document.createElement("p");
                    memory.appendChild(document.createTextNode("Memory: " + product["memory"]));
                    container.appendChild(memory);
                }
                var price = document.createElement("p");
                price.appendChild(document.createTextNode("Price: $" + product["price"]));
                container.appendChild(price);
            } else {
                var outOfStock = document.createElement("p");
                outOfStock.appendChild(document.createTextNode("Out of Stock"));
                container.appendChild(outOfStock);
            }

            return container;
        },
        setContainer: function(products) {
            // Clear shop and disable displaynone for shop return
            this.clearBody("shop");
            this.removeDisplayNone("shop-return");
            this.removeDisplayNone("back-btn");
            // Clear shop return
            this.clearShop();

            var container = document.createElement("div");
            container.classList.add("product-container");

            for (var product of products) {
                var productContainer = this.setProductContainer(product);
                container.appendChild(productContainer);
            }
            document.getElementById("shop-return").appendChild(this.setHeader(products[0]["type"]));
            document.getElementById("shop-return").appendChild(container);
        }
    };

    function setupHandlers() {
        document.getElementById("ps-console").onclick = function() {
            divCreator.setContainer(products.getByType("ps-console"));
        };
        document.getElementById("xbox-console").onclick = function() {
            divCreator.setContainer(products.getByType("xbox-console"));
        };
        document.getElementById("switch-console").onclick = function() {
            divCreator.setContainer(products.getByType("switch-console"));
        };
        document.getElementById("accessories").onclick = function() {
            divCreator.setContainer(products.getByType("accessories"));
        };
        document.getElementById("games").onclick = function() {
            divCreator.setContainer(products.getByType("game"));
        };
        document.getElementById("shop-nav").onclick = function() {
            divCreator.removeDisplayNone("shop");
            divCreator.clearBody("shop-return");
            divCreator.clearBody("back-btn");
        }
        document.getElementById("back-btn").onclick = function() {
            divCreator.removeDisplayNone("shop");
            divCreator.clearBody("shop-return");
            divCreator.clearBody("back-btn");
        }
    }

    window.onload = setupHandlers;
})();