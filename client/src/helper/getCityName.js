function getCityName(timezone) {
  let slicedWords = timezone.split("/").slice(1);
  let words = slicedWords[0];
  let separateWord = words.toLowerCase().split('_');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

export default getCityName
