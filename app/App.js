import React, { Component } from 'react'
import Mercury from '@postlight/mercury-parser';

class App extends React.Component {
  render() {
    // Get current tab
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      // Send URL of current tab as a message to background.js
      chrome.runtime.sendMessage({url: tabs[0].url}, function(response) {
        // Parse html response from background.js using Mercury
        Mercury.parse(tabs[0].url, { contentType: 'markdown', html: response.content }).then(result => {
          console.log(result);
          let timestamp = new Date().toLocaleString();
          let md = 
`# ${result.title}

* **Source:** [${result.domain}](${result.url})
* **Author:** ${result.author}
* **Word count:** ${result.word_count}
* **Extracted at:** ${timestamp}          

![lead image](${result.lead_image_url})

${result.content}
`;

          console.log(md);

          // Generate download of content
          var element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(md));
          element.setAttribute('download', 'test.md');
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          window.close();
        });
      });
    });
    return <h1>Generating markdown..</h1>
  }
}
export default App