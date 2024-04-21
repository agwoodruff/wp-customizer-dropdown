jQuery(document).ready(function($) {
    // create div with inputs
    var newServiceDiv = '<div class="service-customizer-div">' + '<div class="title-and-delete"><h3>Service</h3><span class="custom-icon"><i class="fa-solid fa-caret-up"></i><span class="custom-delete-button">&#10006</span></span></div>' + '<div class="custom-input-div"><span class="customize-control-title">Service Title</span><span class="customize-control-description">Title for service</span>' + '<input type="text" placeholder="Service Title" id="service-title" name="service-title" value="Service Title"><br>' + '<span class="customize-control-title">Service Image</span>' + '<span class="customize-control-description">Upload or choose image</span>' + '<img class="custom-img" src="' + $('.custom-img').attr('src') + '">' + '<span> <button type="button" class="button upload-button-custom">Change image</button> </span>' + '<span class="customize-control-title">Service Page</span>' + '<span class="customize-control-description">Choose which page the service will link to</span>' + '<select id="service-page">';
    
    for (page of page_data[0].posts) {
        // add options of pages with data from page_data (gotten from custom-service.php)
        newServiceDiv += "<option " + "value='" + page.ID + "'>" + page.post_title + "</option>";
    }   
    
    newServiceDiv += '</select>' + '<span class="customize-control-title">Service Description</span>' + '<span class="customize-control-description">Description for service</span>' + '<textarea placeholder="Service description goes here" rows="5" style="width:100%;" id="service-descript">Service description goes here</textarea>' + '</div></div>';
    
    displayServiceDiv();
    addListener();

    // triggered when user clicks 'change image' button under service image
    $(document).on('click', ".upload-button-custom", function(e) {
        e.preventDefault();
        var index = $('.upload-button-custom').index($(this));

        // trigger Media Library Window to open and only display images
        image_frame = wp.media({
            title: 'Choose Image',
            button: {
                text: 'Select Image'
            },
            library: {
                    type: [ 'image' ]
            },
        // triggered when user presses select button in Media Library frame after choosing image
        }).on('select', function () {
            // get selected image
            var attachment = image_frame.state().get('selection').first().toJSON();
            // update image in Customizer window after user select image from media library
            $($('.custom-img')[index]).attr('src', attachment.url);
            // save new image url to hidden input
            updateValues();
        });

        image_frame.open();
    });

    function addListener() {
        // update values on page as user changes them in Customizer
        var services = $(".service-customizer-div");
        services.each(function() {
            $('#service-title', this)[0].addEventListener("input", updateValues);    
            $('#service-page', this)[0].addEventListener("input", updateValues);
            $('#service-descript', this)[0].addEventListener("input", updateValues);
        });
    }

    // update the values for each service and save them in hidden input
    function updateValues() {
        //find # of services in customizer
        var services = $(".service-customizer-div");
        var totalServiceVals = "";
  
        services.each(function(index) {
            // get values of inputs
            var title = $('#service-title', this).val();
            var img = $('.custom-img', this).attr('src');
            var page = $('#service-page', this).val();
            var descript = $('#service-descript', this).val();
            
            // ";" separates services and "," separates individual input values
            if (index == 0)
                var serviceVals = title + "," + img + "," + page + "," + descript;
            else
                var serviceVals = ";" + title + "," + img + "," + page + "," + descript;
            
            // concatenate strings for all values
            totalServiceVals += serviceVals;
        })

        // save value to hidden input
        // trigger('change') tell Customizer that value has changed so publish button is enabled
        $('.total-service-values').val(totalServiceVals).trigger('change');
    }

    function appendNewService(el) {
        // append div w/ inputs to customizer window
        $(el.children(".service-customizer-div")).last().after(newServiceDiv);
        
        if (el.children(".service-customizer-div").length == 0) {
            $('.custom-control .customize-control-description').after(newServiceDiv);
        }
        updateValues();
        addListener();
    }

    function removeService(index) {
        var services = $('.total-service-values').val().split(";");

        if (services.length > 1) {
            var services = $('.total-service-values').val().split(";");
            services.splice(index,1);
            var servicesStr = services.join(";");
            
            // remove service values from hidden input
            $('.total-service-values').val(servicesStr);
    
            // remove service div in Customizer
            displayServiceDiv();
    
            // remove div on page
            updateValues();
        } else {
            // delete when only one service
            $('.total-service-values').val("");
            displayServiceDiv();
            updateValues();
        }
    }

    function displayServiceDiv() {
        var services = $('.total-service-values').val().split(";");
        var vals = services.map((e) => {
            return e.split(",");
        });

        $(".service-customizer-div").remove();

        // make sure there are services in the Customizer
        // and then add the inputs with correct values
        if (services[0] != "") {
            for (var val of vals) {
                $(".custom-control > .customize-control-description").after(newServiceDiv);
            }
            
            // get values saved to hidden input and display in Customizer inputs
            $(".service-customizer-div").each(function(index) {
                $('#service-title', this).val(vals[index][0]);
                $('.custom-img', this).attr('src', vals[index][1]);
                $('#service-page', this).val(vals[index][2]);
                $('#service-descript', this).val(vals[index][3]);
    
            });
        }

    }

    // add new service
    $('.add-service').click(function(event) {
        event.preventDefault();
        appendNewService($(this).parent());
    }); 

    //delete service
    $(document).on('click', '.custom-delete-button', function(event) {
        event.preventDefault();
        var index = $('.custom-delete-button').index($(this));
        removeService(index);
    });

    $(document).on('click', '.title-and-delete', function(event) {
        var index = $('.title-and-delete').index($(this));
        var display = $($('.custom-input-div')[index]).css('display');
        
        if (display != "none") {
            $($('.custom-input-div')[index]).css("display","none");
            $($('i')[index]).removeClass('fa-caret-up').addClass('fa-caret-down');
        } else {
            $($('.custom-input-div')[index]).css("display","block");
            $($('i')[index]).removeClass('fa-caret-down').addClass('fa-caret-up');
        }
    });

});