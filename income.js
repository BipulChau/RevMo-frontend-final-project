console.log("in income.js")
let incomeTable = document.getElementById('income-table');
let userId = sessionStorage.getItem('userId')
console.log("user Id: ", userId)

let column = document.getElementById('tables-column');
let numMonths = 3;
let today = new Date();
let month = today.getMonth()+1;
var year = today.getFullYear();


window.addEventListener('load', async (e) => {
    let res = await fetch (`http://${url}:8080/user`, { //--------------------!!!------------
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        }
    });
    let data = await res.json();
    console.log("data");
    console.log(data);
    console.log(data.accounts)
    addTableForAccount(data.accounts);
    
})



console.log(today, today.getMonth()+1, today.getFullYear())


async function addTableForAccount(accounts) {
    console.log(isIterable(accounts));
    if (isIterable(accounts)) {
        for (account of accounts){
            
            let aId = account.accountId;
            console.log("aId", aId);

            
            let income = await fetch (`http://${url}:8080/trx/income-by-account/${aId}/${month}/${year}`, {
                'credentials': 'include',
                'method': 'GET',
                'headers': {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json'
                }
            });
            let incomeData = await income.json();
            console.log("incomeData", incomeData);
            console.log("status", income.status)
            
            
            if(incomeData > -1) {
                
                let header = document.createElement('h2');
                header.classList.add('is-size-4');
                header.innerHTML = `Account ${account.accountId} <span class="is-size-5">(${account.typeName})</span>`;
                column.appendChild(header);
                let table = document.createElement('table');
                table.classList.add('table', 'has-text-centered', 'is-fullwidth')
                table.innerHTML = "<thead><tr class=\"has-text-centered\"><th>Year</th> <th>Month</th><th>Total Income</th></tr></thead>";
                let body = document.createElement('tbody');
                body.innerHTML = "";
                

                let row = document.createElement('tr');
                let yearCell = document.createElement('td');
                yearCell.innerHTML = `<p>${year}</p>`;
                let monthCell = document.createElement('td');
                monthCell.innerHTML = `${months[month-1]}`;
                let income = document.createElement('td');
                income.innerHTML = `${numWCommas((incomeData/100).toFixed(2))}`;
                
                row.appendChild(yearCell);
                row.appendChild(monthCell);
                row.appendChild(income);                
                body.appendChild(row);
            
               
                
                table.appendChild(body);
                column.appendChild(table);
            }
            
            
    
        }
    }
    
    
}



function addIncomeToTable(transactions){
    console.log(isIterable(transactions))
    if (isIterable(transactions)){
        for (transx of transactions) {
            console.log(transx);
    
            let row = document.createElement('tr');
            let date = document.createElement('td');
            date.innerHTML = new Date(transx.requestTime).toLocaleDateString();
            let amount = document.createElement('td');
            amount.innerHTML = transx.amount;
            let descrip = document.createElement('td');
            descrip.innerHTML = transx.description;
            let status = document.createElement('td');
            status.innerHTML = transx.typeName;
            let account = document.createElement('td');
            account.innerHTML = transx.receivingId;
    
            row.appendChild(date);
            row.appendChild(amount);
            row.appendChild(descrip);
            row.appendChild(status);
            row.appendChild(account);
            
    
            body.appendChild(row);
    
        }
    }
   
}