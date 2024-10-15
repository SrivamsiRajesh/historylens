document.addEventListener('DOMContentLoaded', function() {
    fetchTimelineEvents();
    initializeMap();
    fetchFeaturedArticles();
    fetchGalleryImages();
    fetchTodayInHistory();
    fetchLatestNews();
 });
 
 function fetchTimelineEvents() {
    // Using Wikipedia API to fetch historical events
    fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&list=allpages&aplimit=10&origin=*')
        .then(response => response.json())
        .then(data => {
            const events = data.query.allpages; // Adjust based on actual data structure
            const container = document.getElementById('timeline-container');
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.innerHTML = `<strong>${event.pageid}</strong>: ${event.title}`; // Adjust as needed
                container.appendChild(eventElement);
            });
        })
        .catch(error => console.error('Error fetching timeline events:', error));
 }
 
 function initializeMap() {
    const map = L.map('map-container').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
 
    // Fetch historical places from Geonames API
    fetch('http://api.geonames.org/searchJSON?q=historical&maxRows=10&username=demo')
        .then(response => response.json())
        .then(data => {
            data.geonames.forEach(place => {
                L.marker([place.lat, place.lng]).addTo(map)
                    .bindPopup(place.name);
            });
        })
        .catch(error => console.error('Error fetching historical places:', error));
 }
 
 function fetchFeaturedArticles() {
    // Using Wikipedia API to fetch featured articles
    fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=5&origin=*')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('featured-container');
            data.query.random.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.innerHTML = `<h3>${article.title}</h3>`;
                container.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error fetching featured articles:', error));
 }
 
 function fetchGalleryImages() {
    // Using Wikimedia Commons API to fetch historical images
    fetch('https://commons.wikimedia.org/w/api.php?action=query&format=json&list=allimages&aiprefix=Historical&ailimit=10&origin=*')
        .then(response => response.json())
        .then(data => {
            const images = data.query.allimages; // Adjust based on actual data structure
            const container = document.getElementById('gallery-container');
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = `https://commons.wikimedia.org/wiki/Special:FilePath/${image.name}`; // Adjust as needed
                img.alt = image.title; 
                img.className = 'gallery-image';
                container.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching gallery images:', error));
 }
 
 function fetchTodayInHistory() {
    const today = new Date();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
 
    fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('today-container');
            data.events.slice(0, 3).forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.innerHTML = `<strong>${event.year}</strong>: ${event.text}`;
                container.appendChild(eventElement);
            });
        })
        .catch(error => console.error('Error fetching today in history:', error));
 }
 
 function fetchLatestNews() {
    // Example API for news articles (replace with a suitable news API)
    fetch('https://newsapi.org/v2/everything?q=history&apiKey=YOUR_API_KEY')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('news-container');
            data.articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.innerHTML = `<h3>${article.title}</h3><p>${article.description}</p>`;
                container.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error fetching latest news:', error));
 }