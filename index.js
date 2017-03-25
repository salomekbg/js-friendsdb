$(document).ready(function() {
  $('.back-button, .edit-button, .delete-button, .edit-form').hide();

  getPeople();

  $('.add-button').click(function(event) {
    event.preventDefault();
    addPerson($('.add-name-field')[0].value, $('.add-city-field')[0].value);
  })

  $('.back-button').click(function(event) {
    event.preventDefault();
    getPeople();
  })

  $('.delete-button').click(function(event) {
    event.preventDefault();
    deletePerson($('h3')[0].id);
  })

  $('.edit-button').click(function(event) {
    event.preventDefault();
    editPerson($('h3')[0].id);
  })

  $('.update-button').click(function(event) {
    event.preventDefault();
    updatePerson($('.edit-name-field')[0].id, $('.edit-name-field')[0].value, $('.edit-city-field')[0].value);
  })
})

function getPeople() {
  $.ajax({
    url: 'http://localhost:3000/people',
    method: "GET",
  }).done(function(result){
    $('.result')[0].innerHTML = "";
    if (result.length === 0) {
      $('.result').append("<h3>You haven't added any friends yet!</h3>");
    } else {
      $('.result').append("<h3>Here is the list of your friends:</h3>");
      for (var i = 0; i < result.length; i++) {
        $('.result').append(`<h4 id=${result[i].id}>${result[i].name}</h4>`);
      };
    }
    $('.back-button').hide();
    $('.edit-button').hide();
    $('.delete-button').hide();
    $('.add-form').show();
    $('.add-name-field')[0].value = "";
    $('.add-city-field')[0].value = "";
    $('.edit-form').hide();
    clickPerson();
  })
}

function clickPerson() {
  var friendArray = $('h4')
  var idArray = []
  var endArray = []
  for (var i = 0; i < friendArray.length; i++) {
    idArray.push(friendArray[i].id);
  }
  for (var i = 0; i < friendArray.length; i++) {
    endArray.push("#".concat(friendArray[i].id));
  }
  var string = endArray.join(', ');
  $(string).click(function(event) {
    event.preventDefault();
    showPerson(event.target.id);
  })
}

function showPerson(id) {
  $.ajax({
    url: `http://localhost:3000/people/${id}`,
    method: "GET"
  }).done(function(result) {
    $('.result')[0].innerHTML = "";
    $('.result').append(`<h3 id=${result.id}>Name: ${result.name}</h3><h3>Favorite City: ${result.favoriteCity}</h3>`);
    $('.back-button').show();
    $('.edit-button').show();
    $('.delete-button').show();
    $('.add-form').hide();
    $('.edit-form').hide();
  })
}

function addPerson(name, favoriteCity) {
  if (name === "" || favoriteCity === "") {
    $('.result')[0].innerHTML = "";
    $('.result').append('<h3>Please enter BOTH a name and a favorite city.  One of your fields is not filled out!</h3>')
    $('.back-button').show();
  } else {
    $.ajax({
      url: 'http://localhost:3000/people/',
      method: "POST",
      data: {data: {name, favoriteCity}}
    }).done(function(result){
      showPerson(result.id)
    })
  }
}

function deletePerson(id) {
  $.ajax({
    url: `http://localhost:3000/people/${id}`,
    method: "DELETE"
  }).done(function() {
    getPeople()
  })
}

function editPerson(id) {
  $.ajax({
    url: `http://localhost:3000/people/${id}`,
    method: "GET"
  }).done(function(result) {
    $('.result')[0].innerHTML = "";
    $('.edit-form').show();
    $('.edit-name-field')[0].id = result.id;
    $('.edit-name-field')[0].value = result.name;
    $('.edit-city-field')[0].value = result.favoriteCity;
    $('.edit-button').hide();
    $('.delete-button').hide();
  })
}

function updatePerson(id, name, favoriteCity) {
  $.ajax({
    url: `http://localhost:3000/people/${id}`,
    method: "PUT",
    data: {data: {name, favoriteCity}}
  }).done(function(result) {
    showPerson(id);
  })
}
