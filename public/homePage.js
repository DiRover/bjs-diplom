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
        } else {
            moneyManager.setMessage(response.data);
        }
    })
}
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        } else {
            moneyManager.setMessage(response.data);
        }
    })
}
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        } else {
            moneyManager.setMessage(response.data);
        }
    })
}
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        MoneyManager.updateUsersList = response.data;
    }
})
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            MoneyManager.updateUsersList = response.data;
            favoritesWidget.setMessage(response.data);
        } else {
            favoritesWidget.setMessage(response.data);
        }
    })
}
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            MoneyManager.updateUsersList = response.data;
            favoritesWidget.setMessage(response.data);
        } else {
            favoritesWidget.setMessage(response.data);
        }
    })
}