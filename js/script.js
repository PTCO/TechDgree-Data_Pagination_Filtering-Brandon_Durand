/*
Treehouse Techdegree: Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab
   Reach out in your Slack community if you have questions
*/


const header = document.querySelector('header');
const student_list = document.querySelector('.student-list');
let numOfResults = data.length;


// Function checks number of students passed in not empty and updates results number
function showResultsNum(list){

   if(list[0] !== ''){
      document.querySelector('.ResultsNum > b').textContent = list.length.toString();
   }
   else {
      document.querySelector('.ResultsNum > b').textContent = 0;
   }

}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page){

   const startIndex = (page * 9) - 9
   const endIndex = (page * 9)
   student_list.innerHTML = '';

   list.map((student, index)=>{
      if(index >= startIndex && index < endIndex){
         
         student_list.innerHTML += `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
                  <h3>${student.name.title} ${student.name.first} ${student.name.last}</h3>
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

   showResultsNum(list)

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

   // Assigns active class to first pagination button on page load
   link_list.firstElementChild.firstElementChild.className = 'active'

   link_list.addEventListener('click', e => {
      
      // Checks if Search Button is clicked
      if(e.target.tagName === 'BUTTON'){

         const btns = link_list.querySelectorAll('button');

         for(let x = 0; x < btns.length; x++){

            btns[x].className = '';

            showPage(data, e.target.textContent);

            e.target.className = 'active';
         }

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

   header.insertAdjacentHTML('beforeend', searchBar) 

   // Function filters and returns students that match the user's seach query
   function Search(e){
      const searchInput = document.querySelector('#search').value;

      const regex = /([^\d\s]+)/i;

      let Results = [];

      if(e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT'){

         Results = [];

         data.map((student)=>{

            if(regex.test(searchInput) && student.name.first.toLowerCase().includes(searchInput.toLowerCase())){
               Results.push(student);
            }
         })

         if(Results.length !== 0){
            showPage(Results, 1);
            addPagination(Results);  
         }
         else if(searchInput === ''){ // Resets Students list when search bar is empty
            showPage(data, 1);
            addPagination(data);
         }
         else {
            const resultMsg = `
               <h3 class="ResultMsg"> No Results Found </h3>
            `;
            student_list.innerHTML = resultMsg;
            addPagination([''])
         }

      }
   }
   
   // Search for student on search button click
   document.querySelector('.student-search').addEventListener('click', e=>{
      Search(e)
   })

   // Search for student on user input
   document.querySelector('.student-search').addEventListener('keyup', e=>{
      Search(e);
   })


}

// Displays number Of results
const numResultMsg = `<h3 class="ResultsNum">Results <b>${numOfResults}</b></h3>`;
header.insertAdjacentHTML('beforeend', numResultMsg);

// Call functions
addSearchBar();
showPage(data, 1);
addPagination(data);


