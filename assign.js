function addData() {
    const dataInput = document.getElementById('dataInput');
    const data = dataInput.value;
    
    if (data) {
        const existingData = localStorage.getItem('dashboardData') ? JSON.parse(localStorage.getItem('dashboardData')) : [];
        existingData.push(data);
        localStorage.setItem('dashboardData', JSON.stringify(existingData));
        dataInput.value = '';
        displayData();
    }

   
    const imageInput = document.getElementById('imageInput');
    const imageFile = imageInput.files[0];
    
    if (imageFile) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;

            
            localStorage.setItem('dashboardImage', e.target.result);

           
            const dataList = document.getElementById('dataList');
            const listItem = document.createElement('li');
            listItem.appendChild(img);
            dataList.appendChild(listItem);

            
            const deleteImageButton = document.getElementById('deleteImageButton');
            deleteImageButton.style.display = 'block';
        };
        
        reader.readAsDataURL(imageFile);
    }
}

function deleteData(index) {
    const existingData = localStorage.getItem('dashboardData') ? JSON.parse(localStorage.getItem('dashboardData')) : [];
    
    existingData.splice(index, 1);
    
    localStorage.setItem('dashboardData', JSON.stringify(existingData));
    
    displayData();
}


function deleteImage() {
    localStorage.removeItem('dashboardImage');
    
   
    const deleteImageButton = document.getElementById('deleteImageButton');
    deleteImageButton.style.display = 'none';

   
    displayData();
}


function displayData() {
const dataList = document.getElementById('dataList');

const storedData = localStorage.getItem('dashboardData');

if (storedData) {
const dataArr = JSON.parse(storedData);
dataList.innerHTML = '';


dataArr.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${item}`;

    
    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => deleteData(index);

    listItem.appendChild(deleteButton);
    dataList.appendChild(listItem);
});
}


const storedImage = localStorage.getItem('dashboardImage');
if (storedImage) {
const img = document.createElement('img');
img.src = storedImage;
dataList.appendChild(img);


const deleteImageButton = document.getElementById('deleteImageButton');
deleteImageButton.style.display = 'block';
} else {

const deleteImageButton = document.getElementById('deleteImageButton');
deleteImageButton.style.display = 'none';
}
}


displayData();
