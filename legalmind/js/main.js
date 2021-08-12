(function($) {



    var form = $("#signup-form");
    var numFounders = 1;
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            email: {
                email: true
            }
        },
        onfocusout: function(element) {
            $(element).valid();
        },
    });
    form.children("div").steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "fade",
        enableFinishButton: false,
        stepsOrientation: "vertical",
        titleTemplate: '<div class="title"><span class="step-number">#index#</span><span class="step-text">#title#</span></div>',
        labels: {
            previous: 'Zurück',
            next: 'Weiter',
            finish: '',
            current: ''
        },
        onStepChanging: function(event, currentIndex, newIndex) {
            if (currentIndex === 0) {
                form.parent().parent().parent().append('<div class="footer footer-' + currentIndex + '"></div>');
            }
            if (currentIndex === 1) {
                 $(".gesellschafter-loop").empty();
                for(var i=1;i<=numFounders;i++){
                    $(".gesellschafter-loop").append('<h4>Gesellschafter #'+i+'</h4> <div class="fieldset-content"><div class="form-row"> <div class="form-flex"> <div class="form-group"> <input type="checkbox" checked data-toggle="toggle" /> <span class="text-input">Geschäftsführer</span> </div> <div class="form-group"> <input type="checkbox" checked data-toggle="toggle" /><span class="text-input">Allein Vertretungsberechtigt</span> </div> </div> </div><div>  <div class="form-group"><input type="number" min="0" max="100"/> <span class="text-input">Anteilsverhältnis in %</span> </div> </div> <div class="form-row"> <label class="form-label">Name</label> <div class="form-flex"> <div class="form-group"> <input type="text" name="first_name" id="first_name" /> <span class="text-input">Vorname</span> </div> <div class="form-group"> <input type="text" name="last_name" id="last_name" /> <span class="text-input">Nachname</span> </div> </div> </div> <div class="form-group"> <label for="email" class="form-label">Email</label> <input type="email" name="email" id="email" /> <span class="text-input">Beispiel  :<span>  wolfgang@gmail.com</span></span> </div> <div class="form-group"> <label for="address" class="form-label">Adresse</label> <input type="text" name="address" id="address" /> </div> <div class="form-group"> <div class="form-flex"> <div class="form-group"> <label for="plz" class="form-label">PLZ</label> <input type="text" name="plz" id="plz" /> </div> <div class="form-group"> <label for="ort" class="form-label">Ort</label> <input type="text" name="ort" id="ort" /> </div> </div> </div> <div class="form-date"> <label for="birth_date" class="form-label">Geburtsdatum</label> <input type="date" name="dob" id="dob" />  </div> </div> </div>')
                }
                form.parent().parent().parent().find('.footer').removeClass('footer-0').addClass('footer-' + currentIndex + '');
            }
            if (currentIndex === 2) {
                new AutoNumeric('.currency-a', {currencySymbol : ' €'});
                 new AutoNumeric('.currency-b', {currencySymbol : ' €'});
                form.parent().parent().parent().find('.footer').removeClass('footer-1').addClass('footer-' + currentIndex + '');
            }
            if (currentIndex === 3) {
                form.parent().parent().parent().find('.footer').removeClass('footer-2').addClass('footer-' + currentIndex + '');
            }
            // if(currentIndex === 4) {
            //     form.parent().parent().parent().append('<div class="footer" style="height:752px;"></div>');
            // }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinishing: function(event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function(event, currentIndex) {
            alert('Submited');
        },
        onStepChanged: function(event, currentIndex, priorIndex) {

            return true;
        }
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });

    $.dobPicker({
        daySelector: '#birth_date',
        monthSelector: '#birth_month',
        yearSelector: '#birth_year',
        dayDefault: '',
        monthDefault: '',
        yearDefault: '',
        minimumAge: 0,
        maximumAge: 120
    });

    //beteiligten-slider
    var marginSlider = document.getElementById('slider-margin');
    if (marginSlider != undefined) {
        noUiSlider.create(marginSlider, {
              start: [0],
              step: 1,
              connect: [true, false],
              tooltips: [true],
              range: {
                  'min': 1,
                  'max': 10
              },
             
                format: wNumb({
                    decimals: 0,
                    thousand: '',
                    prefix: '',
                })
        });
         //stammkapital-gesamt-slider
        var stammkapitalSliderGesamt = document.getElementById('stammkapital-gesamt');
        noUiSlider.create(stammkapitalSliderGesamt, {
              start: [0],
              step: 1000,
              connect: [true, false],
              tooltips: [true],
              range: {
                  'min': 35000,
                  'max': 10000000
              },
             
                format: wNumb({
                    decimals: 0,
                    thousand: '.',
                    prefix: 'EUR ',
                })
        });

        var marginMin = document.getElementById('value-lower'),
	    marginMax = document.getElementById('value-upper');

        marginSlider.noUiSlider.on('update', function ( values, handle ) {
            numFounders=values[0];
            if ( handle ) {
                marginMax.innerHTML = values[handle];
            } else {
                marginMin.innerHTML = values[handle];
            }
        });
    }
})(jQuery);




