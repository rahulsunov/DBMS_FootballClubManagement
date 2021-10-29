
//Inclusion of module named 'express'.
const express=require("express"); 
const temp = require('./views/dbconn');
let user_details = []
//Calling the default constructor of class express.
const app=express();
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'))
//console.log(__dirname)
app.set('view-engine',"ejs");
//To lake input from the html form
app.use(express.urlencoded({extended : false}))


/*
This part is the routing part and hence it defines every route for the server .
In each function, req denotes request and res denotes response.
*/
app.get('/',(req,res)=>{
    res.render('index.ejs');
})
 
app.get('/login',(req,res)=>{
   
    res.render('login.ejs');
})

app.get('/Player',(req,res)=>{
  if(user_details!=[])
  {
    console.log(user_details[0]);
    temp.performProcess(res,`SELECT * FROM Player NATURAL JOIN Team NATURAL JOIN Player_MobileNo NATURAL JOIN Player_EmailID WHERE USERNAME=:0`,[user_details[0]],5,'Player.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
})

app.get('/Player/UpcomingMatches',(req,res)=>{
  if(user_details!=[])
  {  
    //res.render('PLayer-Page/MatchHistory.ejs');
    temp.performProcess(res,`
    SELECT MATCH_ID,SEASON_NO,EMPLOYEE_ID,GROUND,POSITION,m.Team AS Opponent,Email_ID AS CONTACT,p.Team_Name,Date_of_match 
    FROM 
    match NATURAL JOIN match_management m INNER JOIN Player p 
    ON p.Team_Name<>m.Team 
    NATURAL JOIN Employee_EmailID 
    WHERE Username=:0 
    AND Date_of_match>=SYSDATE order by match_id
    `,[user_details[0]],7,'PLayer-Page/UpcomingMatches.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
})

app.get('/Player/MatchHistory',(req,res)=>{
  if(user_details!=[])
  {  
    //res.render('PLayer-Page/MatchHistory.ejs');
    temp.performProcess(res,`
    SELECT MATCH_ID,SEASON_NO,EMPLOYEE_ID,GROUND,POSITION,m.Team AS Opponent,(SELECT NVL((SELECT 'Won' FROM DUAL WHERE Winner=p.Team_Name),'Lost') FROM DUAL) AS STATUS,Email_ID AS CONTACT,p.Team_Name,Date_of_match 
    FROM 
    match NATURAL JOIN match_management m INNER JOIN Player p 
    ON p.Team_Name<>m.Team 
    NATURAL JOIN Employee_EmailID 
    WHERE Username=:0
    AND Date_of_match<SYSDATE order by match_id
    `,[user_details[0]],7,'PLayer-Page/MatchHistory.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
})

app.get('/Player/CoachDetails',(req,res)=>{
  if(user_details!=[])
  {
    console.log(user_details[0]);
    temp.performProcess(res,`SELECT * FROM COACH INNER JOIN Player ON Coach.Team_Name=Player.Team_Name NATURAL JOIN COACH_MOBILENO NATURAL JOIN COACH_EMAILID WHERE Player.Username=:0`,[user_details[0]],5,'PLayer-Page/CoachDetails.ejs');
  }
})

app.get('/Seasons_Manager',(req,res)=>{
  if(user_details!=[])
  {
    console.log(user_details[0]);
    temp.performProcess(res,`
    select * from employee natural join employee_mobileno natural join employee_emailid where Username=:0 AND Occupation=:1
    `,[user_details[0],user_details[2]],5,'Seasons Manager.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
}) 

app.get('/Seasons_Manager/UpcomingSeasons',(req,res)=>{
  //res.render('Seasons Manager-Page/UpcomingSeasons.ejs');
  if(user_details!=[])
  {  
    //res.render('PLayer-Page/MatchHistory.ejs');
    temp.performProcess(res,`
    SELECT seasons_no,season_name,begin_date,end_date FROM SEASONs NATURAL JOIN EMPLOYEE WHERE BEGIN_DATE>SYSDATE AND Username=:0
    `,[user_details[0]],8,'Seasons Manager-Page/UpcomingSeasons.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
}) 

app.get('/Seasons_Manager/SeasonHistory',(req,res)=>{
  //res.render('Seasons Manager-Page/SeasonHistory.ejs');
  if(user_details!=[])
  {  
    //res.render('PLayer-Page/MatchHistory.ejs');
    temp.performProcess(res,`
    SELECT sn_no,season_name,begin_date,end_date FROM SEASON NATURAL JOIN EMPLOYEE WHERE BEGIN_DATE<SYSDATE AND END_DATE<SYSDATE AND Username=:0
    `,[user_details[0]],8,'Seasons Manager-Page/SeasonHistory.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
}) 

app.get('/Seasons_Manager/OngoingSeasons',(req,res)=>{
  //res.render('Seasons Manager-Page/OngoingSeasons.ejs');
  if(user_details!=[])
  {  
    //res.render('PLayer-Page/MatchHistory.ejs');
    temp.performProcess(res,`
    SELECT seasons_no,season_name,begin_date,end_date FROM SEASONs NATURAL JOIN EMPLOYEE WHERE SYSDATE BETWEEN BEGIN_DATE AND END_DATE AND Username=:0
    `,[user_details[0]],8,'Seasons Manager-Page/OngoingSeasons.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
}) 

app.get('/Match_Manager',(req,res)=>{
  if(user_details!=[])
  {
    console.log(user_details[0]);
    temp.performProcess(res,`
    select * from employee natural join employee_mobileno natural join employee_emailid where Username=:0 AND Occupation=:1
    `,[user_details[0],user_details[2]],5,'Match Manager.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
  //res.render('Match Manager.ejs');
})

app.get('/Match_Manager/UpcomingMatches',(req,res)=>{
  if(user_details!=[])
  {  
    //res.render('PLayer-Page/MatchHistory.ejs');
    temp.performProcess(res,`
    select match_id,date_of_match,ground,city,team,sponsor_id,sponsor_name from sponsor natural join sponsor_match natural join match natural join match_management inner join employee on match.Employee_id=employee.Employee_Id natural join ground where Username=:0 and date_of_match>SYSDATE order by date_of_match desc,match_id
    `,[user_details[0]],9,'Match Manager/UpcomingMatches.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
  //res.render('Match Manager/UpcomingMatches.ejs');
})

app.get('/Match_Manager/MatchHistory',(req,res)=>{
  if(user_details!=[])
  {  
    //res.render('PLayer-Page/MatchHistory.ejs');
    temp.performProcess(res,`
    select match_id,date_of_match,ground,city,team,sponsor_id,sponsor_name,winner from city_state natural join state_country natural join sponsor natural join sponsor_match natural join match natural join match_management inner join employee on match.Employee_id=employee.Employee_Id natural join ground where Username=:0 and date_of_match<SYSDATE ORDER BY date_of_match,match_id
    `,[user_details[0]],9,'Match Manager/MatchHistory.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
 //res.render('Match Manager/MatchHistory.ejs');
})

app.get('/DBA',(req,res)=>{
  if(user_details!=[])
  {
    console.log(user_details[0]);
    temp.performProcess(res,`
    select * from employee natural join employee_mobileno natural join employee_emailid where Username=:0 AND Occupation=:1
    `,[user_details[0],user_details[2]],5,'DBA.ejs');
  }
  else
  {
    res.render('Unauthorised.ejs');
  }
}) 

app.get('/DBA/insert',(req,res)=>{
    res.render('DBA-Page/insert.ejs');
}) 

app.get('/DBA/update',(req,res)=>{
    res.render('DBA-Page/update.ejs');
}) 

app.get('/DBA/delete',(req,res)=>{
  res.render('DBA-Page/delete.ejs');
}) 

//The task that has to be performed after the all the required attributes of the form are filled.
app.post('/login',(req,res)=>{
    //Taking the input of the login form for authentication.
    user_details=[req.body.User,req.body.Password,req.body.Occupation];
    temp.performProcess(res,'SELECT * FROM AUTHORISATION WHERE USERNAME=:1 AND PASSWORD=:2 AND OCCUPATION=:3',user_details,1,"");
    
})

app.post('/DBA/insert',(req,res)=>{
    let ListOfAttributes={
        "Authorisation":["Username","Password","Occupation"],
        "Team":["Team_Name","Wins","Losses","Draws"],
        "Ground":["Ground_Name","Country","State","City","No_of_seats"],
        "Coach":["CID","CFirstName","CMiddleName","CLastName","CDOB","CTeam_Name","CClubpts","CUsername"],
        "Coach_EmailID":["ECID","CEmailID"],
        "Coach_MobileNo":["MCID","CMobileNo"],
        "Player":["PID","PFirstName","PMiddleName","PLastName","PDOB","Position","PTeam_Name","PClubpts","PUsername"],
        "Player_EmailID":["EPID","PEmailID"],
        "Player_MobileNo":["PPID","PMobileNo"],
        "Employee":["EID","EFirstName","EMiddleName","ELastName","EDOB","EOccupation","EClubpts","EUsername"],
        "Employee_EmailID":["EEID","EEmailID"],
        "Employee_MobileNo":["EEID","EMobileNo"],
        "Match":["MID","dom","Mwinner","Ground","MSNO","MEID"],
        "Match_Management":["MMID","MTeam","Score"],
        "Seasons":["SNO","SName","Bdate","Edate","SWinner","SEID"],
        "Sponsor":["SID","SpName"], 
        "Sponsor_Match":["MSID","Match"],
        "Sponsor_Team":["SSID","STeam"],
        "Medical_Aid":["MedID","MedName","MedPur","MAQuantity"],
        "Medical_Aid_Distribution":["DMedID","MGroundName"],
        "Sports_Equipment":["EqID","EName","OQuantity","SAQuantity"],
        "Sports_Equipment_Distribution":["DeqID","SGroundName"],
        }
    let entity = req.body.todo;
    let attributes = ListOfAttributes[entity];
    let insert_values=[];
   console.log(entity);
   for(var i=0;i<attributes.length;i++)
   {
       insert_values.push(req.body[attributes[i]]);
   }
   console.log(insert_values);
   let insert_str="";
   for(let i=1;i<=attributes.length;i++)
   {
       insert_str+=":"+i+",";
   }
   insert_str = insert_str.substring(0, insert_str.length - 1);
   console.log(insert_str);
   temp.performProcess(res,"INSERT INTO "+entity+" VALUES("+insert_str+")",insert_values,2,"");
   
})

app.post('/DBA/delete',(req,res)=>{
    console.log(req.body);
    let tableName = req.body.todo;
    let attributeNames= req.body[tableName+"_Attributes"];
     if(Array.isArray(attributeNames)===false)
     {
       attributeNames = [attributeNames];
     }
    console.log(attributeNames);
    let conditions = req.body["conditions"];
    if(Array.isArray(conditions)===false)
     {
       conditions = [conditions];
     }
    console.log(conditions);
    let check_values = req.body["Values"];
    if(Array.isArray(check_values)===false)
     {
       check_values = [check_values];
     }
    console.log(check_values);
    let logic = req.body["logical"];
    if(Array.isArray(logic)===false)
     {
        logic = [logic];
     }
    console.log(logic);
    let sqlQuery="DELETE FROM "+tableName+" WHERE ";
    for(let i=0;i<attributeNames.length;i++)
    {
        
        sqlQuery+=attributeNames[i]+conditions[i]+":"+(i);
        console.log(sqlQuery);
        if(i!=attributeNames.length-1 && attributeNames.length>1)
        {
          sqlQuery+=" "+logic[i]+" ";
        }
    }

    console.log(sqlQuery);
    temp.performProcess(res,sqlQuery,check_values,3,"");

})

app.post('/DBA/update',(req,res)=>{
   console.log(req.body);
   let tableName = req.body.todo;
   let dml = "UPDATE "+tableName+" SET ";
   let setAttributes = req.body.Authorisation_Attributes_set;
   if(Array.isArray(setAttributes)===false)
   {
     setAttributes = [setAttributes];
   }
   let setValues = req.body.Values_set;
   if(Array.isArray(setValues)===false)
   {
    setValues = [setValues];
   }
   for(let i=0;i<setAttributes.length;i++)
   {
     dml+=setAttributes+"="+":"+i+",";
   }
     dml=dml.substring(0,dml.length - 1)
     dml+=" WHERE"
   let Where = req.body.Authorisation_Attributes_where;
   if(Array.isArray(Where)===false)
   {
     Where = [Where];
   }
   let op = req.body.conditions;
   if(Array.isArray(op)===false)
   {
     op = [op];
   }
   let whereValues = req.body.Values_where;
   if(Array.isArray(whereValues)===false)
   {
    whereValues = [whereValues];
   }
   let lop = req.body.logical;
   if(Array.isArray(lop)===false)
   {
     lop = [lop];
   }
   for(let i=0;i<Where.length;i++)
   {
     dml+=" "+Where[i]+op[i]+":"+(setAttributes.length+i)+" ";
     if(i>0)
     {
       dml+=lop[i-1];
     }
   }
   console.log(dml);
   temp.performProcess(res,dml,req.body.Values,3,"");
})

//This denotes the port number where the website should be deployed (here, it is 3000 port no.)
app.listen(3000);