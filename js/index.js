function watchForm(){
    var nToken;
    var pToken;
    var sVid;
    $("#submitButton").click( function(e){
        e.preventDefault();
        $(".next").remove();
        sVid =  $("#textC").val();
        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                'part': 'snippet',
                'key': 'AIzaSyBaDpf6NxuwHNW7kqJNY4i2uV55KOC1Pbg',
                'q':sVid,
                'type': 'video',
                'maxResults': 10
            }    
        }).done(function (data) {
            nToken = data.nextPageToken;
            createList(data.items);
            var nBtn = document.createElement("button");
            nBtn.className = "next";
            nBtn.textContent = "Next";
            $("div>section").append(nBtn);
        });
    });

    $("div").on("click",".next", function(e){
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                'part': 'snippet',
                'key': 'AIzaSyBaDpf6NxuwHNW7kqJNY4i2uV55KOC1Pbg',
                'q': sVid,
                'type': 'video',
                'pageToken' : nToken,
                'maxResults': 10
            }    
        }).done(function (data) {
            if(pToken == undefined){
                var nBtn = document.createElement("button");
                nBtn.className = "prev";
                nBtn.textContent = "Previous";
                $("div>section").append(nBtn);
            }
            nToken = data.nextPageToken;
            pToken = data.prevPageToken;
            createList(data.items);
        });
     });

     $("div").on("click",".prev", function(e){
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                'part': 'snippet',
                'key': 'AIzaSyBaDpf6NxuwHNW7kqJNY4i2uV55KOC1Pbg',
                'q': sVid,
                'type': 'video',
                'pageToken' : pToken,
                'maxResults': 10
            }    
        }).done(function (data) {
            nToken = data.nextPageToken;
            pToken = data.prevPageToken;
            createList(data.items);
            if(pToken == undefined)
                $(".prev").remove();
        });
     });

}

function createList(vids){
    $("ul").html("");
    for(let i=0; i<vids.length; i++){
        var img = document.createElement("img");
        var liN = document.createElement("li");
        var liDiv = document.createElement("div");
        var parL = document.createElement("p");
        img.src = vids[i].snippet.thumbnails.default.url;
        img.onclick = function() {
            var win = window.open('https://www.youtube.com/watch?v='+vids[i].id.videoId,'_blank');
            win.focus();
        };
        parL.textContent = vids[i].snippet.title;
        parL.onclick = function() {
            var win = window.open('https://www.youtube.com/watch?v='+vids[i].id.videoId,'_blank');
            win.focus();
        };
        liDiv.appendChild(img);
        liDiv.appendChild(parL);
        liN.appendChild(liDiv);
        $("ul").append(liN);
    }
    $("#textC").val("");
}


watchForm();