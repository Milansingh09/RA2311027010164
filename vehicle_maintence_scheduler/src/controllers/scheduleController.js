import { fetchDepots, fetchVehicles } from "../services/fetchService.js";
import { knapsackWithItems } from "../services/knapsackService.js";

export const getSchedule = async (req, res) => {
  try {
    const depots = await fetchDepots();
    const vehicles = await fetchVehicles();

    const results = depots.map(depot => {
      const capacity = depot.MechanicHours;

      const result = knapsackWithItems(vehicles, capacity);

      return {
        depotId: depot.ID,
        totalImpact: result.maxImpact,
        tasks: result.selectedTasks.map(t => t.TaskID)
      };
    });

    res.json({
      success: true,
      data: results
    });

  } catch (error) {
  console.error("FULL ERROR:", error);   
  console.error("MESSAGE:", error.message);

  res.status(500).json({
    success: false,
    message: error.message
  });
}
};

