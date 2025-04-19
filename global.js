console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let navlinks = $$("nav a");

// let currentLink = navlinks.find(
//   (a) => a.host === location.host && a.pathname === location.pathname
// );

// currentLink?.classList.add('current')

const BASE_PATH = "/portfolio/";

let pages = [
  {url : '', title: 'home'},
  {url: 'projects/', title: 'Projects'},
  {url:'contact/', title:'Contact'},
  {url:'CV/', title:'CV'},
  {url:"https://github.com/Eri-gon2", title:'Github'},
]

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  let a = document.createElement('a');
  url = !url.startsWith('http') ? BASE_PATH + url : url;

  a.href = url;
  a.textContent = title;
  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname
  );

  if (a.host !== location.host) {
    a.target = "_blank";
  }
  nav.append(a);

}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);

const select = document.querySelector('.color-scheme select');

function setColorScheme(scheme) {
  document.documentElement.style.setProperty('color-scheme', scheme);
  select.value = scheme;
}

select.addEventListener('input', (event) => {
  const value = event.target.value;
  setColorScheme(value);
  localStorage.colorScheme = value;
});

// Load user preference on page load
if ("colorScheme" in localStorage) {
  setColorScheme(localStorage.colorScheme);
}