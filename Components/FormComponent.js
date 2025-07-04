import { InputFieldComponent } from './InputFieldComponent.js';

export class FormComponent {
  /**
   * @param {Object} options - إعدادات النموذج.
   * @param {string} options.title - عنوان النموذج.
   * @param {Array<Object>} options.fields - مصفوفة إعدادات الحقول.
   * @param {Function} options.onSubmit - دالة تُنفذ عند الضغط على "إرسال".
   * @param {Function} options.onReset - دالة تُنفذ عند الضغط على "مسح".
   */
  constructor({ title, fields = [], onSubmit = () => {}, onReset = () => {} }) {
    this.title = title;
    this.fields = fields;
    this.onSubmit = onSubmit;
    this.onReset = onReset;

    /** @type {InputFieldComponent[]} */
    this.inputComponents = [];

    /** @type {HTMLElement} العنصر الجاهز للإدراج في DOM */
    this.element = this._create();
  }

  /**
   * إنشاء نموذج DOM كامل.
   * @returns {HTMLElement}
   */
  _create() {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-card';

    const heading = document.createElement('h2');
    heading.textContent = this.title;
    wrapper.appendChild(heading);

    const form = document.createElement('form');
    form.id = 'generated-form';

    // إنشاء الحقول
    this.fields.forEach(fieldData => {
      const input = new InputFieldComponent(fieldData);
      this.inputComponents.push(input);
      form.appendChild(input.render());
    });

    // أزرار
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'form-buttons';

    const resetBtn = document.createElement('button');
    resetBtn.type = 'reset';
    resetBtn.className = 'btn delete';
    resetBtn.textContent = 'مسح';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn reset';
    submitBtn.textContent = 'إرسال';

    buttonsContainer.appendChild(resetBtn);
    buttonsContainer.appendChild(submitBtn);
    form.appendChild(buttonsContainer);

    // أحداث
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = {};
      this.inputComponents.forEach(f => {
        data[f.name] = f.getValue();
      });
      this.onSubmit(data);
    });

    form.addEventListener('reset', e => {
      this.inputComponents.forEach(f => f.clear());
      this.onReset();
    });

    wrapper.appendChild(form);
    return wrapper;
  }

  /**
   * إرجاع العنصر الكامل لإضافته للصفحة.
   * @returns {HTMLElement}
   */
  render() {
    return this.element;
  }
}
