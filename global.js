p// Select Function
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Step 2
const navLinks = $$("nav a")
let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

if (currentLink) {
  // or if (currentLink !== undefined)
  currentLink?.classList.add('current');
}

// Step 3
// Create Page Links
let pages = [
  { url: '', title: 'Home' },
  { url: 'vis1/', title: 'Vis1' },
  { url: 'vis2/', title: 'Vis2'},
  { url: 'vis3/', title: 'Vis3'},
  { url: 'vis4/', title: 'Vis4'}
  { url: 'vis5/', title: 'Vis5'}
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
    url = '/dsc106-project3'/ + url;
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
