

var productNameInput = document.getElementById('productName')
var productUrlInput = document.getElementById('productUrl')
var allInput = document.querySelectorAll('input')
var wrong=document.getElementById('wrong')
var productList = [];
var regexName= /^[a-z]{3,10}$/
var regexurl= /^(www.|https|http)/


if(localStorage.getItem("productsContanier") !==null ){
    
    productList = JSON.parse(localStorage.getItem("productsContanier"));
    displayData();
    
}

function addProduct(){
    var product ={
        name:productNameInput.value,
        link:productUrlInput.value
    }
    
    productList.push(product)
    
    // if(allInput[0].value==""|| allInput[1].value=="" ){
    //     wrong.classList.remove("d-none")
    //     productList.pop()
    // }
    
    if(regexName.test(allInput[0].value)==false||regexurl.test(allInput[1].value)==false ){
        wrong.classList.remove("d-none")
        productList.pop()


    }

    localStorage.setItem("productsContanier" , JSON.stringify(productList))
    
    displayData()
    
    claerForm()

    // console.log(productList)
}

function claerForm(){
    productNameInput.value=null;
    productUrlInput.value=null;
}

function displayData(){
    var cartona = '';
    for( i=0 ; i < productList.length ; i++){
        cartona +=`
        <tr>
                        <td>${i}</td>
                        <td>${productList[i].name}</td>
                        <td>
                            <button onclick="clickLink(${i})" class="btn btn-success">
                            <i class="fa-regular fa-eye"></i>
                            Visit
                            </button>
                        </td>
                        <td>
                            <button onclick="deleteItem(${i})" class="btn btn-danger">
                                <i class="fa-solid fa-trash-can"></i>
                                Delete
                                </button>
                        </td>
                    </tr>
        `
    }
    document.getElementById('tableData').innerHTML =cartona
}

function deleteItem(indexItem){
    productList.splice(indexItem , 1)
    localStorage.setItem("productsContanier" , JSON.stringify(productList))

    displayData()
    console.log(productList)
}

function clickLink(indexLink){
    var chiekUrl = productList[indexLink].link;

    window.location.assign(chiekUrl)
}

function clearAleart(){
    wrong.classList.add('d-none')
}


productNameInput.addEventListener("keyup",valid)
function valid(){
   
    if(regexName.test(productNameInput.value)){
        productNameInput.classList.add("is-valid")
        productNameInput.classList.remove("is-invalid")

    }
    else{
        productNameInput.classList.add("is-invalid")
        productNameInput.classList.remove("is-valid")
       
    
    }
}

productUrlInput.addEventListener("keyup",validUrl)
function validUrl(){

    if(regexurl.test(productUrlInput.value)){
        productUrlInput.classList.add("is-valid")
        productUrlInput.classList.remove("is-invalid")

    }
    else{
        productUrlInput.classList.add("is-invalid")
        productUrlInput.classList.remove("is-valid")

    }
}

localStorage.setItem("productsContanier" , JSON.stringify(productList))
displayData()
