/* Module for Address Book application */
var AddressBook = function () {

  /* add members here */
  var contact = {
      name: ko.observable(),
      phoneNumber: ko.observable()
  };

  var contacts = ko.observableArray();

  var addContact = function() {
      console.log("Adding new contact with name: " + contact.name() + " and phone number: ", contact.phoneNumber());

      //Adding contact
      contacts.push({name: contact.name(), phoneNumber: contact.phoneNumber()});
      clearContact();
  };

  var clearContact = function() {
      contact.name(null);
      contact.phoneNumber(null);
  };

  var init = function () {
    /* add code to initialize this module */
    ko.applyBindings(AddressBook);
  };

  /* execute the init function when the DOM is ready */
  $(init);

  return {
    /* add members that will be exposed publicly */
    contact: contact,
    contacts: contacts,
    addContact: addContact
  };
}();
