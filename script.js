// Replace with your Google Sheet ID and API Key
const SHEET_ID = "1kA0ekKus8zowjbjgghUl9oRF9XQWceTVavYKbpQ-uAU";
const API_KEY = "AIzaSyCio3GSY-wISccWxOU2lDv_qbEO9LayFOo";

// Range where the total donations cell is located (e.g., Sheet1!D1)
const RANGE = "Sheet2!E7";

// Maximum donation goal
const MAX_GOAL = 10000;

// Function to fetch total donations from Google Sheets
async function fetchDonations() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract the total donations value
    const totalDonations = parseFloat(data.values[0][0]);
    updateUI(totalDonations);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to update the webpage
function updateUI(totalDonations) {
  // Update the total donations text
  const totalDonationsEl = document.getElementById("total-donations");
  totalDonationsEl.textContent = `Total Donations: Rs${totalDonations}`;

  // Update the pot fill level
  const potFillEl = document.getElementById("fill");
  const potPercentage = Math.min((totalDonations / MAX_GOAL) * 100, 100);  // Calculate fill percentage
  potFillEl.style.height = `${potPercentage}%`;

  // Update the progress bar
  const progressFillEl = document.getElementById("progress-fill");
  progressFillEl.style.width = `${potPercentage}%`;

  // Update the goal text
  const goalTextEl = document.getElementById("goal-text");
  const goalPercentage = Math.min((totalDonations / MAX_GOAL) * 100, 100).toFixed(2);  // Calculate goal percentage
  goalTextEl.textContent = `${goalPercentage}% of the $${MAX_GOAL} goal reached`;
}

// Fetch donations when the page loads
fetchDonations();
