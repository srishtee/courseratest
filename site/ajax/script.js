document.addEventListener("DOMContentLoaded",
    function (event) {
        document.querySelector("button").addEventListener("click",
            function (params) {
                //call the function to get the name
                ajaxutils.sendgetrqst("name.txt",
                    function (request) {
                        var name = request.responseText; //response

                        document.querySelector("#content")
                            .innerHTML = "hello " + name + "!"
                    }
                
                
                )
            }
        
        
        )
    }



)