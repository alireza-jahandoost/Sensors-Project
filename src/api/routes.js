const root = "http://webswitch.ir:3000";

export const sensors = {
  index: {
    url: `${root}/sensors`,
    method: "GET",
  },
};

export const actors = {
  index: {
    url: `${root}/actors`,
    method: "GET",
  },
  changeStatus: {
    url: `${root}/actors`,
    method: "POST",
  },
};
