const oracledb = require('oracledb');
var answer;
const connection = oracledb.getConnection({
    user: 'FC',
    password : 'football',
    connectString : 'localhost',
    },
    d
);
function d(err,connection){
connection.execute('SELECT * FROM EMPLOYEE_20BAI1153',{},{ outFormat: oracledb.ARRAY },
    function (err,result)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);
            
        }
    });
}
//console.log(answer);




//Inclusion of the oracledb module.
const oracledb = require("oracledb");
// Establishing the connection with the database with username FC and password football.
oracledb.getConnection(
{
user : "FC",
password : "football",
connectString : "localhost",
},
connExecute// After connection execution of the required sql query.
);
function connExecute(err, connection)
{
//Handling errors in the connection and display them on the terminal.
if (err) {
    console.error(err.message);
    return; 
}
let sql = "SELECT * FROM AUTHORISATION";// the SQL query that has to be executed.
connection.execute(sql, {}, { outFormat: oracledb.ARRAY }, // Executing the SQL Query and mentioning the format of the output which can be an object or an array.
    function(err, result)
    {// To convey the error in the execution of the query on the terminal.
        if (err) {
            console.error(err.message);
            connRelease(connection);//Closing the connection.
            return;
        }
        //console.log(result.metaData);
        //console.log(result.rows);
        let temp=result.rows;//Storing the result of the query.
        let flag=0;
        //console.log(temp);
        for(var i=0;i<temp.length;i++)
        {
            
            if(JSON.stringify(b)===JSON.stringify(temp[i]))
            {
                res.redirect('/'+b[2]);
                flag=1;
                break;
            }
        }
        if(flag==0)
        {
            res.redirect('/');
        }
        connRelease(connection);
    });