var countries = [
  {
    name: "Antigua and Barbuda",
    sudonym: ["Antigua", "Barbuda"]
  },
  {
    name: "Australia",
    sudonym: [""]
  },
  {
    name: "The Bahamas",
    sudonym: [""]
  },
  {
    name: "Barbados",
    sudonym: [""]
  },
  {
    name: "Belize",
    sudonym: [""]
  },
  {
    name: "Canada",
    sudonym: [""]
  },
  {
    name: "Dominica",
    sudonym: [""]
  },
  {
    name: "Grenada",
    sudonym: [""]
  },
  {
    name: "Guyana",
    sudonym: [""]
  },
  {
    name: "Ireland",
    sudonym: [""]
  },
  {
    name: "Jamaica",
    sudonym: [""]
  },
  {
    name: "New Zealand",
    sudonym: [""]
  },
  {
    name: "St. Kitts and Nevis",
    sudonym: ["St Kitts and Nevis","St Kitts","St. Kitts","Nevis"]
  },
  {
    name: "St. Lucia",
    sudonym: ["St Lucia"]
  },
  {
    name: "St. Vincent and The Grenadines",
    sudonym: ["St Vincent and The Grenadines","St. Vincent","St Vincent","The Grenadines"]
  },
  {
    name: "Trinidad and Tobago",
    sudonym: ["Trinidad","Tobago"]
  },
  {
    name: "United Kingdom",
    sudonym: ["Northern Ireland", "Wales", "Scotland", "England"]
  },
  {
    name: "United States of America",
    sudonym: ["USA","US","U.S.A","U.S.","United States"]
  }
];

var countryPos;

$("#searchbar").on("keyup", function(){

  $(".highlight").removeClass("highlight");

  for(var a = 0; a < countries.length; a++){
    //matching names
    if (countries[a].name.toLowerCase() == searchbar.value.toLowerCase()){
      // make the bellow into a function
      countryPos = $(".card")[a].getBoundingClientRect().y;
      window.scroll(0,countryPos);
      console.log($(".card")[a]);
      console.log($(".card"));
      $($(".card")[a]).toggleClass("highlight");
      break;
    }
    //iterate over sudonyms checking for matches
    for(var b = 0; b <= countries[a].sudonym.length; b++){

      if (!countries[a].sudonym[b] || !countries[a].sudonym ){
        continue;
      }
      else if (countries[a].sudonym[b].toLowerCase() == searchbar.value.toLowerCase()){
        countryPos = $(".card")[a].getBoundingClientRect().y;
        window.scroll(0,countryPos);
        $($(".card")[a]).toggleClass("highlight");
        break;
      }
    }
  }
});

var btnTracker = 0;
$("#new-page").toggle();


$(".musicTrends").click(function(){
  $("#parentContainer").toggle();
  $("#new-page").toggle();
  btnTracker = this.id;
  $.ajax(
    {
    dataType: "json",
    type: "GET",
    url: "https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country="+btnTracker+"&api_key=ab1334e96d0dd2dae5184096bd443c49&format=json",
    success: function(result){

      var tracks = result.tracks.track;
      console.log(tracks);
      for (var i = 0; i < tracks.length; i++) {
        $("#tb").append(
          "<tr>" +
          //ranking
          "<td>"+ [i + 1] + "</td>" +
          //song name
          "<td>"+ tracks[i].name + "</td>" +
          //artist name
          "<td>"+ tracks[i].artist.name + "</td>" +
          //overview of this artist
          "<td>"+ "<a href ='" + tracks[i].artist.url + "'" + "target='_blank' >" + "link"  + "</a>" + "</td>" +

          "</tr>"

          )

      }

    }
  });
});


$("#return").click(function(){
  $("#parentContainer").toggle();
  $("#new-page").toggle();
  btnTracker = 0;
});
