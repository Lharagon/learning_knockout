/* Module for Registration form application */
var RegistrationForm = function () {

    /* add members here */
    var customer = {
        personalInfo: {
            title: ko.observable().extend({ required: true }),
            firstName: ko.observable().extend({ required: true }),
            middleName: ko.observable(),
            lastName: ko.observable().extend({ required: true })
        },
        contactDetails: {
            phoneNumber: ko.observable().extend({required: true, minLength: 4, maxLength: 9, number: true}),
            emailAddress: ko.observable().extend({required: true, email: true}),
            preferredContact: ko.observable().extend({required: true})
        },
        address: {
            residential: {
                street: ko.observable().extend({required: true}),
                city: ko.observable().extend({required: true}),
                postCode: ko.observable().extend({required: true, maxLength: 4, number: true}),
                country: ko.observable().extend({required: true})
            },
            postal: {
                type: ko.observable().extend({required: true}),
                streetAddress: {
                    street: ko.observable(),
                    city: ko.observable(),
                    postCode: ko.observable().extend({maxLength: 4, number: true}),
                    country: ko.observable()
                },
                poBoxAddress: {
                    poBox: ko.observable().extend({maxLength: 6, number: true}),
                    city: ko.observable(),
                    postCode: ko.observable().extend({maxLength: 4, number: true}),
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
        var card = {name: ko.observable().extend({required: true}),
                    number: ko.observable().extend({required: true, number: true}),
                    expiryDate: ko.observable().extend({required: true, pattern: '^(0[1-9]|1[012])/\\d\\d$'})};
        // create validation group for the card
        card.errors = ko.validation.group(card)
        customer.creditCards.push(card);
    };

    var deleteCreditCard = function(card) {
        console.log("Deleting credit card with number: ", + card.number());
        customer.creditCards.remove(card);
    }

    var init = function () {
        /* add code to initialize this module */
        // configure validation
        configureValidation();
        // Add first credit card
        addCreditCard();
        // apply ko bindings
        ko.applyBindings(RegistrationForm);
    };

    // form submission
    var submit = function() {
        var creditCardError = checkCreditCardsForErrors();
        var staticFieldError = checkStaticFieldsForErrors();

        if(creditCardError && staticFieldError) {
            console.log("customer model is valid.");
            console.log(ko.toJSON(customer));
        } else {
            console.log("Customer model has errors");
        }
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

    var configureValidation = function() {
        //init and config the validation plugin
        ko.validation.init({
            errorElementClass: 'has-error',
            errorMessageClass: 'help-block'
        });

        applyConditionalValidation();
        // group errors
        customer.errors = ko.validation.group(customer, {deep: true});
    };

    var isStreetAddress = function() {
        return customer.address.postal.type() == "street";
    }

    var isPoBoxAddress = function() {
        return customer.address.postal.type() == "pobox";
    }

    /* method applies conditional validation to the model */
    var applyConditionalValidation = function () {
      //postal street address fields
        customer.address.postal.streetAddress.street.extend({ required: {onlyIf: isStreetAddress}});
        customer.address.postal.streetAddress.city.extend({ required: {onlyIf: isStreetAddress}});
        customer.address.postal.streetAddress.postCode.extend({ required: {onlyIf: isStreetAddress}});
        customer.address.postal.streetAddress.country.extend({ required: {onlyIf: isStreetAddress}});

        //postal PO Box address fields
        customer.address.postal.poBoxAddress.poBox.extend({ required: {onlyIf: isPoBoxAddress}});
        customer.address.postal.poBoxAddress.city.extend({ required: {onlyIf: isPoBoxAddress}});
        customer.address.postal.poBoxAddress.postCode.extend({ required: {onlyIf: isPoBoxAddress}});
        customer.address.postal.poBoxAddress.country.extend({ required: {onlyIf: isPoBoxAddress}});
    };

    //returns false if any credit card has errors
    //true otherwise
    var checkCreditCardsForErrors = function() {
        var valid = true;
        ko.utils.arrayForEach(customer.creditCards(), function(card) {
            if(card.errors().length > 0) {
                valid = false;
                card.errors.showAllMessages();
            }
        });
        return valid;
    }

    var checkStaticFieldsForErrors = function() {
        if (customer.errors().length > 0) {
            customer.errors.showAllMessages();
            return false;
        }
        return true;
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
