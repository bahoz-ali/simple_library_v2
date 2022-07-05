export const show = (name, display = 'block') => {
  name.style.display = display;
};

export const hide = (name) => {
  name.style.display = 'none';
};
