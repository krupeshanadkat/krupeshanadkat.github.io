// ---------VARIABLE DECLARATION---------
var template = getElement('main-temp').innerHTML,
    headerDay = getElement('header-day'),
    headerDate = getElement('header-date'),
    
    withdrew = getElement('withdrew'),
    spent = getElement('spent'),
    saving = getElement('saving'),
    inWithdrew = getElement('inWithdrew'),
    
    inDay = getElement('day'),
    inMonth = getElement('month'),
    inDate = getElement('date'),
    inYear = getElement('year'),
    inItem = getElement('itemName'),
    inPrice = getElement('cost'),
    
    todayBtn = getElement('todayBtn'),
    addButton = getElement('addItem'),
    addMonthInfo = getElement('addMonthInfo'),
    modifyBtn = document.querySelector('table');
    
var object = {
    info : [],
    withdrew: 0,
    count : 0
};
// ---------------- WORKING -------------------------
todayBtn.addEventListener('click', function(e){
    console.log();
    inDate.value = myTodayDate().myDate;
    inDay.value = myTodayDate().myDay;
    inMonth.value = myTodayDate().myMonth;
    inYear.value = myTodayDate().year;
});
addButton.addEventListener("click", function(e){
    var obj = {
        id : object.count,
        date : formatDate(inDate.value, inMonth.value),
        day : inDay.value,
        item : inItem.value,
        price : parseInt(inPrice.value),
    };
    object.info.push(obj);
    object.count += 1;
    refreshDOM();
});
addMonthInfo.addEventListener('click', function(e){
    object.withdrew += parseInt(inWithdrew.value);
    inWithdrew.value = null;
    refreshDOM();
});
modifyBtn.addEventListener('click', function(e){
    if(e.target.classList[0] === 'editInfo'){
        var eid = e.target.getAttribute('data-id');
        var eindex = getIndex(eid);
        
        inDay.value = object.info[eindex]['day'];
        inDate.value = parseInt(object.info[eindex]['date'].substr(0,2));
        inMonth.value = object.info[eindex]["date"].substr(4);
        
        inItem.value = object.info[eindex]['item'];
        inPrice.value = object.info[eindex]['price'];
        addButton.addEventListener("click", function(e){
            object.info[eindex]['day'] = inDay.value;
            object.info[eindex]['date'] = formatDate(inDate.value, inMonth.value);
            object.info[eindex]['item'] = inItem.value;
            object.info[eindex]['price'] = parseInt(inPrice.value);
            refreshDOM();
        });
    }
    if(e.target.classList[0] === 'deleteInfo'){
        var did = e.target.getAttribute('data-id');
        var dindex = getIndex(did);
        console.log(dindex);
        object.info.splice(dindex,1);
        refreshDOM();
    }
});
 
getObject();
refreshDOM();
// ----------------- FUNTIONS ----------------------
function getElement(id){
    return document.getElementById(id);
}
function totalCost(obj){
    var total = 0;
    for(var i in obj.info){
        total += obj.info[i].price;
    }
    return total;
}   
function refreshDOM(){
    var outputBody = Mustache.render(template, object);
    getElement('tableBody').innerHTML = outputBody;
    
    spent.textContent = totalCost(object);
    withdrew.textContent = object.withdrew;
    saving.textContent = object.withdrew - totalCost(object);
    
    saveObject();
}

// ---------------- Local Storage Functions -------------------------
function saveObject(){
    localStorage.setItem('object', JSON.stringify(object));
}
function getObject(){
    if(localStorage.getItem('object')===null){
        saveObject();
    }
    else{
        object = JSON.parse(localStorage.getItem('object'));
    }
}
function getIndex(id){
    for(var i=0; i<object.info.length; i++){
        if(object.info[i]['id']==id){
            return i;
        }
    }
    return null;
}

//----------------------- My Date Functions -----------------------
function myTodayDate(){
    var today = new Date();
    var day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var myTodayObj = {
        myDate : today.getDate(),
        myDay : day[today.getDay()],
        myMonth : month[today.getMonth()],
        year : today.getFullYear()
    }
    return myTodayObj;
}
function formatDate(date, month){
    return date + ', ' + month;
}