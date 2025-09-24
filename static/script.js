const newExpense = document.getElementById("newExpense")
const allExpenses = document.getElementById("allexpenses")
const totalSpan = document.getElementById("total")
const update = document.getElementsByClassName("u")
const updateExpense = document.getElementById("expense")
const updateCategory = document.getElementById("category")
const updateExpenseAmount = document.getElementById("expenseAmount")
const cor = document.getElementById("cor")
const cont = document.getElementById("container")
const sId = document.getElementById("id")
const warning = document.getElementById("warning")
const yesBtn = document.getElementsByClassName("yes")
const filter = document.getElementById("filter")
const filtin = document.getElementById("filtin")
const logOut = document.getElementById("logout")

document.addEventListener("DOMContentLoaded",async ()=>{
    await fetchAndDisplay()
    logOut.style.display = 'block'
})

newExpense.addEventListener("click",async ()=>{
    res = await fetch("http://localhost:3000/api/newExpense")
    window.location.href = res.url
})


filtin.addEventListener("click",()=>{
    filter.style.display = 'block'
})


async function fetchAndDisplay(){
    data = await fetch("http://localhost:3000/api/allExpenses")
    ct = data.headers.get("Content-Type")
    if(ct === "text/html; charset=utf-8"){
        window.location.href = data.url
    }else{
        data = await data.json()
        let total = 0
        for(i of data.data){
            htmlFormat = `
            <div class="expense" id="${i._id}">
            <span class="e">${i.expense}</span>
            <span class="ca">${i.category}</span>
            <span class="a">$${i.expenseAmount}</span>
            <span class="u">Update</span>
            <span class="c">X</span>
            </div>
             `
            allExpenses.innerHTML+= htmlFormat
            let CA = parseInt(i.expenseAmount)
            total += CA
        }
        totalSpan.innerText = `$${total}`
        filter.addEventListener("click",(e)=>{
            if(e.target.classList.contains("spanfilt")){
                allExpenses.innerHTML = ""
                cat = e.target.innerText
                let filteredTotal = 0
                for(i of data.data){
                    if(i.category === cat){
                        filteredHtmlFormat = `
                            <div class="expense" id="${i._id}">
                                <span class="e">${i.expense}</span>
                                <span class="ca">${i.category}</span>
                                <span class="a">$${i.expenseAmount}</span>
                                <span class="u">Update</span>
                                <span class="c">X</span>
                            </div>
                        `      
                        allExpenses.innerHTML += filteredHtmlFormat
                        filteredTotal += parseInt(i.expenseAmount)
                    }
                }
                filter.style.display = 'none'
                totalSpan.innerText = `$${filteredTotal}`
            }
        })
    }
}



allExpenses.addEventListener("click",(e)=>{
    if(e.target.classList.contains("u")){
        a = e.target.parentElement.children[0].innerText
        b = e.target.parentElement.children[1].innerText
        c = parseInt(e.target.parentElement.children[2].innerText.slice(1,))
        d = e.target.parentElement.children[3].innerText
        id = e.target.parentElement.id
        cont.style.display = "none"
        cor.style.display = 'block'
        updateExpense.value = a
        updateCategory.value = b
        updateExpenseAmount.value = c
        sId.value = id
    }else if(e.target.classList.contains("c")){
        id = e.target.parentElement.id
        warning.style.display = 'block'
        yesBtn[0].id = id
    }
})

yesBtn[0].addEventListener("click",async()=>{
    id = yesBtn[0].id
    data  = await fetch(`http://localhost:3000/api/deleteExpense/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
    window.location.href = data.url
})
yesBtn[1].addEventListener('click',()=>{
    warning.style.display = 'none'
})


logOut.addEventListener("click",async()=>{
    data = await fetch("http://localhost:3000/api/logout",{
        method:"POST"
    })
    location.href = data.url
})