var StoreInfo = function(oldStoreInfo) {

  // Private var to store productData
  var productInformation = null;

  oldStoreInfo.setProducts = function(productData) {
    productInformation = productData;
  };

  oldStoreInfo.getProducts = function() {
    return productInformation;
  };

  return oldStoreInfo;

}(StoreInfo);