function populateTables(){
    console.log("Populate tables")
    var pos_stock_arr = [["images/stocks/zoom.png", "Zoom", "ZM", "+592.49%"],
                        ["images/stocks/TT.jpeg","Trilliuem Therapeutic",  "TRIL", "+1,776.95% "],
                        ["images/stocks/netflix.png", "Netflix", "NFLX", "+49.46%"],
                        ["images/stocks/Nvidia.png", "Nvidia", "NVDA", "+123.02%"],
                        ["images/stocks/peloton.png", "Peloton", "PTON", "+280.04%"]
                ]
    var table = document.getElementById("stockTable1");
    for(var i = 0; i < pos_stock_arr.length; i++)
    {
        // create a new row
        var newRow = table.insertRow(table.length);
        for(var j = 0; j < pos_stock_arr[i].length; j++)
        {
            // create a new cell
            var cell = newRow.insertCell(j);
            if(j===0){
                //should be image cell
                var img = document.createElement("img")
                img.setAttribute("src", pos_stock_arr[i][j])
                img.setAttribute("height", "30");
                img.setAttribute("width", "50")
                cell.appendChild(img)
                continue;
            }
            
            // add value to the cell
            cell.innerHTML = pos_stock_arr[i][j];
        }
    }
    populateTables2()
}

function showTables(){
    var table1 = document.getElementById("stockTable1");
    var table2 = document.getElementById("stockTable2");
    if (table1.style.display == "none") {
        table1.style.display = "block";
        table2.style.display = "none";
      } else {
        table1.style.display = "none";
        table2.style.display = "block";
      }
    }

function populateTables2(){
    console.log("Populate tables2")
    var pos_stock_arr = [["images/stocks/boeing.png", "Boeing", "ZM", "-35.96%"],
                        ["images/stocks/OIL.png","Oil States International",  "TRIL", "-71.77%"],
                        ["images/stocks/AE.jpeg", "American Express Co", "NFLX", "-4.28%"],
                        ["images/stocks/cc.png", "Coca-Cola Co", "NVDA", "-7.07% "],
                        ["images/stocks/Pfizer.png", "Pfizer Inc.", "PTON", "-2.57%"]
                ]
    var table = document.getElementById("stockTable2");
    for(var i = 0; i < pos_stock_arr.length; i++)
    {
        // create a new row
        var newRow = table.insertRow(table.length);
        for(var j = 0; j < pos_stock_arr[i].length; j++)
        {
            // create a new cell
            var cell = newRow.insertCell(j);
            if(j===0){
                //should be image cell
                var img = document.createElement("img")
                img.setAttribute("src", pos_stock_arr[i][j])
                img.setAttribute("height", "30");
                img.setAttribute("width", "50")
                cell.appendChild(img)
                continue;
            }
            
            // add value to the cell
            cell.innerHTML = pos_stock_arr[i][j];
        }
    }
}