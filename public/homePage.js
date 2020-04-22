'use strict'

const logoutButton = new LogoutButton();
logoutButton.action = fn => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })        
}
ApiConnector.current = fn => {
    if (response.success) {
        ProfileWidget.showProfile(response);
    }
}

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