function navigation(sectionName) {
  const content = document.getElementById("content"),
    commandList = content.querySelector("pre"),
    sectionRegex = new RegExp(`# ${sectionName}`, "i"),
    lines = commandList.textContent.split("\n");
  for (let i = 0; i < lines.length; i++)
    if (lines[i].match(sectionRegex)) {
      const sectionAnchor = document.createElement("a");
      (sectionAnchor.id = "section-anchor"),
        (lines[i] = lines[i].replace(
          sectionRegex,
          `# <a id="section-anchor">${sectionName}</a>`
        )),
        (commandList.innerHTML = lines.join("\n"));
      const anchorElement = document.getElementById("section-anchor");
      if (anchorElement) anchorElement.scrollIntoView({ behavior: "smooth" });
      break;
    }
}
let commandList,
  commands,
  categories = {};
function initializeSearch() {
  (commandList = document.querySelector("pre")),
    (commands = commandList.textContent.split("\n")),
    Organize();
}
function Organize() {
  let currentCategory = null;
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i],
      sectionName = Section(command);
    if (sectionName) {
      currentCategory = sectionName;
      if (!categories[currentCategory]) categories[currentCategory] = [];
    } else if (currentCategory) categories[currentCategory].push(command);
  }
}
function Search() {
  const searchQuery = document
      .getElementById("search-input")
      .value.toLowerCase()
      .trim(),
    content = document.getElementById("search-results");
  content.innerHTML = "Default prefix = .\n\n";
  let firstCategory = true,
    resultsFound = false;
  for (const category in categories) {
    const categoryCommands = categories[category],
      matchingCommands = categoryCommands.filter((command) =>
        command.toLowerCase().includes(searchQuery)
      );
    if (matchingCommands.length > 0) {
      resultsFound = true;
      if (!firstCategory) content.appendChild(document.createTextNode("\n"));
      content.appendChild(document.createTextNode(`# ${category}\n\n`));
      matchingCommands.forEach((matchingCommand) => {
        content.appendChild(document.createTextNode(matchingCommand + "\n"));
      });
      firstCategory = false;
    }
  }
  if (!resultsFound)
    content.appendChild(document.createTextNode("No results found"));
}
function Section(command) {
  const matches = command.match(/^\s*#([^]+)/);
  return matches ? matches[1].trim() : null;
}
window.addEventListener("load", initializeSearch);
