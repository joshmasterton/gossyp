// Get current light mode and return value
export const getLightMode = () => {
  const htmlTag = document.documentElement;
  // Is theme existing locally
  // If not create localstorage item
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
    htmlTag.setAttribute('data-bs-theme', 'light');
    return htmlTag.getAttribute('data-bs-theme');
  }
  // Set to dark
  if (localStorage.getItem('theme') === 'dark') {
    htmlTag.setAttribute('data-bs-theme', 'dark');
    return htmlTag.getAttribute('data-bs-theme');
  }
  // Set to light
  if (localStorage.getItem('theme') === 'light') {
    htmlTag.setAttribute('data-bs-theme', 'light');
    return htmlTag.getAttribute('data-bs-theme');
  }
  return null;
};

// Switch current light mode and return value
export const switchLightMode = () => {
  const htmlTag = document.documentElement;
  // Set light mode to light
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
    htmlTag.setAttribute('data-bs-theme', 'light');
    return htmlTag.getAttribute('data-bs-theme');
  }
  // Set light mode to dark
  if (localStorage.getItem('theme') === 'light') {
    localStorage.setItem('theme', 'dark');
    htmlTag.setAttribute('data-bs-theme', 'dark');
    return htmlTag.getAttribute('data-bs-theme');
  }
  return null;
};
