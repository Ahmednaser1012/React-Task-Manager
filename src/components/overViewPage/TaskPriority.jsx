import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];
const TASK_PRIORITY_DATA = [
  { name: "High Priority", value: 18 },
  { name: "Medium Priority", value: 15 },
  { name: "Low Priority", value: 12 },
  { name: "Critical", value: 8 },
];
export const TaskPriority = () => {
  return (
    <>
      <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700">
        <h2 className="text-lg font-medium mb-4 text-gray-100">
          Tasks by Priority
        </h2>

        <div className="h-80">
          <ResponsiveContainer>
            <BarChart data={TASK_PRIORITY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />

              <Bar dataKey={"value"} fill="#8884d8">
                {TASK_PRIORITY_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
