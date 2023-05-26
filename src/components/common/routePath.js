const defaultAction = (navigate, path) => {
  navigate(path);
  window.location.reload();
};

export const routeMain = (navigate) => {
  let path = "/";
  defaultAction(navigate, path);
};
export const routeStake = (navigate) => {
  let path = "/stake";
  defaultAction(navigate, path);
};

export const routeBuyEarn = (navigate) => {
  let path = "/buy&earn";
  defaultAction(navigate, path);
};

export const routeIlp = (navigate) => {
  let path = "/ilp";
  defaultAction(navigate, path);
};

export const routeMyAsset = (navigate) => {
  let path = "/Myasset";
  defaultAction(navigate, path);
};
export const routeDocs = (navigate) => {
  let path = "/docs";
  defaultAction(navigate, path);
};
export const routeLoan = (navigate) => {
  let path = "/loan";
  defaultAction(navigate, path);
};
export const routeSwap = (navigate) => {
  let path = "/swap";
  defaultAction(navigate, path);
};
export const routeContract = (navigate) => {
  let path = "/contract";
  defaultAction(navigate, path);
};

export const routeInviStake = (navigate) => {
  let path = "/invi/stake";
  defaultAction(navigate, path);
};
