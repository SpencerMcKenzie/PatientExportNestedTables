


// DDX Bricks Wiki - See https://developer.domo.com/docs/ddx-bricks/getting-started-using-ddx-bricks
// for tips on getting started, linking to Domo data and debugging your app
 
//Step 1. Select your data from the link in the bottom left corner
 
 
//---------------------------------------------------
// For ultimate flexibility, modify the code below!
//---------------------------------------------------


//Available globals
var domo = window.domo; // For more on domo.js: https://developer.domo.com/docs/dev-studio-guides/domo-js#domo.get
var datasets = window.datasets;
var Query = window.Query;

//Data Column Names
var dataColumnName = 'Column1';
var tabulatorData = [];
const facNames = [];

/*STANDARD DOMO.GET*/

//domo.get('data/v1/dataset0').then(handleResult);
  var query = (new Query())
  .useBeastMode(true) // For information about using a Beast Mode see: https://developer.domo.com/docs/dev-studio-references/data-api#Beast%20Modes
  .select('PharmacyLocation','FacName','PatientName','PatBirthDate')
  //.groupBy('PharmacyLocation','FacName','PatientName','PatBirthDate')
  
 .query(datasets[0]); 
 //domo.get(query, {format: 'array-of-arrays'}).then(handleResult); //Original DOMO Code
 domo.get(query, {format: 'array-of-objects'}).then(handleResult); 


  
  
 

function handleResult(data){

console.log("handleResult data: ",data);

// let result = data.map(a => a.PatientName);
  let result = data.map(o => { return {PharmacyLocation: o.Column1, FacName: o.FacName ,PatientName: o.PatientName,PatBirthDate: o.PatBirthDate} })
  console.log("let result: ",result);

  var table = new Tabulator("#example-table", {
   data:facNames,
   //renderHorizontal:"virtual",
   //autoColumns:true,
   height:"311px",
   layout:"fitColumns",
   //layout:"fitDataTable",
   //layout:"fitDataStretch",
   columns:[
       {title:"Default Pharmacy Location", field:0}, //column has a fixed width of 100px;
       {title:"Patient Name", field:"1"},//column will be allocated 1/5 of the remaining space
       {title:"BirthDate", field:"2"}, //column will be allocated 3/5 of the remaining space
       {title:"FacName", field:"3"} // column has a default widthGrow of 1 and will be allocated 1/5 of the remaining space
    ],
    });

/*
  for (let i = 0; i < Object.values(data).length; i++){
 console.log("inside for loop: ");
 console.log("For Loop data Values: ",Object.values(data));

  //https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  let result = data.map(a => a.PatientName);
  
  console.log("let result: ",result);
  }
*/
  
  };


/*ORIGINAL DOMO CODE BELOW */
/*     
function createTheTable(data) {
  var max = 0;
  var min = 0;
  var cnt = 0;
  var total = 0;
  var size = data.length;

  for(var i = 0; i < size; i++){
    var row = data[i];
    total = total + row[dataColumnName];
    if (cnt == 0){
      max = row[dataColumnName];
      min = row[dataColumnName];
    }

    if (row[dataColumnName] > max){
      max = row[dataColumnName];
    }

    if (row[dataColumnName] < min){
      min = row[dataColumnName];
    }

    cnt = cnt+1;
  }

  document.getElementById("myDiv").innerHTML = `
    <table>
      <tr><th>Count</th><td>${toNumber(cnt)}</td></tr>
      <tr><th>Total</th><td>${toNumber(total)}</td></tr>
      <tr><th>Max</th><td>${toNumber(max)}</td></tr>
      <tr><th>Min</th><td>${toNumber(min)}</td></tr>
      <tr><th>Average</th><td>${toNumber(total/cnt)}</td></tr>
    </table>`;
}

function toNumber(x) {
  return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
*/
