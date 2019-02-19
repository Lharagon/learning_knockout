/* Module for Registration form application */
var RegistrationForm = function () {

    ko.extenders.required = function(target, option) {
        target.hasError = ko.observable(false);

        target.subscribe(function(newValue) {
            target.hasError(newValue ? false : true);
        });

        return target;
    }

    /* add members here */
    var customer = {
        personalInfo: {
            title: ko.observable(),
            firstName: ko.observable().extend({ required: null }),
            middleName: ko.observable(),
            lastName: ko.observable()
        },
        contactDetails: {
            phoneNumber: ko.observable(),
            emailAddress: ko.observable(),
            preferredContact: ko.observable()
        },
        address: {
            residential: {
                street: ko.observable(),
                city: ko.observable(),
                postCode: ko.observable(),
                country: ko.observable()
            },
            postal: {
                type: ko.observable(),
                streetAddress: {
                    street: ko.observable(),
                    city: ko.observable(),
                    postCode: ko.observable(),
                    country: ko.observable()
                },
                poBoxAddress: {
                    poBox: ko.observable(),
                    city: ko.observable(),
                    postCode: ko.observable(),
                    country: ko.observable()
                }
            }
        },
        creditCards: ko.observableArray(),
        interests: ko.observableArray(),
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

    var addCreditCard = function() {
        customer.creditCards.push({name: ko.observable(), number: ko.observable(), expiryDate: ko.observable()});
    };

    var deleteCreditCard = function(card) {
        console.log("Deleting credit card with number: ", + card.number());
        customer.creditCards.remove(card);
    }

    var init = function () {
        /* add code to initialize this module */
        addCreditCard();
        ko.applyBindings(RegistrationForm);
    };

    // form submission
    var submit = function() {
        console.log("The form is submitted");
        console.log(ko.toJSON(customer));
    };

    var clear = function() {
        console.log("Clear customer model");
        traverseAndClearModel(customer);
        addCreditCard();
    }

    var traverseAndClearModel = function(jsonObj) {
        $.each(jsonObj, function(key, val) {
            if(ko.isObservable(val)) {
                if(val.removeAll != undefined) {
                    val.removeAll();
                } else {
                    val(null);
                }
            } else {
                traverseAndClearModel(val);
            }
        })
    }

    var titleSelect = ko.pureComputed(function() {
        if (customer.personalInfo.title() == null) {
            console.log("Hello")
            return "select";
        } else {
            return customer.personalInfo.title();
        }
    });

    /* execute the init function when the DOM is ready */
    $(init);

    return {
        /* add members that will be exposed publicly */
        customer: customer,
        submit: submit,
        titleOptions: titleOptions,
        titleSelect: titleSelect,
        addCreditCard: addCreditCard,
        clear: clear,
    };
}();
