(function (global) {
  var SpeakGoodBye = {};
  SpeakGoodBye.speakWord = "Good Bye";
  SpeakGoodBye.speak = function (name) {
    console.log(SpeakGoodBye.speakWord + " " + name);
  }
  global.SpeakGoodBye=SpeakGoodBye
})(window)



