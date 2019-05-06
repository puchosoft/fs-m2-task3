var statistics = {
  "Senate_at_a_glance" : [
    {
      "Party" : "Republican",
      "Number_of_Reps": 0,
      "%_Voted_with_Party" : 0
    },
    {
      "Party" : "Democrat",
      "Number_of_Reps": 0,
      "%_Voted_with_Party" : 0
    },
    {
      "Party" : "Independent",
      "Number_of_Reps": 0,
      "%_Voted_with_Party" : 0
    }
  ],
        
  "Least_Engaged" : [
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
  ]
};

// Crea un array con los miembros de la camara
var miembros = data.results[0].members;

var republicans = miembros.filter(miembro => {
  if(miembro.party == "R"){
    return miembro;
  }
});

var democrats = miembros.filter(miembro => {
  if(miembro.party == "D"){
    return miembro;
  }
});

var independents = miembros.filter(miembro => {
  if(miembro.party == "I"){
    return miembro;
  }
});

statistics.Senate_at_a_glance[0].Number_of_Reps = republicans.length;
statistics.Senate_at_a_glance[1].Number_of_Reps = democrats.length;
statistics.Senate_at_a_glance[2].Number_of_Reps = independents.length;

console.log(JSON.stringify(statistics));