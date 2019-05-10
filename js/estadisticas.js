var statistics = {
  "Senate_at_a_glance" : [
    {
      "Party" : "Republican",
      "Number_of_Reps": 0,
      "votes_with_party_pct" : 0
    },
    {
      "Party" : "Democrat",
      "Number_of_Reps": 0,
      "votes_with_party_pct" : 0
    },
    {
      "Party" : "Independent",
      "Number_of_Reps": 0,
      "votes_with_party_pct" : 0
    },
  ],
  
  "Total" :{
      "Party" : "Total",
      "Number_of_Reps": 0,
      "votes_with_party_pct" : 0
    },
        
/*  "Least_Engaged" : [
    {
      "Name" : "",
      "Number_of_Missed_Votes" : 0,
      "%_Missed" : 0
    }
  ],
  
  "Most_Engaged" : [
    {
      "Name" : "",
      "Number_of_Missed_Votes" : 0,
      "%_Missed" : 0
    }
  ],
  
  "Least_Loyal" : [
    {
      "Name" : "",
      "Number_Party_Votes" : 0,
      "%_Party_Votes" : 0
    }
  ],
  
  "Most_Loyal" : [
    {
      "Name" : "",
      "Number_Party_Votes" : 0,
      "%_Party_Votes" : 0
    }
  ] */
};
function getMiembrosByParty(party){
	return(miembros.filter(miembro => miembro.party == party));
}

function getPorcentAvgOfParty(party){
	var promedio = (party.length>0?(party.reduce((suma,miembro)=>(suma + miembro.votes_with_party_pct),0)/party.length).toFixed(2):'-');
	return(promedio);
}

// Crea un array con los miembros de la camara
var miembros = data.results[0].members;

var republicans = getMiembrosByParty("R");
var democrats = getMiembrosByParty("D");
var independents = getMiembrosByParty("I");

statistics.Senate_at_a_glance[0].Number_of_Reps = republicans.length;
statistics.Senate_at_a_glance[1].Number_of_Reps = democrats.length;
statistics.Senate_at_a_glance[2].Number_of_Reps = independents.length;

statistics.Senate_at_a_glance[0].votes_with_party_pct = getPorcentAvgOfParty(republicans);
statistics.Senate_at_a_glance[1].votes_with_party_pct = getPorcentAvgOfParty(democrats);
statistics.Senate_at_a_glance[2].votes_with_party_pct = getPorcentAvgOfParty(independents);

statistics.Total.Number_of_Reps = statistics.Senate_at_a_glance.reduce((suma,party)=>(suma + party.Number_of_Reps),0);

// Totalizamos los porcentajes de cada partido en forma ponderada
statistics.Total.votes_with_party_pct = (statistics.Senate_at_a_glance.reduce((suma,party)=>(suma + party.votes_with_party_pct * party.Number_of_Reps / statistics.Total.Number_of_Reps),0)).toFixed(2);

console.log(JSON.stringify(statistics));