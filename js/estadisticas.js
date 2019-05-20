var statistics = {
  "at_a_glance" : [
    {
      "party" : "Republican",
      "number_of_reps": 0,
      "votes_with_party_pct" : 0
    },
    {
      "party" : "Democrat",
      "number_of_reps": 0,
      "votes_with_party_pct" : 0
    },
    {
      "party" : "Independent",
      "number_of_reps": 0,
      "votes_with_party_pct" : 0
    },
  ],

  "total" :{
      "party" : "Total",
      "number_of_reps": 0,
      "votes_with_party_pct" : 0
    },

  "least_engaged" : [],

  "most_engaged" : [],
  
  "least_loyal" : [],

  "most_loyal" : []
};

function getMiembrosByParty(party){
	return(miembros.filter(miembro => miembro.party == party));
}

function getPorcentAvgOfParty(party){
	var promedio = (party.length>0?(party.reduce((suma,miembro)=>(suma + miembro.votes_with_party_pct),0)/party.length).toFixed(2):'-');
	return(promedio);
}

// Calcula los "votes_with_party" de un miembro
function vwp(m){
  return Math.round((m.total_votes - m.missed_votes) * m.votes_with_party_pct / 100);
}

// Ordena miembros de un array segun un "key" en un "order" indicado
function orderMembersByKey(array, key, order){
	array.sort((a,b) => ( order ? a[key]-b[key] : b[key]-a[key] ) );
}

//  Devuelve un array con la extraccion del pct% mayor/menor segun una "key"
function getMembersByPct(array, key, pct, bottom_top){
	// Obtienen lista de keys de referencia
  var reference = array.map(m => m[key]);
  // Ordena la lista de keys "bottom_top"
	reference.sort((a,b) => (bottom_top ? a-b : b-a));
  // Obtiene el key limite para comparar durante la extraccion
	var limit = reference[Math.round(array.length * pct/100)-1];
  // Extrae los elementos que cumplen con "key <= limit"
	var extract = array.filter(m => (bottom_top ? m[key] <= limit : m[key] >= limit));
  return (extract);
}

// Devuelve el nombre completo del miembro
function memberFullName(member){
  var name = member.first_name;
  name += (member.middle_name?' '+member.middle_name:'');
  name += ' ' + member.last_name;
  return(name);
}

// Almacena los datos utiles de "array" en el elemento "key" del objeto "statistics"
function storeStatistics(key, array){
  // Define los claves a almacenar segun el elemento "key" indicado
  var k1 = (key.endsWith('engaged')?'missed_votes':'votes_with_party');
  var k2 = (key.endsWith('engaged')?'missed_votes_pct':'votes_with_party_pct');
  array.forEach(
    function(m){
      var name = memberFullName(m);
      var votes = (k1.startsWith('missed') ? m[k1] : vwp(m));
      var pct = m[k2];
      statistics[key].push({
        'name' : name,
        [k1] : votes,
        [k2] : pct
      });
    }
  );
}

// Crea un array con los miembros de la camara
var miembros = data.results[0].members;

// Calcula estadisticas "De un vistazo"
var republicans = getMiembrosByParty("R");
var democrats = getMiembrosByParty("D");
var independents = getMiembrosByParty("I");

statistics.at_a_glance[0].number_of_reps = republicans.length;
statistics.at_a_glance[1].number_of_reps = democrats.length;
statistics.at_a_glance[2].number_of_reps = independents.length;

statistics.at_a_glance[0].votes_with_party_pct = getPorcentAvgOfParty(republicans);
statistics.at_a_glance[1].votes_with_party_pct = getPorcentAvgOfParty(democrats);
statistics.at_a_glance[2].votes_with_party_pct = getPorcentAvgOfParty(independents);

statistics.total.number_of_reps = statistics.at_a_glance.reduce((suma,party)=>(suma + party.number_of_reps),0);

// Totaliza los porcentajes "De un vistazo" en forma ponderada
statistics.total.votes_with_party_pct = (statistics.at_a_glance.reduce((suma,party)=>(suma + party.votes_with_party_pct * party.number_of_reps / statistics.total.number_of_reps),0)).toFixed(2);

var loyalty = document.getElementById("loyalty");
if(loyalty != null){
  /*  Obtiene un array del 10% de miembros MENOS LEALES,
      lo ordena de menor a mayor y almacena lo importante en 'statistics' */
  var bottom_10_pct_members = getMembersByPct(miembros, 'votes_with_party_pct', 10, true);
  orderMembersByKey(bottom_10_pct_members, 'votes_with_party_pct', true);
  storeStatistics('least_loyal', bottom_10_pct_members);

  /*  Obtiene un array del 10% de miembros MAS LEALES,
      lo ordena de mayor a menor  y almacena lo importante en 'statistics' */
  var top_10_pct_members = getMembersByPct(miembros, 'votes_with_party_pct', 10, false);
  orderMembersByKey(top_10_pct_members,'votes_with_party_pct', false);
  storeStatistics('most_loyal', top_10_pct_members);
}

var engaged = document.getElementById("engaged");
if(engaged != null){
  /*  Obtiene un array del 10% de miembros MENOS COMPROMETIDOS,
      lo ordena de mayor a menor y almacena lo importante en 'statistics' */
  var bottom_10_pct_members = getMembersByPct(miembros, 'missed_votes_pct', 10, false);
  orderMembersByKey(bottom_10_pct_members, 'missed_votes_pct', false);
  storeStatistics('least_engaged', bottom_10_pct_members);

  /*  Obtiene un array del 10% de miembros MAS COMPROMETIDOS,
      lo ordena de menor a mayor  y almacena lo importante en 'statistics' */
  var top_10_pct_members = getMembersByPct(miembros, 'missed_votes_pct', 10, true);
  orderMembersByKey(top_10_pct_members,'missed_votes_pct', true);
  storeStatistics('most_engaged', top_10_pct_members);
}

console.log(JSON.stringify(statistics));
