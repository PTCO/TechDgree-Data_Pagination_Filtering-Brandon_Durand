/*
Treehouse Techdegree: Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab
   Reach out in your Slack community if you have questions
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page){

   const startIndex = (page * 9) - 9

   const endIndex = (page * 9)

   const student_list = document.querySelector('.student-list');


   student_list.innerHTML = '';

   list.map((student, index)=>{
      if(index >= startIndex && index < endIndex){
         
         student_list.innerHTML += `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
                  <h3>${student.name.title}${student.name.first}${student.name.last}</h3>
                  <span class="email">${student.email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${student.registered.date}</span>
               </div>
            </li>
         `;

      }
   })



}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){

   const paginationBtns = Math.ceil(list.length / 9);

   const link_list = document.querySelector('.link-list');
   link_list.innerHTML = "";

   for(let x = 0; x < paginationBtns; x++){
      
      link_list.innerHTML += `
          <li>
            <button type="button">${x + 1}</button>
         </li>
      `

   }

   link_list.firstElementChild.firstElementChild.className = 'active'

   link_list.addEventListener('click', e => {
      
      if(e.target.tagName === 'BUTTON'){

         link_list.firstElementChild.firstElementChild.className = ''

         showPage(data, e.target.textContent);

         e.target.className = 'active';

         e.target.addEventListener('focusout', ()=>{

            e.target.className = '';
         })

      }

   })
}

// Function creates a searchbar and appends to DOM
function addSearchBar(){

   const searchBar = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;

   document.querySelector('header').insertAdjacentHTML('beforeend', searchBar) 

   
   document.querySelector('.student-search').addEventListener('click', e=>{

      const searchInput = document.querySelector('#search').value;

      const regex = /([^\d]+)/i;

      if(e.target.tagName === 'BUTTON'){

         data.map((student)=>{

            if(regex.test(searchInput)){
               console.log(student.name.first.replace(regex, '$1'));
            }
            

         })

         console.log(data[0].name.first.replace(regex, '$1'))
      }

   })
}


// Call functions
showPage(data, 1);
addPagination(data);
addSearchBar();

