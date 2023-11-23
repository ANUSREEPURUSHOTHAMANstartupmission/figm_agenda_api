// Sample code structure
figma.showUI(__html__, { width: 300, height: 200 });

// Event listener for messages from the UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'getData') {
    await fetchDataFromAPI(msg.url);
  }
};

// Function to fetch data from the API
async function fetchDataFromAPI(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Assume the data structure has a property called 'venue'
    const venueData = data.venue;

    // Get the current selection in Figma
    const selection = figma.currentPage.selection;

    if (selection.length > 0) {
      // Assume the first item in the selection is a frame
      const frame = selection[0];

      // Update the frame with the fetched data
      const textNode = figma.createText();
      textNode.characters = JSON.stringify(venueData);

      // Append the textNode to the children of the frame
      frame.appendChild(textNode);

      // Close the UI
      figma.closePlugin();
    } else {
      console.error('Please select a frame in Figma before running the plugin.');
    }
  } catch (error) {
    console.error('Error fetching data from the API:', error);
  }
}
