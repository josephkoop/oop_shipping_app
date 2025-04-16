//retailer_id and customer_id don't always auto-fill in edit form
//package_weight only accepts integers
//put method doesn't work
//foreign tables aren't up
//close both modals at a time



$(document).ready(function(){

    loadPackages();

    var orders;

    let selectedPackageId = null;

    let addModal = $("#add-modal");
    let editModal = $("#edit-modal");
    let deleteModal = $("#delete-modal");
    let updateModal = $("#update-modal");
    let printModal = $("#print-modal");
    let calculateModal = $("#calculate-modal");
    let addBtn = $("#add-btn");
    let editBtn = $("#edit-btn");
    let deleteBtn = $("#delete-btn");
    let updateBtn = $("#update-btn");
    let printBtn = $("#print-btn");
    let calculateBtn = $("#calculate-btn");
    let spans = $(".close");
    let modals = $(".modal");
    let menuIcons = $('.menu-icon');
    let controlModal = $('#control-modal');

    function display (element) { element.removeClass("hide"); }
    function hide (element) { element.addClass("hide"); }

    function compilePackage(id, retailer_id, customer_id, status_id, tracking_number, shipping_method, package_weight, cost_weight){
        const packageHtml = `
            <li class="package-info" data-id="${id}">
                <p class="">ID: ${id}</p>
                <p class="">Retailer ID: ${retailer_id}</p>
                <p class="">Customer ID: ${customer_id}</p>
                <p class="">Status ID: ${status_id}</p>
                <p class="">Tracking Number: ${tracking_number}</p>
                <p class="">Shipping Method: ${shipping_method}</p>
                <p class="">Package Weight: ${package_weight}</p>
                <p class="">Cost Weight: ${cost_weight}</p>
                <button class="menu-icon">☰</button>
            </li>`
    
        return packageHtml;
    }
    
    async function loadPackages() {
        try {
            const response = await fetch('/packages');
            const data = await response.json();
    
            if(data.err){
                console.error('Error loading packages:', data.err);
                return;
            }
    
            orders = data.packages;
            orders.forEach(package => {
                const packageHtml = compilePackage(package.id, package.retailer_id, package.customer_id, package.status_id, package.tracking_number, package.shipping_method, package.package_weight, package.cost_weight);
                $('#packages-container').append(packageHtml);
            });
    
            
        } catch (error) {
            console.error('Error loading packages:', error);
        }
    }
    
    // const oneDayDiv = $('#oneDayPackages');
    // const twoDayDiv = $('#twoDayPackages');
    
    // if (oneDayDiv.length && twoDayDiv.length) {
    //     oneDayDiv.html('<h2>One-Day Packages</h2>');
    //     twoDayDiv.html('<h2>Two-Day Packages</h2>');
    
    //     packages.forEach(pkg => {
    //         const li = $('<li<</li>');
    //         li.text(`${pkg.trackingNumber} - ${pkg.status}`);
    //         li.on('click', function() {
    //             localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    //             window.location.href = 'package.html';
    //         });
    
    //         if (pkg.shippingMethod === 'OneDay') {
    //             oneDayDiv.append(li);
    //         } else if (pkg.shippingMethod === 'TwoDay') {
    //             twoDayDiv.append(li);
    //         }
    //     });
    // }

    addBtn.click( function() { display(addModal) });
    editBtn.click( function() { 
        if(selectedPackageId === null){
            console.error('Coding Error: No package selected.');
            return;
        }
        const editOrder = orders.find(order => order.id === selectedPackageId);

        if(!editOrder){
            console.error('Coding Error: Package not found.');
            return;
        }

        $('#edit-id').val(selectedPackageId);
        $('#edit-retailer-id').val(editOrder.retailer_id);
        $('#edit-customer-id').val(editOrder.customer_id);
        $('#edit-status-id').val(editOrder.status_id);
        $('#edit-tracking-number').val(editOrder.tracking_number);
        $('#edit-shipping-method').val(editOrder.shipping_method);
        $('#edit-package-weight').val(editOrder.package_weight);
        $('#edit-cost-weight').val(editOrder.cost_weight);

        display(editModal);
    });

    deleteBtn.click( function() { 
        if(selectedPackageId === null){
            console.error('Coding Error: No package selected.');
            return;
        }

        $('#delete-id').val(selectedPackageId);
        console.log('front-end id:', $('#delete-id').val(), ' check:', selectedPackageId);
        display(deleteModal); 
    });

    updateBtn.click( function() { 
        if(selectedPackageId === null){
            console.error('Coding Error: No package selected.');
            return;
        }
        const updateOrder = orders.find(order => order.id === selectedPackageId);

        if(!updateOrder){
            console.error('Coding Error: Package not found.');
            return;
        }

        $('#update-id').val(selectedPackageId);
        $('#update-status-id').val(updateOrder.status_id);
        display(updateModal);
    });
    printBtn.click(async function() { 
        if(selectedPackageId === null){
            console.error('Coding Error: No package selected.');
            return;
        }

        try{
            const response = await fetch(`/print/${selectedPackageId}`);
            const data = await response.json();

            if(data.err){
                console.error('Error loading packages:', data.err);
                return;
            }
    
            let order = data.package;

            $('#print-id').text(selectedPackageId);
            $('#print-retailer-name').text(order.retailer_id);
            $('#print-customer-name').text(order.customer_id);
            $('#print-status-id').text(order.status_id);
            $('#print-tracking-number').text(order.tracking_number);
            $('#print-shipping-method').text(order.shipping_method);
            $('#print-package-weight').text(order.package_weight);
            $('#print-cost-weight').text(order.cost_weight);

        } catch (error) {
            console.error('Error loading packages:', error);
        }

        display(printModal);
    });
    calculateBtn.click( async function() { 
        if(selectedPackageId === null){
            console.error('Coding Error: No package selected.');
            return;
        }

        try{
            const response = await fetch(`/calculate/${selectedPackageId}`);
            const data = await response.json();

            console.log("front end retrieved: ", data);

            if(data.err){
                console.error('Error loading packages:', data.err);
                return;
            }
    
            let order = data.package;

            $('#calculate-tracking-number').text(order.trackingNumber);
            $('#calculate-shipping-method').text();
            $('#calculate-flat-fee').text(order.flatFee);
            $('#calculate-package-weight').text(order.packageWeight);
            $('#calculate-cost-weight').text(order.costWeight);
            $('#calculate-total-cost').text(order.totalCost);
        } catch (error) {
            console.error('Error loading packages:', error);
        }

        display(calculateModal) 
    });

    $('#packages-container').on('click', '.menu-icon', function() {
        selectedPackageId = $(this).closest('.package-info').data('id');
        display(controlModal);
    });

    $('.close').on('click', function () { 
        hide($(this).closest('.modal'));
        selectedPackageId = null;
    });
    
    $(window).on('click', function(event) { 
        $('.modal').each(function() {
            if (event.target === this) {
                hide($(this)); 
            }
        });
    });
});

