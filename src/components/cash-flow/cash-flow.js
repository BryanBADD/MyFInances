import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: "Group E", value: 500 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "gray"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

  render() {
    return (
        <div className="container transaction-container">
            <div className="row">
                <h2>Cash Flow Report</h2>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    <PieChart width={400} height={400}>
                        <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={180}
                        fill="#8884d8"
                        dataKey="value"
                        >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                        </Pie>
                    </PieChart>
                </div>
                <div className="col-lg-4">
                    <h3>Category Summary</h3>
                </div>
            </div>
      </div>
    );
  }
}



//TODO: Create an array with all transactions (or requested transactions)
//TODO: Map through array
    //TODO: If the item's category exists in the category array, add item's amount to the category's total
    //TODO: If the item's category doesn't exis in the category array:
        //TODO: Add category to the category array with category name as name and item transaction amount as total
    //TODO: Return a row to the Category Summary with the category name and total for display