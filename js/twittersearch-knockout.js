$(function () {

    function Tweet(text) {
        this.text = text;
    }

    function TwitterSearchViewModel() {
        this.searchText = ko.observable("");
        this.tweets = ko.observableArray([]);

        this.twitterSearch = function () {
            var self = this;

            self.tweets.removeAll();

            $.ajax({
                dataType:"json",
                url:"http://search.twitter.com/search.json?callback=?&q=" + self.searchText(),
                success:function (json) {
                    $(json.results).each(function (i, e) {
                        self.tweets.push(new Tweet(e.text));
                        console.log(e.text);
                    });
                }
            });

            this.searchText("");
        }
    }

    ko.applyBindings(new TwitterSearchViewModel());
});
