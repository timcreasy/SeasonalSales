var StoreInfo = (function (departmentInfo) {

  // Privately variable to store department data
  var departmentData = null;

  return {
    setDepartmentInfo: function(departmentInfo) {
      departmentData = departmentInfo;
    },
    getDepartmentInfo: function() {
      return departmentData;
    },
    getSaleAmountBySaleName: function(saleName) {
      // Loop through categories to find match
      for(let i = 0; i < departmentData.categories.length; i++) {
        var currentCategory = departmentData.categories[i];
        if(currentCategory.season_discount === saleName) {
          // Return sale amount
          return currentCategory.discount;
        }
      }
    },
    getSaleDepartmentBySaleName: function(saleName) {
      // Loop through categories to find match
      for(let i = 0; i < departmentData.categories.length; i++) {
        var currentCategory = departmentData.categories[i];
        if(currentCategory.season_discount === saleName) {
          // Return sale department
          return currentCategory.name;
        }
      }
    }
  };

})();