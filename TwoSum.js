const SumModule = (function() {
    function twoSum(nums, target) {
      if (!Array.isArray(nums) || typeof target !== 'number') {
        throw new Error("Invalid input: nums must be an array and target must be a number");
      }
      const hashMap = {}; // This will store numbers and their index
      
      for (let i = 0; i < nums.length; i++) {
        const difference = target - nums[i]; // Find the difference
        if (hashMap.hasOwnProperty(difference)) {
          return [hashMap[difference], i]; 
        }
        hashMap[nums[i]] = i;
      }
  
      // If no solution is found
      throw new Error("No two sum solution found");
    }
  

    return {
      twoSum: twoSum
    };
  })();
  
  // Usage of the SumModule 
  try {
    console.log(SumModule.twoSum([2, 7, 11, 15], 9));  // Output: [0, 1]
  } catch (error) {
    console.error(error.message);
  }
  