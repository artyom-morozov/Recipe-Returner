
// usefull function borrowed from https://benjamin-schweizer.de/jquerypostjson.html
$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'contentType': 'application/json',
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback
    });
};


function getRecipes(){
  let userText = $('#userTextField').val();
  if (userText === '') {
    return alert('Please enter Ingridients')
  }

  $.postJSON("userText", {text: userText}, function(data, status) {
    //console.log("data recieved: "+data)
    //console.log("Type: "+typeof data)
    let responseObj = JSON.parse(data);
    if (responseObj.count > 0){
      let recipesDiv = document.getElementById('recipes')
      recipesDiv.innerHTML = ''
      let counter = 0;
      for (i =0; i< 10; i++) {
        recipesDiv.innerHTML = recipesDiv.innerHTML + `
        <div id="row${i+1}"class="row">
        </div>
        `
        let rowDiv = document.getElementById(`row${i+1}`)
        for (j = 0; j < 3;j++){
          rowDiv.innerHTML = rowDiv.innerHTML + `
          <div class='column'>
            <div class="gallery">
              <a target="_blank" href=${responseObj.recipes[counter].source_url}>
                <img src=${responseObj.recipes[counter].image_url} alt="Cinque Terre">
              </a>
              <div><h3 class="desc">${responseObj.recipes[counter].title}</h3></div>
            </div>
          </div>
          `
          counter++;
          }
        }
    }
  })
}






const ENTER=13

$(document).ready(function() {
  //This is called after the broswer has loaded the web page
  $("#userTextField").keyup(function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        $("#submit").click();
      }
  })

  $.post("query", function(data, status) {
    let responseObj = JSON.parse(data)
    if (responseObj.show){
      $('#userTextField').val(responseObj.queryText)
      $("#submit").click();
      $('#userTextField').val('')
    }

  })
})
