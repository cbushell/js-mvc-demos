$(function () {

    var Tweet = Backbone.Model.extend({
    });

    var TweetList = Backbone.Collection.extend({
        model:Tweet
    });

    var TweetView = Backbone.View.extend({
        tagName:'li',

        render:function (eventName) {
            $(this.el).html(this.model.attributes.text);
            return this;
        }
    });

    var TweetListView = Backbone.View.extend({
        el:'#tweet-list',

        initialize:function () {
            this.listenTo(this.model, 'add', this.render);
            this.listenTo(this.model, 'reset', this.render);
        },

        render:function (eventName) {
            $(this.el).html("");

            _.each(this.model.models, function (tweet) {
                $(this.el).append(new TweetView({model:tweet}).render().el);
            }, this);
        }
    });


    var AppView = Backbone.View.extend({
        el:$("#foobarbaz-app"),

        events:{
            "keypress #twitter-id":"twitterSearch"
        },

        initialize:function () {
            this.input = this.$("#twitter-id");
            this.tweets = new TweetList();
            this.tweetListView = new TweetListView({model:this.tweets});
        },

        twitterSearch:function (e) {
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            this.tweets.reset();

            var self = this;

            $.ajax({
                dataType:"json",
                url:"http://search.twitter.com/search.json?callback=?&q=" + this.input.val(),
                success:function (json) {
                    self.tweets.add(json.results);
                }
            });

            this.input.val('');
        }
    });

    var App = new AppView;
});