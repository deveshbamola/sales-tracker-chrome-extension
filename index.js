let save_el=document.getElementById("save-element");
let error_el=document.getElementById("error");
let savet_el=document.getElementById("savet-element");
let del_el=document.getElementById("delete-element");
let input_el=document.getElementById("input-element");
let cont=document.getElementById("ul-element");

let saved_items=[];
let items= JSON.parse(localStorage.getItem('saved_items'))
console.log(items)
if(items){
  saved_items=items
  render()
}
save_el.addEventListener("click",function(){
  error_el.textContent=""
  saved_items.push(input_el.value);
  render()
  input_el.value="";
  localStorage.setItem("saved_items",JSON.stringify(saved_items))
  
});
savet_el.addEventListener("click",function(){
  error_el.textContent=""
chrome.tabs.query({active:true,currentWindow:true},function(tabs){
saved_items.push(tabs[0].url)
localStorage.setItem("saved_items",JSON.stringify(saved_items))
render()

})
});

del_el.addEventListener("dblclick",function(){
  error_el.textContent=""
  console.log("doble");
  localStorage.clear()
  saved_items=[]
  console.log()
  render()
})

del_el.addEventListener("click",function(){
  error_el.textContent="Click one more time to delete entries!!"
})

function render(){
  let list="";
for(let i = 0 ; i < saved_items.length;i++){
  list+=`<li>
      <a href="${saved_items[i]}" target="_blank">
          ${saved_items[i]}</a>
  </li>`
}
cont.innerHTML=list
}