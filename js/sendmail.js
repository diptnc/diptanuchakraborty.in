// function send_mail(){
//     "use strict";
// $('#contact-form').validator();
// $('#contact-form').on('submit', function (e) {
        
//     // if the validator does not prevent form submit
//     if (!e.isDefaultPrevented()) {
//         var url = "./form/contact.php";
//         alert("formsubmired");
//     }

// var m= "heda";
// var req= new XMLHttpRequest();
// req.open("get","./form/contact.php?name="+m,true);
// req.send();
// req.onreadystatechange=function(){

//     if(req.readyState==4 && req.status==200){
//         alert(req.responseText);
//         $('#contact-form')[0].reset();
//         alert("ho");
//         // document.getElementById().innerHTML=req.responseText;
//     }else{
//         alert("na");
//     }

// }

$(function () {
    "use strict";
    $('#contact-form').validator();
    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var q=$(this).serialize();
            
            document.getElementById("submit").disabled=true;
           var url="https://quickosolution.000webhostapp.com/form/getcontact.php";
         // var url="https://diptanuchakraborty.globaltadka.in/myfiles/getcontact.php";
            $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data)
                    {
                    //  var Url="https://diptanuchakraborty.ml/form/contact.php?"+$(this).serialize();   
                     
                // $.ajax({
                //     type: "GET",
                //     url: Url,
                    
                //     success: function (data)
                //     {
                       
                        console.log(data);
    
                       
                        var alertBox = '<div class="alert ' + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + '</div>';
                        var mc='<button type="Button" name="submit" id="submit" style="margin-top:10px; background-color: green;width: auto;" value="success" class="btn btn-default">Message Sent !!</button><!-- Send Button -->';
                        document.getElementById("ss").innerHTML=mc;  
                        setTimeout(function(){
                            $('#ss').fadeOut('fast');
                            document.getElementById("submit").disabled=false;
                        },5000);
                        
                        $('#contact-form')[0].reset();
                        
                    }
                });
                return false;




        }

        

    });

});
