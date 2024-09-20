
db.sales.aggregate([
    // Step 1: Unwind the 'items' array to get individual items
    {
      $unwind: "$items"
    },
    // Step 2: Project fields and extract the month from the 'date' field
    {
      $project: {
        store: 1,
        month: { $dateToString: { format: "%Y-%m", date: "$date" } },
        revenue: { $multiply: ["$items.quantity", "$items.price"] },
        price: "$items.price",
        quantity: "$items.quantity"
      }
    },
    // Step 3: Group by store and month, calculate total revenue and total quantity
    {
      $group: {
        _id: { store: "$store", month: "$month" },
        totalRevenue: { $sum: "$revenue" },
        totalQuantity: { $sum: "$quantity" }
      }
    },
    // Step 4: Project the result with the average price
    {
      $project: {
        store: "$_id.store",
        month: "$_id.month",
        totalRevenue: 1,
        averagePrice: { $divide: ["$totalRevenue", "$totalQuantity"] }
      }
    },
    // Step 5: Sort by store and month
    {
      $sort: {
        store: 1,
        month: 1
      }
    }
  ])
  
