// function changeBackground(imageUrl) {
//     document.querySelector('main').style.backgroundImage = url(${imageUrl});
//   }


  function changeBackground(imageUrl) {
    document.querySelector('main').style.backgroundImage = `url(${imageUrl})`;
}

// Load JSON data
fetch('home.json')
  .then(response => response.json())
  .then(data => {
    // Set the page title
    document.title = data.title;

    // Populate header
    const logo = document.querySelector('.logo');
    logo.textContent = data.header.logo;

    const navList = document.querySelector('nav ul');
    data.header.navigation.forEach(navItem => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = navItem.link;
      link.textContent = navItem.name;
      listItem.appendChild(link);
      navList.appendChild(listItem);
    });

    // Populate main content
    const heroText = document.querySelector('.hero-text h1');
    heroText.textContent = data.main.heroText;
  })
  .catch(error => console.error('Error loading JSON:', error));
