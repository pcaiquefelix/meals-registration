export function navigationAndLoaderValidator(
  pathsList,
  targetPath,
  currentPath
) {
  const isPathAllowed = pathsList.reduce((validator, path) => {
    if (path === "/") {
      return targetPath === path;
    } else if (targetPath.includes(path)) {
      return true;
    }
    return validator;
  }, false);

  if (!isPathAllowed) {
    window.location.assign("/");
  }
  if (currentPath) {
    return currentPath !== targetPath;
  }
}
