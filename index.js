import { getUsers } from './scripts/services/users-service.js';

async function init() {
  try {
    let rowData = '';
    const params = {
      results: 15,
      inc: 'gender,name,email,dob,picture,nat',
      noinfo: '',
      seed: 'abc'
    };
    const { results } = await getUsers(params);
    console.log(results);
    results.map((data) => {
      rowData += `<tr>
        <td>${data.name.first}</td>
        <td>${data.name.last}</td>
        <td>${data.dob.age}</td>
        <td>${data.gender}</td>
        <td>${data.email}</td>
        <td>${data.nat}</td>
        <td class="text-center">
            <img src="${data.picture.thumbnail}" alt="usuario"
            width="60px"
            height="60px">
        </td>
      </tr>`;
    });
    document.querySelector('#table-data-js').innerHTML = rowData;
    $(document).ready(function () {
      $('#table').DataTable();
    });
  } catch (error) {
    console.log(error);
  }
}

init();
