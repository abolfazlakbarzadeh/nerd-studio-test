import 'highlight.js/styles/default.css'
import {MarkdownRenderer} from '@/components/icons/markdown';

export default function Home() {
  return (
    <MarkdownRenderer>
      ```javascript


// Call the function and store the result in a variable
var area = calculateRectangleArea(5, 3);

// Print the result to the console
console.log("The area of the rectangle is: " + area);
```
    </MarkdownRenderer>
  );
}
