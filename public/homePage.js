'use strict'

const logoutButton = new LogoutButton();
logoutButton.action = fn => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })        
}

ApiConnector.current( response => {
    if (response) {
        ProfileWidget.showProfile(response.data);
    }
})

const ratesBoard = new RatesBoard();
function currency() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
currency();
setInterval(currency, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(!response.success, "The money was added");
        } else {
            moneyManager.setMessage(!response.success, "The money wasn't added");
        }
    })
}
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(!response.success, "The money was converted");
        } else {
            moneyManager.setMessage(!response.success, "The money wasn't converted");
        }
    })
}
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(!response.success, "The money was sent");
        } else {
            moneyManager.setMessage(!response.success, "The money wasn't sent");
        }
    })
}
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(!response.success, "The user has been added");
        } else {
            favoritesWidget.setMessage(!response.success, "The user is not added");
        }
    })
}
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(!response.success, "The user has been removed");
        } else {
            favoritesWidget.setMessage(!response.success, "The user is not removed");
        }
    })
}