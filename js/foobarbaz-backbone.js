$(function () {

    var Tweet = Backbone.Model.extend();

    var TweetList = Backbone.Collection.extend({
        model:Tweet,

        url:function () {
            return "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=chrisbushelloz&count=10";
        }
    });

    var TweetView = Backbone.View.extend({
    });

    var Tweets = new TweetList;


    var AppView = Backbone.View.extend({
            el:$("#foobarbaz-app"),

            events:{
                "keypress #twitter-id":"twitterSearch"
            },

            initialize:function () {
                this.input = this.$("#twitter-id");
            },

            twitterSearch:function (e) {
                if (e.keyCode != 13) return;
                if (!this.input.val()) return;

                $.ajax({
                    dataType:"json",
                    url:"http://search.twitter.com/search.json?callback=?&q=" + this.input.val(),
                    success:function (json) {
                        $.each(json.results, function (k, v) {
                            console.log(v);
                        });
                    }
                });

//            Tweets.create({name:this.input.val()});
                this.input.val('');
            }
        })
        ;

    var App = new AppView;
})
;