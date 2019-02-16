/* Module for Registration form application */
var RegistrationForm = function () {
    /* add members here */
    var customer = {
        personalInfo: {
            title: ko.observable(),
            firstName: ko.observable(),
            middleName: ko.observable(),
            lastName: ko.observable()
        }
    }

    /* options for the title drop down*/
    var titleOptions = [
      {
        value: 'Mr',
        setTitle: function () {
        RegistrationForm.customer.personalInfo.title("Mr"); }
      },
      {
        value: 'Mrs',
        setTitle: function () {
        RegistrationForm.customer.personalInfo.title("Mrs");}
      },
      {
        value: 'Miss',
        setTitle: function () {
        RegistrationForm.customer.personalInfo.title("Miss");}
      },
      {
        value: 'Dr',
        setTitle: function () {
        RegistrationForm.customer.personalInfo.title("Dr");}
      }
    ];


    var init = function () {
        /* add code to initialize this module */
        ko.applyBindings(RegistrationForm);
    };

    // form submission
    var submit = function() {
        console.log("The form is submitted");
        console.log(ko.toJSON(customer));
    };

    var titleSelect = ko.pureComputed(function() {
        if (customer.personalInfo.title() == null) {
            console.log("Hello")
            return "select";
        } else {
            return customer.personalInfo.title();
        }
    })


    /* execute the init function when the DOM is ready */
    $(init);

    return {
        /* add members that will be exposed publicly */
        customer: customer,
        submit: submit,
        titleOptions: titleOptions,
        titleSelect: titleSelect
    };
}();
