(function (global) {
    var ajaxutils = {}

    //rqst object created
    function getrequestobject(params) {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }

        else if (window.ActiveXObject) {
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }

        else {
            global.alert("ajax is not supported");
            return (null);
        }
    }

    //send this get rqst to server
    //main function
    ajaxutils.sendgetrqst = function (requesturl,responsehandler) {
        //requesturl eta hcche server er url to know where to go to make get rqst
        //on the server
        var request = getrequestobject();
        request.onreadystage = function (params) {
            handleresponse (request, responsehandler); //call back function
        };

        request.open("GET", requesturl, true);
        //etotuku porjnto hlo setup for the parameters for the rqst
        request.send(null); //this line executes the rqst and sends
        //it to the server
    };

    //call korbe user provided responsehandler k jkhn response ready hbe
    function handleresponse(request, responsehandler) {
        if ((request.readystate == 4) && (request.status == 200)) {
            responsehandler(request); //response of the server
        }

    }

    global.ajaxutils = ajaxutils;


}) (window);