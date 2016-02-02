$(function(){ // do not forget to add this too
    $("#form input").keyup(function() {
        var numValid = 0;
        $("#form input[required]").each(function() {
            if (this.validity.valid) {
                numValid++;
            }
        });
        var progress = $("#progress"),
            progressMessage = $("#message");

        if (numValid == 0) {
            progress.attr("value", "0");
            progressMessage.text("Please Enter Student ID.");
        }
        if (numValid == 1) {
            progress.attr("value", "10");
            progressMessage.text("Please Enter the First Name.");
        }
        if (numValid == 2) {
            progress.attr("value", "20");
            progressMessage.text("Please Enter the Last Name.");
        }
        if (numValid == 3) {
            progress.attr("value", "30");
            progressMessage.text("Please Enter Your E-mail");
        }
    });
}); // and the closing braces

