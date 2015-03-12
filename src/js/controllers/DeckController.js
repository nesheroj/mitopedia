"use strict";
var MitoPedia;
(function (MitoPedia) {
    var DeckController = (function () {
        function DeckController($scope, $location, $routeParams, MitopediaApiStorage) {
            this.$scope = $scope;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.MitopediaApiStorage = MitopediaApiStorage;
            //MitopediaApiStorage.getCards().then((result: ICard[]) => {
            //    window.disqus_shortname = 'mitopedia';
            //    window.disqus_identifier = $location.path();
            //    window.disqus_url = 'http://mitopedia.guerrademitos.com' + $location.path();
            //    if ($location.host() == 'localhost') {
            //        return;
            //        //window.disqus_developer = 1;
            //    }
            //    (function () {
            //        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            //        dsq.src = 'http://angularjs.disqus.com/embed.js';
            //        document.getElementsByTagName('body')[0].appendChild(dsq);
            //    })();
            //    angular.element(document.getElementById('disqus_thread')).html('');
            //}, (error) => {
            //    console.log(error);
            //}).then(() => {
            //    MitopediaApiStorage.getDecks().then((result: IDeck[]) => {
            //        $scope.Deck = result.single((deck) => {
            //            return deck.id === $routeParams.id;
            //        });
            //    }, (error) => {
            //        console.log(error);
            //    }), (error) => {
            //            console.log(error);
            //        }
            //    });
        }
        DeckController.prototype.injection = function () {
            return [
                '$scope',
                '$location',
                '$routeParams',
                'MitoPediaApiStorage',
                DeckController
            ];
        };
        return DeckController;
    })();
    MitoPedia.DeckController = DeckController;
})(MitoPedia || (MitoPedia = {}));
