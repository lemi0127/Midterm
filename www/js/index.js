var loaded = 0;
var id;
var storage;   

//Let's get it started!

function appStart(){
    
//If theres no localstorage...    
if (localStorage.getItem("lemi0127_midterm") === null) {
    
    var options = new ContactFindOptions();
    options.multiple = true;
    options.filter = "";          
    var filter = ["id", "displayName", "phoneNumbers"]; 
    navigator.contacts.find(filter, onSuccess, onError, options);
//...start the find contacts process    

//If you find these contacts...    
function onSuccess(contacts) {
    
    for (var i = 0; i < 12; i++) { 
        
        var people = [];         
        people.name = contacts[i].displayName;
        people.id = contacts[i].id;
        people.numbers = [];
//...organize the contacts information, but max of 12!   
        
//This checks for the number of phone numbers people have and adds them
    for (var j=0; j<2; j++) {
        
        if (contacts[i].phoneNumbers[j]) {
            
            var myNumbers = [];
            myNumbers[contacts[i].phoneNumbers[j].type] = contacts[i].phoneNumbers[j].value;
            people.numbers.push(myNumbers);
            
        }
    }
        
//Puts information into a JSON file        
        people.long = null;
        people.lat = null;
        var contactPeople = [];
        
        contactPeople.push(people);
        
        localStorage.setItem("lemi0127_midterm", JSON.stringify(contactPeople));
     
//Takes the name of the contact out of the storage JSON fileand insert it into our html        
        var c= "";
        c+= '<div class="contactDetails">';
		c+= '<h3 id="displayName">'+contacts[i].displayName+'</h3>';
        c+= "</div>";        
		document.querySelector("#contactOutput").innerHTML += c;
    
        storage = JSON.parse(localStorage.getItem("lemi0127_midterm"));
        
    }
}
    
//Letting you know you don't have any contacts    
function onError(contactError) {
     alert("You don't have any friends :(");
} 
    
    
    
} else {
    
    
//Show the stored JSON file to the people!     
storage = JSON.parse(localStorage.getItem("lemi0127_midterm"));
    
    console.log(storage);
        for (var i = 0; i < 12; i++) {            
        var c= "";
        c+= '<div class="contactDetails">';
        c+= '<h3 class="displayName" data-ref=' + ((storage[i].id)-1) + '>'+storage[i].name+'</h3>';
        c+= "</div>";        
		document.querySelector("#contactOutput").innerHTML += c;
        }
}
    
//Let the people touch stuff    
    var wrapper = document.getElementById("wrapper");

    var mc = new Hammer.Manager(myElement);
    mc.add( new Hammer.Tap({ event: "doubletap", taps: 2 }) );
    mc.add( new Hammer.Tap({ event: "singletap" }) );
    
    mc.get("doubletap").recognizeWith("singletap");
    mc.get("singletap").requireFailure("doubletap");
    
    mc.on("singletap", function(st) {    
    
    //You can only press the "Okay" button with a singletap which activates the cancel function. The single function controls everything having to do with the modal window    
        var single = {
        init: function(){
    document.getElementById("btnOkay").addEventListener("click", single.cancel);
            
  },
 
//These are explaining how the cancel and show function work in correlation to the modal window
  cancel: function(ev){
    document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
  },
            
  show: function(ev){ 
    document.querySelector("[data-role=modal]").style.display="block";
    document.querySelector("[data-role=overlay]").style.display="block";
    
//While show is working, we will "prop" the contact information into the modulal window
      var item = st.target.getAttribute("data-ref"); 
      var itemVal = st.target.innerHTML; 
      

    document.querySelector("[data-role=modal] h2").innerHTML = itemVal;
    for (prop in storage[item].numbers[0]) {
      document.querySelector("#phonenumber1").innerHTML = prop + ": " + storage[item].numbers[0][prop];
    }
    for (prop in storage[item].numbers[1]) {
      document.querySelector("#phonenumber2").innerHTML = prop + ": " + storage[item].numbers[1][prop];
    }    
    
  }
}
  
//Let the single function initiate and show itself!        
single.init();
single.show();
    
});
    
/*  
mc.on("doubletap", function(ev) {
    var item = ev.target.getAttribute("data-ref"); 
  
    localStorage.setItem("bear0064-id", JSON.stringify(item));

    window.location = "location.html";
    
});
*/
    
};     
//appStart function has now run its course!

