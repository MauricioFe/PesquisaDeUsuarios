let inputFilter = null;
let buttonFilter = null;
let countUsers = null;
let user = '';
let usersList = [];
let usersListFiltered = [];
let divUsersList = null;

let countMale = null;
let countFemale = null;
let sumAge = null;
let averageAge = null;

window.addEventListener('load', () => {
    initializeComponents();
    configFilter();
});


async function fecthUsers() {
    const response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const data = await response.json();
    usersList = data.results.map(user => {
        const { name, picture, dob, gender } = user;
        return {
            name: name.first + " " + name.last,
            picture: picture.medium,
            dob: dob.age,
            gender: gender
        }
    });
    // usersList = people.results.map(user => {
    //     const { name, picture, dob, gender } = user;
    //     return {
    //         name: name.first + " " + name.last,
    //         picture: picture.medium,
    //         dob: dob.age,
    //         gender: gender
    //     }
    // })
}

function initializeComponents() {
    inputFilter = document.querySelector('#inputFilter');
    buttonFilter = document.querySelector('#buttonFilter');
    countUsers = document.querySelector('#countUsers');
    divUsersList = document.querySelector('#usersList');
    countMale = document.querySelector('#countMale');
    countFemale = document.querySelector('#countFemale');
    sumAge = document.querySelector('#sumAge');
    averageAge = document.querySelector('#averageAge');
    fecthUsers();
}

function render() {
    let usersHTML = "<div class='users'>";
    usersListFiltered.forEach(user => {
        const { name, picture, dob } = user;
        const userHTML =
            `
            <div class="card-user">
                <div>
                    <img class="user-img" src="${picture}" alt="${name}">
                </div>
                <div>
                    <span> ${name}, ${dob} anos</span>
                </div>    
            </div>
        `
        usersHTML += userHTML;
    });
    divUsersList.innerHTML = usersHTML;
    countUsers.textContent = usersListFiltered.length;
}

function configFilter() {
    inputFilter.addEventListener('keyup', handlerFilterKeyUp)
    buttonFilter.addEventListener('click', handlerFilterButtonClick)
}

function handlerFilterButtonClick() {
    const filter = inputFilter.value.toLowerCase().trim();
    usersListFiltered = usersList.filter((item) => {
        return item.name.toLowerCase().includes(filter);
    });
    render();
    renderSummary();
}

function handlerFilterKeyUp({ key }) {
    if (inputFilter.value === "") {
        clearInput();
    }

    if (key !== 'Enter') {
        return;
    }
    handlerFilterButtonClick();
}

function clearInput() {
    divUsersList.innerHTML = "";
    countUsers.textContent = 0;
    countFemale.textContent = 0;
    countMale.textContent = 0;
    sumAge.textContent = 0;
    averageAge.textContent = 0;
}

function renderSummary() {
    filterMale();
    filterFemale();
    sumAges();
    averageAges();
}

function filterMale() {
    const usersMale = usersListFiltered.filter(user => {
        return user.gender === 'male'
    })
    countMale.textContent = usersMale.length;
}

function filterFemale() {
    const usersFemale = usersListFiltered.filter(user => {
        return user.gender === 'female'
    });
    countFemale.textContent = usersFemale.length;
}

function sumAges() {
    const sum = usersListFiltered.reduce((accumulator, current) => {
        return accumulator + current.dob;
    }, 0);

    sumAge.textContent = sum;
}

function averageAges() {
    const average = usersListFiltered.reduce((accumulator, current) => {
        return (accumulator + current.dob);
    }, 0);
    averageAge.textContent = parseFloat((average / usersListFiltered.length).toFixed(2));
}