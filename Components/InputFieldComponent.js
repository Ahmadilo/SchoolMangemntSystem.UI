/**
 * مكوّن حقل إدخال قابل لإعادة الاستخدام.
 * يُستخدم لبناء صف إدخال داخل نموذج باستخدام DOM API.
 */
export class InputFieldComponent {
  /**
   * @param {Object} options - كائن يحتوي على إعدادات الحقل.
   * @param {string} options.labelText - نص التسمية (Label) الظاهر للمستخدم.
   * @param {string} [options.id] - قيمة id الخاصة بالعنصر (افتراضي من labelText).
   * @param {string} [options.name] - اسم الحقل (name attribute) (افتراضي من labelText).
   * @param {string} [options.type='text'] - نوع الحقل (text, email, tel, ...).
   * @param {boolean} [options.required=false] - ما إذا كان الحقل إلزاميًا.
   */
  constructor({ labelText, id, name, type = 'text', required = false }) {
    this.labelText = labelText;
    this.id = id || this._slugify(labelText);
    this.name = name || this.id;
    this.type = type;
    this.required = required;

    /**
     * @type {HTMLElement} العنصر الجذر لهذا المكون
     */
    this.element = this._create();
  }

  /**
   * ينشئ عنصر DOM الخاص بالحقل ويعيده.
   * @private
   * @returns {HTMLDivElement} عنصر الـ div الذي يحتوي على label و input.
   */
  _create() {
    const row = document.createElement('div');
    row.className = 'form-row';

    const label = document.createElement('label');
    label.setAttribute('for', this.id);
    label.textContent = this.labelText;

    const input = document.createElement('input');
    input.type = this.type;
    input.id = this.id;
    input.name = this.name;
    if (this.required) input.required = true;

    row.appendChild(label);
    row.appendChild(input);

    /**
     * @type {HTMLInputElement} الحقل الداخلي الخاص بالإدخال.
     */
    this.inputElement = input;
    return row;
  }

  /**
   * يمسح القيمة الموجودة في حقل الإدخال.
   */
  clear() {
    this.inputElement.value = '';
  }

  /**
   * يتحقق من صحة قيمة الإدخال باستخدام تعبير منتظم.
   * @param {RegExp} regex - تعبير منتظم للتحقق من النص.
   * @returns {boolean} true إذا كانت القيمة مطابقة، false غير ذلك.
   */
  validate(regex) {
    return regex.test(this.inputElement.value);
  }

  /**
   * يُحوّل النص إلى سلسلة مناسبة للاستخدام كـ id أو name.
   * @private
   * @param {string} text - النص المُراد تحويله.
   * @returns {string} النص المحول.
   */
  _slugify(text) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }

  /**
   * يُعيد عنصر DOM الخاص بالمكون ليتم إدراجه داخل الصفحة.
   * @returns {HTMLElement} عنصر DOM الجاهز للإدراج.
   */
  render() {
    return this.element;
  }

  /**
   * يُرجع القيمة الحالية الموجودة في الحقل.
   * @returns {string} القيمة النصية الموجودة داخل الحقل.
   */
  getValue() {
    return this.inputElement.value;
  }
}