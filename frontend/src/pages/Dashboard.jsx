export default function Dashboard() {
    const crops = [
      {
        name: "Rice",
        area: 3,
        status: "Active",
        expense: 15000,
        revenue: 28000,
      },
      {
        name: "Cotton",
        area: 2,
        status: "Active",
        expense: 12000,
        revenue: 22000,
      },
      {
        name: "Maize",
        area: 2,
        status: "Harvested",
        expense: 10000,
        revenue: 18000,
      },
    ];
  
    const totalCrops = crops.length;
  
    const activeCrops = crops.filter(
      crop => crop.status === "Active"
    ).length;
  
    const harvested = crops.filter(
      crop => crop.status === "Harvested"
    ).length;
  
    const totalLand = crops.reduce(
      (sum, crop) => sum + crop.area,
      0
    );
  
    const totalExpense = crops.reduce(
      (sum, crop) => sum + crop.expense,
      0
    );
  
    const totalRevenue = crops.reduce(
      (sum, crop) => sum + crop.revenue,
      0
    );
  
    const profit = totalRevenue - totalExpense;
  
    return (
      <>
  
        <h2 className="mb-4">
          🏠 Home
        </h2>
  
        <div className="row g-3 mb-4">
  
          <div className="col-md-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h3>{totalCrops}</h3>
                <p>Total Crops</p>
              </div>
            </div>
          </div>
  
          <div className="col-md-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h3>{activeCrops}</h3>
                <p>Active Crops</p>
              </div>
            </div>
          </div>
  
          <div className="col-md-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h3>{harvested}</h3>
                <p>Harvested</p>
              </div>
            </div>
          </div>
  
          <div className="col-md-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h3>₹{profit}</h3>
                <p>Expected Profit</p>
              </div>
            </div>
          </div>
  
        </div>
  
        <div className="card shadow mb-4">
  
          <div className="card-header bg-success text-white">
            Active Crops
          </div>
  
          <div className="card-body">
  
            <table className="table">
  
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Area</th>
                  <th>Status</th>
                </tr>
              </thead>
  
              <tbody>
  
                {crops.map((crop, index) => (
                  <tr key={index}>
                    <td>{crop.name}</td>
                    <td>{crop.area} Acres</td>
                    <td>{crop.status}</td>
                  </tr>
                ))}
  
              </tbody>
  
            </table>
  
          </div>
  
        </div>
  
        <div className="row">
  
          <div className="col-md-6">
  
            <div className="card shadow mb-4">
  
              <div className="card-header bg-warning">
                Today's Tasks
              </div>
  
              <div className="card-body">
  
                <ul>
                  <li>Water Rice Field</li>
                  <li>Apply Fertilizer</li>
                  <li>Pest Inspection</li>
                </ul>
  
              </div>
  
            </div>
  
          </div>
  
          <div className="col-md-6">
  
            <div className="card shadow mb-4">
  
              <div className="card-header bg-info text-white">
                Weather Alert
              </div>
  
              <div className="card-body">
  
                <h6>Temperature : 32°C</h6>
  
                <h6>Humidity : 70%</h6>
  
                <h6>Rain Chance : 65%</h6>
  
                <div className="alert alert-success mt-3">
                  Rain expected. Delay irrigation.
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
        <div className="card shadow">
  
          <div className="card-header bg-dark text-white">
            Expense Summary
          </div>
  
          <div className="card-body">
  
            <h5>Total Expense : ₹{totalExpense}</h5>
  
            <h5>Total Revenue : ₹{totalRevenue}</h5>
  
            <h4 className="text-success">
              Profit : ₹{profit}
            </h4>
  
          </div>
  
        </div>
  
      </>
    );
  }
  
