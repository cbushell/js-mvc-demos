var Artist = Backbone.Model.extend({

});

var ArtistList = Backbone.Collection.extend({
    model:Artist
});

var Artists = new ArtistList;

var ArtistsView = Backbone.View.extend({

});


var AppView = Backbone.View.extend({

    events:{
        "keypress #new-artist":"searchForArtist"
    },

    searchForArtist:function (e) {
        if (e.keyCode != 13) return;
        if (!this.input.val()) return;

        Artists.create({name:this.input.val()});
        this.input.val('');
    }
});

var App = new AppView;
