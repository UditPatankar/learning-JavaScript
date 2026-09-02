// 1. Find the Most Frequent Word in a Paragraph
// Consider the follwoing HTML:

// <div id="text">This is a test. This test is only a test.</div>
// Now, find and display the most frequently occurring word. Also put a count of occurance beside it.
// Hints:
// Use document.querySelector() or getElementById() to select the paragraph.
// Convert the text into an array of words.
// Use querySelector() to display the most frequent word along with the count inside another <div>.

let task1Text = document.querySelector('#text').innerText;
let words = task1Text.toLowerCase().match(/\b\w+\b/g) || [];
let freq = words.reduce((acc, word) => {
   acc[word] = (acc[word] || 0) + 1;
   return acc;
}, {});

let maxWord = '';
let maxCount = 0;
for(const word in freq) {
   if(freq[word] > maxCount) {
      maxCount = freq[word];
      maxWord = word;
   }
}

document.querySelector('#result1').innerText = `${maxWord} appears ${maxCount} times.`;
console.log(maxCount, maxWord);

// 2. Create a zebra pattern
// Consider the following HTML:

// <ul id="cars">
//     <li>BMW</li>
//     <li>Mahindra</li>
//     <li>Audi</li>
//     <li>Toyota</li>
//     <li>Honda</li>
//     <li>Hundai</li>
//     <li>Tata</li>
//     <li>Suzuki</li>
// </ul>
// Now put alternate colors and background colors to each of the list tags. for example,

// If tne BMW is in white color text, the background should be in black color.
// Then for the next car it will be reversed, the color is black and the background is white.
// Then again the next one is white color and background black
// So on.

const carItems = document.querySelectorAll('#cars li');
carItems.forEach((item, index) => {
   if(index % 2 === 0) {
      item.style.backgroundColor = "black";
      item.style.color = "white";
   }
   else {
      item.style.backgroundColor = "white";
      item.style.color = "black";
   }
})
