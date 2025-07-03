import { TableComponent } from '/Components/Table.js';

const container = document.getElementById('students-table');
/** @type {TableComponent} */
const table = new TableComponent(container, 'http://localhost:8000/api/students');


table.refresh();
