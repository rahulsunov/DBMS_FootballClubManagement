
module.exports = {
    authorisation:function(res,result)
{
    console.log('This is logic')
    console.log(result);
    
    if(result.length==0)
    {
        res.redirect('/');
    }
    else
    {
        res.redirect('/'+result[0][2].replace(' ','_'));
    }
},
player:function(res,result,redirect)
{
   let playerData = {}
   if(result.rows[0]!=undefined)
   {
     for(let i=0;i<result.rows.length;i++)
    {
      for(let j=0;j<result.rows[i].length;j++)
      {
          
           if(Object.keys(playerData).includes(result['metaData'][j].name,1))
           {

             if((result['metaData'][j].name=='MOBILENO' || result['metaData'][j].name=='EMAIL_ID') && !(playerData[result['metaData'][j].name]).includes(result['rows'][i][j]))
             {
               playerData[result['metaData'][j].name].push(result['rows'][i][j]);
             }

           }
           else
           {
             if(result['metaData'][j].name=='MOBILENO' || result['metaData'][j].name=='EMAIL_ID')
             {
             
                playerData[result['metaData'][j].name]=[result['rows'][i][j]];
             
            }
            else
            {
                playerData[result['metaData'][j].name]=result['rows'][i][j];
            }

           }
           console.log(result['metaData'][j]);
      }
    }
   
   //console.log(playerData);

    playerData['NAME']=playerData['FIRSTNAME']+" "+playerData['LASTNAME']

   delete playerData['FIRSTNAME'];
   delete playerData['LASTNAME'];
   playerData['DOB'] = JSON.stringify(playerData['DOB']).substring(1,11);
   playerData['MOBILENO']=Array.from(new Set(playerData['MOBILENO']))
   //playerData['EMAILID']=Array.from(new Set(playerData['EMAILID']))
}
   console.log(playerData);
   res.render(redirect,playerData);
},

player_mh:function(res,result,redirect)
{
  let matchdata={},temp={"r1":[]};

  for(let i=0;i<result.rows.length;i++)
  {
  
    if(result.rows[i][0]!=matchdata.MATCH_ID && matchdata.MATCH_ID!=undefined)
    {
      //matchdata['DATE_OF_MATCH']=JSON.stringify(matchdata['DATE_OF_MATCH']).substring(1,11);
      temp["r1"].push(matchdata);
      //rowcount++;
      matchdata={};
    }
    for(let j=0;j<result.metaData.length;j++)
    {
      //console.log(result.metaData[j])
      if(Object.keys(matchdata).includes(result.metaData[j].name))
      {
         if(result.metaData[j].name=='CONTACT' && !(matchdata[result['metaData'][j].name]).includes(result['rows'][i][j]) )
         {
           matchdata['CONTACT'].push(result.rows[i][j]);
           console.log("CONTACT added "+result.metaData['CONTACT'])
         }
      }
      else
      {
        if(result.metaData[j].name=='CONTACT')
         {
           matchdata['CONTACT']=[result.rows[i][j]];
           console.log("CONTACT created "+result.metaData['CONTACT'])
         }
         else
         {
          matchdata[result.metaData[j].name]=result.rows[i][j];
         }
      }
    }
  }
  //matchdata['DOM'] = JSON.stringify(matchdata['DOM']).substring(1,11);
  temp["r1"].push(matchdata);
  console.log(temp);
  res.render(redirect,temp);
},

seasons_upcoming:function(res,result,redirect)
{
   let seasondata={},final={"s1":[]};
   for(let i=0;i<result.rows.length;i++)
   {
    if(result.rows[i][0]!=seasondata.SN_NO && seasondata.SN_NO!=undefined)
    {
      //matchdata['DOM']=JSON.stringify(matchdata['DOM']).substring(1,11);
      final["s1"].push(seasondata);
      seasondata={};
    }
     for(let j=0;j<result.metaData.length;j++)
     {
        seasondata[result.metaData[j].name] = result.rows[i][j];
        //console.log(result.metaData[j].name+result.rows[i][j])
     }
   }
   final["s1"].push(seasondata);
   console.log(final);
   res.render(redirect,final);
}
,
orgmatch:function(res,result,redirect)
{
   let org={},final={"o1":[]};
   for(let i=0;i<result.rows.length;i++)
   {
     let flag=1;
     if(org.MATCHID!=undefined)
     {
     if(result.rows[i][0]!=org.MATCHID)
     {
       final["o1"].push(org);
       console.log(org)
       org={};
     }
     else
     {
      if(!org['TEAM'].includes(result.rows[i][6])) 
      {
       org['TEAM'].push(result.rows[i][6]);
      }
      if(!org['SID'].includes(result.rows[i][7])) 
      {
       org['SID'].push(result.rows[i][7]);
      }
      if(!org['SNAME'].includes(result.rows[i][8])) 
      {
       org['SNAME'].push(result.rows[i][8]);
      }
       flag=0;
     }
    }
     for(let j=0;j<result.metaData.length && flag!=0;j++)
     {
       if(result.metaData[j].name==="TEAM" || result.metaData[j].name==="SID" || result.metaData[j].name==="SNAME")
       {
        org[result.metaData[j].name] = [result.rows[i][j]];
       }
       else
       { 
        org[result.metaData[j].name] = result.rows[i][j];
       }
     }
     console.log(org)
   }
   final["o1"].push(org);
   console.log(final);
   res.render(redirect,final);
}

}