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

/* Obtenemos un array con los votes_with_party_pct de todos los miembros
y lo ordenamos de menor a mayor */
var vwp_pct = miembros.map(miembro => miembro.votes_with_party_pct);
vwp_pct.sort((a,b) => a-b);

var numMembers = miembros.length;

// Obtenemos el porcentaje ubicado en la posicion 10% del total (limite menor)
var bottom_10_pct_limit = vwp_pct[Math.round(numMembers * 0.1)-1];
// Obtenemos el porcentaje ubicado en la posicion 90% del total (limite mayor)
var top_10_pct_limit = vwp_pct[numMembers - Math.round(numMembers * 0.1)];

// Calcula los "votes_with_party" de un miembro
function vwp(m){
  return Math.round((m.total_votes - m.missed_votes) * m.votes_with_party_pct / 100);
}

// Ordena miembros de un array segun un "key" en un "order" indicado
function orderMembersByKey(array, key, order){
	array.sort((a,b) => ( order ? a[key]-b[key] : b[key]-a[key] ) );
}

/* Obtenemos un array con los miembros con porcentajes <= al limite menor,
mapeamos solamente los datos necesarios y lo ordenamos de menor a mayor */
var bottom_10_pct_members = miembros.filter(miembro => miembro.votes_with_party_pct <= bottom_10_pct_limit).map(miembro => m =
{
  first_name : miembro.first_name,
  middle_name : miembro.middle_name,
  last_name : miembro.last_name,
  votes_with_party: vwp(miembro),
  votes_with_party_pct : miembro.votes_with_party_pct
});

orderMembersByKey(bottom_10_pct_members, 'votes_with_party_pct', true);

/* Obtenemos un array con los miembros con porcentajes >= al limite mayor
mapeamos solamente los datos necesarios y lo ordenamos de mayor a menor */
var top_10_pct_members = miembros.filter(miembro => miembro.votes_with_party_pct >= top_10_pct_limit).map(miembro => m =
{
  first_name : miembro.first_name,
  middle_name : miembro.middle_name,
  last_name : miembro.last_name,
  votes_with_party: vwp(miembro),
  votes_with_party_pct : miembro.votes_with_party_pct
});

orderMembersByKey(top_10_pct_members,'votes_with_party_pct', false);

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

function getMembersByPct(array, key, botton_top){
	var reference = array.map(m => m[key]);
	reference.sort((a,b) => (botton_top ? a-b : b-a));
	//var limit =
	var extracion = array.filter(m => (m[key] <= limit));
}
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

console.log('\nSenate at a glance');
console.log(JSON.stringify(statistics));
console.log('\nLeast Loyal (Bottom 10% of Party)');
console.log(JSON.stringify(bottom_10_pct_members));
console.log('\nMost Loyal (Top 10% of Party)');
console.log(JSON.stringify(top_10_pct_members));
