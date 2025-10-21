"use client";
import React, { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  PieLabelRenderProps,
} from "recharts";

const COLORS = ["#FF6B6B", "#4D96FF", "#FFD166", "#06D6A0", "#A29BFE"];

type Category = {
  name: string;
  value: number;
};

const CategoryDistributionChart = () => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);

  useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data.categories);
      });
  }, []);

  return (
    <div className="bg-neutral-800 backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-neutral-900 md:mx-0">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
        Sales Overview
      </h2>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              dataKey="value"
              // label={(props: PieLabelRenderProps) => {
              //   const { name } = props;
              //   return name;
              // }}
            >
              {categoryData.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                );
              })}
            </Pie>
            <Legend
              iconType="circle"
              layout="horizontal"
              align="center"
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryDistributionChart;
