const fs = require("fs");
const projectsFile = require("../../../projects.json");
const githubFile = require("../../data/github.json");

const url = "https://api.github.com/users/KillerCoderPT/repos";

const getRepos = async (axios) => {
  return await axios.get(url).then((res) => res.data);
};

// TODO: Verify if the file exists, verify if the content is the same as the output
const saveFile = (data) => {
  const fullPath = `${process.cwd()}/src/data/github.json`;

  if (JSON.stringify(data) !== JSON.stringify(githubFile)) {
    fs.writeFile(fullPath, JSON.stringify(data), (err) => {
      if (err) console.log(err);
      console.log(`Saving file`);
    });
  }
};

const getProjects = (axios) => (req, res) => {
  getRepos(axios).then((data) => {
    const obj = data
      .filter((i) => {
        return projectsFile.includes(i.name.toLowerCase());
      })
      .map((item) => {
        return {
          name: item.name,
          html_url: item.html_url,
          description: item.description,
        };
      });

    if (obj.length > 0) {
      saveFile(obj);
      return res.json(obj);
    }

    return res.sendStatus(204);
  });
};

const getProjectsById = (axios) => (req, res) => {
  const { id } = req.params;

  const proj = githubFile.find((i) => i.name.toLocaleLowerCase() === id);

  res.json(proj);
};

module.exports = {
  getProjects,
  getProjectsById,
};
