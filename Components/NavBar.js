export function renderNavBar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container with id "${containerId}" not found.`);
    return;
  }

  container.innerHTML = `
    <nav>
      <a href="#">أشخاص</a>
      <a href="#">مواد</a>
      <a href="#">عمليات</a>
      <a href="#">تقارير</a>
    </nav>
  `;
}