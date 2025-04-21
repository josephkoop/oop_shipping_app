//foreign tables aren't up

$(document).ready(function(){

    loadPackages();

    var orders;
    var retailers;
    var customers;
    var statuses;

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

    function compilePackage(id, retailer_name, customer_name, status_name, tracking_number, shipping_method){
        const packageHtml = `
            <li class="package-info" data-id="${id}">
                <p class="">${id}</p>
                <p class="">${retailer_name}</p>
                <p class="">${customer_name}</p>
                <p class="">${status_name}</p>
                <p class="">${tracking_number}</p>
                <p class="">${shipping_method}-day</p>
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
    
            orders = data.packages.packages;
            retailers = data.packages.retailers;
            customers = data.packages.customers;
            statuses = data.packages.statuses;
            orders.forEach(package => {
                const packageHtml = compilePackage(package.id, package.retailer_name, package.customer_name, package.status_name, package.tracking_number, package.shipping_method);
                $('#packages-container').append(packageHtml);
            });
    
            
        } catch (error) {
            console.error('Error loading packages:', error);
        }
    }

    addBtn.click( function() {

        $('#add-retailer-id').empty();
        $('#add-customer-id').empty();

        retailers.forEach(retailer => {
            let option = `<option value=${retailer.id}>${retailer.name}</option>`;
            $('#add-retailer-id').append(option);
        });

        customers.forEach(customer => {
            let option = `<option value=${customer.id}>${customer.name}</option>`;
            $('#add-customer-id').append(option);
        });
        display(addModal);
    });

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

        $('#edit-retailer-id').empty();
        $('#edit-customer-id').empty();
        $('#edit-status-id').empty();

        retailers.forEach(retailer => {
            let option = `<option value=${retailer.id}>${retailer.name}</option>`;
            $('#edit-retailer-id').append(option);
        });

        customers.forEach(customer => {
            let option = `<option value=${customer.id}>${customer.name}</option>`;
            $('#edit-customer-id').append(option);
        });
        
        statuses.forEach(status => {
            let option = `<option value=${status.id}>${status.name}</option>`;
            $('#edit-status-id').append(option);
        });

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

            console.log(data.package);

            if(data.err){
                console.error('Error loading packages:', data.err);
                return;
            }
    
            let order = data.package;

            $('#print-tracking-number').text(order.tracking_number);
            $('#print-retailer-name').text(order.retailer_name);
            $('#print-retailer-address').text(order.retailer_address);
            $('#print-customer-name').text(order.customer_name);
            $('#print-customer-address').text(order.customer_address);
            $('#print-status-name').text(order.status_name);

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

            if(data.err){
                console.error('Error loading packages:', data.err);
                return;
            }
    
            let order = data.package;

            $('#calculate-tracking-number').text(order.trackingNumber);
            $('#calculate-shipping-method').text(order.shippingMethod + "-day");
            $('#calculate-flat-fee').text("$" + order.flatFee);
            $('#calculate-package-weight').text(order.packageWeight);
            $('#calculate-cost-weight').text("$" + order.costWeight);
            $('#calculate-total-cost').text("$" + order.totalCost);
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
        hide($('#control-modal'));
        selectedPackageId = null;
    });
    
    $(window).on('click', function(event) { 
        $('.modal').each(function() {
            if (event.target === this) {
                hide($(this)); 
                hide($('#control-modal'));
                selectedPackageId = null;
            }
        });
    });
});

