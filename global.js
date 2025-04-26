const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
? "/"
: "/eri-gon2.github.io/";

let pages = [
  { url: '', title: 'home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'CV/', title: 'CV' },
  { url: 'https://github.com/Eri-gon2', title: 'Github' },
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  let a = document.createElement('a');

  url = !url.startsWith('http') ? BASE_PATH + url : url;
  a.href = url;
  a.textContent = title;

  const currentPath = location.pathname.endsWith('/') ? location.pathname : location.pathname + '/';
  const linkPath = new URL(a.href).pathname;
  a.classList.toggle('current', currentPath === linkPath);

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

if ("colorScheme" in localStorage) {
  setColorScheme(localStorage.colorScheme);
}

export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  const titleElement = document.querySelector('.projects-title');
  titleElement.textContent = `${projects.length} Projects`;
  containerElement.innerHTML = '';
  projects.forEach(project => {
  // Create a new <article> element
  const article = document.createElement('article');
  // Create heading element dynamically
  const heading = document.createElement(headingLevel);
  heading.textContent = project.title;

  // Create image
  const image = document.createElement('img');
  image.src = project.image;
  image.alt = project.title;

  // Create description paragraph
  const description = document.createElement('p');
  description.textContent = project.description;

  // Append elements to article
  article.appendChild(heading);
  article.appendChild(image);
  article.appendChild(description);

  containerElement.appendChild(article);
  });
}

export async function fetchGithubData(username) {
  // return statement here
  return fetchJSON(`https://api.github.com/users/${username}`);
}