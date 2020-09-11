// A namespace defined for the sample code
// As a best practice, you should always define a unique namespace for your libraries
// Raf.formOnLoad
var Raf = window.Raf || {};
(function () {
    // Define some global variables
    var myUniqueId = "_myUniqueId"; // Define an ID for the notification
    var currentUserName = Xrm.Utility.getGlobalContext().userSettings.userName; // get current user name
    var message = currentUserName + ": Your JavaScript code in action!";

    // Code to run in the form OnLoad event
    this.formOnLoad = function (executionContext) {
        var formContext = executionContext.getFormContext();
		debugger;
        // display the form level notification as an INFO
        formContext.ui.setFormNotification(message, "INFO", myUniqueId);

        // Wait for 5 seconds before clearing the notification
        window.setTimeout(function () { formContext.ui.clearFormNotification(myUniqueId); }, 5000);
    }

    // Code to run in the attribute OnChange event 
    this.attributeOnChange = function (executionContext) {
        var formContext = executionContext.getFormContext();

        // Automatically set some field values if the account name contains "Contoso"
        var accountName = formContext.getAttribute("name").getValue();
        if (accountName.toLowerCase().search("contoso") != -1) {
            formContext.getAttribute("websiteurl").setValue("https://www.contoso.com");
            formContext.getAttribute("telephone1").setValue("425-555-0100");
            formContext.getAttribute("description").setValue("Website URL, Phone and Description set using custom script.");
        }
    }

    // Code to run in the form OnSave event 
    this.formOnSave = function () {
        // Display an alert dialog
        Xrm.Navigation.openAlertDialog({ text: "Record saved." });
    }
	
	this.updateBingIFrame = function (executionContext) {
		var formContext = executionContext.getFormContext();
		
		//get the name
		// var accountName = Xrm.Page.getAttribute("name").getValue();	Xrm.Page REPLACED BY executionContext.getFormContext()
		var accountName = formContext.getAttribute("name").getValue();
		
		//Check that there is a name
		if (accountName) {
			//Update the IFrame
			// var bingIframe = Xrm.Page.getControl("IFRAME_Bing");
			var bingIframe = formContext.getControl("IFRAME_Bing");
			var newUrl = "https://www.bing.com/?q=" + encodeURIComponent(accountName);
			bingIframe.setSrc(newUrl);
		}
	}
}).call(Raf);