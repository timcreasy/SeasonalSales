var saleAmt = 1;
var saleCat = null;

// ================================= XML REQUEST PRODUCTS =================================== //

// Create XML object for fetching products
var fetchProductsXML = new XMLHttpRequest();

// Process when ready
fetchProductsXML.onreadystatechange = function() {
  if(fetchProductsXML.readyState === 4 && fetchProductsXML.status === 200) {
    var productData = fetchProductsXML.responseText;
    productData = JSON.parse(productData);
    StoreInfo.setProducts(productData);

    // ================================= XML REQUEST DEPARTMENTS =================================== //

    // We have products request finished, now on to departments 

    // Create XML object for fetching departments
    var fetchDepartmentsXML = new XMLHttpRequest();

    // Process when ready
    fetchDepartmentsXML.onreadystatechange = function() {
      if(fetchDepartmentsXML.readyState === 4 && fetchDepartmentsXML.status === 200) {
        var departmentData = fetchDepartmentsXML.responseText;
        departmentData = JSON.parse(departmentData);
        StoreInfo.setDepartmentInfo(departmentData);
        // Create select menu
        createSelectMenu();
        // Add products to page
        addProductsToPage();
      }
    
    };

    // Open request
    fetchDepartmentsXML.open("GET", "../json/departments.json");
    // Send request
    fetchDepartmentsXML.send();

  }
};

// Open request
fetchProductsXML.open("GET", "../json/products.json");
// Send request
fetchProductsXML.send();



// ================================= PAGE SETUP =================================== //

function addProductsToPage() {
  // Get products
  var productList =  StoreInfo.getProducts().products;


  var categoriesList = StoreInfo.getDepartmentInfo();

  // Get productArea div
  var productArea = document.getElementById("productArea");

  // Loop through each product and add to page
  for (let i = 0; i < productList.length; i++) {
    // Get currentProduct
    var currentProduct = productList[i];

    // Create variables for HTML buildout
    var currentProductName = currentProduct.name;
    var currentProductPrice = currentProduct.price;
    var currentProductCategory = currentProduct.category_id;

    // Add correct category name
    for (let i = 0; i < categoriesList.categories.length; i++) {
      
      var currentCategory = categoriesList.categories[i];
      // Test for category id match
      if (currentCategory.id === currentProductCategory) {
        // Change currentProductCategory to name string
        currentProductCategory = currentCategory.name;
      }
    }

    // Apply sale if necessary
    if (saleCat !== null) {
      if (currentProductCategory === saleCat) {
        console.log(saleAmt + "% sale being applied to " + saleCat + " products");
        currentProductPrice = (currentProductPrice * (1 - saleAmt));
        currentProductPrice = currentProductPrice.toFixed(2);
      }
    }

    // Create product html element
    var productHTML = `<div class="product">
                        <h3>${currentProductName}</h3>
                        <h4>$${currentProductPrice}</h4>
                        <h5>Section: ${currentProductCategory}</h5>
                      </div>`;

    // Add product to DOM
    productArea.innerHTML += productHTML;
  }
}

// Sale selected
function saleSelected(event) {
  // Get category of sale
  var selectedSale = event.target.value;
//   // Get sale discount amount based on selected sale
  var saleDiscount = StoreInfo.getSaleAmountBySaleName(selectedSale);
  var saleDepartment = StoreInfo.getSaleDepartmentBySaleName(selectedSale);

  // Set global saleAmount to new discount
  saleAmt = saleDiscount;

  saleCat = saleDepartment;

  // Clear products on page
  var productArea = document.getElementById("productArea");
  productArea.innerHTML = "";

  // Add refactored products
  addProductsToPage(saleAmt, saleCat);

  // Reset sale amount
  saleAmt = 1;
  // Reset saleCategory
  saleCat = null;
}

// Create Select Menu
function createSelectMenu() {
  // First, get department categories in array
  var categories = StoreInfo.getDepartmentInfo().categories;
  
  // Start buildout of select menu
  var selectMenu = `<select id="selectMenu">
                      <option selected="true" disabled="disable">Select a sale</option>`;

  // Loop through array, adding sale as an option
  for(let i = 0; i < categories.length; i++) {
    // Store currentSaleName
    var currentSaleName = categories[i].season_discount;
    
    // Store currentSaleDiscount
    var currentSaleDiscount = categories[i].discount * 100 + "%";

    // Create option item
    var currentOption = `<option value="${currentSaleName}">${currentSaleName} - ${currentSaleDiscount}</option>`;

    // Add option to selectMenu
    selectMenu += currentOption;
  }

  // Add closing tag to selectMenu
  selectMenu += `</select>`;

  // Add select menu to top of page
  var saleArea = document.getElementById("saleArea");
  saleArea.innerHTML = selectMenu;

  // Add event listener to options
  var select = document.getElementById("selectMenu");
  select.addEventListener("change", saleSelected);
  
}










