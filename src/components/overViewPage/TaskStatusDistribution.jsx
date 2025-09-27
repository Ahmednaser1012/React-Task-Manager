import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const taskStatusData = [
  { name: "Completed", value: 21 },
  { name: "In Progress", value: 15 },
  { name: "Pending", value: 9 },
  { name: "Bug Fix", value: 8 },
  { name: "Testing", value: 5 },
];
const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

export const TaskStatusDistribution = () => {
  return (
    <>
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-medium mb-4 text-gray-100">
          Task Status Distribution
        </h2>
        <div className="h-80">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx={"50%"}
                cy={"50%"}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {taskStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
