console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let navlinks = $$("nav a");

// let currentLink = navlinks.find(
//   (a) => a.host === location.host && a.pathname === location.pathname
// );

// currentLink?.classList.add('current')

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "Eri-gon2.github.io";         // GitHub Pages repo name

let pages = [
  {url : '', title: 'home'},
  {url: 'projects/', title: 'Projects'},
  {url:'contact/', title:'Contact'},
  {url:'CV/', title:'CV'},
  {url:"https://github.com/Eri-gon2", title:'Github'},
]
url = !url.startsWith('http') ? BASE_PATH + url : url;

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);

}