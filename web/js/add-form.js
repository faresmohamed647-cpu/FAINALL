function renderAddForm(config) {
  const titleNode = document.getElementById('pageTitle');
  const subtitleNode = document.getElementById('pageSubtitle');
  const formNode = document.getElementById('addForm');

  if (!formNode || !config) return;

  if (titleNode) titleNode.textContent = config.title || 'Add Entry';
  if (subtitleNode) subtitleNode.textContent = config.subtitle || 'Fill required fields and save.';

  const rows = [];
  let rowBuffer = [];

  (config.fields || []).forEach((field) => {
    const isHalf = field.width === 'half';
    const fieldHtml = buildField(field);
    if (isHalf) {
      rowBuffer.push(fieldHtml);
      if (rowBuffer.length === 2) {
        rows.push(`<div class="row">${rowBuffer.join('')}</div>`);
        rowBuffer = [];
      }
    } else {
      if (rowBuffer.length) {
        rows.push(`<div class="row">${rowBuffer.join('')}</div>`);
        rowBuffer = [];
      }
      rows.push(fieldHtml);
    }
  });

  if (rowBuffer.length) {
    rows.push(`<div class="row">${rowBuffer.join('')}</div>`);
  }

  formNode.innerHTML = `
    ${rows.join('')}
    <div class="actions">
      <a class="btn btn-secondary" href="admin.html">Cancel</a>
      <button class="btn btn-primary" type="submit">
        <i class="fas fa-save"></i>
        Save
      </button>
    </div>
  `;

  formNode.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect form values (inputs/selects/textareas share `name` in our builder)
    const entry = {};
    formNode.querySelectorAll('input[name], select[name], textarea[name]').forEach((el) => {
      entry[el.name] = el.value;
    });

    // Optional: persist certain entities for Admin to consume after redirect.
    // This keeps QR/Activity Logs in `admin.html` in sync when adding a new student.
    if (config?.entityType === 'student') {
      try {
        localStorage.setItem('pending_student', JSON.stringify(entry));
      } catch (e) {
        // If storage is blocked, we still continue with the normal redirect.
        console.warn('Could not store pending_student:', e);
      }
    }

    alert(`${config.title || 'Entry'} saved successfully.`);
    window.location.href = 'admin.html';
  });
}

function buildField(field) {
  const required = field.required ? 'required' : '';
  const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : '';
  const value = field.value ? `value="${field.value}"` : '';
  const id = field.name;
  const widthClass = field.width === 'half' ? 'field half' : 'field';

  if (field.type === 'textarea') {
    return `
      <div class="${widthClass}">
        <label for="${id}">${field.label}</label>
        <textarea id="${id}" name="${id}" ${placeholder} ${required}></textarea>
      </div>
    `;
  }

  if (field.type === 'select') {
    const options = (field.options || [])
      .map((option) => `<option value="${option.value}">${option.label}</option>`)
      .join('');
    return `
      <div class="${widthClass}">
        <label for="${id}">${field.label}</label>
        <select id="${id}" name="${id}" ${required}>
          ${options}
        </select>
      </div>
    `;
  }

  return `
    <div class="${widthClass}">
      <label for="${id}">${field.label}</label>
      <input id="${id}" name="${id}" type="${field.type || 'text'}" ${placeholder} ${value} ${required}>
    </div>
  `;
}
