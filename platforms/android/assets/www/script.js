// replaced result to term
$(document).on('pagecreate', '#pageone', function(){      
    var /*url = 'http://api.thezoodb.org/3/',
        mode = 'search/zoo?query=',
        zooName = '&query='+encodeURI('Batman'),        
        key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919'; */
		//url = 'http://api.thezoodb.org/3/search/zoo?query=&query=Batman&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
		url = 'https://api.quizlet.com/2.0/sets/243700558?client_id=4cr6A37ckU&whitespace=1';
		
     
    $.ajax({
        url: url,
		//url: url + mode + key + zooName ,
        dataType: "jsonp",
        async: true,
        success: function (term) {
            ajax.parseJSONP(term);
        },
        error: function (request,error) {
            //document.write("No");
			alert('Network error has occurred please try again!');
        }
    }); // .ajax ends

	/*$("#p11").on("click",function(){
    $(this).hide();
  });   */                    
});
var ajax = {  
    parseJSONP:function(term){  
       zooInfo.term = term.terms;
	//	zooInfo.term = sort(zooInfo.term);
		term = sort(term);
		/*var i;
		for(i = 0; i < term.length; i++){
			var row = term[i];
			document.getElementById('zoo-list').insertAdjacentHTML("beforeend",
																  '<li><a href= data-id="/' + row.id + '/"><h3>' + row.term + '</h3></a></li>');
		}*/
       $.each(term, function(i, row) {
            console.log(JSON.stringify(row));
            $('#zoo-list').append('<li><a href="" data-id="' + row.id + '"><h3>' + row.term + '</h3></a></li>');
        });
        $('#zoo-list').listview('refresh');
    }
};
function sort(term){
	var i,j;
	var result = term.terms;
		for(i = 0; i < result.length; i++){
		for(j = 0; j < result.length - 1; j++){
			if(result[j].term.substring(0,1) > result[j+1].term.substring(0,1)){
				var temp = result[j];
				result[j] = result[j+1];
			    result[j+1] = temp;
			}
				
		}
	}
		for(i = 0; i < result.length; i++){
		for(j = 0; j < result.length - 1; j++){
			if(result[j].term.substring(0,1) == result[j+1].term.substring(0,1)){
			if(result[j].term.substring(1,2) > result[j+1].term.substring(1,2)){
				var temp = result[j];
				result[j] = result[j+1];
			    result[j+1] = temp;
			}
			}
		}
	}
		
	//alert(term.terms[1].term);
	return result;
}
// page two details
$(document).on('pagebeforeshow', '#pagetwo', function(){      
    $('#zoo-data').empty();
	
    $.each(zooInfo.term, function(i, row) {
        if(row.id == zooInfo.id) {
			$('#zoo-data').append('<p><strong>We Call it:</strong> '+row.term+'</p>');
			$('#zoo-data').append('<p><img src=' + row.image.url + ' width=100% height=100%"></p>');
            $('#zoo-data').append('<p><strong>Description:</strong><br> '+row.definition+'</p>');         
            $('#zoo-data').listview('refresh');            
        }
    }); // end of each
});

$(document).on('tap', '#zoo-list li a', function(){  
    zooInfo.id = $(this).attr('data-id');
    //$.mobile.changePage( "#pagetwo", { transition: "slide", changeHash: false });
	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#pagetwo", { transition: "slide", changeHash: false } );
});
 
var zooInfo = {
    id : null,
    term : null
}








function videoOpen() {
    window.open("https://www.youtube.com/embed/GvHqRnh3Ja8");
}

function checkOnline(){
	var haha = navigator.onLine;
	if (!haha){
		window.location = "error.html"
	}
}



function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("unused");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("LI");
    //Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*check if the next item should
      switch place with the current item:*/
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        /*if next item is alphabetically
        lower than current item, mark as a switch
        and break the loop:*/
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark the switch as done:*/
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}