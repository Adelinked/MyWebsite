export const randomize = (arr) => {
  const len = arr.length;

  let newArr = [];
  let index = 0;
  let newIndex;
  while (index < len) {
    newIndex = Math.floor(Math.random() * len);
    if (!newArr[newIndex]) {
      newArr[newIndex] = arr[index];
      index++;
    }
  }
  return newArr;
};

export function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}


export function getItemsNumber(windowWidth) {

  if (windowWidth > 768) {
    return 3;
  }
  if (windowWidth > 576) {
    return 2;
  }
  if (windowWidth <= 576) {
    return 1;
  }
}


export function filterProjects(rendredProjects, filter) {

  const { title, category } = filter;

  if (filter?.title?.length == 0 && filter?.category?.length == 0) {
    return rendredProjects;
  }

  let filtred = [...rendredProjects];

  if (title) {
    filtred = filtred.filter((i) =>
      i.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  if (category && category.length > 0) {
    if (category !== "all") {
      filtred = filtred.filter((i) =>
        i.categories.includes(category)
      );
    }

  }
  return filtred;
}

export function sortProjects(rendredProjects, sort, projectsData) {

  if (projectsData)
    return projectsData.filter(i => rendredProjects.includes(i));

  let sortedProjects = [...rendredProjects];
  if (sort === "1") {
    /* A - Z */
    sortedProjects = sortedProjects.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }
  if (sort === "2") {
    /* Z - A */
    sortedProjects = sortedProjects.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
  }

  return sortedProjects;
}