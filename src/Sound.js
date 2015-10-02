/**
 * Created by mlaux on 10/2/15.
 */
var StaticSound = function() {
    this.frequencies = [];
    this.soundBuffer = null;
    this.rate = 1;
    this.baseRate = 1;
    this.context = null;

    this.init = function() {
        this.context = new AudioContext();
        var request = new XMLHttpRequest();

        request.open('GET', 'note.wav', true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
            this.context.decodeAudioData(request.response, function(buffer) {
                this.soundBuffer = buffer;
            }.bind(this));
        }.bind(this);
        request.send();
    };

    this.playSounds = function() {
        if (!this.soundBuffer) {
            return;
        }

        this.frequencies.push(this.rate);

        for (var k = 0; k < this.frequencies.length; k++) {
            var source = this.context.createBufferSource();
            var useRate = this.frequencies[k];
            source.buffer = this.soundBuffer;
            source.playbackRate.value = useRate;
            source.connect(this.context.destination);
            source.start(0);
        }

        if (this.frequencies.length == 4) {
            this.baseRate *= 1.05946309436;
            this.rate = this.baseRate;
            this.frequencies = [];
        } else if (this.frequencies.length % 2 == 0) {
            this.rate *= 1.05946309436 * 1.05946309436 * 1.05946309436;
        } else {
            this.rate *= 1.05946309436 * 1.05946309436 * 1.05946309436 * 1.05946309436;
        }
    };

};