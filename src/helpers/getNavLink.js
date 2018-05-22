export default function getNavLink(selectedElement, elementId, routeArray) {
  if (selectedElement === elementId) {
    const shortArray = routeArray.slice(0, -1);
    return shortArray;
  } else {
    return [...routeArray, elementId];
  }
}
