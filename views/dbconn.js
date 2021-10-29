
module.exports={
  performProcess: function (res,sqlQuery,bind,indicator,redirect)
{
    const oracledb = require('oracledb');
    oracledb.autoCommit = true;
    oracledb.getConnection(
      {
        user : 'FC',
        password : 'football',
        connectString : 'localhost',
      },
      executeQuery,
    );
     function executeQuery(error,connection)
    {
      try
      {
         if(error) throw error;
        if(indicator!=5)
        { 
         connection.execute(sqlQuery,bind,{OutFormat : oracledb.OUT_FORMAT_ARRAY},
            function (error,result)
          {
            try
            {
              if(error) throw error;
              console.log('Successful Execution');
              console.log(result)
            if(indicator==1){
              const logic = require('./logic');
              logic.authorisation(res,result.rows);
            }
            else if(indicator==2)
            {
              res.send("Insertion was successully executed and committed !");
            }
            else if(indicator==3)
            {
              res.send("The DML UPDATE/DELETE operation was successfully executed and commited")
            }
            else if(indicator==7)
            {
              const logic = require('./logic');
              logic.player_mh(res,result,redirect);
            }
            else if(indicator==8)
            {
              const logic = require('./logic');
              logic.seasons_upcoming(res,result,redirect);
            }
            else if(indicator==9)
            {
              const logic = require('./logic');
              logic.orgmatch(res,result,redirect);
            }
            }
            catch(error)
            {
              res.send('An error occured while execution of the query : '+error);
              //res.send("Insertion was successully committed !");
            }
          });
        }
        else if(indicator==5)
        {
          connection.execute(sqlQuery,bind,{OutFormat : oracledb.OBJECT},
            function (error,result)
          {
            try
            {
              if(error) throw error;
              console.log('I am returning object')
              console.log('Successful Execution');
              console.log(result)
              const logic = require('./logic');
              logic.player(res,result,redirect);
            }
            catch(error)
            {
              console.log('There was a problem in obtaining the result of query : '+error);
            }
          });
        }
      }
      catch(error)
      {
        console.log('There was a problem executing the query'+error);
      }
      
    }
}
}
//console.log(res);
//performProcess(`SELECT * FROM authorisation`,['Dummy1','player','Player']);
