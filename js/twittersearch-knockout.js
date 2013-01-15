$(function () {

    function TwitterSearchViewModel() {
        this.searchText = ko.observable("");

        this.twitterSearch = function () {
            $.ajax({
                dataType:"json",
                url:"http://search.twitter.com/search.json?callback=?&q=" + this.searchText(),
                success:function (json) {
                    console.log(json);
                }
            });

            this.searchText("");
        }
    }

    ko.applyBindings(new TwitterSearchViewModel());
});
