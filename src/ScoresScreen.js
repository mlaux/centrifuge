/**
 * Created by mlaux on 9/26/15.
 */
var StaticScoresScreen = function() {

    this.scores = [];

    this.init = function() {
        Network.queryHiscores(0, 20, function(obj) {
            this.scores = obj['hiscores'];
            this.scores.sort(function(a, b) {
                return b['score'] - a['score'];
            });
        }.bind(this));
    };

    this.update = function(delta) {

    };

    this.render = function() {
        GuiUtils.initializeContextForGui();

        ctx.fillText('hiscores', canvas.width / 2, 0);

        var y = 2 * this._getScoreFontSize();
        for (var k = 0; k < this.scores.length; k++) {
            var score = this.scores[k];

            ctx.textAlign = 'right';
            ctx.font = this._getScoreFontSize() + 'px Begok';
            ctx.fillText(score['username'], canvas.width / 2 - canvas.width / 50 + canvas.width / 10, y);

            ctx.textAlign = 'left';
            ctx.font = this._getScoreFontSize() + 'px PirulenRg-Regular';
            ctx.fillText(score['score'], canvas.width / 2 + canvas.width / 50 + canvas.width / 10, y - canvas.width / 240);
            y += this._getScoreFontSize();
        }
    };

    this.click = function(x, y) {

    };

    this._getScoreFontSize = function() {
        return canvas.width / 24;
    };
};