import { FormComponent } from './FormComponent.js';
import { TableComponent } from './Table.js';

/**
 * مكون CRUD عام يحتوي على جدول وفورم، مع إمكانية التبديل بينهما.
 */
export class CrudContainerComponent {
  /**
   * @param {Object} options
   * @param {string} options.title - عنوان المكون.
   * @param {Array<Object>} options.fields - مصفوفة الحقول الخاصة بالفورم.
   * @param {string} options.apiUrl - رابط API لجلب بيانات الجدول.
   */
  constructor({ title, fields, apiUrl }) {
    /** @type {string} */
    this.title = title;

    /** @type {Array<Object>} */
    this.fields = fields;

    /** @type {string} */
    this.apiUrl = apiUrl;

    /** @type {HTMLElement} */
    this.element = this._create();
  }

  /**
   * ينشئ عناصر HTML للمكون.
   * @returns {HTMLElement}
   * @private
   */
  _create() {
    const container = document.createElement('div');
    container.className = 'crud-container';

    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';

    const flipInner = document.createElement('div');
    flipInner.className = 'flip-inner';

    const tableFace = document.createElement('div');
    tableFace.className = 'crud-table-face flip-face';

    const tableHeader = document.createElement('div');
    tableHeader.className = 'face-header';

    const tableTitle = document.createElement('h2');
    tableTitle.textContent = this.title || 'إدارة الكائنات';

    const addBtn = document.createElement('button');
    addBtn.className = 'btn add-btn';
    addBtn.textContent = '➕ إضافة';

    tableHeader.appendChild(tableTitle);
    tableHeader.appendChild(addBtn);
    tableFace.appendChild(tableHeader);

    const tableDiv = document.createElement('div');
    tableFace.appendChild(tableDiv);

    const formFace = document.createElement('div');
    formFace.className = 'crud-form-face flip-face';

    const formHeader = document.createElement('div');
    formHeader.className = 'face-header';

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'إضافة جديد';

    const backBtn = document.createElement('button');
    backBtn.className = 'btn back-btn';
    backBtn.textContent = '⬅ رجوع';

    formHeader.appendChild(formTitle);
    formHeader.appendChild(backBtn);
    formFace.appendChild(formHeader);

    const form = new FormComponent({
      title: '',
      fields: this.fields
    });
    formFace.appendChild(form.render());

    flipInner.appendChild(tableFace);
    flipInner.appendChild(formFace);
    flipCard.appendChild(flipInner);
    container.appendChild(flipCard);

    addBtn.addEventListener('click', () => {
      flipCard.classList.add('flipped');
    });

    backBtn.addEventListener('click', () => {
      flipCard.classList.remove('flipped');
    });

    new TableComponent(tableDiv, this.apiUrl);

    return container;
  }

  /**
   * يُرجع العنصر الجاهز للإدراج في DOM.
   * @returns {HTMLElement}
   */
  render() {
    return this.element;
  }
}
