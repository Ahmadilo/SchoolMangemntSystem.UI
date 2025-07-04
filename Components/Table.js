export class TableComponent {
    /** 
     * @param {HTMLElement} parent
     * @param {string} apiUrl
     */
  constructor(parent, apiUrl) {
    /**
     * @type {HTMLElement}
     */
    this.parent = parent;
    /** @type {string} */
    this.apiUrl = apiUrl;
    /** @type {HTMLElement|null} */
    this.tableElement = null;

    this.renderLoading();
    this.fetchAndRenderData();
  }
  /** @returns {void} */
  async fetchAndRenderData() {
    try {
        // ملاحظة: تم تعليق هذا الجزء لأنه لا يوجد API حاليًا
        /*
        const res = await fetch(this.apiUrl);
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
        this.renderEmpty();
        return;
        }
        const headers = Object.keys(data[0]);
        const rows = data.map(item => headers.map(h => item[h]));
        this.renderTable(headers, rows);
        */

        // بيانات مزيفة مؤقتة للاختبار:
        const fakeData = [
        { id: 1, name: "أحمد", age: 14, grade: "الثامن" },
        { id: 2, name: "سارة", age: 15, grade: "التاسع" },
        { id: 3, name: "مازن", age: 13, grade: "السابع" },
        { id: 4, name: "ليلى", age: 16, grade: "العاشر" },
        { id: 5, name: "كريم", age: 17, grade: "الحادي عشر" }
        ];

        const headers = Object.keys(fakeData[0]);
        const rows = fakeData.map(item => headers.map(h => item[h]));
        this.renderTable(headers, rows);

    } catch (error) {
        this.renderError(error);
    }
}

    /** @returns {void} */
  renderLoading() {
    this.parent.innerHTML = `
      <div class="table-card"><h2>جاري تحميل البيانات...</h2></div>
    `;
  }

    /** @returns {void} */
  renderEmpty() {
    this.parent.innerHTML = `
      <div class="table-card"><h2>لا توجد بيانات لعرضها.</h2></div>
    `;
  }

    /** 
     * @param {Error} error
     * @returns {void}
     */
  renderError(error) {
  
    console.error("Error rendering error message:", error.message);
    return;
      
  }

  /**
   *
   * @param {string[]} headers
   * @param {string[][]} rows
   * @returns {void}
   */
  renderTable(headers, rows) {
    this.parent.innerHTML = ''; // clear old

    const card = document.createElement('div');
    card.className = 'table-card';

    const title = document.createElement('h2');
    title.textContent = 'جدول البيانات';
    card.appendChild(title);

    const table = document.createElement('table');

    // رأس الجدول
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    // جسم الجدول
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    //debugger;
    table.appendChild(tbody);
    card.appendChild(table);
    this.parent.appendChild(card);

    this.tableElement = table;
  }

   /** @returns {void} */
  refresh() {
    this.renderLoading();
    this.fetchAndRenderData();
  }
}
