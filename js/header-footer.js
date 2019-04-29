// **************************************************************
// Agrega una cabecera a un contenedor <header> con id="cabecera"
// **************************************************************
var cabecera = document.getElementById("cabecera");

cabecera.innerHTML = '\
<div class="row align-items-center">\
  <div class="col-md-2">\
    <a href="home.html"><img src="img/tgif-logo.png" class="img-fluid rounded" alt="tgif-logo"></a>\
  </div>\
  <div class="col-md-8 text-center">\
    <h2>Transparent Government in Fact</h2>\
  </div>\
  <div class="col-md-2 text-right">\
    <span class="fa fa-envelope"></span>\
    <a href="mailto:info@tgif.net">info@tgif.net</a>\
  </div>\
</div>\
';

// ***************************************************************************
// Agrega un contenedor con checkboxs y dropdown para filtrar con id="filtros"
// ***************************************************************************
var filtros = document.getElementById("filtros");
if(filtros != null){
  filtros.innerHTML = '\
  <div class="row align-items-center">\
    <div class="col-md-9">\
      Filter by Party:\
      <label class="mx-2" for="republican">\
        <input checked type="checkbox" id="republican" name="party" value="R" /> Republican</label>\
      <label class="mx-2" for="democrat">\
        <input checked type="checkbox" id="democrat" name="party" value="D" /> Democrat</label>\
      <label class="mx-2" for="independent">\
        <input checked type="checkbox" id="independent" name="party" value="I" />\ Independent</label>\
    </div>\
    <div class="col-md-2 text-right">\
      <span>Filter by State</span>\
    </div>\
    <div class="col-md-1">\
      <select class="form-control px-0" id="dropStates">\
        <option value="">All</option>\
      </select>\
    </div>\
  </div>\
  ';
}

// ***************************************************
// Agrega un pie a un contenedor <footer> con id="pie"
// ***************************************************

var pie = document.getElementById("pie");
pie.innerHTML = '\
<div class="footer-copyright text-center align-items-center border border-secondary rounded">\
  <h5 class="my-1">©2019 TGIF | All Rights Reserved</h5>\
</div>\
';