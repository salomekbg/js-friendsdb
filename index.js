$(document).ready(function() {
  $('.back-button, .edit-button, .delete-button').hide();

  getPeople();

  $('.add-button').click(function(event) {
    event.preventDefault();
    addPerson($('.name-field')[0].value, $('.city-field')[0].value);
  })

  $('.back-button').click(function(event) {
    event.preventDefault();
    getPeople();
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
    $('.name-field')[0].value = "";
    $('.city-field')[0].value = "";
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

function addPerson(name, favoriteCity) {
  $.ajax({
    url: 'http://localhost:3000/people/',
    method: "POST",
    data: {data: {name, favoriteCity}}
  }).done(function(result){
    showPerson(result.id)
  })
}

function showPerson(id) {
  $.ajax({
    url: `http://localhost:3000/people/${id}`,
    method: "GET"
  }).done(function(result) {
    $('.result')[0].innerHTML = "";
    $('.result').append(`<h3 id=${result.id}>Name: ${result.name}</a></h3><h3>Favorite City: ${result.favoriteCity}</h3>`);
    $('.back-button').show();
    $('.edit-button').show();
    $('.delete-button').show();
    $('.add-form').hide();
  })

}
