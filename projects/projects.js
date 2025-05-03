import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
let colors = d3.scaleOrdinal(d3.schemeTableau10);

function renderPieChart(projectsGiven){
  let newRolledData = d3.rollup(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );
  let newData = Array.from(newRolledData, ([type, count]) => {
    return { value: count, label: type };
  });
  let newSliceGenerator = d3.pie().value((d) => d.value);
  let newArcData = newSliceGenerator(newData);
  let newArcs = newArcData.map((d) => arcGenerator(d));
  // clear the previous arcs
  d3.select('svg').selectAll('path').remove();
  // clear the previous legend
  d3.select('.legend').selectAll('li').remove();
  // append new arcs to the svg
  newArcs.forEach((arc, idx) => {
    d3.select('svg')
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(idx))
  });

  let legend = d3.select('.legend');
  newData.forEach((d, idx) => {
    legend
      .append('li')
      .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
});
  let selectedIndex = -1;
  let svg = d3.select('svg');
  svg.selectAll('path').remove();
  newArcs.forEach((arc, i) => {
    svg
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(i))
      .on('click', () => {
        selectedIndex = selectedIndex === i ? -1 : i;
        svg
        .selectAll('path')
        .attr('class', (_, idx) => (
          // filter idx to find correct pie clice and apply CSS from above
          idx === selectedIndex ? 'selected' : ''
        ))
        legend
        .selectAll('li')
        .attr('class', (_, idx) => (
          // filter idx to find correct pie clice and apply CSS from above
          idx === selectedIndex ? 'selected' : ''
        ));
      
        if (selectedIndex === -1) {
          renderProjects(projects, projectsContainer, 'h2');
        } else {
          const selectedYear = newData[selectedIndex].label;
          const filtered = projects.filter(p => p.year === selectedYear);
          renderProjects(filtered, projectsContainer, 'h2');
        }
      })
      
  })
  

}

renderPieChart(projects);

let query = '';
let searchInput = document.querySelector('.searchBar');

searchInput.addEventListener('input', (event) => {
  // update query value
  query = event.target.value;
  // filter projects
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });
  // render filtered projects
    renderProjects(filteredProjects, projectsContainer, 'h2');

  // update pie chart
  renderPieChart(filteredProjects);
});
