import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const tasksData = [
  { name: "Jul", tasks: 42 },
  { name: "Aug", tasks: 38 },
  { name: "Sep", tasks: 51 },
  { name: "Oct", tasks: 46 },
  { name: "Nov", tasks: 54 },
  { name: "Dec", tasks: 72 },
  { name: "Jan", tasks: 61 },
  { name: "Feb", tasks: 59 },
  { name: "Mar", tasks: 68 },
  { name: "Apr", tasks: 63 },
  { name: "May", tasks: 71 },
  { name: "Jun", tasks: 75 },
];

export const TasksOverView = () => {
  return (
    <>
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-medium mb-4 text-gray-100">
          Tasks Overview
        </h2>

        <div className="h-80">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={tasksData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey={"name"} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
