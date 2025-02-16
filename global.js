// Step 3
// Create Page Links
let pages = [
  { url: '', title: 'Home' },
  { url: 'vis1/', title: 'Vis1'},
  { url: 'vis2/', title: 'Vis2'},
  { url: 'vis3/', title: 'Vis3'}
];

// Add nav to beginning of html
let nav = document.createElement('nav');
document.body.prepend(nav);

// Checks if current link is home
const ARE_WE_HOME = document.documentElement.classList.contains('home');

// Adds links to nav
for (let p of pages) {
  let url = p.url;

  // Checks if we are on home page
  if (!ARE_WE_HOME && !url.startsWith('http')) {
    url = '../' + url;
  }
  let title = p.title;
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }
  nav.append(a);
}
