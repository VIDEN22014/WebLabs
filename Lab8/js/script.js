(function (global) {
  var script = {};
  script.names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  console.log("Масив імен : " + script.names);
  console.log("Спосіб вибору імен для прощання : за першою буквою 'j'||'J'");
  script.names.forEach(i =>
    (i.toLowerCase()[0] == 'j' ? SpeakGoodBye.speak(i) : SpeakHello.speak(i))
  )
  console.log(" " + "\n");

  script.names = ["Bohdan", "John", "Paul", "Benjamin", "Bruce", "billy", "Bernard", "LOGAN", "Paula", "Laura", "Jim"];
  console.log("Масив імен : " + script.names);
  console.log("Спосіб вибору імен для прощання : за другою буквою 'o'||'O'");
  script.names.forEach(i =>
    (i.toLowerCase()[1] == 'o' ? SpeakGoodBye.speak(i) : SpeakHello.speak(i))
  )
  console.log(" " + "\n");

  global.script = script
})(window)

